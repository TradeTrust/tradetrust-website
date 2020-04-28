import { Selector } from "testcafe";

fixture.skip("Token Document Rendering").page`http://localhost:3000`;

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

  const assetInfoLinkElement = await Selector("#asset-info-etherscan-link");
  await t
    .expect(assetInfoLinkElement.getAttribute("href"))
    .eql(
      "https://ropsten.etherscan.io/token/0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2?a=42076119213045156803506746051443966107776518614691501105642894103730326470758"
    );
  await validateTextContent(t, IssuedByDomainName, ["TRADETRUST.IO"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, ["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});
