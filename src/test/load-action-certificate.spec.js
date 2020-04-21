import { Selector } from "testcafe";

fixture("Load action from plain certificate").page`http://localhost:3000`;

const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const DocumentStatus = Selector("#document-status");
const IssuedByDomainName = Selector("#issuedby .domain");
const ViewerContainer = Selector("#viewer-container");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Load document from action should work when url is valid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/simboonlong/64242ae4e0472bc91f98dfefb4a83f22/raw/2dbe17a28f9b26072e560babd6f40bde6ff7de69`,
      permittedActions: ["VIEW", "STORE"],
      redirect: "https://dev.tradetrust.io/",
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);

  await DocumentStatus.with({ visibilityCheck: true })();

  await validateTextContent(t, IssuedByDomainName, ["TRADETRUST.IO"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, ["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});

test("Load document from action should fail when url is invalid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/simboonlong/64242ae4e0472bc91f98dfefb4a83f22/raw/123`,
      redirect: "https://dev.tradetrust.io/",
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);

  await DocumentStatus.with({ visibilityCheck: false })();

  await validateTextContent(t, ViewerContainer, [
    "This document is not valid",
    "Unable to load certificate with the provided parameters",
    "Unable to load the certificate from https://gist.githubusercontent.com/simboonlong/64242ae4e0472bc91f98dfefb4a83f22/raw/123",
  ]);
});
