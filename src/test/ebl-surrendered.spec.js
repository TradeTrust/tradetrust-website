import { Selector } from "testcafe";
import { navigateToVerify, location } from "./helper";

fixture("Render red surrender sign if ebl is surrendered").page`${location}`;

const SurrenderedDocument = "./fixture/ebl-surrendered.json";
const NonSurrenderedDocument = "./fixture/ebl-wallet-owner.json";
const DocumentStatus = Selector("#document-status");

const SurrenderedSign = Selector("#surrender-sign");
const InteractionAvaliable = Selector("[data-testid='connectToWallet']");

test("should displays surrender sign when document is owned by token registry", async (t) => {
  await navigateToVerify();
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [SurrenderedDocument]);

  await DocumentStatus.with({ visibilityCheck: true })();

  await SurrenderedSign.with({ visibilityCheck: true })();
  await t.expect(SurrenderedSign.count).eql(1);
  await t.expect(InteractionAvaliable.count).eql(1);
});

test("should not displays surrender sign when document is not owned by token registry", async (t) => {
  await navigateToVerify();
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [NonSurrenderedDocument]);

  await DocumentStatus.with({ visibilityCheck: true })();

  await SurrenderedSign.with({ visibilityCheck: true })();
  await t.expect(SurrenderedSign.count).eql(0);
  await t.expect(InteractionAvaliable.count).eql(1);
});
