import { Selector } from "testcafe";
import { uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";

fixture("QRcode Rendering").page`http://localhost:3000`;

test("UI renders QR code correctly when present in the document", async (t) => {
  await uploadDocument("./fixture/ebl-with-qrcode.json");
  await validateIssuerTexts(["TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);

  const qrcodeButtonElement = await Selector("button").withAttribute("aria-label", "document-utility-qr-button");
  await t.click(qrcodeButtonElement); // asserts that button exists and can be clicked
});
