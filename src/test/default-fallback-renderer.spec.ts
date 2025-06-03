import { location, navigateToVerify, uploadDocument, validateIframeTexts } from "./helper";

fixture("Default fallback renderer").page`${location}`;

test("Document with missing renderer url should fallback to default renderer", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v2/invoice-missing-renderer-url.json");
  await validateIframeTexts(["Missing Renderer"]);
});

test("Document with incorrect renderer url should fallback to default renderer", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v2/invoice-incorrect-renderer-url.json");
  await validateIframeTexts(["INVOICE"]);
});
