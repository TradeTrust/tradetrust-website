import { Selector } from "testcafe";
import { location, navigateToCreator } from "../helper";

fixture("Preview Zoom Modal").page`${location}`;

const nonTransferableView = Selector("#forms-view-Non-Transferable");
const certificateOfOriginTile = nonTransferableView.find('[data-testid="form-select-0"]');
const previewOverlay = Selector('[data-testid="expand-preview"]');
const zoomOutButton = previewOverlay.find("p").withText("-");
const zoomInButton = previewOverlay.find("p").withText("+");
const zoomLevelText = previewOverlay.find("p").withText(/\d+%/);
const dismissButton = Selector('[data-testid="expandPreviewDismiss"]');

test("should zoom in, zoom out, and dismiss preview correctly", async (t) => {
  // Step 1: Navigate to creator page
  await navigateToCreator();

  // Step 2: Open the "Certificate of Origin" form preview
  await t.click(certificateOfOriginTile);

  // Step 3: Ensure preview overlay is visible
  await t.expect(previewOverlay.exists).ok("Preview overlay should be visible");

  // Step 4: Zoom in
  await t.click(zoomInButton);
  await t.expect(zoomLevelText.innerText).notEql("100%", "Zoom in should increase the zoom level from 100%");

  // Step 5: Zoom out back to 100%
  await t.click(zoomOutButton);
  await t.expect(zoomLevelText.innerText).eql("100%", "Zoom out should reset zoom level to 100%");

  // Step 6: Dismiss the preview
  await t.click(dismissButton);
  await t.expect(previewOverlay.exists).notOk("Preview overlay should be dismissed after clicking dismiss");
});
