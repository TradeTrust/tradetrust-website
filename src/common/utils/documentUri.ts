const LOCAL_DEV_HOSTS = new Set(["localhost", "127.0.0.1"]);

// Private, loopback and link-local hosts a crafted link could point the browser at.
const PRIVATE_HOST =
  /^(?:localhost|127\.|10\.|192\.168\.|169\.254\.|172\.(?:1[6-9]|2\d|3[01])\.|0\.|\[(?:::1?|f[cd][0-9a-f]*:|fe[89ab][0-9a-f]*:)[^\]]*\])/i;

/**
 * Validates the document URI taken from an action link (`?q=`) before the browser fetches it.
 * Any https host is allowed because issuers host documents on their own storage; the fetched
 * document is still verified, so a forged one fails verification.
 */
export const assertSafeDocumentUri = (uri: unknown, pageHostname = globalThis.location?.hostname): string => {
  if (typeof uri !== "string") throw new Error("Document URI is missing");
  let url: URL;
  try {
    url = new URL(uri);
  } catch {
    throw new Error(`Invalid document URI: ${uri}`);
  }

  const isLocalDev = LOCAL_DEV_HOSTS.has(pageHostname ?? "") && LOCAL_DEV_HOSTS.has(url.hostname);
  if (isLocalDev && (url.protocol === "http:" || url.protocol === "https:")) return url.toString();

  if (url.protocol !== "https:" || url.username || url.password || PRIVATE_HOST.test(url.hostname)) {
    throw new Error(`Unable to load the certificate from ${uri}`);
  }
  return url.toString();
};
