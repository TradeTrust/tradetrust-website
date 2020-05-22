import { Selector } from "testcafe";

fixture("Address Resolver").page`http://localhost:3000`;

const ButtonAdd = Selector("button").withText("Add");
const TableBodyRow = Selector("tbody > tr");
const TableBodyRowLatest = Selector("tbody > tr:last-child");
const InputName = TableBodyRow.find("input[placeholder='Name']");
const InputEndpoint = TableBodyRow.find("input[placeholder='Endpoint']");
const IconSave = TableBodyRow.find("td:last-child").find("g.save").parent("svg");
const IconEdit = TableBodyRow.find("td:last-child").find("g.edit2").parent("svg");
const IconTrash = TableBodyRow.find("td:last-child").find("g.trash2").parent("svg");
const IconTrashLatest = TableBodyRowLatest.find("td:last-child").find("g.trash2").parent("svg");
const OverlayContent = Selector(".overlay-content");
const OverlayButtonDelete = OverlayContent.find("button").withText("Delete");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Address Resolver to be added, edited and removed correctly", async (t) => {
  await t.navigateTo("/settings");

  await t.click(ButtonAdd).expect(ButtonAdd.hasAttribute("disabled")).ok();
  await validateTextContent(t, TableBodyRow, ["1"]);

  await t.click(IconTrash);
  await validateTextContent(t, TableBodyRow, ["No third party's endpoint found."]);
  await t.expect(ButtonAdd.hasAttribute("disabled")).notOk();

  await t.click(ButtonAdd);

  await t.expect(InputName.value).eql("");
  await t.typeText(InputName, "Demo");
  await t.expect(InputName.value).contains("Demo");

  await t.expect(InputEndpoint.value).eql("");
  await t.typeText(InputEndpoint, "http://demo-resolver.tradetrust.io/identifier/");
  await t.expect(InputEndpoint.value).contains("http://demo-resolver.tradetrust.io/identifier/");

  await t.click(IconSave);
  await t.expect(IconEdit.count).eql(1);

  await t.click(IconEdit);
  await t.typeText(InputName, " edited");
  await t.expect(InputName.value).contains("Demo edited");
  await t.click(IconSave);

  await t.click(ButtonAdd);
  await t.expect(TableBodyRow.count).eql(2);
  await t.click(IconTrashLatest);
  await t.expect(TableBodyRow.count).eql(1);

  await t.click(IconTrash);
  await validateTextContent(t, OverlayContent, ["Are you sure you want to delete Demo edited?"]);
  await t.click(OverlayButtonDelete);
  await validateTextContent(t, TableBodyRow, ["No third party's endpoint found."]);
});
