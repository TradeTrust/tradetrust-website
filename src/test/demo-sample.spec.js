import { Selector } from "testcafe";
import { validateIframeTexts, validateIssuerTexts, navigateToVerify, location } from "./helper";

fixture("Demo Sample Certificate Rendering").page`${location}/`;

test("demo sample document is rendered correctly when dragged", async (t) => {
  await navigateToVerify();
  await t.dragToElement(Selector("[draggable='true']"), Selector("#certificate-dropzone"));
  await t.expect(Selector("p").withText("Want to try creating a verifiable document?").exists).ok();
  await validateIssuerTexts(["EXAMPLE.OPENATTESTATION.COM"]);
  await validateIframeTexts(["Name & Address of Shipping Agent/Freight Forwarder"]);
});

test("demo sample document is rendered correctly when clicked on mobile", async (t) => {
  await navigateToVerify();
  await t.resizeWindow(600, 600);
  await t.click(Selector("#demoClick"));
  await t.expect(Selector("p").withText("Want to try creating a verifiable document?").exists).ok();
  await validateIssuerTexts(["EXAMPLE.OPENATTESTATION.COM"]);
  await validateIframeTexts(["Name & Address of Shipping Agent/Freight Forwarder"]);
  await t.resizeWindow(1280, 600); // resize back, in case other tests continue running from same browser window
});
