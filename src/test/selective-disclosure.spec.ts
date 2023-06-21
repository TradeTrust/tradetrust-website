import { Selector } from "testcafe";
import { location, navigateToVerify, uploadDocument, validateIssuerTexts } from "./helper";

fixture("Selective Disclosure").page`${location}`;

const IframeBlock = Selector("#iframe");

const PrivacyFilterButton = Selector("#privacySwitch");
const CertificateSection = Selector("#rendered-certificate");
const ExporterObfuscationButton = Selector(".rounded-full.cursor-pointer").nth(0); // selected div is from template renderer itself

test("Fields on a document can be hidden", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v2/coo-selective-disclosure.json");
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);

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
