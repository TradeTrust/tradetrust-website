import { isAllowedMessageOrigin, parseNestedDocumentPayload } from "./nestedDocumentMessage";

const productionPage = {
  origin: "https://ref.tradetrust.io",
  hostname: "ref.tradetrust.io",
  protocol: "https:",
};

const encode = (value: unknown): string => Buffer.from(JSON.stringify(value), "utf8").toString("base64");

describe("isAllowedMessageOrigin", () => {
  it("accepts exact first-party HTTPS origins", () => {
    expect(isAllowedMessageOrigin("https://tradetrust.io", productionPage)).toBe(true);
    expect(isAllowedMessageOrigin("https://www.tradetrust.io", productionPage)).toBe(true);
    expect(isAllowedMessageOrigin("https://ref.tradetrust.io", productionPage)).toBe(true);
    expect(isAllowedMessageOrigin("https://dev.tradetrust.io", productionPage)).toBe(true);
    expect(isAllowedMessageOrigin("https://dev--reference-implementation.netlify.app", productionPage)).toBe(true);
  });

  it("rejects shared-host suffixes, arbitrary subdomains, and plain HTTP", () => {
    expect(isAllowedMessageOrigin("https://evil.netlify.app", productionPage)).toBe(false);
    expect(isAllowedMessageOrigin("https://evil.netlify.com", productionPage)).toBe(false);
    expect(isAllowedMessageOrigin("https://attacker.magic.link", productionPage)).toBe(false);
    expect(isAllowedMessageOrigin("https://evil.tradetrust.io", productionPage)).toBe(false);
    expect(isAllowedMessageOrigin("http://tradetrust.io", productionPage)).toBe(false);
    expect(isAllowedMessageOrigin("http://ref.tradetrust.io", productionPage)).toBe(false);
    expect(isAllowedMessageOrigin("http://localhost:3000", productionPage)).toBe(false);
  });

  it("accepts the dev server only when this page is that loopback origin", () => {
    const localPage = { origin: "http://localhost:3000", hostname: "localhost", protocol: "http:" };
    expect(isAllowedMessageOrigin("http://localhost:3000", localPage)).toBe(true);
    expect(isAllowedMessageOrigin("http://127.0.0.1:3000", localPage)).toBe(false);
    expect(isAllowedMessageOrigin("http://localhost:3001", localPage)).toBe(false);
  });

  it("accepts a Netlify deploy preview only for its own HTTPS origin", () => {
    const preview = {
      origin: "https://deploy-preview-12--tradetrust.netlify.app",
      hostname: "deploy-preview-12--tradetrust.netlify.app",
      protocol: "https:",
    };
    expect(isAllowedMessageOrigin(preview.origin, preview)).toBe(true);
    expect(isAllowedMessageOrigin("https://deploy-preview-99--attacker.netlify.app", preview)).toBe(false);
    expect(isAllowedMessageOrigin("http://deploy-preview-12--tradetrust.netlify.app", preview)).toBe(false);
  });
});

describe("parseNestedDocumentPayload", () => {
  it("decodes a base64 JSON object", () => {
    const payload = encode({ name: "bill of lading" });
    expect(parseNestedDocumentPayload({ type: "NESTED_DOCUMENT_LOAD", payload })).toEqual({ name: "bill of lading" });
  });

  it("rejects non-objects, invalid base64, and unexpected message types", () => {
    expect(
      parseNestedDocumentPayload({ type: "NESTED_DOCUMENT_LOAD", payload: encode(["not", "a", "doc"]) })
    ).toBeNull();
    expect(parseNestedDocumentPayload({ type: "NESTED_DOCUMENT_LOAD", payload: encode("string") })).toBeNull();
    expect(parseNestedDocumentPayload({ type: "NESTED_DOCUMENT_LOAD", payload: "not base64!!!" })).toBeNull();
    expect(parseNestedDocumentPayload({ type: "OTHER", payload: encode({ ok: true }) })).toBeNull();
    expect(parseNestedDocumentPayload(null)).toBeNull();
    expect(parseNestedDocumentPayload("NESTED_DOCUMENT_LOAD")).toBeNull();
  });
});
