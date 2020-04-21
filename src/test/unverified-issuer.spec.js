import { Selector } from "testcafe";

fixture("Unverified Document Rendering").page`http://localhost:3000`;

const Document = "./fixture/unverified-issuer.json";

const RenderedDocument = Selector("#certificate-dropzone");
const InvalidMessage = Selector(".invalid");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Error view rendered when document issuers are unverified", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);

  await InvalidMessage.with({ visibilityCheck: true })();

  await validateTextContent(t, RenderedDocument, [
    "Document issuer identity is invalid",
    "This document was issued by an invalid issuer.",
  ]);
});
