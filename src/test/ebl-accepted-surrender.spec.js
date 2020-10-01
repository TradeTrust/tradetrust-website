import { Selector } from "testcafe";

fixture("Render red surrender sign if ebl is surrendered").page`http://localhost:3000`;

const Document = "./fixture/ebl-accepted surrender.json";
const DocumentStatus = Selector("#document-status");

const SurrenderedSign = Selector("#surrendered-sign");
const InteractionAvaliable = Selector("[data-testid='connectToWallet']");

test("should displays surrendered sign when document is owned by 0xdead address", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);

  await DocumentStatus.with({ visibilityCheck: true })();

  await t.expect(SurrenderedSign.count).eql(1);
  await t.expect(InteractionAvaliable.count).eql(0);
});
