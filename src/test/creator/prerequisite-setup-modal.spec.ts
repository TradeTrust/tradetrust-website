import { Selector, ClientFunction } from "testcafe";
import { location, navigateToCreator } from "../helper";

fixture("Prerequisite Setup Modal").page`${location}`;

const nonTransferableView = Selector("#forms-view-Non-Transferable");
const certificateOfOriginTile = nonTransferableView.find('[data-testid="form-select-0"]');
const previewOverlay = Selector('[data-testid="expand-preview"]');
const createDocumentButton = Selector('[data-testid="expandPreviewCreateDocument"]');
const setupModal = Selector('[data-testid="documentSetup"]');
const setupSuccessMessage = Selector("#setup-item-description");
const continueButton = Selector('[data-testid="documentSetupContinue"]');
const cancelButton = Selector('[data-testid="documentSetupCancel"]');
const getLocation = ClientFunction(() => document.location.href);

test("should display and cancel setup modal, then reopen and continue", async (t) => {
  // Step 1: Navigate to creator page
  await navigateToCreator();

  // Step 2: Open the "Certificate of Origin" form preview
  await t.click(certificateOfOriginTile);

  // Step 3: Ensure preview overlay is visible
  await t.expect(previewOverlay.exists).ok("Preview overlay should be visible");

  // Step 4: Click "Create Document" (opens setup modal)
  await t.click(createDocumentButton);

  // Step 5: Verify setup modal appears
  await t.expect(setupModal.exists).ok("Setup modal should be visible");

  // Step 6: Cancel the setup modal
  await t.click(cancelButton);
  await t.expect(setupModal.exists).notOk("Setup modal should close on cancel");

  // Step 7: Reopen setup modal
  await t.click(certificateOfOriginTile);
  await t.click(createDocumentButton);
  await t.expect(setupModal.exists).ok("Setup modal should reappear");

  // Step 8: Verify setup message
  await t
    .expect(setupSuccessMessage.innerText)
    .contains("Record Generated:", "Setup modal should show success message");

  // Step 9: Click "Continue" to proceed to form editor
  await t.click(continueButton);

  // Step 10: Confirm navigation to form editor
  await t.expect(getLocation()).contains("/creator/form", "Should navigate to form editor after setup");
});
