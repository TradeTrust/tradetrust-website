import { Selector } from "testcafe";

fixture("Render document for direct ownership").page`http://localhost:3000`;

const Document = "./fixture/ebl-wallet-owner.json";
const DocumentStatus = Selector("#document-status");

const InteractionUnavailableText = Selector("#interaction-unavailable-text");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());
test("Displays ", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);

  await DocumentStatus.with({ visibilityCheck: true })();

  await validateTextContent(t, InteractionUnavailableText, [
    "At this point in time, direct interaction with Erc721 is not supported on tradetrust.io",
  ]);
});
