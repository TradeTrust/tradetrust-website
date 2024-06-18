import { uploadDocument, validateIframeTexts, validateIssuerTexts, location, navigateToVerify } from "./helper";

fixture("v4 Verifiable Document").page`${location}`;

test("should render correctly when verified for dns-did", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v4/did-wrapped-signed.json");

  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
  await validateIframeTexts(["INVOICE"]);
});

test("should render correctly when verified for valid idvc", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v4/did-idvc-wrapped-signed.json");

  await validateIssuerTexts(["MY OWN COMPANY PTE LTD"]);
  await validateIframeTexts(["INVOICE"]);
});

test("should render correctly when verified for revoked idvc", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v4/did-idvc-wrapped-signed-idvc-revoked.json");

  await validateIssuerTexts(["MY OWN COMPANY PTE LTD"]);
  await validateIframeTexts(["INVOICE"]);
});
