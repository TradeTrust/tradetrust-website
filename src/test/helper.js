import { t, Selector, ClientFunction } from "testcafe";

export const Iframe = Selector("#iframe[title='Decentralised Rendered Certificate']", { timeout: 120000 });
export const SampleTemplate = Selector("#root");
const CertificateDropzone = Selector("[data-testid='certificate-dropzone']");
const DocumentStatus = Selector("#document-status");
const IssuedByDomainName = Selector("#issuedby");
const VerifyPage = Selector("a[href='/']");
const CreatorPage = Selector("a[href='/creator']");

export const validateTextContent = async (testcafe, component, texts) =>
  texts.reduce(
    async (previousValue, currentValue) => await testcafe.expect(component.textContent).contains(currentValue),
    Promise.resolve()
  );

export const closeCookieNotice = async () => {
  const closeBtn = Selector("button").withText("Close");
  if (await closeBtn.exists) {
    await t.click(closeBtn);
  }
};

export const navigateToVerify = async () => {
  const button = Selector("button").withText("Dismiss");
  if (await button.exists) {
    await t.click(button);
  } else {
    console.log("Button does not exist");
  }
  await closeCookieNotice();
  await t.click(VerifyPage);
};

export const navigateToCreator = async () => {
  const button = Selector("button").withText("Dismiss");
  if (await button.exists) {
    await t.click(button);
  } else {
    console.log("Button does not exist");
  }
  await closeCookieNotice();
  await t.click(CreatorPage);
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
