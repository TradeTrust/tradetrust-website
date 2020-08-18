import { Selector } from "testcafe";
import { uploadDocument, validateIssuerTexts } from "./helper";

fixture("Endorsement Chain Rendering").page`http://localhost:3000`;

const ViewEndorsementChainButton = Selector("#endorsement-chain-button");
const EndorsementChainTitle = Selector(".endorsement-chain-title");
const EndorsementChainAddress = Selector("div.address").withText("0x8e87c7cEc2D4464119C937bfef3398ebb1d9452e");

test("Endorsement chain can be viewed correctly", async (t) => {
  uploadDocument("./fixture/ebl-endorsement-chain.json");
  await validateIssuerTexts(["DEMO-TRADETRUST.OPENATTESTATION.COM"]);

  await t.expect(ViewEndorsementChainButton.count).eql(1);
  await t.click(ViewEndorsementChainButton);

  await t.expect(EndorsementChainTitle.count).eql(1);
  await t.expect(EndorsementChainAddress.count).eql(2);
});
