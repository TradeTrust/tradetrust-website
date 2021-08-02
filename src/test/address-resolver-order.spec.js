import { Selector, ClientFunction } from "testcafe";
import { validateTextContent, location, navigateToAddressResolver } from "./helper";

const setLocalStorageItem = ClientFunction((key, value) => window.localStorage.setItem(key, value));
const pageUrl = `${location}`;
fixture("Address Resolver - Order")
  .page(pageUrl)
  .beforeEach(async (t) => {
    await setLocalStorageItem(
      "ADDRESS_THIRD_PARTY_ENDPOINTS",
      JSON.stringify([
        {
          name: "Demo 1",
          endpoint: "https://demo-resolver.tradetrust.io",
          apiHeader: "x-api-key",
          apiKey: "DEMO",
          path: { addressResolution: "/identifier" },
        },
        {
          name: "Demo 2",
          endpoint: "https://demo-resolver.tradetrust.io",
          apiHeader: "x-api-key",
          apiKey: "DEMO",
          path: { addressResolution: "/identifier" },
        },
      ])
    );
    await t.navigateTo(pageUrl); // https://github.com/DevExpress/testcafe/issues/1916#issuecomment-339467795
  });

const EndpointEntryRow = Selector("[data-testid='endpoint-entry-row']");
const EndpointEntryRow1 = EndpointEntryRow.find("[data-testid='endpoint-entry-id']")
  .withText("1")
  .parent("[data-testid='endpoint-entry-row']");
const EndpointEntryRow2 = EndpointEntryRow.find("[data-testid='endpoint-entry-id']")
  .withText("2")
  .parent("[data-testid='endpoint-entry-row']");
const IconMoveUp2 = EndpointEntryRow2.find("[data-testid='endpoint-entry-move-up']");
const IconMoveUp1 = EndpointEntryRow1.find("[data-testid='endpoint-entry-move-up']");
const IconMoveDown1 = EndpointEntryRow1.find("[data-testid='endpoint-entry-move-down']");

test("Address Resolver first entry click up arrow should not move", async (t) => {
  await navigateToAddressResolver();
  await t.hover(EndpointEntryRow1);
  await t.click(IconMoveUp1);
  await validateTextContent(t, EndpointEntryRow1, ["Demo 1"]);
});

test("Address Resolver first entry click down arrow should move down", async (t) => {
  await navigateToAddressResolver();
  await t.hover(EndpointEntryRow1);
  await t.click(IconMoveDown1);
  await validateTextContent(t, EndpointEntryRow1, ["Demo 2"]);
});

test("Address Resolver second entry click arrow up should move up", async (t) => {
  await navigateToAddressResolver();
  await t.hover(EndpointEntryRow2);
  await t.click(IconMoveUp2);
  await validateTextContent(t, EndpointEntryRow1, ["Demo 2"]);
});
