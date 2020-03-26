import { Selector } from "testcafe";

fixture("Load AddressBook").page`http://localhost:3000`;

const Document = "./fixture/maersk-bill-of-lading.tt";
const AddressBook = "./fixture/local-addressbook.csv";

const TitleTransferPanel = Selector("#title-transfer-panel");
const StatusButton = Selector("#certificate-status");
const BeneficiaryName = Selector("[class^='TitleView']:nth-of-type(1)").find("h5");
const HolderName = Selector("[class^='TitleView']:nth-of-type(2)").find("h5");
const OverlayAddressBook = Selector("#overlay-addressbook");
const ButtonUploadAddressBook = Selector("button").withText("Upload Address Book");
const CSVFileInput = Selector("#csv-file-input");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("AddressBook local names to be resolved correctly", async t => {
  await t.setFilesToUpload("input[type=file]", [Document]);
  await TitleTransferPanel.with({ visibilityCheck: true })();
  await validateTextContent(t, StatusButton, ["Issued by TRADETRUST.IO"]);

  await t.click(ButtonUploadAddressBook);
  await OverlayAddressBook.with({ visibilityCheck: true })();
  await t.setFilesToUpload(CSVFileInput, [AddressBook]);
  await validateTextContent(t, BeneficiaryName, ["Bank of China"]);
  await validateTextContent(t, HolderName, ["DBS"]);
});
