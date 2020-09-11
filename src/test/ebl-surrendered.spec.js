import { Selector } from "testcafe";

fixture("Render red surrender sign if ebl is surrendered").page`http://localhost:3000`;

const SurrenderedDocument = "./fixture/ebl-surrendered.json";
const NonSurrenderedDocument = "./fixture/ebl-wallet-owner.json";
const DocumentStatus = Selector("#document-status");

const SurrenderedSign = Selector("#surrender-sign");
const InteractionUnavailableText = Selector("#interaction-unavailable-text");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("should displays surrender sign when document is owned by token registry", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [SurrenderedDocument]);

  await DocumentStatus.with({ visibilityCheck: true })();

  await t.expect(SurrenderedSign.count).eql(1);
});

test("should not displays surrender sign when document is not owned by token registry", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [NonSurrenderedDocument]);

  await DocumentStatus.with({ visibilityCheck: true })();

  await t.expect(SurrenderedSign.count).eql(0);
  await validateTextContent(t, InteractionUnavailableText, [
    "At this point in time, direct interaction with Erc721 is not supported on tradetrust.io",
  ]);
});
