import { NestedDocumentState } from "../../constants/NestedDocumentState";

/**
 * Exact first-party HTTPS origins that may send a nested-document message.
 * Shared-host suffixes (any *.netlify.app, *.magic.link, *.tradetrust.io) are
 * intentionally absent: those namespaces can be registered by anyone.
 */
const FIRST_PARTY_HTTPS_ORIGINS = new Set([
  "https://tradetrust.io",
  "https://www.tradetrust.io",
  "https://ref.tradetrust.io",
  "https://dev.tradetrust.io",
  "https://dev--reference-implementation.netlify.app",
]);

/**
 * Dev-server origins. Accepted only when this page is itself that origin,
 * so a local page cannot message a production tab over HTTP.
 */
const LOCAL_DEV_ORIGINS = new Set(["http://localhost:3000", "http://127.0.0.1:3000"]);

const BASE64_PATTERN = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

type PageLocation = Pick<Location, "origin" | "hostname" | "protocol">;

export const isAllowedMessageOrigin = (origin: string, page: PageLocation = window.location): boolean => {
  if (FIRST_PARTY_HTTPS_ORIGINS.has(origin)) {
    return true;
  }

  if (origin !== page.origin) {
    return false;
  }

  if (LOCAL_DEV_ORIGINS.has(origin)) {
    return true;
  }

  // Netlify deploy previews of this app only, and only messages from the same window origin.
  return (
    page.protocol === "https:" && page.hostname.endsWith(".netlify.app") && page.hostname.includes("deploy-preview")
  );
};

export const isNestedDocumentLoadMessage = (data: unknown): data is { type: string; payload: unknown } => {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return false;
  }
  return (data as { type?: unknown }).type === NestedDocumentState.LOAD;
};

/**
 * Returns the decoded document object, or null when the LOAD payload is not
 * a base64-encoded JSON object.
 */
export const parseNestedDocumentPayload = (data: unknown): Record<string, unknown> | null => {
  if (!isNestedDocumentLoadMessage(data) || typeof data.payload !== "string" || !BASE64_PATTERN.test(data.payload)) {
    return null;
  }

  let decoded: string;
  try {
    decoded = atob(data.payload);
  } catch {
    return null;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(decoded);
  } catch {
    return null;
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return null;
  }

  return parsed as Record<string, unknown>;
};
