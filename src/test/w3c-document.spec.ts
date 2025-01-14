import { uploadDocument, validateIframeTexts, validateIssuerTexts, location, navigateToVerify } from "./helper";

fixture("W3C Document").page`${location}`;

test("should render correctly when w3c vc document contains credentialStatus TransferableRecords with renderMethod EMBEDDED_RENDERER", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/w3c/v1_tr_er.json");

  await validateIssuerTexts(["DID:WEB:TRUSTVC.GITHUB.IO:DID:1"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});
