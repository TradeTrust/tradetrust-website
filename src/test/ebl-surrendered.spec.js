import { Selector } from "testcafe";

fixture("Render red surrender sign if ebl is surrendered").page`http://localhost:3000`;

const Document = "./fixture/ebl-surrendered.json";
const DocumentStatus = Selector("#document-status");

const SurrenderedSign = Selector("#surrender-sign");

test("Displays surrender sign", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);

  await DocumentStatus.with({ visibilityCheck: true })();

  await t.expect(SurrenderedSign.count).eql(0);
});
