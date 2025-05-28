import { Selector } from "testcafe";
import { location, navigateToCreator } from "../helper";

fixture("Form Selection").page`${location}`;

const title = Selector('[data-testid="form-selection-title"]');
const toggleButton = Selector("#forms-header")
  .find("div")
  .withAttribute("class", /cursor-pointer/);
const transferableView = Selector('[data-testid="forms-view-Transferable"]');
const nonTransferableView = Selector('[data-testid="forms-view-Non-Transferable"]');
const transferableFormCount = transferableView.find('[data-testid^="form-select-"]').count;
const nonTransferableFormCount = nonTransferableView.find('[data-testid^="form-select-"]').count;

test("should display and toggle form list correctly, and all expected forms should be visible", async (t) => {
  // Step 1: Navigate to Creator
  await navigateToCreator();

  // Step 2: Check that the main title is displayed correctly
  await t.expect(title.innerText).eql("Select documents to preview or create.", "Title text matches expected");

  // Step 3: Validate that both sections are present
  await t.expect(transferableView.exists).ok("Transferable forms view should exist");
  await t.expect(nonTransferableView.exists).ok("Non-Transferable forms view should exist");
  await t.expect(transferableFormCount).eql(3, "Transferable forms view should have exactly 3 form-select elements");
  await t
    .expect(nonTransferableFormCount)
    .eql(2, "Non-Transferable forms view should have exactly 2 form-select elements");

  // Step 4: Toggle collapse and verify
  await t.click(toggleButton);
  await t.expect(transferableView.visible).notOk("Form list should be hidden after collapse");
  await t.expect(nonTransferableView.visible).notOk("Form list should be hidden after collapse");

  // Step 5: Toggle expand and verify again
  await t.click(toggleButton);
  await t.expect(transferableView.visible).ok("Form list should be visible after re-expanding");
  await t.expect(nonTransferableView.visible).ok("Form list should be visible after re-expanding");
});
