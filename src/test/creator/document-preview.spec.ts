import { Selector, ClientFunction } from "testcafe";
import { location, navigateToCreator, validateIframeTexts } from "../helper";

fixture("Document Preview").page`${location}`;

// Form selectors
const nonTransferableView = Selector("#forms-view-Non-Transferable");
const invoiceTile = nonTransferableView.find('[data-testid="form-select-1"]');
const previewOverlay = Selector('[data-testid="expand-preview"]');
const createDocumentButton = Selector('[data-testid="expandPreviewCreateDocument"]');
const setupModal = Selector('[data-testid="documentSetup"]');
const setupSuccessMessage = Selector("#setup-item-description");
const continueButton = Selector('[data-testid="documentSetupContinue"]');
const formNextButton = Selector('[data-testid="form-next-button"]');
const dataFileDropZoneInput = Selector("[data-testid='data-file-dropzone'] input");
const invoiceIDField = Selector("#root_invoiceId");
const invoiceNameField = Selector("#root_invoiceName");
const getLocation = ClientFunction(() => document.location.href);

const dataFileJsonInvoice = "../fixture/creator/sample-data-file-invoice.json";

test("should rendered preview correctly", async (t) => {
  // Step 1: Navigate to creator page
  await navigateToCreator();

  // Step 2: Open Invoice form preview
  await t.click(invoiceTile);
  await t.expect(previewOverlay.exists).ok("Preview overlay should be visible");

  // Step 3: Create document
  await t.click(createDocumentButton);
  await t.expect(setupModal.exists).ok("Setup modal should appear");
  await t.expect(setupSuccessMessage.innerText).contains("Record Generated:", "Should show success message");

  // Step 4: Continue to form editor
  await t.click(continueButton);
  await t.expect(getLocation()).contains("/creator/form", "Should navigate to form editor");

  // Step 5: Upload JSON data file and validate fields are populated
  await t.setFilesToUpload(dataFileDropZoneInput, [dataFileJsonInvoice]);
  await t.expect(invoiceIDField.value).eql("<Invoice ID 1>", "Invoice ID should be populated from JSON");
  await t.expect(invoiceNameField.value).eql("<Invoice Name 1>", "Invoice Name should be populated from JSON");

  // Step 6: Submit form
  await t.click(formNextButton);
  await t.expect(getLocation()).contains("/creator/form-preview", "Should navigate to form preview");

  // Step 7: Validate preview content
  await validateIframeTexts(["INVOICE"]);

  // Step 8: Validate rendered data in iframe
  const iframe = Selector("#iframe[title='Decentralised Rendered Certificate']");
  const iframeRoot = Selector("#root");

  await t.switchToIframe(iframe);
  await t.expect(iframeRoot.textContent).contains("<Invoice ID 1>", "Rendered content should match JSON data");
});
