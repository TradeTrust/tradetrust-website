import { Selector } from "testcafe";

fixture("Document Status").page`http://localhost:3000`;

const Document = "./fixture/maersk-bill-of-lading.json";
const DocumentStatus = Selector("#document-status");
const DocumentHash = Selector("[data-testid='hash']");
const DocumentIssued = Selector("[data-testid='issued']");
// const DocumentRevoked = Selector("[data-testid='revoked']"); // to re-enable this once document file is updated later on
const DocumentIdentity = Selector("[data-testid='identity']");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Document Status to be resolved correctly, showing 4 valid statuses", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);
  await DocumentStatus.with({ visibilityCheck: true })();

  await validateTextContent(t, DocumentHash.find(".message"), ["Document has not been tampered with"]);
  await validateTextContent(t, DocumentIssued.find(".message"), ["Document has been issued"]);
  // await validateTextContent(t, DocumentRevoked.find(".message"), ["Document has not been revoked"]); // to re-enable this once document file is updated later on
  await validateTextContent(t, DocumentIdentity.find(".message"), ["Document issuer has been identified"]);
});
