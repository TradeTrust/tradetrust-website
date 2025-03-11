import { Selector } from "testcafe";
import { location, navigateToVerify, uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";

fixture("Token Document Rendering").page`${location}`;
const HandleProceedAnywayBtn = Selector("[data-testid='overlayHandleDispatchBtn']");
test("Token is verified and rendered correctly", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v3/ebl.json");
  await t.click(HandleProceedAnywayBtn);
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});

test("Should be able to render certificate twice consecutively", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v3/ebl.json");
  await t.click(HandleProceedAnywayBtn);
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);

  await navigateToVerify();
  await uploadDocument("./fixture/local/v3/ebl.json");
  await t.click(HandleProceedAnywayBtn);
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});
