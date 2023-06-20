import { Selector } from "testcafe";
import { location, navigateToVerify, uploadDocument, validateTextContent } from "./helper";

fixture("Unverified Document Rendering").page`${location}`;

const RenderedDocument = Selector("[data-testid='certificate-dropzone']");
const InvalidMessage = Selector(".invalid");

test("should render error texts when document issuers are unverified", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v2/invoice-unverified-issuer.json");

  await InvalidMessage.with({ visibilityCheck: true })();
  await validateTextContent(t, RenderedDocument, [
    "Document issuer identity is invalid",
    "This document was issued by an invalid issuer.",
  ]);
});
