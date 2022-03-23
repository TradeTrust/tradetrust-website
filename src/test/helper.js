import { t, Selector, ClientFunction } from "testcafe";

export const Iframe = Selector("#iframe[title='Decentralised Rendered Certificate']", { timeout: 120000 });
export const SampleTemplate = Selector("#root");
const CertificateDropzone = Selector("[data-testid='certificate-dropzone']");
const DocumentStatus = Selector("#document-status");
const IssuedByDomainName = Selector("#issuedby");
const VerifyPage = Selector("a[href='/verify']");

export const validateTextContent = async (testcafe, component, texts) => {
  for (const text of texts) {
    await testcafe.expect(component.textContent).contains(text);
  }
};

export const navigateToVerify = async () => {
  await t.click(VerifyPage);
};

export const uploadDocument = async (documentPath) => {
  await CertificateDropzone();
  await t.setFilesToUpload("input[type=file]", [documentPath]);
};

export const validateIframeTexts = async (texts) => {
  await t.switchToIframe(Iframe);
  await validateTextContent(t, SampleTemplate, texts);
  await t.switchToMainWindow();
};

export const validateIssuerTexts = async (texts) => {
  await DocumentStatus.with({ visibilityCheck: true })();
  await validateTextContent(t, IssuedByDomainName, texts);
};

export const CloseWindow = ClientFunction(() => window.close());

export const location = "http://localhost:3000";
