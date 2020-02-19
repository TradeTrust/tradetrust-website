import { Selector } from "testcafe";

fixture("Config JsonSchema Rendering").page`http://localhost:3010`; // eslint-disable-line mdx/no-unused-expressions

const Config = "./fixture/config.json";
const DropzoneContainer = Selector("#dropzone-container");
const FormHeader = Selector("#form-header");
const FormBody = Selector("#form-body");

const validateTextContent = async (t: TestController, component: Selector, texts: string[]): Promise<any> =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

/* 
  1. jest/expect-expect - already extracted out in common method on top to match the expect.
  2. jest/require-top-level-describe - We already have description in fixture and then test description.
  3. jest/no-test-callback - this rule adding extra Promise which stops the execution of the tests. 
*/
/* eslint-disable jest/expect-expect, jest/require-top-level-describe, jest/no-test-callback */
test("config schema is rendered correctly to display form", async (t: TestController) => {
  const container = Selector("#document-dropzone");
  await container();
  await validateTextContent(t, DropzoneContainer, ["Drag 'n' drop TradeTrust configuration file here"]);

  await t.setFilesToUpload("input[type=file]", [Config]);

  await FormHeader.with({ visibilityCheck: true })();

  await validateTextContent(t, FormBody, [
    "DEMO CNM",
    "Template Renderer",
    "Issuers of the document",
    "Port of Loading",
    "Recipient of the container",
    "Consignee"
  ]);
});
