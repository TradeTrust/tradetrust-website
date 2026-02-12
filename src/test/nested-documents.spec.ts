import { Selector } from "testcafe";
import { location, navigateToVerify, uploadDocument, validateIframeTexts, validateTextContent } from "./helper";

fixture("Nested documents").page`${location}`;

const AttachmentNumber = Selector("[data-testid='attachment-number']");
const AttachmentOpen0 = Selector("[data-testid='attachment-tile-0']").find("[data-testid='attachment-open-link']");
const RenderedDocument = Selector("[data-testid='certificate-dropzone']");
const InvalidMessage = Selector(".invalid");

test("Document with nested document in attachments should open in new tab correctly", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/v2/invoice-nested-documents.json");
  await validateIframeTexts(["INVOICE"]);

  await t.click(AttachmentNumber);
  await t.click(AttachmentOpen0);
  await InvalidMessage.with({ visibilityCheck: true })();
  await validateTextContent(t, RenderedDocument, [
    "Document issuer identity is invalid",
    "This document was issued by an invalid issuer.",
  ]);
  await t.expect(AttachmentNumber.exists).notOk();
});
