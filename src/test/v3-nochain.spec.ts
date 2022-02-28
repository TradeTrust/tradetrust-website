import { Selector } from "testcafe";
import { uploadDocument, location, navigateToVerify } from "./helper";

fixture("v3 Network Selection Test").page`${location}`;

test("should reject unmatched document network", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/v3/ebl-nochain.json");

  await t.expect(Selector("h4.text-rose").withText("Please select the correct network for your document").exists).ok();
});
