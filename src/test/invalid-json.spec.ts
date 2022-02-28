import { Selector } from "testcafe";
import { uploadDocument, location, navigateToVerify } from "./helper";

fixture("Load Invalid TT Document").page`${location}`;

test("should reject invalid JSON Document", async (t) => {
  await navigateToVerify();
  await uploadDocument("./fixture/invalid-file.json");

  await t
    .expect(
      Selector("h4.text-rose").withText("Document cannot be read. Please check that you have a valid .tt or .json file")
        .exists
    )
    .ok();
});
