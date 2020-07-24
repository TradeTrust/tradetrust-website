import { Selector } from "testcafe";

fixture("Endorsement Chain Rendering").page`http://localhost:3000`;

const Document = "./fixture/ebl-endorsement-chain.json";
const DocumentStatus = Selector("#document-status");
const ViewEndorsementChainButton = Selector("#endorsement-chain-button");
const EndorsementChainTitle = Selector(".endorsement-chain-title");
const EndorsementChainAddress = Selector("div.address").withText("0x8e87c7cEc2D4464119C937bfef3398ebb1d9452e");

test("Endorsement chain can be viewed correctly", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);

  await DocumentStatus.with({ visibilityCheck: true })();

  await t.expect(ViewEndorsementChainButton.count).eql(1);
  await t.click(ViewEndorsementChainButton);

  await t.expect(EndorsementChainTitle.count).eql(1);
  await t.expect(EndorsementChainAddress.count).eql(2);
});
