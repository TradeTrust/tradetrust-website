import { getSnapshot, isAutoSignInDisabled, setIdToken, signOutSession } from "./googleSession";

const GIS_SRC = "https://accounts.google.com/gsi/client";

interface PromptMomentNotification {
  isDismissedMoment?: () => boolean;
  isSkippedMoment?: () => boolean;
}

interface GoogleIdentityServices {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string;
        callback: (response: { credential?: string }) => void;
        auto_select?: boolean;
        cancel_on_tap_outside?: boolean;
        context?: string;
      }) => void;
      renderButton: (parent: HTMLElement, options: Record<string, string | number>) => void;
      prompt: (listener?: (notification: PromptMomentNotification) => void) => void;
      disableAutoSelect: () => void;
      cancel: () => void;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleIdentityServices;
  }
}

let initialized = false;
let pending: ((token: string | null) => void) | null = null;

function googleId(): GoogleIdentityServices["accounts"]["id"] | null {
  return window.google?.accounts?.id ?? null;
}

function loadGis(): Promise<void> {
  if (googleId()) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-google-identity]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("gis")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = GIS_SRC;
    script.async = true;
    script.dataset.googleIdentity = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("gis"));
    document.head.appendChild(script);
  });
}

export function acceptCredential(credential?: string): void {
  const accepted = Boolean(credential && setIdToken(credential));
  if (!pending) return;
  const resolve = pending;
  pending = null;
  resolve(accepted ? credential ?? null : null);
}

export function requestSignIn(): Promise<string | null> {
  const id = googleId();
  if (!id) return Promise.resolve(null);
  return new Promise((resolve) => {
    if (pending) pending(null);
    pending = resolve;
    id.prompt((notification) => {
      const dismissed = Boolean(notification.isDismissedMoment?.() || notification.isSkippedMoment?.());
      if (!dismissed || !pending) return;
      const resolvePending = pending;
      pending = null;
      resolvePending(null);
    });
  });
}

/** One Tap and the standard button. One Tap does not run after sign-out. */
export async function mountGoogleSignIn(host: HTMLElement, clientId: string): Promise<void> {
  if (!clientId) return;
  await loadGis();
  const id = googleId();
  if (!id) return;
  if (!initialized) {
    id.initialize({
      client_id: clientId,
      callback: (response) => acceptCredential(response.credential),
      auto_select: !isAutoSignInDisabled(),
      cancel_on_tap_outside: false,
      context: "signin",
    });
    initialized = true;
  }
  host.replaceChildren();
  id.renderButton(host, {
    theme: "outline",
    size: "large",
    type: "standard",
    text: "signin_with",
    width: 240,
  });
  if (!isAutoSignInDisabled() && !getSnapshot().idToken) {
    id.prompt();
  }
}

export function signOut(): void {
  signOutSession();
  const id = googleId();
  id?.disableAutoSelect();
  id?.cancel();
}

export function resetGoogleIdentityForTests(): void {
  initialized = false;
  pending = null;
}
