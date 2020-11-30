import { Selector } from "testcafe";
import { uploadDocument } from "./helper";

fixture("Document with 2 Attachments that are OA documents").page`http://localhost:3000`;

test("New tabs ", async (t) => {
  await uploadDocument("./fixture/doc-inner-tt-json-ropsten.json");

  const TabDefault = Selector("[data-testid='default']");
  const TabAttachment = Selector("[data-testid='tab-attachment']");

  const AttachmentNumber = Selector("[data-testid='attachment-number']");
  const AttachmentDownloadLink = Selector("[data-testid='attachment-download-link']");
  const OpenLink = Selector("[data-testid='attachment-open-link']");

  const AttachmentLink0 = Selector("[data-testid='attachment-0']");
  const AttachmentLink0OpenLink = AttachmentLink0.find("[data-testid='attachment-open-link']");
  const AttachmentLink1 = Selector("[data-testid='attachment-1']");
  const AttachmentLink1OpenLink = AttachmentLink1.find("[data-testid='attachment-open-link']");
  const iframeInvoice = Selector("#rendered-certificate").find("[data-testid='invoice-template']");

  // tabs number should tally
  await TabDefault.with({ visibilityCheck: true })();
  await t.expect(TabAttachment.textContent).contains("Attachments");
  await t.expect(AttachmentNumber.textContent).contains("3");

  // pdf tabs content should render (pdf rendering is slow on ci causing flaky test, await specifically for pdf spans to render before text validation checks)
  await t.click(TabAttachment);
  await TabAttachment.with({ visibilityCheck: true })();

  // check file download
  await t.expect(AttachmentDownloadLink.count).eql(3);

  //open-link only for .tt and .json OA files
  await t.expect(OpenLink.count).eql(2);
  await t.click(AttachmentLink0OpenLink);
  const currWindow = await t.getCurrentWindow();

  await expect(iframeInvoice.exists).ok();
  await t.closeWindow(currWindow);

  await t.click(AttachmentLink1OpenLink);
  await expect(iframeInvoice.exists).ok();
});
