import { ClientFunction, Selector } from "testcafe";
import { navigateToCreator, location } from "../helper";

fixture("Document Signature Upload").page`${location}`;

const nonTransferableView = Selector("#forms-view-Non-Transferable");
const certificateOfOriginTile = nonTransferableView.find('[data-testid="form-select-0"]');
const previewOverlay = Selector('[data-testid="expand-preview"]');
const createDocumentButton = Selector('[data-testid="expandPreviewCreateDocument"]');
const setupModal = Selector('[data-testid="documentSetup"]');
const setupSuccessMessage = Selector("#setup-item-description");
const continueButton = Selector('[data-testid="documentSetupContinue"]');
const SignatureWidget = Selector("[data-testid='custom-file-widget-thumbnail']");
const SignatureInput = Selector("input#root_firstSignatoryAuthentication_signature");
const getLocation = ClientFunction(() => document.location.href);

const sampleSignature = "../fixture/creator/signature.jpg";

test("should upload signature file successfully", async (t) => {
  // Step 1: Navigate to creator page
  await navigateToCreator();

  // Step 2: Open "Certificate of Origin" form
  await t.click(certificateOfOriginTile);

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

  // Step 9: Upload signature file
  await t.setFilesToUpload(SignatureInput, [sampleSignature]);

  // Step 10: Validate signature file upload
  await t.expect(SignatureWidget.textContent).contains("signature.jpg", "Should display uploaded signature file name");
});
