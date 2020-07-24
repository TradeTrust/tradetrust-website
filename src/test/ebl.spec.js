import { Selector } from "testcafe";

fixture("Token Document Rendering").page`http://localhost:3000`;

const Document = "./fixture/ebl.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const DocumentStatus = Selector("#document-status");
const IssuedByDomainName = Selector("#issuedby .domain");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Token is verified and rendered correctly", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);

  await DocumentStatus.with({ visibilityCheck: true })();

  await validateTextContent(t, IssuedByDomainName, ["TRADETRUST.IO"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, ["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});
