import { Selector } from "testcafe";

fixture("Unverified Document Rendering").page`http://localhost:3000`;

const Document = "./fixture/revoked.json";

const RenderedDocument = Selector("#certificate-dropzone");
const InvalidMessage = Selector(".invalid");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Error view rendered when document is revoked", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);

  await InvalidMessage.with({ visibilityCheck: true })();

  await validateTextContent(t, RenderedDocument, [
    "Document issuance status is invalid",
    "This document's issuance status is invalid",
  ]);
});
