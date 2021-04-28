import { Selector } from "testcafe";
import { validateTextContent } from "./helper";

fixture("Address Resolver").page`http://localhost:3000`;

const LinkSettings = Selector("a[href='/settings']");
const LinkSettingsAddressResolver = Selector("a[href='/settings/address-resolver']");
const ButtonAdd = Selector("button").withText("Add");
const TableBodyRows = Selector("tbody > tr");
const TableBodyRow1 = Selector("tbody > tr:first-child");
const TableBodyRow2 = Selector("tbody > tr:last-child");
const InputName1 = TableBodyRow1.find("input[placeholder='Name']");
const InputEndpoint1 = TableBodyRow1.find("input[placeholder='Endpoint']");
const InputApiHeader2 = TableBodyRow2.find("input[placeholder='API Header']");
const InputApiKey2 = TableBodyRow2.find("input[placeholder='API Key']");
const InputName2 = TableBodyRow2.find("input[placeholder='Name']");
const InputEndpoint2 = TableBodyRow2.find("input[placeholder='Endpoint']");
const IconSave1 = TableBodyRow1.find("td:last-child").find("[data-testid='save-icon']");
const IconEdit1 = TableBodyRow1.find("td:last-child").find("[data-testid='edit-icon']");
const IconSave2 = TableBodyRow2.find("td:last-child").find("[data-testid='save-icon']");
const IconTrash1 = TableBodyRow1.find("td:last-child").find("[data-testid='trash2-icon']");
const IconMoveDown1 = TableBodyRow1.find("th .fa-sort-down");
const IconMoveUp2 = TableBodyRow2.find("th .fa-sort-up");

test("Address Resolver to be added, edited, moved and removed correctly", async (t) => {
  await t.click(LinkSettings);
  console.log(await LinkSettingsAddressResolver.count);
  t.click(LinkSettingsAddressResolver);

  // should show only 1 row with no endpoint found text
  await validateTextContent(t, TableBodyRow1, ["No third party's endpoint found."]);

  // should show disabled button when clicked on add
  await t.click(ButtonAdd).expect(ButtonAdd.hasAttribute("disabled")).ok();
  await validateTextContent(t, TableBodyRow1, ["1"]);

  // should show the default look again when trashed the only entry
  await t.click(IconTrash1);
  await validateTextContent(t, TableBodyRow1, ["No third party's endpoint found."]);
  await t.expect(ButtonAdd.hasAttribute("disabled")).notOk();

  // should save input values correctly
  await t.click(ButtonAdd);

  await t.expect(InputName1.value).eql("");
  await t.typeText(InputName1, "Demo");
  await t.expect(InputName1.value).contains("Demo");

  await t.expect(InputEndpoint1.value).eql("");
  await t.typeText(InputEndpoint1, "https://demo-resolver.tradetrust.io/");
  await t.expect(InputEndpoint1.value).contains("https://demo-resolver.tradetrust.io/");

  await t.expect(InputApiHeader2.value).eql("");
  await t.typeText(InputApiHeader2, "x-api-key");
  await t.expect(InputApiHeader2.value).contains("x-api-key");

  await t.expect(InputApiKey2.value).eql("");
  await t.typeText(InputApiKey2, "DEMO");
  await t.expect(InputApiKey2.value).contains("DEMO");

  await t.click(IconSave1);
  await t.expect(IconEdit1.count).eql(1);

  // should be able to edit and save correctly
  await t.click(IconEdit1);
  await t.typeText(InputName1, " edited");
  await t.expect(InputName1.value).contains("Demo edited");
  await t.click(IconSave1);

  // should show the correct error messages on save
  await t.click(ButtonAdd);
  await t.expect(TableBodyRows.count).eql(2);

  await t.click(IconSave2);
  await validateTextContent(t, TableBodyRow2, ["Name must not be blank."]);
  await t.typeText(InputName2, "Demo 2");

  await t.click(IconSave2);
  await validateTextContent(t, TableBodyRow2, ["Endpoint must not be blank."]);
  await t.typeText(InputEndpoint2, "https://demo-resolver.tradetrust.io/");

  await t.click(IconSave2);
  await validateTextContent(t, TableBodyRow2, ["Endpoint already exists."]);
  await t.selectText(InputEndpoint2).pressKey("delete");
  await t.typeText(InputEndpoint2, "https://demo-resolver2.tradetrust.io/");
  await t.click(IconSave2);
  await validateTextContent(t, TableBodyRow2, ["Network Error"]);

  await t.expect(InputApiHeader2.value).eql("");
  await t.typeText(InputApiHeader2, "api_header");
  await t.expect(InputApiHeader2.value).contains("api_header");

  await t.click(IconSave2);
  await validateTextContent(t, TableBodyRow2, ["API Key must not be blank."]);
  await t.selectText(InputApiHeader2).pressKey("delete");

  await t.expect(InputApiKey2.value).eql("");
  await t.typeText(InputApiKey2, "api_key");
  await t.expect(InputApiKey2.value).contains("api_key");

  await t.click(IconSave2);
  await validateTextContent(t, TableBodyRow2, ["API Header must not be blank."]);
});

test("should allow sorting of priority of providers", async (t) => {
  await t.click(LinkSettings);
  console.log(await LinkSettingsAddressResolver.count);
  t.click(LinkSettingsAddressResolver);

  // should show only 1 row with no endpoint found text
  await validateTextContent(t, TableBodyRow1, ["No third party's endpoint found."]);

  // should save input values correctly
  await t.click(ButtonAdd);

  await t.expect(InputName1.value).eql("");
  await t.typeText(InputName1, "Demo 1");
  await t.expect(InputName1.value).contains("Demo 1");

  await t.expect(InputEndpoint1.value).eql("");
  await t.typeText(InputEndpoint1, "https://demo-resolver.tradetrust.io/");
  await t.expect(InputEndpoint1.value).contains("https://demo-resolver.tradetrust.io/");

  await t.expect(InputApiHeader2.value).eql("");
  await t.typeText(InputApiHeader2, "x-api-key");
  await t.expect(InputApiHeader2.value).contains("x-api-key");

  await t.expect(InputApiKey2.value).eql("");
  await t.typeText(InputApiKey2, "DEMO");
  await t.expect(InputApiKey2.value).contains("DEMO");

  await t.click(IconSave1);
  await t.expect(IconEdit1.count).eql(1);

  // Second endpoint
  await t.click(ButtonAdd);

  await t.expect(InputName2.value).eql("");
  await t.typeText(InputName2, "Demo 2");
  await t.expect(InputName2.value).contains("Demo 2");

  await t.expect(InputEndpoint2.value).eql("");
  await t.typeText(
    InputEndpoint2,
    "https://gist.githubusercontent.com/yehjxraymond/67990bb6a7d5b0f635461196aac1f9d9/raw/2051dd54d44627d717431aad856d4a0e117db434/features.json"
  );
  await t
    .expect(InputEndpoint2.value)
    .contains(
      "https://gist.githubusercontent.com/yehjxraymond/67990bb6a7d5b0f635461196aac1f9d9/raw/2051dd54d44627d717431aad856d4a0e117db434/features.json"
    );

  await t.click(IconSave2);
  await t.expect(TableBodyRows.count).eql(2);

  // should be able to sort order
  await t.hover(TableBodyRow2);
  await t.click(IconMoveUp2);
  await validateTextContent(t, TableBodyRow2, ["Demo 1"]);

  await t.hover(TableBodyRow1);
  await t.click(IconMoveDown1);
  await validateTextContent(t, TableBodyRow2, ["Demo 2"]);
});
