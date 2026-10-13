import { isTrustedDocumentMessageOrigin, readNestedDocumentPayload } from "./documentMessage";

describe("documentMessage", () => {
  const page = "https://www.tradetrust.io";

  it("accepts a message from this page", () => {
    expect(isTrustedDocumentMessageOrigin(page, page)).toBe(true);
  });

  it("rejects a shared host, another subdomain, and plain http", () => {
    expect(isTrustedDocumentMessageOrigin("https://attacker.netlify.app", page)).toBe(false);
    expect(isTrustedDocumentMessageOrigin("https://evil.netlify.com", page)).toBe(false);
    expect(isTrustedDocumentMessageOrigin("https://auth.magic.link", page)).toBe(false);
    expect(isTrustedDocumentMessageOrigin("https://dev.tradetrust.io", page)).toBe(false);
    expect(isTrustedDocumentMessageOrigin("http://www.tradetrust.io", "http://www.tradetrust.io")).toBe(false);
  });

  it("accepts local http development origins", () => {
    expect(isTrustedDocumentMessageOrigin("http://localhost:3000", "http://localhost:3000")).toBe(true);
    expect(isTrustedDocumentMessageOrigin("http://127.0.0.1:3000", "http://127.0.0.1:3000")).toBe(true);
  });

  it("reads only a nested-document payload string", () => {
    expect(readNestedDocumentPayload({ type: "NESTED_DOCUMENT_LOAD", payload: "abc" })).toBe("abc");
    expect(readNestedDocumentPayload({ type: "OTHER", payload: "abc" })).toBeNull();
    expect(readNestedDocumentPayload({ type: "NESTED_DOCUMENT_LOAD", payload: { doc: true } })).toBeNull();
    expect(readNestedDocumentPayload(null)).toBeNull();
    expect(readNestedDocumentPayload("NESTED_DOCUMENT_LOAD")).toBeNull();
  });
});