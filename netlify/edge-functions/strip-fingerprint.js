// Netlify adds Server, x-nf-request-id, and Cache-Status on the way out.
// Drop them, and any Envoy timing header, from responses this site handles.
// Error bodies that name the platform or include a request id are replaced.

const PLATFORM_MARKERS = /netlify|request id|x-nf-|x-envoy|envoy/i;

export function isFingerprintHeader(name) {
  const lower = name.toLowerCase();
  return (
    lower === "server" ||
    lower === "cache-status" ||
    lower === "server-timing" ||
    lower.startsWith("x-nf-") ||
    lower.startsWith("x-envoy-") ||
    lower.startsWith("x-bb-")
  );
}

export function withoutFingerprintHeaders(headers) {
  const next = new Headers(headers);
  for (const key of [...next.keys()]) {
    if (isFingerprintHeader(key)) next.delete(key);
  }
  return next;
}

export function sanitizedErrorBody(status, contentType, body) {
  if (status < 400) return undefined;
  const type = (contentType || "").toLowerCase();
  const textual =
    type === "" ||
    type.includes("text") ||
    type.includes("json") ||
    type.includes("html") ||
    type.includes("xml");
  if (!textual || !PLATFORM_MARKERS.test(body)) return undefined;
  if (status === 404) return "Not Found";
  if (status === 400) return "Bad Request";
  if (status === 429) return "Too Many Requests";
  if (status >= 500) return "Server Error";
  return "Error";
}

export async function scrubResponse(response) {
  const headers = withoutFingerprintHeaders(response.headers);
  if (response.status < 400 || response.body === null) {
    return new Response(response.body, { status: response.status, headers });
  }

  const contentType = response.headers.get("content-type") ?? "";
  const raw = await response.text();
  headers.delete("content-encoding");
  headers.delete("content-length");
  const replacement = sanitizedErrorBody(response.status, contentType, raw);
  if (replacement === undefined) {
    return new Response(raw, { status: response.status, headers });
  }

  headers.set("content-type", "text/plain; charset=utf-8");
  headers.set("cache-control", "no-store");
  return new Response(replacement, { status: response.status, headers });
}

export default async function stripFingerprint(_request, context) {
  const response = await context.next();
  return scrubResponse(response);
}

export const config = {
  path: "/*",
  onError: "bypass",
};
