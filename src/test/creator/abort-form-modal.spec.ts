import { ClientFunction, Selector } from "testcafe";
import { location, navigateToCreator } from "../helper";

fixture("Abort Form Modal").page`${location}`;

const nonTransferableView = Selector("#forms-view-Non-Transferable");
const certificateOfOriginTile = nonTransferableView.find('[data-testid="form-select-0"]');
const previewOverlay = Selector('[data-testid="expand-preview"]');
const createDocumentButton = Selector('[data-testid="expandPreviewCreateDocument"]');
const setupModal = Selector('[data-testid="documentSetup"]');
const setupSuccessMessage = Selector("#setup-item-description");
const continueButton = Selector('[data-testid="documentSetupContinue"]');
const formCancelButton = Selector('[data-testid="form-previous-button"]');
const abortFormModal = Selector('[data-testid="abort-form"]');
const abortModalCancelButton = Selector('[data-testid="confirm-modal-cancel-button"]');
const abortModalConfirmButton = Selector('[data-testid="confirm-modal-confirm-button"]');
const getLocation = ClientFunction(() => document.location.href);

test("should navigate correctly when cancelling form editing", async (t) => {
  // Step 1: Navigate to creator page
  await navigateToCreator();

  // Step 2: Open the "Certificate of Origin" form preview
  await t.click(certificateOfOriginTile);

  // Step 3: Ensure preview overlay is visible
  await t.expect(previewOverlay.exists).ok("Preview overlay should be visible");

  // Step 4: Click "Create Document" button
  await t.click(createDocumentButton);

  // Step 5: Verify setup modal appears
  await t.expect(setupModal.exists).ok("Document setup modal should be visible");

  // Step 6: Confirm success message is shown
  await t.expect(setupSuccessMessage.innerText).contains("Record Generated:", "Should display success message");

  // Step 7: Click "Continue" to proceed to form editor
  await t.click(continueButton);

  // Step 8: Confirm navigation to form editor page
  await t.expect(getLocation()).contains("/creator/form", "Should navigate to creator form");

  // Step 9: Click cancel button to trigger abort modal
  await t.click(formCancelButton);

  // Step 10: Abort form modal should appear
  await t.expect(abortFormModal.exists).ok("Abort form modal should be visible");

  // Step 11: Click cancel in modal to stay on form
  await t.click(abortModalCancelButton);

  // Step 12: Click cancel again to re-open abort modal
  await t.click(formCancelButton);
  await t.expect(abortFormModal.exists).ok("Abort form modal should be visible");

  // Step 13: Confirm abort to navigate away from form
  await t.click(abortModalConfirmButton);

  // Step 14: Confirm navigation back to creator form selection page
  await t.expect(getLocation()).match(/\/creator$/, "Should navigate back to creator form selection page");
});
