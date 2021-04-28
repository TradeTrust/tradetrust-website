import { uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";
import { Selector } from "testcafe";

fixture("Token Document Rendering").page`http://localhost:3000`;

const VerifyDocuments = Selector("button").withText("Verify Doc");

test("Token is verified and rendered correctly", async () => {
  await uploadDocument("./fixture/ebl.json");
  await validateIssuerTexts(["TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});

test("Should be able to render certificate twice consecutively", async (t) => {
  await uploadDocument("./fixture/ebl.json");
  await validateIssuerTexts(["TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);

  await t.click(VerifyDocuments);
  await uploadDocument("./fixture/ebl.json");
  await validateIssuerTexts(["TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});
