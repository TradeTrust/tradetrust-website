import { t, Selector } from "testcafe";
import { uploadDocument, validateIssuerTexts, location } from "./helper";

fixture("Obfuscated Document Rendering").page`${location}`;

const ObfuscationInfo = Selector("[data-testid='obfuscation-info']");

test("Obfuscated document shows obfuscated message correctly", async () => {
  await uploadDocument("./fixture/obfuscated-document.json");
  await validateIssuerTexts(["DEMO-TRADETRUST.OPENATTESTATION.COM"]);
  await t.expect(ObfuscationInfo.withText("Note: There are fields/data obfuscated in this document.").exists).ok();
});
