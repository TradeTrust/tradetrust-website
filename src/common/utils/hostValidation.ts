/**
 * Host header validation utility
 */

// Define allowed hosts for production and development
const ALLOWED_HOSTS = ["ref.tradetrust.io", "dev.tradetrust.io", "dev--reference-implementation.netlify.app", "localhost:3000", "127.0.0.1:3000"];

const getAllowedHosts = (): string[] => {
  const hosts = [...ALLOWED_HOSTS];

  const currentHost = globalThis.location?.host;
  if (currentHost && currentHost.includes("netlify.app") && currentHost.includes("deploy-preview")) {
    hosts.push(currentHost);
  }

  return hosts;
};

/**
 * Validates if the current host is in the allowed list
 * @returns true if host is valid, false otherwise
 */
export const isValidHost = (): boolean => {
  try {
    const currentHost = globalThis.location?.host;
    const allowedHosts = getAllowedHosts();
    return allowedHosts.includes(currentHost);
  } catch (error) {
    console.error("Host validation error:", error);
    return false;
  }
};

/**
 * Gets a safe host URL, falls back to production if current host is invalid
 * @returns validated host URL
 */
export const getSafeHostUrl = (): string => {
  const currentHost = globalThis.location?.host;
  const protocol = globalThis.location?.protocol;

  if (isValidHost()) {
    return `${protocol}//${currentHost}`;
  }

  throw new Error("Invalid host detected");
};

/**
 * Gets a safe redirect URL with validation
 * @returns validated redirect URL ending with /
 */
export const getSafeRedirectUrl = (): string => {
  let safeHost = getSafeHostUrl();
  if (safeHost.includes("dev--reference-implementation.netlify.app")) {
    safeHost = safeHost.replace("dev--reference-implementation.netlify.app", "ref.tradetrust.io");
  }
  return safeHost.endsWith("/") ? safeHost : `${safeHost}/`;
};
