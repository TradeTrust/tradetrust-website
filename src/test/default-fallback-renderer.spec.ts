import { location, navigateToVerify, uploadDocument, validateIframeTexts } from "./helper";

fixture("Default fallback renderer").page`${location}`;

test("Document with missing renderer url should fallback to default renderer", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v2/invoice-missing-renderer-url.json");
<<<<<<< HEAD
  await validateIframeTexts(["This is the default renderer"]);
=======
  await validateIframeTexts(["Missing Renderer"]);
  await validateIframeTexts([
    "This document doesn't specify how to display itself. We're showing you the raw document data, which is still valid and verified.",
  ]);
>>>>>>> 495c9549 (fix: update testcafe script)
});
