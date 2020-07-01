import { Selector } from "testcafe";

fixture("Document with Attachment Rendering").page`http://localhost:3000`;

const Document = "./fixture/attachments.json";

const TabsItems = Selector("[data-testid='tabs'] .nav-item");
const TabDefault = Selector("[data-testid='default']");
const TabAttachment = Selector("[data-testid='tab-attachment']");
const TabPdf1 = Selector("[data-testid='attachment-3']");
const AttachmentNumber = Selector("[data-testid='attachment-number']");
const AttachmentLink = Selector("[data-testid='attachment-link']");
const Iframe = Selector("#iframe[title='Decentralised Rendered Certificate']");
const SampleTemplate = Selector("#root");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Attachment Tab and Panel rendered correctly", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);
  await t.switchToIframe(Iframe);
  await validateTextContent(t, SampleTemplate, ["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
  await t.switchToMainWindow();

  await TabDefault.with({ visibilityCheck: true })();
  await t.expect(TabsItems.count).eql(4);
  await t.expect(TabAttachment.textContent).contains("Attachments");
  await t.expect(AttachmentNumber.textContent).contains("5");

  await t.click(TabPdf1);
  await t.switchToIframe(Iframe);
  await validateTextContent(t, SampleTemplate, ["UNCITRAL Model Law on  Electronic Transferable Records"]);
  await t.switchToMainWindow();

  await t.click(TabAttachment);
  await t.expect(AttachmentLink.count).eql(5);
});
