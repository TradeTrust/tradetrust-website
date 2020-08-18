import { t, Selector } from "testcafe";

const CertificateDropzone = Selector("#certificate-dropzone");
const Iframe = Selector("#iframe[title='Decentralised Rendered Certificate']");
const SampleTemplate = Selector("#root");
const DocumentStatus = Selector("#document-status");
const IssuedByDomainName = Selector("#issuedby .domain");

export const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (previousValue, currentValue) => t.expect(component.textContent).contains(currentValue),
    Promise.resolve()
  );

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
