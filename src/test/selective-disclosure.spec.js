import { Selector } from "testcafe";

fixture("Selective Disclosure").page`http://localhost:3000`;

const IframeBlock = Selector("#iframe");
const Document = "./fixture/coo-selective-disclosure.json";
const DocumentStatus = Selector("#document-status");

const PrivacyFilterButton = Selector("#privacySwitch");
const CertificateSection = Selector("#rendered-certificate");
const ExporterObfuscationButton = Selector(".fa-minus-circle").nth(0);

test("Fields on a document can be hidden", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);

  await DocumentStatus.with({ visibilityCheck: true })();

  await t.switchToIframe(IframeBlock);

  // Check that all text elements exist
  await t.expect(CertificateSection.textContent).contains("TREASURY WINE ESTATES VINTNERS LIMITED");
  await t.expect(CertificateSection.textContent).contains("Penfolds wine");

  // Obfuscate the exporters
  await t.click(PrivacyFilterButton);
  await t.click(ExporterObfuscationButton);

  // Check that only the exporter is removed
  await t.expect(CertificateSection.textContent).notContains("TREASURY WINE ESTATES VINTNERS LIMITED");
  await t.expect(CertificateSection.textContent).contains("Penfolds wine");
});
