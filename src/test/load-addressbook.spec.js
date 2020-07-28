import { Selector } from "testcafe";

fixture("Load AddressBook").page`http://localhost:3000`;

const Document = "./fixture/ebl.json";
const AddressBook = "./fixture/local-addressbook.csv";

const TitleTransferPanel = Selector("#title-transfer-panel");
const BeneficiaryName = Selector("th").withText("Bank of China");
const HolderName = Selector("th").withText("DBS");
const OverlayAddressBook = Selector("[data-testid='overlay-addressbook']");
const OverlayAddressBookTableBodyRows = Selector("[data-testid='overlay-addressbook'] tbody tr");
const OverlayAddressBookTableFirstRow = Selector("[data-testid='overlay-addressbook'] tbody tr:first-of-type");
const OverlayAddressBookSearchInput = Selector("[data-testid='overlay-addressbook'] input[type='text']");
const ButtonUploadAddressBook = Selector("[data-testid='multi-button'] button").withText("Address Book");
const CSVFileInput = Selector("#csv-file-input");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("AddressBook local names to be resolved correctly, search filtered to 1", async (t) => {
  const container = Selector("#certificate-dropzone");
  await container();
  await t.setFilesToUpload("input[type=file]", [Document]);
  await TitleTransferPanel.with({ visibilityCheck: true })();
  await t.expect(ButtonUploadAddressBook.count).eql(1);

  await t.click(ButtonUploadAddressBook);
  await OverlayAddressBook.with({ visibilityCheck: true })();
  await validateTextContent(t, OverlayAddressBookTableFirstRow.find("td"), ["No Address found."]);

  await t.setFilesToUpload(CSVFileInput, [AddressBook]);
  await t.expect(OverlayAddressBookTableBodyRows.count).notEql(0);
  await validateTextContent(t, BeneficiaryName, ["Bank of China"]);
  await validateTextContent(t, HolderName, ["DBS"]);

  await t.typeText(OverlayAddressBookSearchInput, "Bank of China");
  await t.expect(OverlayAddressBookTableFirstRow.visible).ok();
  await t.expect(OverlayAddressBookTableFirstRow.nextSibling().visible).notOk();
});
