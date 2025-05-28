import { ClientFunction, Selector } from "testcafe";
import { navigateToCreator } from "../helper";

fixture("Document Attachments").page`${location}`;

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
const getRemoveUploadedFileButtonByIndex = (index: number) => Selector(`[data-testid='remove-uploaded-file-${index}']`);
const getAllUploadedFileFields = Selector("[data-testid*='upload-file-']");

const samplePdfPath = "../fixture/creator/sample-file.pdf";

test("should correctly add and remove an attachment", async (t) => {
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

  // Step 9: Upload a file attachment
  await t.setFilesToUpload(getAttachmentInput, [samplePdfPath]);

  // Step 10: Verify file was uploaded
  await t
    .expect(getUploadedFileFieldByIndex(0).textContent)
    .contains("sample-file.pdf", "Uploaded file name should appear");
  await t.expect(getAllUploadedFileFields.count).eql(1, "Only one file attachment should be present");

  // Step 11: Remove the uploaded file
  await t.click(getRemoveUploadedFileButtonByIndex(0));
});
