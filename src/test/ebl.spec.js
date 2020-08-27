import { uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";

fixture("Token Document Rendering").page`http://localhost:3000`;

test("Token is verified and rendered correctly", async () => {
  await uploadDocument("./fixture/ebl.json");
  await validateIssuerTexts(["TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});
