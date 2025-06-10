import { ClientFunction, Selector } from "testcafe";
import {
  getFileDownloadPath,
  location,
  navigateToCreator,
  navigateToVerify,
  uploadDocument,
  validateIframeTexts,
  waitForFileDownload,
} from "../helper";

fixture("End-to-End Happy Flow").page`${location}`;

const nonTransferableView = Selector('[data-testid="forms-view-Non-Transferable"]');
const invoiceTile = nonTransferableView.find('[data-testid="form-select-1"]');
const previewOverlay = Selector('[data-testid="expand-preview"]');
const createDocumentButton = Selector('[data-testid="expandPreviewCreateDocument"]');
const setupModal = Selector('[data-testid="documentSetup"]');
const setupSuccessMessage = Selector("#setup-item-description");
const continueButton = Selector('[data-testid="documentSetupContinue"]');
const formNextButton = Selector('[data-testid="form-next-button"]');
const processTitle = Selector('[data-testid="process-title"]');
const downloadButton = Selector('[data-testid="process-another-document-button"]');
const downloadFormModal = Selector('[data-testid="download-form"]');
const downloadAllButton = Selector('[data-testid="confirm-modal-download-button"]');
const getLocation = ClientFunction(() => document.location.href);

test("should complete full create > issue > verify flow", async (t) => {
  // Step 1: Navigate to creator page
  await navigateToCreator();

  // Step 2: Preview "Invoice" form
  await t.click(invoiceTile);
  await t.expect(previewOverlay.exists).ok("Preview overlay should be visible");

  // Step 3: Create document
  await t.click(createDocumentButton);
  await t.expect(setupModal.exists).ok("Document setup modal should appear");
  await t.expect(setupSuccessMessage.innerText).contains("Record Generated:", "Should show success message");

  // Step 4: Continue to form editor
  await t.click(continueButton);
  await t.expect(getLocation()).contains("/creator/form", "Should navigate to form editor");

  // Step 5: Submit the form
  await t.click(formNextButton);
  await t.expect(getLocation()).contains("/creator/form-preview", "Should navigate to form preview");

  // Step 6: Validate preview
  await validateIframeTexts(["INVOICE"]);

  // Step 7: Issue the document
  await t.click(formNextButton);
  await t.expect(getLocation()).contains("/creator/publish", "Should navigate to publish page");
  await t.expect(processTitle.exists).ok("Issuance success title should be visible");
  await t.expect(processTitle.innerText).eql("Document issued successfully");

  // Step 8: Download issued document
  await t.click(downloadButton);
  await t.expect(downloadFormModal.exists).ok("Download modal should appear");
  await t.click(downloadAllButton);
  const filePath = getFileDownloadPath("Invoice-1.tt");
  await t.expect(await waitForFileDownload(t, filePath)).eql(true, "Invoice file should be downloaded");

  // Step 9: Return to form selection
  await t.click(downloadButton);
  await t.expect(getLocation()).match(/\/creator$/, "Should return to form selection page");

  // Step 10: Navigate to verify page
  await navigateToVerify();

  // Step 11: Upload issued document
  await uploadDocument(filePath);

  // Step 12: Validate content in viewer
  await validateIframeTexts(["INVOICE"]);
});
