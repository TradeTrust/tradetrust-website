import { Selector } from "testcafe";

fixture("Token Document Rendering").page`http://localhost:3000`;

const Document = "./fixture/tokenRegistry.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Token is verified and rendered correctly", async t => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await StatusButton.with({ visibilityCheck: true })();

  await validateTextContent(t, StatusButton, ["Issued by TRADETRUST.IO"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "Name & Address of Shipping",
    "DEMO CUSTOMS"
  ]);
});
