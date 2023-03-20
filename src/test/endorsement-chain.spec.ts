import { Selector } from "testcafe";
import { location, navigateToVerify, uploadDocument, validateIssuerTexts } from "./helper";

fixture("Endorsement Chain Rendering").page`${location}`;

const ViewEndorsementChainButton = Selector("#endorsement-chain-button").withText("View Endorsement Chain");
const EndorsementChainTitle = Selector("[data-testid='endorsement-chain-title']").withText("Endorsement Chain");
const EndorsementChainAddressMinter = Selector("[data-testid='address-entity']").withText(
  "0x1245e5B64D785b25057f7438F715f4aA5D965733"
);
const EndorsementChainAddress1 = Selector("[data-testid='address-entity']").withText(
  "0x8d366250A96deBE81C8619459a503a0eEBE33ca6"
);
const EndorsementChainAddress2 = Selector("[data-testid='address-entity']").withText(
  "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7"
);
const DocumentIssuedAction = Selector("[data-testid='action-title']").withText("Document has been issued");

const EndorseNomineeAction = Selector("[data-testid='action-title']").withText("Endorse change of ownership");

const TransferHoldershipAction = Selector("[data-testid='action-title']").withText("Transfer holdership");
const ChangeOwnershipAction = Selector("[data-testid='action-title']").withText("Change Owners");

const SurrenderToIssuerAction = Selector("[data-testid='action-title']").withText("Document surrendered to issuer");
const SurrenderAcceptedAction = Selector("[data-testid='action-title']").withText("Surrender of document accepted");

// history chain of events for ebl-endorsement-chain.json are:
// 1. issued
// 2. nominate beneficiary + change owners
// 3. nominate beneficiary + change beneficiary
// 4. transfer holder
// 5. nominate beneficiary + change owners
// 6. surrender
// 7. accept surrender

test("Endorsement chain title and actions are rendered correctly", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/goerli/v4/ebl-endorsement-chain.json");

  await validateIssuerTexts(["DEMO-TRADETRUST.OPENATTESTATION.COM"]);
  await t.wait(3000);
  await t.expect(ViewEndorsementChainButton.count).eql(1);
  await t.click(ViewEndorsementChainButton);

  // add wait 3000 due to endorsement chain component having a little latency because getting endorsement data
  await t.wait(5000);

  await t.expect(EndorsementChainTitle.count).eql(1);

  await t.expect(EndorsementChainAddressMinter.count).eql(4);
  await t.expect(EndorsementChainAddress1.count).eql(2);
  await t.expect(EndorsementChainAddress2.count).eql(2);

  await t.expect(DocumentIssuedAction.count).eql(1);

  await t.expect(EndorseNomineeAction.count).eql(1);
  await t.expect(ChangeOwnershipAction.count).eql(2);
  await t.expect(TransferHoldershipAction.count).eql(1);

  await t.expect(SurrenderToIssuerAction.count).eql(1);
  await t.expect(SurrenderAcceptedAction.count).eql(1);
});
