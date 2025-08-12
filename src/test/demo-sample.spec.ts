import { Selector } from "testcafe";
import { location, navigateToVerify } from "./helper";

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

test("demo certificate button opens gallery in new tab", async (t) => {
  await navigateToVerify();

  await t.eval(() => {
    (window as any).openedUrl = null;
    window.open = function (url) {
      (window as any).openedUrl = url;
      return { close: () => {} } as any;
    };
  });

  await t.click(Selector("button").withText("View Demo Tradetrust Document"));
  await t.wait(500);
  const openedUrl = await t.eval(() => (window as any).openedUrl);
  await t.expect(openedUrl).contains("gallery.tradetrust.io");
});
