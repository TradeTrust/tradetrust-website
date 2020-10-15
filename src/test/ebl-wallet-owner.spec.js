import { Selector } from "testcafe";

fixture("Render document for direct ownership").page`http://localhost:3000`;

const Document = "./fixture/ebl-wallet-owner.json";
const DocumentStatus = Selector("#document-status");

const InteractionAvaliable = Selector("[data-testid='connectToWallet']");

test("Displays action button for wallet owners", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);

  await DocumentStatus.with({ visibilityCheck: true })();
  await t.expect(InteractionAvaliable.count).eql(1);
});
