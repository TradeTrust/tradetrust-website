import { t, Selector, ClientFunction } from "testcafe";
import { join } from "path";
import { homedir } from "os";
import { existsSync } from "fs";

export const Iframe = Selector("#iframe[title='Decentralised Rendered Certificate']", { timeout: 120000 });
export const MagicIFrame = Selector(".magic-iframe", { timeout: 120000 });
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

export const navigateToVerify = async () => {
  const button = Selector("button").withText("Dismiss");
  if (await button.exists) {
    await t.click(button);
  } else {
    console.log("Button does not exist");
  }
  await t.click(VerifyPage);
};

export const navigateToCreator = async () => {
  const button = Selector("button").withText("Dismiss");
  if (await button.exists) {
    await t.click(button);
  } else {
    console.log("Button does not exist");
  }
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

export const validateMagicIframeSelector = async (selector) => {
  await t.switchToIframe(MagicIFrame);
  await t.expect(selector.exists).ok(`Selector should exist in the Magic iframe`);
  await t.switchToMainWindow();
};

export const inputMagicIframeTexts = async (input, texts) => {
  await t.switchToIframe(MagicIFrame);
  await t.typeText(input, texts);
  await t.switchToMainWindow();
};

export const clickMagicIframeButton = async (button) => {
  await t.switchToIframe(MagicIFrame);
  await t.click(button);
  await t.switchToMainWindow();
};

export const validateIssuerTexts = async (texts) => {
  await DocumentStatus.with({ visibilityCheck: true })();
  await validateTextContent(t, IssuedByDomainName, texts);
};

export const CloseWindow = ClientFunction(() => window.close());

export const location = "http://localhost:3000";

export function getFileDownloadPath(fileName) {
  return join(homedir(), "Downloads", fileName);
}

export const waitForFileDownload = async (t, filePath) => {
  for (let i = 0; i < 100; i++) {
    if (existsSync(filePath)) return true;
    await t.wait(100);
  }
  return existsSync(filePath);
};
