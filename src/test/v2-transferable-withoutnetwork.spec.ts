import { Selector } from "testcafe";
import { location, navigateToVerify, uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";

fixture("v2 Transferable Document").page`${location}`;

const HandleSelectNetworkContinueBtn = Selector("[data-testid='overlayContinueBtn']");

test("should render network selection", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v2/ebl-withoutnetwork.json");

  await t.click(HandleSelectNetworkContinueBtn);

  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});
