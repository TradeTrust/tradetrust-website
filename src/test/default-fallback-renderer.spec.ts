import {
  location,
  navigateToVerify,
  uploadDocument,
  validateIframeTexts,
} from "./helper";

fixture("Default fallback renderer").page`${location}`;

test("Document with missing renderer url should fallback to default renderer", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/goerli/v2/invoice-missing-renderer-url.json");
  await validateIframeTexts(["This is the OpenAttestation default renderer"]);
});
