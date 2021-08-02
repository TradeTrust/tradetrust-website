import { Selector } from "testcafe";
import { location, navigateToAddressResolver } from "./helper";

fixture("Address Resolver - No endpoint").page`${location}`;

const NoEndpointFound = Selector("p").withText("No third party's endpoint found.");

test("Address Resolver should show only 1 row with no endpoint found text", async (t) => {
  await navigateToAddressResolver();
  await t.expect(NoEndpointFound.exists).ok();
});
