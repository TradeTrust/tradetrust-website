import { Selector } from "testcafe";

fixture("DNS Certificate Rendering").page`http://localhost:3000`;
const Document = "./fixture/sample-dns-verified.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const DocumentStatus = Selector("#document-status");
const IssuedByDomainName = Selector("#issuedby .domain");
const ButtonUploadAddressBook = Selector("[data-testid='multi-button'] button").withText("Address Book");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("sample document is rendered correctly when dns is verified", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);

  await DocumentStatus.with({ visibilityCheck: true })();
  await validateTextContent(t, IssuedByDomainName, ["EXAMPLE.OPENATTESTATION.COM"]);

  await t.expect(ButtonUploadAddressBook.count).eql(0);

  await t.switchToIframe(IframeBlock);
  await validateTextContent(t, SampleTemplate, [
    "Name & Address of Shipping Agent/Freight Forwarder",
    "CERTIFICATE OF NON-MANIPULATION",
    "DEMO JOHN TAN",
    "Certification by Singapore Customs",
    "AQSIQ170923130",
  ]);
});
