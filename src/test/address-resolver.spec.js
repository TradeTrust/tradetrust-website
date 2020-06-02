import { Selector } from "testcafe";

fixture("Address Resolver").page`http://localhost:3000`;

const LinkSettings = Selector("a[href='/settings']");
const ButtonAdd = Selector("button").withText("Add");
const TableBodyRows = Selector("tbody > tr");
const TableBodyRow1 = Selector("tbody > tr:first-child");
const TableBodyRow2 = Selector("tbody > tr:last-child");
const InputName1 = TableBodyRow1.find("input[placeholder='Name']");
const InputEndpoint1 = TableBodyRow1.find("input[placeholder='Endpoint']");
const InputName2 = TableBodyRow2.find("input[placeholder='Name']");
const InputEndpoint2 = TableBodyRow2.find("input[placeholder='Endpoint']");
const IconSave2 = TableBodyRow2.find("td:last-child").find("g.save").parent("svg");
const IconEdit2 = TableBodyRow2.find("td:last-child").find("g.edit2").parent("svg");
const IconTrash1 = TableBodyRow1.find("td:last-child").find("g.trash2").parent("svg");
const IconMoveDown1 = TableBodyRow1.find("th .fa-sort-down");
const IconMoveUp2 = TableBodyRow2.find("th .fa-sort-up");
const OverlayContent = Selector(".overlay-content");
const OverlayButtonDelete = OverlayContent.find("button").withText("Delete");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Address Resolver to be added, edited, moved and removed correctly", async (t) => {
  await t.click(LinkSettings);

  await validateTextContent(t, TableBodyRow1, ["No third party's endpoint found."]);
  await t.click(ButtonAdd).expect(ButtonAdd.hasAttribute("disabled")).ok();
  await validateTextContent(t, TableBodyRow1, ["1"]);

  await t.click(IconTrash1);
  await validateTextContent(t, TableBodyRow1, ["No third party's endpoint found."]);
  await t.expect(ButtonAdd.hasAttribute("disabled")).notOk();

  await t.click(ButtonAdd);

  await t.expect(InputName1.value).eql("");
  await t.typeText(InputName1, "Demo");
  await t.expect(InputName1.value).contains("Demo");

  await t.expect(InputEndpoint1.value).eql("");
  await t.typeText(InputEndpoint1, "http://demo-resolver.tradetrust.io/identifier/");
  await t.expect(InputEndpoint1.value).contains("http://demo-resolver.tradetrust.io/identifier/");

  await t.click(IconSave2);
  await t.expect(IconEdit2.count).eql(1);

  await t.click(IconEdit2);
  await t.typeText(InputName1, " edited");
  await t.expect(InputName1.value).contains("Demo edited");
  await t.click(IconSave2);

  await t.click(ButtonAdd);
  await t.expect(TableBodyRows.count).eql(2);

  await t.click(IconSave2);
  await validateTextContent(t, TableBodyRow2, ["Name must not be blank."]);

  await t.typeText(InputName2, "Demo 2");
  await t.click(IconSave2);
  await validateTextContent(t, TableBodyRow2, ["Endpoint must not be blank."]);

  await t.typeText(InputEndpoint2, "http://demo-resolver.tradetrust.io/identifier/");
  await t.click(IconSave2);
  await validateTextContent(t, TableBodyRow2, ["Endpoint already exists."]);

  await t.selectText(InputEndpoint2).pressKey("delete");
  await t.typeText(InputEndpoint2, "http://demo-resolver2.tradetrust.io/identifier/");
  await t.click(IconSave2);

  await t.hover(TableBodyRow2);
  await t.click(IconMoveUp2);
  await validateTextContent(t, TableBodyRow2, ["Demo edited"]);

  await t.hover(TableBodyRow1);
  await t.click(IconMoveDown1);
  await validateTextContent(t, TableBodyRow2, ["Demo 2"]);

  await t.click(IconTrash1);
  await validateTextContent(t, OverlayContent, ["Are you sure you want to delete Demo edited?"]);
  await t.click(OverlayButtonDelete);
  await t.expect(TableBodyRow1.count).eql(1);
});
