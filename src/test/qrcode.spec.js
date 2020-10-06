import { Selector } from "testcafe";
import { uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";

fixture("QRcode Rendering").page`http://localhost:3000`;
const qrcode = Selector("[data-testid='qr-code-svg']");
const logo = qrcode.find("img");

test("UI renders QR code correctly when present in the document", async (t) => {
  await uploadDocument("./fixture/ebl-with-qrcode.json");
  await validateIssuerTexts(["DEMO-TRADETRUST.OPENATTESTATION.COM"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);

  const qrcodeButtonElement = await Selector("button").withAttribute("aria-label", "document-utility-qr-button");
  await t.click(qrcodeButtonElement); // asserts that button exists and can be clicked
});
test.only("UI renders QR code with logo correctly when present in the document", async (t) => {
  await uploadDocument("./fixture/qr-with-logo.json");
  await validateIssuerTexts(["DEMO-TRADETRUST.OPENATTESTATION.COM"]);

  const qrcodeButtonElement = Selector("button").withAttribute("aria-label", "document-utility-qr-button");
  await t.click(qrcodeButtonElement); // asserts that button exists and can be clicked
  await t.expect(qrcode.count).eql(1); // asserts that qr displays
  await t.expect(logo.count).eql(1); // asserts that qr contains logo
  await t.expect(logo.withAttribute("src", "https://www.aretese.com/images/govtech-animated-logo.gif").exists).ok();
});
