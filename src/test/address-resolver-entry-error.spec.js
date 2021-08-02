import { Selector } from "testcafe";
import { validateTextContent, location, navigateToAddressResolver } from "./helper";

fixture("Address Resolver - Error").page`${location}`;

const EndpointEntryRow = Selector("[data-testid='endpoint-entry-row']");

const InputName = EndpointEntryRow.find("input[placeholder='Name']");
const InputEndpoint = EndpointEntryRow.find("input[placeholder='Endpoint']");
const InputApiHeader = EndpointEntryRow.find("input[placeholder='API Header']");
const InputApiKey = EndpointEntryRow.find("input[placeholder='API Key']");

const ButtonAdd = Selector("button").withText("Add");
const ButtonSave = Selector("button").withText("Save");
const ButtonGotIt = Selector("button").withText("Okay, got it");

const ErrorMsgName = Selector("p").withText("Name must not be blank.");
const ErrorMsgNetwork = Selector("p").withText("Network Error");
const ErrorMsgEndpointExists = Selector("p").withText("Endpoint already exists");

test("Address Resolver should show the correct error messages on save", async (t) => {
  await navigateToAddressResolver();
  await t.click(ButtonAdd);

  await t.click(ButtonSave);
  await t.expect(ErrorMsgName.exists).ok();

  await t.typeText(InputName, "Demo");
  await t.click(ButtonSave);
  await validateTextContent(t, EndpointEntryRow, ["Endpoint must not be blank."]);

  await t.typeText(InputEndpoint, "https://demo-resolver2.tradetrust.io/");
  await t.click(ButtonSave);
  await t.expect(ErrorMsgNetwork.exists).ok();

  await t.selectText(InputEndpoint).pressKey("delete");
  await t.typeText(InputEndpoint, "https://demo-resolver.tradetrust.io/");

  // "API Header must not be blank." // TODO
  await t.typeText(InputApiHeader, "x-api-key");

  // "API Key must not be blank.";  // TODO
  await t.typeText(InputApiKey, "DEMO");
  await t.click(ButtonSave);

  await t.click(ButtonGotIt);

  await t.click(ButtonAdd);
  await t.typeText(InputName, "Demo 2");
  await t.typeText(InputEndpoint, "https://demo-resolver.tradetrust.io/");
  await t.click(ButtonSave);
  await t.expect(ErrorMsgEndpointExists.exists).ok();
});
