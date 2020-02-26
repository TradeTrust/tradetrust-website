import { Selector } from "testcafe";

fixture("Load action from plain certificate").page`http://localhost:3000`;

const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Load document from action should work when url is valid", async t => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://api.myjson.com/bins/kv1de`,
      permittedActions: ["VIEW", "STORE"],
      redirect: "https://dev.tradetrust.io/"
    }
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);

  await StatusButton.with({ visibilityCheck: true })();

  await validateTextContent(t, StatusButton, ["Issued by TRADETRUST.IO"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, ["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
});

test("Load document from action should fail when url is invalid", async t => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://api.myjson.com/bins/error`,
      redirect: "https://dev.tradetrust.io/"
    }
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);

  await StatusButton.with({ visibilityCheck: false })();
});
