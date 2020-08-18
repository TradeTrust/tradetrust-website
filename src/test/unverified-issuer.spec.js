import { Selector } from "testcafe";
import { uploadDocument, validateTextContent } from "./helper";

fixture("Unverified Document Rendering").page`http://localhost:3000`;

const RenderedDocument = Selector("#certificate-dropzone");
const InvalidMessage = Selector(".invalid");

test("Error view rendered when document issuers are unverified", async (t) => {
  await uploadDocument("./fixture/unverified-issuer.json");

  await InvalidMessage.with({ visibilityCheck: true })();
  await validateTextContent(t, RenderedDocument, [
    "Document issuer identity is invalid",
    "This document was issued by an invalid issuer.",
  ]);
});
