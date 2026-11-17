/** Public OAuth web client IDs. Sign-in does not use the client secret. */
export const GOOGLE_CLIENT_ID_DEV = "12385374970-igsp238mh39ktd64hgbmk4nu49q7gfnc.apps.googleusercontent.com";

export const GOOGLE_CLIENT_ID_PROD = "12385374970-tbt2a9rc1v79qtgu4k2335r3dk1s4v5q.apps.googleusercontent.com";

const DEV_HOSTS = new Set(["localhost", "127.0.0.1", "dev.tradetrust.io", "ref.tradetrust.io"]);
const PROD_HOSTS = new Set(["tradetrust.io", "www.tradetrust.io"]);

/** The client for this build. GOOGLE_CLIENT_ID from the env file wins; known hosts are the fallback. */
export function googleClientId(hostname?: string): string {
  const fromEnv = process.env.GOOGLE_CLIENT_ID;
  if (fromEnv) return fromEnv;
  const host = hostname ?? (typeof window === "undefined" ? "" : window.location.hostname);
  if (DEV_HOSTS.has(host)) return GOOGLE_CLIENT_ID_DEV;
  if (PROD_HOSTS.has(host)) return GOOGLE_CLIENT_ID_PROD;
  return "";
}
