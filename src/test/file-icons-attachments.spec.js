import { Selector } from "testcafe";
import { uploadDocument, validateIframeTexts } from "./helper";

fixture("Document with 8 Attachments Rendering File Icons").page`http://localhost:3000`;

const TabsItems = Selector("[data-testid='tabs'] .nav-item");
const TabDefault = Selector("[data-testid='default']");
const TabAttachment = Selector("[data-testid='tab-attachment']");
const TabWordDoc = Selector("[data-testid='attachment-icon-doc']");
const TabCsv = Selector("[data-testid='attachment-icon-csv']");
const TabJpeg = Selector("[data-testid='attachment-icon-jpg']");
const TabPdf = Selector("[data-testid='attachment-icon-pdf']");
const TabPng = Selector("[data-testid='attachment-icon-png']");
const TabTxt = Selector("[data-testid='attachment-icon-txt']");
const TabPaperclip = Selector("[data-testid='attachment-icon-paperclip']");

const AttachmentNumber = Selector("[data-testid='attachment-number']");
const AttachmentLink = Selector("[data-testid='attachment-link']");

test("Attachment Tab and Panel rendered correctly", async (t) => {
  await uploadDocument("./fixture/file-with-attachments.json");

  // default document pdf content should render
  await validateIframeTexts(["Documents Bundle"]);

  // tabs number should tally
  await TabDefault.with({ visibilityCheck: true })();
  await t.expect(TabsItems.count).eql(3);
  await t.expect(TabAttachment.textContent).contains("Attachments");
  await t.expect(AttachmentNumber.textContent).contains("8");

  // pdf tabs content should render (pdf rendering is slow on ci causing flaky test, await specifically for pdf spans to render before text validation checks)
  await t.click(TabAttachment);
  await TabAttachment.with({ visibilityCheck: true })();

  // check file-icons display
  await t.expect(AttachmentLink.count).eql(8);
  await t.expect(TabWordDoc.count).eql(2);
  await t.expect(TabCsv.count).eql(1);
  await t.expect(TabJpeg.count).eql(1);
  await t.expect(TabPdf.count).eql(1);
  await t.expect(TabPng.count).eql(1);
  await t.expect(TabTxt.count).eql(1);
  await t.expect(TabPaperclip.count).eql(1);
});
