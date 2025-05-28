import { ClientFunction, Selector } from "testcafe";
import { location, navigateToCreator } from "../helper";

fixture("Data File Upload").page`${location}`;

const nonTransferableView = Selector("#forms-view-Non-Transferable");
const invoiceTile = nonTransferableView.find('[data-testid="form-select-1"]');
const previewOverlay = Selector('[data-testid="expand-preview"]');
const createDocumentButton = Selector('[data-testid="expandPreviewCreateDocument"]');
const setupModal = Selector('[data-testid="documentSetup"]');
const setupSuccessMessage = Selector("#setup-item-description");
const continueButton = Selector('[data-testid="documentSetupContinue"]');
const dataFileDropZoneInput = Selector("[data-testid='data-file-dropzone'] input");
const invoiceIDField = Selector("#root_invoiceId");
const invoiceNameField = Selector("#root_invoiceName");
const getLocation = ClientFunction(() => document.location.href);

const dataFileJsonInvoice = "../fixture/creator/sample-data-file-invoice.json";
const dataFileCsvInvoice = "../fixture/creator/sample-data-file-invoice.csv";

test("should populate invoice fields correctly after uploading JSON and CSV data files", async (t) => {
  // Step 1: Navigate to creator page
  await navigateToCreator();

  // Step 2: Open "Invoice" form
  await t.click(invoiceTile);

  // Step 3: Ensure preview overlay appears
  await t.expect(previewOverlay.exists).ok("Preview overlay should be visible");

  // Step 4: Click "Create Document"
  await t.click(createDocumentButton);

  // Step 5: Verify setup modal appears
  await t.expect(setupModal.exists).ok("Setup modal should be visible");

  // Step 6: Verify success message
  await t.expect(setupSuccessMessage.innerText).contains("Record Generated:", "Should display setup success message");

  // Step 7: Continue to form editor
  await t.click(continueButton);

  // Step 8: Confirm navigation to form editor
  await t.expect(getLocation()).contains("/creator/form", "Should navigate to form editor");

  // Step 9: Upload JSON data file
  await t.setFilesToUpload(dataFileDropZoneInput, [dataFileJsonInvoice]);
  await t.expect(invoiceIDField.value).eql("<Invoice ID 1>", "Invoice ID from JSON should be populated");
  await t.expect(invoiceNameField.value).eql("<Invoice Name 1>", "Invoice Name from JSON should be populated");

  // Step 10: Upload CSV data file
  await t.setFilesToUpload(dataFileDropZoneInput, [dataFileCsvInvoice]);
  await t.expect(invoiceIDField.value).eql("<Invoice ID 2>", "Invoice ID from CSV should be populated");
  await t.expect(invoiceNameField.value).eql("<Invoice Name 2>", "Invoice Name from CSV should be populated");
});
