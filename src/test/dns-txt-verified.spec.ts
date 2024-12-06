import { location, navigateToVerify, uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";

fixture("DNS TXT Certificate Rendering").page`${location}`;

test("sample document is rendered correctly when DNS TXT is verified", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v2/invoice.json");
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
  await validateIframeTexts(["INVOICE"]);
});
