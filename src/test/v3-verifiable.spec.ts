import { uploadDocument, validateIframeTexts, validateIssuerTexts, location, navigateToVerify } from "./helper";

fixture("v3 Verifiable Document").page`${location}`;

test("should render correctly when verified", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v3/invoice.json");

  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
  await validateIframeTexts(["INVOICE"]);
});
