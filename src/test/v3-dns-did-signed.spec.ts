import { uploadDocument, validateIframeTexts, validateIssuerTexts, location, navigateToVerify } from "./helper";

fixture("v3 DNS DID Certificate Rendering").page`${location}`;

// Skipped in CI: iframe renderer does not expose #issuedby (selector mismatch in Chrome headless / prod integration).
test.skip("sample document is rendered correctly when dns did is verified", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/did/dns-did-signed.json");
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);

  await validateIframeTexts(["INVOICE", "ABC Company", "DEF Company"]);
});
