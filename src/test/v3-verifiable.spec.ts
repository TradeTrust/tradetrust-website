import { Selector } from "testcafe";
import { uploadDocument, validateIframeTexts, validateIssuerTexts, location, navigateToVerify } from "./helper";

fixture("v3 Verifiable Document").page`${location}`;
const HandleProceedAnywayBtn = Selector("[data-testid='overlayHandleDispatchBtn']");
test("should render correctly when verified", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v3/invoice.json");
  await t.click(HandleProceedAnywayBtn);
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
  await validateIframeTexts(["INVOICE"]);
});
