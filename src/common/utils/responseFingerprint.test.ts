import {
  isFingerprintHeader,
  sanitizedErrorBody,
  scrubResponse,
  withoutFingerprintHeaders,
} from "../../../netlify/edge-functions/strip-fingerprint";

describe("response fingerprint scrubbing", () => {
  it("selects platform and proxy headers", () => {
    expect(isFingerprintHeader("Server")).toBe(true);
    expect(isFingerprintHeader("x-nf-request-id")).toBe(true);
    expect(isFingerprintHeader("X-Envoy-Upstream-Service-Time")).toBe(true);
    expect(isFingerprintHeader("Cache-Status")).toBe(true);
    expect(isFingerprintHeader("content-security-policy")).toBe(false);
  });

  it("removes fingerprint headers and keeps security headers", () => {
    const headers = withoutFingerprintHeaders(
      new Headers({
        server: "Netlify",
        "x-nf-request-id": "01EXAMPLE",
        "x-envoy-upstream-service-time": "27",
        "cache-status": '"Netlify Edge"; fwd=miss',
        "content-security-policy": "default-src 'self'",
        "x-content-type-options": "nosniff",
      })
    );

    expect(headers.get("server")).toBeNull();
    expect(headers.get("x-nf-request-id")).toBeNull();
    expect(headers.get("x-envoy-upstream-service-time")).toBeNull();
    expect(headers.get("cache-status")).toBeNull();
    expect(headers.get("content-security-policy")).toBe("default-src 'self'");
    expect(headers.get("x-content-type-options")).toBe("nosniff");
  });

  it("replaces error pages that name the host or include a request id", () => {
    expect(sanitizedErrorBody(404, "text/plain", "Not Found - Request ID: 01EXAMPLE\n\nhttps://netlify.new/")).toBe(
      "Not Found"
    );
    expect(sanitizedErrorBody(400, "text/plain", "400 Bad Request: Invalid Host Header.")).toBeUndefined();
    expect(sanitizedErrorBody(200, "text/html", "netlify")).toBeUndefined();
  });

  it("scrubs a successful response without reading a changed body", async () => {
    const response = await scrubResponse(
      new Response("ok", {
        status: 200,
        headers: { server: "Netlify", "x-nf-request-id": "01EXAMPLE", "content-type": "text/plain" },
      })
    );

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("ok");
    expect(response.headers.get("server")).toBeNull();
    expect(response.headers.get("x-nf-request-id")).toBeNull();
    expect(response.headers.get("content-type")).toBe("text/plain");
  });

  it("replaces a platform 404 body", async () => {
    const response = await scrubResponse(
      new Response("Not Found - Request ID: 01EXAMPLE", {
        status: 404,
        headers: { "content-type": "text/plain", server: "Netlify", "content-length": "32" },
      })
    );

    expect(response.status).toBe(404);
    expect(await response.text()).toBe("Not Found");
    expect(response.headers.get("server")).toBeNull();
    expect(response.headers.get("content-type")).toContain("text/plain");
  });
});
