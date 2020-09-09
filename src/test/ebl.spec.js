import { uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";
import { Selector } from "testcafe";

fixture("Token Document Rendering").page`http://localhost:3000`;

const ButtonViewAnother = Selector("[data-testid='multi-button'] button").withText("View another");

test("Token is verified and rendered correctly", async () => {
  await uploadDocument("./fixture/ebl.json");
  await validateIssuerTexts(["TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});

test("Should be able to render certificate twice consecutively", async (t) => {
  await uploadDocument("./fixture/ebl.json");
  await validateIssuerTexts(["TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
  await t.expect(ButtonViewAnother.count).eql(1);

  await t.click(ButtonViewAnother);
  await uploadDocument("./fixture/ebl.json");
  await validateIssuerTexts(["TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
  await t.expect(ButtonViewAnother.count).eql(1);
});
