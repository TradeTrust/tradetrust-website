import { ClientFunction, Selector } from "testcafe";
import { location, navigateToCreator } from "../helper";

fixture("Custom Array Field Ordering").page`${location}`;

const nonTransferableView = Selector('[data-testid="forms-view-Non-Transferable"]');
const invoiceTile = nonTransferableView.find('[data-testid="form-select-1"]');
const previewOverlay = Selector('[data-testid="expand-preview"]');
const createDocumentButton = Selector('[data-testid="expandPreviewCreateDocument"]');
const setupModal = Selector('[data-testid="documentSetup"]');
const setupSuccessMessage = Selector("#setup-item-description");
const continueButton = Selector('[data-testid="documentSetupContinue"]');
const getLocation = ClientFunction(() => document.location.href);

const addItemButton = Selector("button").withText("Add Item");
const getDescriptionInputByIndex = (index: number) =>
  Selector(`[data-testid="custom-array-field-${index}"] input[label="Description"]`);
const getMoveDownButtonByIndex = (index: number) =>
  Selector(`[data-testid="custom-array-field-${index}"] [data-testid="move-down"]`);
const getMoveUpButtonByIndex = (index: number) =>
  Selector(`[data-testid="custom-array-field-${index}"] [data-testid="move-up"]`);
const getRemoveButtonByIndex = (index: number) =>
  Selector(`[data-testid="custom-array-field-${index}"] [data-testid="remove"]`);

test("should correctly add, reorder, and remove items in a custom array field", async (t) => {
  // Step 1: Navigate to creator page
  await navigateToCreator();

  // Step 2: Open the "Invoice" form preview
  await t.click(invoiceTile);

  // Step 3: Ensure preview overlay is visible
  await t.expect(previewOverlay.exists).ok("Preview overlay should be visible");

  // Step 4: Trigger prerequisite setup modal
  await t.click(createDocumentButton);

  // Step 5: Verify prerequisite setup modal appears
  await t.expect(setupModal.exists).ok("Prerequisite setup modal should be visible");

  // Step 6: Verify setup success message is shown
  await t
    .expect(setupSuccessMessage.innerText)
    .contains("Record Generated:", "Setup modal should display success message");

  // Step 7: Click "Continue" to proceed to form editor
  await t.click(continueButton);

  // Step 8: Confirm navigation to form editor
  await t.expect(getLocation()).contains("/creator/form", "Should navigate to creator form editor");

  // Step 9: Add first item and enter description
  await t.click(addItemButton);
  await t.typeText(getDescriptionInputByIndex(0), "foobar");
  await t.expect(getDescriptionInputByIndex(0).value).eql("foobar", "First input should have 'foobar'");

  // Step 10: Add second item and move first item down
  await t.click(addItemButton);
  await t.click(getMoveDownButtonByIndex(0));
  await t.expect(getDescriptionInputByIndex(0).value).eql("", "First input should be empty");
  await t.expect(getDescriptionInputByIndex(1).value).eql("foobar", "Second input should have 'foobar'");

  // Step 11: Add third item and move 'foobar' back up
  await t.click(addItemButton);
  await t.click(getMoveUpButtonByIndex(2));
  await t.expect(getDescriptionInputByIndex(1).value).eql("", "Second input should now be empty");
  await t.expect(getDescriptionInputByIndex(2).value).eql("foobar", "Third input should have 'foobar'");

  // Step 12: Remove first item and verify state
  await t.click(getRemoveButtonByIndex(0));
  await t.expect(getDescriptionInputByIndex(1).value).eql("foobar", "Remaining input should have 'foobar'");
});
