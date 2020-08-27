import { Selector } from "testcafe";
import { uploadDocument, validateIframeTexts } from "./helper";

fixture("Document with Attachment Rendering").page`http://localhost:3000`;

const TabsItems = Selector("[data-testid='tabs'] .nav-item");
const TabDefault = Selector("[data-testid='default']");
const TabAttachment = Selector("[data-testid='tab-attachment']");
const TabWordDoc = Selector("[data-testid='attachment-0']");
const TabExcel = Selector("[data-testid='attachment-1']");
const TabJpeg = Selector("[data-testid='attachment-2']");
const TabPdf1 = Selector("[data-testid='attachment-3']");
const TabPdf2 = Selector("[data-testid='attachment-4']");
const AttachmentNumber = Selector("[data-testid='attachment-number']");
const AttachmentLink = Selector("[data-testid='attachment-link']");

test("Attachment Tab and Panel rendered correctly", async (t) => {
  await uploadDocument("./fixture/attachments.json");

  // default document pdf content should render
  await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);

  // tabs number should tally
  await TabDefault.with({ visibilityCheck: true })();
  await t.expect(TabsItems.count).eql(4);
  await t.expect(TabAttachment.textContent).contains("Attachments");
  await t.expect(AttachmentNumber.textContent).contains("5");

  // non-pdf tabs should not render
  await t.expect(TabWordDoc.count).eql(0);
  await t.expect(TabExcel.count).eql(0);
  await t.expect(TabJpeg.count).eql(0);

  // pdf tabs content should render
  await t.click(TabPdf1);
  await validateIframeTexts(["UNCITRAL Model Law on  Electronic Transferable Records"]);

  await t.click(TabPdf2);
  await validateIframeTexts(["Dummy PDF file"]);

  // attachment tab should render with correct attachment files count
  await t.click(TabAttachment);
  await t.expect(AttachmentLink.count).eql(5);
});
