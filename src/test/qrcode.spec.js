import { Selector } from "testcafe";

fixture("QRcode Rendering").page`http://localhost:3000`;

const Document = "./fixture/ebl-with-qrcode.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const DocumentStatus = Selector("#document-status");
const IssuedByDomainName = Selector("#issuedby .domain");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("UI renders QR code correctly when present in the document", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);

  await DocumentStatus.with({ visibilityCheck: true })();

  const qrcodeButtonElement = await Selector("button").withAttribute("aria-label", "document-utility-qr-button");
  await t.click(qrcodeButtonElement); // asserts that button exists and can be clicked
  await validateTextContent(t, IssuedByDomainName, ["TRADETRUST.IO"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, ["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});
