import { location, navigateToVerify, uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";

fixture("DNS TXT Certificate Rendering").page`${location}`;

test("sample document is rendered correctly when DNS TXT is verified", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/goerli/v2/invoice.json");
  await validateIssuerTexts(["DEMO-TRADETRUST.OPENATTESTATION.COM"]);
  await validateIframeTexts(["INVOICE"]);
});
