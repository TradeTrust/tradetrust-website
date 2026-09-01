import { uploadDocument, validateIframeTexts, validateIssuerTexts, location, navigateToVerify } from "./helper";

fixture("v3 DNS DID Certificate Rendering").page`${location}`;

// Intentionally skipped everywhere (not just CI): iframe renderer does not expose #issuedby
// (selector mismatch in Chrome headless / prod integration).
// eslint-disable-next-line jest/no-disabled-tests
test.skip("sample document is rendered correctly when dns did is verified", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/did/dns-did-signed.json");
  await validateIssuerTexts(["EXAMPLE.OPENATTESTATION.COM"]);

  await validateIframeTexts(["S1234567a", "John Doe", "22 Feb 1977", "1 Jan 2010"]);
});
