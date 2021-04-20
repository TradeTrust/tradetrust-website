import { uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";
import { Selector } from "testcafe";

fixture("Token Document Rendering").page`http://localhost:3000`;

const VerifyDocuments = Selector("[data-testid='navbar-verify-documents']");

// Verification ebl code will change due to the verification link and dropbox will be in a new page

// test("Token is verified and rendered correctly", async () => {
//   await uploadDocument("./fixture/ebl.json");
//   await validateIssuerTexts(["TRADETRUST.IO"]);
//   await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
// });

// test("Should be able to render certificate twice consecutively", async (t) => {
//   await uploadDocument("./fixture/ebl.json");
//   await validateIssuerTexts(["TRADETRUST.IO"]);
//   await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);

//   await t.click(VerifyDocuments);
//   await uploadDocument("./fixture/ebl.json");
//   await validateIssuerTexts(["TRADETRUST.IO"]);
//   await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
// });
