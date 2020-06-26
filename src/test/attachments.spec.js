import { Selector } from "testcafe";

fixture("Document with Attachment Rendering").page`http://localhost:3000`;

const Document = "./fixture/attachments.json";

const TabsItems = Selector("[data-testid='tabs'] .nav-item");
const TabDefault = Selector("[data-testid='default']");
const TabAttachment = Selector("[data-testid='tab-attachment']");
const AttachmentNumber = Selector("[data-testid='attachment-number']");
const AttachmentLink = Selector("[data-testid='attachment-link']");
const Iframe = Selector("#iframe[title='Decentralised Rendered Certificate']");

test("Attachment Tab and Panel rendered correctly", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);
  await t.expect(Iframe.count).eql(1);

  await TabDefault.with({ visibilityCheck: true })();
  await t.expect(TabsItems.count).eql(4);
  await t.expect(TabAttachment.textContent).contains("Attachments");
  await t.expect(AttachmentNumber.textContent).contains("5");

  await t.click(TabAttachment);
  await t.expect(AttachmentLink.count).eql(5);
});
