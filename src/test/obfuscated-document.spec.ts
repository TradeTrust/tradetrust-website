import { t, Selector } from "testcafe";
import { location, navigateToVerify, uploadDocument, validateIssuerTexts } from "./helper";

fixture("Obfuscated Document Rendering").page`${location}`;

const ObfuscationInfo = Selector("[data-testid='obfuscation-info']");

const HandleProceedAnywayBtn = Selector("[data-testid='overlayHandleDispatchBtn']");
test("Obfuscated document shows obfuscated message correctly", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v2/invoice-obfuscated-document.json");
  await t.click(HandleProceedAnywayBtn);
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
  await t.expect(ObfuscationInfo.withText("Note: There are fields/data obfuscated in this document.").exists).ok();
});
