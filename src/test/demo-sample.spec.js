import { Selector } from "testcafe";
import { validateIframeTexts, validateIssuerTexts, location } from "./helper";

fixture("Demo Sample Certificate Rendering").page`${location}`;

test("demo sample document is rendered correctly when dragged", async (t) => {
  await t.dragToElement(Selector("[draggable='true']"), Selector("#certificate-dropzone"));
  await validateIssuerTexts(["EXAMPLE.OPENATTESTATION.COM"]);
  await validateIframeTexts(["Name & Address of Shipping Agent/Freight Forwarder"]);
});

// TODO, implement
// eslint-disable-next-line jest/no-disabled-tests
test.skip("demo sample document is rendered correctly when clicked", async (t) => {
  await t.resizeWindow(800, 600);
  await t.click(Selector("#demoClick"));
  await validateIssuerTexts(["EXAMPLE.OPENATTESTATION.COM"]);
  await validateIframeTexts(["Name & Address of Shipping Agent/Freight Forwarder"]);
  await t.resizeWindow(1200, 900); // resize back, in case other tests continue running from same browser window
});
