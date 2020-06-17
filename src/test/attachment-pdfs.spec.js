import { Selector } from "testcafe";

fixture("Document with Attachment Rendering").page`http://localhost:3000`;

const Document = "./fixture/attachment-pdfs.json";

const DocumentTabsItems = Selector("[data-testid='document-tabs'] .nav-item");
const TabDocument = Selector("[data-testid='tab-document']");
const TabAttachment = Selector("[data-testid='tab-attachment']");
const AttachmentNumber = Selector("[data-testid='attachment-number']");
const AttachmentLink = Selector("[data-testid='attachment-link']");
const Iframe = Selector("#iframe[title='Decentralised Rendered Certificate']");

test("Attachment Tab and Panel rendered correctly", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);
  await t.expect(Iframe.count).eql(1);

  await t.expect(DocumentTabsItems.count).eql(2);
  await t.expect(TabDocument.textContent).contains("Document");
  await t.expect(TabAttachment.textContent).contains("Attachments");
  await t.expect(AttachmentNumber.textContent).contains("3");

  await t.click(TabAttachment);
  await t.expect(AttachmentLink.count).eql(3);
});
