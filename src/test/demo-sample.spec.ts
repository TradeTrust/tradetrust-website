import { Selector } from "testcafe";
import { location, navigateToVerify, validateIframeTexts, validateIssuerTexts } from "./helper";

fixture("Demo Sample Certificate Rendering").page`${location}`;

// test("demo sample document is rendered correctly when dragged", async (t) => {
//   await navigateToVerify();
//   await t.dragToElement(Selector("[draggable='true']"), Selector("[data-testid='certificate-dropzone']"));
//   await t
//     .expect(
//       Selector("[data-testid='banner-title']").withText("Ready to learn how TradeTrust can benefit your business?")
//         .exists
//     )
//     .ok();
//   await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
//   await validateIframeTexts(["Name & Address of Shipping Agent/Freight Forwarder"]);
// });

test("demo sample document is rendered correctly when loaded via button", async (t) => {
  await navigateToVerify();

  // Click the "Load Demo Tradetrust Document" button
  await t.click(Selector("button").withText("Load Demo Tradetrust Document"));

  // Verify banner title appears correctly
  await t
    .expect(
      Selector("[data-testid='banner-title']").withText("Ready to learn how TradeTrust can benefit your business?")
        .exists
    )
    .ok();

  // Validate issuer details
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);

  // Validate iframe content
  await validateIframeTexts(["Name & Address of Shipping Agent/Freight Forwarder"]);
});
