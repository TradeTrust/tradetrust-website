import { Selector } from "testcafe";

fixture("Token Document Rendering").page`http://localhost:3000`;

const Document = "./fixture/ebl.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Token is verified and rendered correctly", async t => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);

  await StatusButton.with({ visibilityCheck: true })();

  const assetInfoLinkElement = await Selector("#asset-info-etherscan-link");
  await t
    .expect(assetInfoLinkElement.getAttribute("href"))
    .eql(
      "https://ropsten.etherscan.io/token/0x48399Fb88bcD031C556F53e93F690EEC07963Af3?a=44462799421286370332860487499556741868509423910583906203271800828184419823283"
    );
  await validateTextContent(t, StatusButton, ["Issued by TRADETRUST.IO"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, ["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});
