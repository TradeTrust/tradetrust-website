import { Selector } from "testcafe";
import { location, navigateToVerify, uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";

fixture("DNS TXT Certificate Rendering").page`${location}`;
const HandleProceedAnywayBtn = Selector("[data-testid='overlayHandleDispatchBtn']");
test("sample document is rendered correctly when DNS TXT is verified", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v2/invoice.json");
  await t.click(HandleProceedAnywayBtn);
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
  await validateIframeTexts(["INVOICE"]);
});
