import { Selector } from "testcafe";
import { location, navigateToVerify, uploadDocument, validateIssuerTexts } from "./helper";
import { ACCOUNT_1, ACCOUNT_2 } from "../../tests/e2e/utils";

fixture("Endorsement Chain Rendering").page`${location}`;

const ViewEndorsementChainButton = Selector("#endorsement-chain-button").withText("View Endorsement Chain");
const EndorsementChainTitle = Selector("[data-testid='endorsement-chain-title']").withText("Endorsement Chain");
const EndorsementChainAddressMinter = Selector("[data-testid='address-entity']").withText(ACCOUNT_1);
const EndorsementChainAddress1 = Selector("[data-testid='address-entity']").withText(ACCOUNT_1);
const EndorsementChainAddress2 = Selector("[data-testid='address-entity']").withText(ACCOUNT_2);
const DocumentIssuedAction = Selector("[data-testid='action-title']").withText("Document has been issued");

const EndorseNomineeAction = Selector("[data-testid='action-title']").withText("Endorse change of ownership");

const TransferHoldershipAction = Selector("[data-testid='action-title']").withText("Transfer holdership");
const ChangeOwnershipAction = Selector("[data-testid='action-title']").withText("Change Owners");

const SurrenderToIssuerAction = Selector("[data-testid='action-title']").withText("Document surrendered to issuer");
const SurrenderAcceptedAction = Selector("[data-testid='action-title']").withText("Surrender of document accepted");

// history chain of events for ebl-endorsement-chain.json are:
// 1. issued on account 1
// 2. nominate beneficiary + change owners to account 2
// 3. transfer holder to account 2
// 5. change owners + transfer holder to account 1
// 6. surrender with account 1
// 7. accept surrender with account 1

test("Endorsement chain title and actions are rendered correctly", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v3/ebl-endorsement-chain.json");

  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
  await t.wait(3000);
  await t.expect(ViewEndorsementChainButton.count).eql(1);
  await t.click(ViewEndorsementChainButton);

  // add wait 3000 due to endorsement chain component having a little latency because getting endorsement data
  await t.wait(5000);

  await t.expect(EndorsementChainTitle.count).eql(1);

  await t.expect(EndorsementChainAddressMinter.count).eql(4);
  await t.expect(EndorsementChainAddress1.count).eql(4);
  await t.expect(EndorsementChainAddress2.count).eql(2);

  await t.expect(DocumentIssuedAction.count).eql(1);

  await t.expect(EndorseNomineeAction.count).eql(1);
  await t.expect(ChangeOwnershipAction.count).eql(1);
  await t.expect(TransferHoldershipAction.count).eql(1);

  await t.expect(SurrenderToIssuerAction.count).eql(1);
  await t.expect(SurrenderAcceptedAction.count).eql(1);
});
