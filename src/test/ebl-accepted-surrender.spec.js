import { Selector } from "testcafe";
import { navigateToVerify, location } from "./helper";

fixture("Render red surrender sign if ebl is accepted surrendered").page`${location}`;

const Document = "./fixture/ebl-accepted-surrender.json";
const DocumentStatus = Selector("#document-status");

const SurrenderedSign = Selector("#surrendered-sign");
const InteractionAvaliable = Selector("[data-testid='connectToWallet']");

test("should displays surrendered sign when document is owned by 0xdead address", async (t) => {
  await navigateToVerify();
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);

  await DocumentStatus.with({ visibilityCheck: true })();

  await SurrenderedSign.with({ visibilityCheck: true })();
  await t.expect(SurrenderedSign.count).eql(1);
  await t.expect(InteractionAvaliable.count).eql(0);
});
