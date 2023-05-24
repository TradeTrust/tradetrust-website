import { Selector } from "testcafe";
import {
  location,
  navigateToVerify,
  uploadDocument,
  validateIframeTexts,
} from "./helper";

fixture("Nested documents").page`${location}`;

const AttachmentNumber = Selector("[data-testid='attachment-number']");
const AttachmentOpen0 = Selector("[data-testid='attachment-tile-0']").find(
  "[data-testid='attachment-open-link']"
);

test("Document with nested document in attachments should open in new tab correctly", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/goerli/v2/invoice-nested-documents.json");
  await validateIframeTexts(["INVOICE"]);

  await t.click(AttachmentNumber);
  await t.click(AttachmentOpen0);
  await validateIframeTexts(["INVOICE"]);

  await t.expect(AttachmentNumber.exists).notOk();
});
