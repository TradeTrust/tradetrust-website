import { ClientFunction, Selector } from "testcafe";
import { location, navigateToCreator } from "../helper";

fixture("Error Attachment Limit").page`${location}`;

const nonTransferableView = Selector("#forms-view-Non-Transferable");
const certificateOfOriginTile = nonTransferableView.find('[data-testid="form-select-0"]');
const previewOverlay = Selector('[data-testid="expand-preview"]');
const createDocumentButton = Selector('[data-testid="expandPreviewCreateDocument"]');
const setupModal = Selector('[data-testid="documentSetup"]');
const setupSuccessMessage = Selector("#setup-item-description");
const continueButton = Selector('[data-testid="documentSetupContinue"]');
const getLocation = ClientFunction(() => document.location.href);

const getAttachmentInput = Selector("[data-testid='attachment-file-dropzone'] input");
const getUploadedFileFieldByIndex = (index: number) => Selector(`[data-testid='upload-file-${index}']`);
const getFileSizeError = Selector("[data-testid='file-error']");

const samplePdfPath = "../fixture/creator/sample-file.pdf";
const samplePdfTooLargePath = "../fixture/creator/sample-file-6MB.pdf";

test("should show file limit warning when over 6mb", async (t) => {
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

  // Step 7: Click "Continue" to proceed to form
  await t.click(continueButton);

  // Step 8: Confirm navigation to form editor
  await t.expect(getLocation()).contains("/creator/form", "Should navigate to creator form");

  // Step 9: Upload oversized file and verify error message
  await t.setFilesToUpload(getAttachmentInput, [samplePdfTooLargePath]);
  await t
    .expect(getFileSizeError.textContent)
    .contains(
      "Total attachment file size exceeds 5MB, Please try again with a smaller file size.",
      "Should display file size error"
    );

  // Step 10: Upload valid file and verify it's accepted
  await t.setFilesToUpload(getAttachmentInput, [samplePdfPath]);
  await t
    .expect(getUploadedFileFieldByIndex(0).textContent)
    .contains("sample-file.pdf", "Should successfully upload a valid file");
});
