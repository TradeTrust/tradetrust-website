import { Selector } from "testcafe";
import { location, navigateToAddressResolver } from "./helper";

fixture("Address Resolver - Entry add").page`${location}`;

const EndpointEntryRow = Selector("[data-testid='endpoint-entry-row']");
const InputName = EndpointEntryRow.find("input[placeholder='Name']");
const InputEndpoint = EndpointEntryRow.find("input[placeholder='Endpoint']");
const InputApiHeader = EndpointEntryRow.find("input[placeholder='API Header']");
const InputApiKey = EndpointEntryRow.find("input[placeholder='API Key']");

const ButtonAdd = Selector("button").withText("Add");
const ButtonSave = Selector("button").withText("Save");
const ButtonGotIt = Selector("button").withText("Okay, got it");
const IconEdit = EndpointEntryRow.find("[data-testid='edit-icon']");

test("Address Resolver should edit, save input values correctly", async (t) => {
  await navigateToAddressResolver();
  await t.click(ButtonAdd);

  await t.expect(InputName.value).eql("");
  await t.typeText(InputName, "Demo");
  await t.expect(InputName.value).contains("Demo");

  await t.expect(InputEndpoint.value).eql("");
  await t.typeText(InputEndpoint, "https://demo-resolver.tradetrust.io/");
  await t.expect(InputEndpoint.value).contains("https://demo-resolver.tradetrust.io/");

  await t.expect(InputApiHeader.value).eql("");
  await t.typeText(InputApiHeader, "x-api-key");
  await t.expect(InputApiHeader.value).contains("x-api-key");

  await t.expect(InputApiKey.value).eql("");
  await t.typeText(InputApiKey, "DEMO");
  await t.expect(InputApiKey.value).contains("DEMO");

  await t.click(ButtonSave);
  await t.click(ButtonGotIt);
  await t.expect(IconEdit.count).eql(1);

  await t.click(IconEdit);
  await t.typeText(InputName, " edited");
  await t.expect(InputName.value).contains("Demo edited");
  await t.click(ButtonSave);
  await t.click(ButtonGotIt);
});
