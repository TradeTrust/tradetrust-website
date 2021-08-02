import { Selector } from "testcafe";
import { validateTextContent, location, navigateToAddressResolver } from "./helper";

fixture("Address Resolver - Buttons").page`${location}`;

const NoEndpointFound = Selector("p").withText("No third party's endpoint found.");
const EndpointEntryId = Selector("[data-testid='endpoint-entry-id']");
const ButtonAdd = Selector("button").withText("Add");
const ButtonDelete = Selector("button").withText("Delete");

test("Address Resolver should show disabled add button when clicked, delete button should exit", async (t) => {
  await navigateToAddressResolver();
  await t.click(ButtonAdd);
  await t.expect(ButtonAdd.hasAttribute("disabled")).ok();
  await validateTextContent(t, EndpointEntryId, ["1"]);
  await t.click(ButtonDelete);
  await t.expect(NoEndpointFound.exists).ok();
  await t.expect(ButtonAdd.hasAttribute("disabled")).notOk();
});
