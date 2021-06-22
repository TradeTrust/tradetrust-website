import { Selector } from "testcafe";
import { uploadDocument, location } from "./helper";

fixture("Render 'Transferred to wallet' status").page`${location}`;

const ViewEndorsementChainButton = Selector("#endorsement-chain-button");
const TransferredSign = Selector("[data-testid='transferred-to-wallet']");

test("should display 'Transferred to wallet' when document is owned by wallet address", async (t) => {
  await uploadDocument("./fixture/ebl-transfer-to-wallet.json");
  await t.click(ViewEndorsementChainButton);

  // add wait 3000 due to endorsement chain component having a little latency because getting endorsement data
  await t.wait(3000);
  await t.expect(TransferredSign.count).eql(1);
});
