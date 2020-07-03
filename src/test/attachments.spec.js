import { Selector } from "testcafe";

fixture("Document with Attachment Rendering").page`http://localhost:3000`;

const Document = "./fixture/attachments.json";

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
const Iframe = Selector("#iframe[title='Decentralised Rendered Certificate']");
const SampleTemplate = Selector("#root");
const Pdf1Span = Selector("span").withText("UNCITRAL Model Law on");
const Pdf2Span = Selector("span").withText("Dumm");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Attachment Tab and Panel rendered correctly", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  // default document pdf content should render
  await t.switchToIframe(Iframe);
  await validateTextContent(t, SampleTemplate, ["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
  await t.switchToMainWindow();

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
  await t.switchToIframe(Iframe);
  await Pdf1Span.with({ visibilityCheck: true })();
  await validateTextContent(t, SampleTemplate, ["UNCITRAL Model Law on  Electronic Transferable Records"]);
  await t.switchToMainWindow();

  await t.click(TabPdf2);
  await t.switchToIframe(Iframe);
  await Pdf2Span.with({ visibilityCheck: true })();
  await validateTextContent(t, SampleTemplate, ["Dummy PDF file"]);
  await t.switchToMainWindow();

  // attachment tab should render with correct attachment files count
  await t.click(TabAttachment);
  await t.expect(AttachmentLink.count).eql(5);
});
