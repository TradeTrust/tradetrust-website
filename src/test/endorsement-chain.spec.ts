import { Selector } from "testcafe";
import { ACCOUNT_1, ACCOUNT_2 } from "../../tests/e2e/utils";
import { location, navigateToVerify, uploadDocument, validateIssuerTexts } from "./helper";

fixture("Endorsement Chain Rendering").page`${location}`;

const ViewEndorsementChainButton = Selector("#endorsement-chain-button").withText("View Endorsement Chain");
const EndorsementChainTitle = Selector("[data-testid='endorsement-chain-title']").withText("Endorsement Chain");
const EndorsementChainAddressMinter = Selector("[data-testid='address-entity']").withText(ACCOUNT_1);
const EndorsementChainAddress1 = Selector("[data-testid='address-entity']").withText(ACCOUNT_1);
const EndorsementChainAddress2 = Selector("[data-testid='address-entity']").withText(ACCOUNT_2);
const DocumentIssuedAction = Selector("[data-testid='action-title']").withText("Document has been issued");

const TransferOwnershipAction = Selector("[data-testid='action-title']").withExactText("Transfer ownership");
const TransferHoldershipAction = Selector("[data-testid='action-title']").withExactText("Transfer holdership");
const TransferOwnershipHoldershipAction = Selector("[data-testid='action-title']").withExactText(
  "Transfer ownership and holdership"
);

const SurrenderToIssuerAction = Selector("[data-testid='action-title']").withText("ETR returned to issuer");
const SurrenderAcceptedAction = Selector("[data-testid='action-title']").withText("ETR taken out of circulation");

// history chain of events for ebl-endorsement-chain.json are:
// 1. issued on account 1                         → owner A1, holder A1
// 2. nominate beneficiary + endorse to account 2 → owner A2, holder A1 (carried)
// 3. transfer holder to account 2                → owner A2 (carried), holder A2
// 4. transfer ownership and holdership to A1     → owner A1, holder A1
// 5. surrender with account 1                    → owner A1, holder A1
// 6. accept surrender with account 1             → no addresses (classic ETR shred)
// ACCOUNT_1 × 7, ACCOUNT_2 × 3

// TODO: Add in test for reject transfers, after updating CLI
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

  await t.expect(EndorsementChainAddressMinter.count).eql(7);
  await t.expect(EndorsementChainAddress1.count).eql(7);
  await t.expect(EndorsementChainAddress2.count).eql(3);

  await t.expect(DocumentIssuedAction.count).eql(1);

  await t.expect(TransferOwnershipAction.count).eql(1);
  await t.expect(TransferOwnershipHoldershipAction.count).eql(1);
  await t.expect(TransferHoldershipAction.count).eql(1);

  await t.expect(SurrenderToIssuerAction.count).eql(1);
  await t.expect(SurrenderAcceptedAction.count).eql(1);
});
