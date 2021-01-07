import { Selector } from "testcafe";
import { uploadDocument, validateIssuerTexts } from "./helper";

fixture("Endorsement Chain Rendering").page`http://localhost:3000`;

const ViewEndorsementChainButton = Selector("#endorsement-chain-button");
const EndorsementChainTitle = Selector(".endorsement-chain-title");
const EndorsementChainAddress1 = Selector("div.address").withText("0xFC6e365B926166d0D69bF336d03164FB301D6C41");
const EndorsementChainAddress2 = Selector("div.address").withText("0x1Dc271EaE22a83c9670571d1a206043E8a420fdE");
const DocumentIssuedAction = Selector("div.name").withText("Document has been issued");
const ChangeOwnershipAction = Selector("div.name").withText("Endorse change of ownership");
const TransferHoldershipAction = Selector("div.name").withText("Transfer holdership");
const surrenderAction = Selector("div.name").withText("Document surrendered to issuer");

test("Endorsement chain can be viewed correctly", async (t) => {
  await uploadDocument("./fixture/ebl-endorsement-chain.json");
  await validateIssuerTexts(["DEMO-TRADETRUST.OPENATTESTATION.COM"]);

  await t.expect(ViewEndorsementChainButton.count).eql(1);
  await t.click(ViewEndorsementChainButton);

  await t.expect(EndorsementChainTitle.count).eql(1);
  await t.expect(EndorsementChainAddress1.count).eql(5);
  await t.expect(EndorsementChainAddress2.count).eql(5);
  await t.expect(DocumentIssuedAction.count).eql(1);
  await t.expect(ChangeOwnershipAction.count).eql(4);
  await t.expect(TransferHoldershipAction.count).eql(1);
  await t.expect(surrenderAction.count).eql(1);
});
