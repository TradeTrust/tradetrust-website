import { NestedDocumentState } from "../../constants/NestedDocumentState";

const LOCAL_DEV_HOSTS = new Set(["localhost", "127.0.0.1"]);

// Nested documents are posted by this site into a tab it opened. A shared host such as
// netlify.app must not be trusted just because the page origin and the sender differ.
export const isTrustedDocumentMessageOrigin = (origin: string, pageOrigin: string): boolean => {
  if (!origin || origin !== pageOrigin) return false;

  let parsed: URL;
  try {
    parsed = new URL(origin);
  } catch {
    return false;
  }

  if (parsed.protocol === "https:") return true;
  return parsed.protocol === "http:" && LOCAL_DEV_HOSTS.has(parsed.hostname);
};

export const readNestedDocumentPayload = (data: unknown): string | null => {
  if (!data || typeof data !== "object") return null;
  const { type, payload } = data as { type?: unknown; payload?: unknown };
  if (type !== NestedDocumentState.LOAD || typeof payload !== "string" || payload.length === 0) {
    return null;
  }
  return payload;
};
