import { assertSafeDocumentUri } from "./documentUri";

describe("assertSafeDocumentUri", () => {
  it.each([
    "https://tradetrust-functions.netlify.app/.netlify/functions/storage/abc",
    "https://gallery.tradetrust.io/static/demo/sepolia.tt",
    "https://storage.issuer.example/doc.json",
  ])("allows https document URI %s", (uri) => {
    expect(assertSafeDocumentUri(uri, "ref.tradetrust.io")).toBe(new URL(uri).toString());
  });

  it.each([
    "http://storage.issuer.example/doc.json",
    "javascript:alert(1)",
    "data:application/json,{}",
    "file:///etc/passwd",
    "https://localhost/doc.json",
    "https://127.0.0.1/doc.json",
    "https://10.0.0.5/doc.json",
    "https://192.168.1.10/doc.json",
    "https://172.20.0.1/doc.json",
    "https://169.254.169.254/latest/meta-data",
    "https://[::1]/doc.json",
    "https://[fe80::1]/doc.json",
    "https://[fe90::1]/doc.json",
    "https://[febf::1]/doc.json",
    "https://user:pw@storage.issuer.example/doc.json",
    "not a url",
  ])("rejects %s", (uri) => {
    expect(() => assertSafeDocumentUri(uri, "ref.tradetrust.io")).toThrow();
  });

  it("rejects a missing URI", () => {
    expect(() => assertSafeDocumentUri(undefined, "ref.tradetrust.io")).toThrow("Document URI is missing");
  });

  it("allows a local http URI only when the app itself runs locally", () => {
    expect(assertSafeDocumentUri("http://localhost:5080/doc.json", "localhost")).toBe("http://localhost:5080/doc.json");
    expect(() => assertSafeDocumentUri("http://localhost:5080/doc.json", "ref.tradetrust.io")).toThrow();
  });
});
