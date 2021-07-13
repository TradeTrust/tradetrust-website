import { Selector } from "testcafe";
import { uploadDocument, validateTextContent, location } from "./helper";

fixture("Unverified Document Rendering").page`${location}`;

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
