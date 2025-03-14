import { Selector } from "testcafe";
import { location, navigateToVerify, uploadDocument, validateIframeTexts } from "./helper";

fixture("Default fallback renderer").page`${location}`;
const HandleProceedAnywayBtn = Selector("[data-testid='overlayHandleDispatchBtn']");
test("Document with missing renderer url should fallback to default renderer", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v2/invoice-missing-renderer-url.json");
  await t.click(HandleProceedAnywayBtn);
  await validateIframeTexts(["This is the default renderer"]);
});

test("Document with incorrect renderer url should fallback to default renderer", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v2/invoice-incorrect-renderer-url.json");
  await t.click(HandleProceedAnywayBtn);
  await validateIframeTexts(["INVOICE"]);
});
