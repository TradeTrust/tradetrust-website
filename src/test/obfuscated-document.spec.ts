import { Selector } from "testcafe";
import { location, navigateToVerify, uploadDocument, validateIssuerTexts } from "./helper";

fixture("Obfuscated Document Rendering").page`${location}`;

const ObfuscationInfo = Selector("[data-testid='obfuscation-info']");

test("Obfuscated document shows obfuscated message correctly", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v2/invoice-obfuscated-document.json");
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
  await t.expect(ObfuscationInfo.withText("Note: There are fields/data obfuscated in this document.").exists).ok();
});

test("Fields on a W3C v2 document with attachments can be hidden", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/w3c/v2_tr_er_attachment_ECDSA_Derived.json");
  await validateIssuerTexts(["DISAPPOINTED-BLUSH-MOUSE.PLAYGROUND.FYNTECH.IO"]);
  await t
    .expect(ObfuscationInfo.withText("Note: There are fields/data might be obfuscated in this document.").exists)
    .ok();
});
