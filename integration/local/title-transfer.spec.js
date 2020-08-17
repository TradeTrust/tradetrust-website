import { Selector } from "testcafe";

fixture("Title Transfer Rendering").page`http://localhost:3000`;

const Document = "./ebl-local.json";
const DocumentStatus = Selector("#document-status");
const IssuedByDomainName = Selector("#issuedby .domain");
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Title Transfer should render correctly", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);

  await DocumentStatus.with({ visibilityCheck: true })();
  await validateTextContent(t, IssuedByDomainName, ["Unknown"]);

  await t.switchToIframe(IframeBlock);
  await validateTextContent(t, SampleTemplate, ["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});
