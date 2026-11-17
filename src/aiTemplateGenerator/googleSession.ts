import { useEffect, useState } from "react";
import { AI_TOKEN_RENEW_WITHIN_MS } from "./types";

export interface GoogleSnapshot {
  idToken: string | null;
  email: string | null;
  expiresAt: number;
  autoSignInDisabled: boolean;
}

const emptySnapshot = (): GoogleSnapshot => ({
  idToken: null,
  email: null,
  expiresAt: 0,
  autoSignInDisabled: false,
});

let snapshot: GoogleSnapshot = emptySnapshot();
const listeners = new Set<() => void>();

export function getSnapshot(): GoogleSnapshot {
  return snapshot;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit(): void {
  listeners.forEach((listener) => listener());
}

function replace(next: GoogleSnapshot): void {
  snapshot = next;
  emit();
}

interface TokenPayload {
  exp?: number;
  email?: string;
}

export function decodeIdToken(idToken: string): TokenPayload | null {
  const part = idToken.split(".")[1];
  if (!part) return null;
  try {
    const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(json) as TokenPayload;
    return payload && typeof payload === "object" ? payload : null;
  } catch {
    return null;
  }
}

/** Keeps the Google ID token in memory. Never writes cookies or web storage. */
export function setIdToken(idToken: string): boolean {
  const payload = decodeIdToken(idToken);
  if (!payload?.exp) return false;
  replace({
    idToken,
    email: typeof payload.email === "string" ? payload.email : null,
    expiresAt: payload.exp * 1000,
    autoSignInDisabled: snapshot.autoSignInDisabled,
  });
  return true;
}

export function needsRenewal(now = Date.now()): boolean {
  if (!snapshot.idToken) return true;
  return snapshot.expiresAt - now < AI_TOKEN_RENEW_WITHIN_MS;
}

/**
 * Returns the in-memory token for an AI call.
 * When fewer than 5 minutes remain, asks for a new Google sign-in first.
 */
export async function tokenForAiCall(requestSignIn: () => Promise<string | null>): Promise<string | null> {
  if (!needsRenewal()) return snapshot.idToken;
  return requestSignIn();
}

/** Clears the token and stops One Tap from signing the user back in. */
export function signOutSession(): void {
  replace({
    idToken: null,
    email: null,
    expiresAt: 0,
    autoSignInDisabled: true,
  });
}

export function isAutoSignInDisabled(): boolean {
  return snapshot.autoSignInDisabled;
}

export function useGoogleSession(): GoogleSnapshot {
  const [current, setCurrent] = useState(() => getSnapshot());
  useEffect(() => {
    setCurrent(getSnapshot());
    return subscribe(() => setCurrent(getSnapshot()));
  }, []);
  return current;
}

export function resetGoogleSessionForTests(): void {
  snapshot = emptySnapshot();
  emit();
}
