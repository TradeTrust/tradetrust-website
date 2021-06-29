import { Selector } from "testcafe";
import { validateIframeTexts, validateIssuerTexts, navigateToVerify, location } from "./helper";

fixture("Demo Sample Certificate Rendering").page`${location}/`;

test("demo sample document is rendered correctly when dragged", async (t) => {
  await navigateToVerify();
  await t.dragToElement(Selector("[draggable='true']"), Selector("#certificate-dropzone"));
  await validateIssuerTexts(["EXAMPLE.OPENATTESTATION.COM"]);
  await validateIframeTexts(["Name & Address of Shipping Agent/Freight Forwarder"]);
});

test("demo sample document is rendered correctly when clicked", async (t) => {
  await navigateToVerify();
  await t.resizeWindow(375, 812);
  await t.click(Selector("#demoClick"));
  await validateIssuerTexts(["EXAMPLE.OPENATTESTATION.COM"]);
  await validateIframeTexts(["Name & Address of Shipping Agent/Freight Forwarder"]);
  await t.resizeWindow(1200, 900); // resize back, in case other tests continue running from same browser window
});
