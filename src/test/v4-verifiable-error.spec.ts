import { Selector } from "testcafe";
import { location, navigateToVerify, uploadDocument, validateTextContent } from "./helper";

fixture("Unverified V4 Document Rendering").page`${location}`;

const RenderedDocument = Selector("[data-testid='certificate-dropzone']");
const InvalidMessage = Selector(".invalid");

test("should render error texts when document is invalid", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v4/did-idvc-wrapped-signed-missing-idvc.json");

  await InvalidMessage.with({ visibilityCheck: true })();
  await validateTextContent(t, RenderedDocument, ["Document is invalid", "The Identity VC in the document is missing"]);
});

test("should render error texts when document is invalid", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v4/did-idvc-wrapped-signed-tampered-signature.json");

  await InvalidMessage.with({ visibilityCheck: true })();
  await validateTextContent(t, RenderedDocument, ["Document is invalid", "The Identity VC in the document is invalid"]);
});

test("should render error texts when document is invalid", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v4/did-idvc-wrapped-signed-wrong-binding.json");

  await InvalidMessage.with({ visibilityCheck: true })();
  await validateTextContent(t, RenderedDocument, [
    "Document is invalid",
    "The Identity VC issuer in the document is invalid",
  ]);
});
