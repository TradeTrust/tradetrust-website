import React from "react";
import { isAddress } from "web3-utils";
import { parse } from "papaparse";
import { useAddressBook, AddressBook } from "../../common/hooks/useAddressBook";
import { SvgIcon, SvgIconFilePlus } from "../UI/SvgIcon";
import { LabelWhiteSecondary } from "../UI/Button";

const readAsText = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (reader.error) {
      reject(reader.error);
    }
    reader.onload = () => resolve(reader.result as string);
    reader.readAsText(file);
  });
};

interface AddressBookCsvData {
  Identifier?: string;
  identifier?: string;
  Address?: string;
  address?: string;
}

const csvToAddressBook = (csv: string) => {
  const { data } = parse<AddressBookCsvData>(csv, { skipEmptyLines: true, header: true });
  const addressBook: AddressBook = {};
  data.forEach((row, index) => {
    const identifierText = row.Identifier || row.identifier;
    const addressText = row.Address || row.address;
    if (!identifierText) throw new Error(`Row ${index} does not have an identifer`);
    if (!addressText) throw new Error(`Row ${index} does not have an address`);
    if (!isAddress(addressText)) throw new Error(`${addressText} in row ${index} is not a valid Ethereum address`);
    addressBook[addressText.toLowerCase()] = identifierText;
  });
  return addressBook;
};

export const CsvUploadButton = () => {
  const { setAddressBook } = useAddressBook();
  const handleUploadedFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const csvFile = event.target.files && event.target.files[0];
      if (!csvFile) throw new Error("No file selected");
      const csv = await readAsText(csvFile);
      const addressBook = csvToAddressBook(csv);
      setAddressBook(addressBook);
    } catch (e) {
      alert(e.message || e);
    }
  };
  return (
    <div className="my-auto ml-2">
      <input
        id="csv-file-input"
        type="file"
        name="file"
        onChange={handleUploadedFile}
        style={{ display: "none" }}
        accept=".csv"
      />
      <LabelWhiteSecondary htmlFor="csv-file-input">
        <div className="row align-items-center no-gutters">
          <div className="col-auto mr-2">
            <SvgIcon>
              <SvgIconFilePlus />
            </SvgIcon>
          </div>
          <div className="col-auto">Import .csv</div>
        </div>
      </LabelWhiteSecondary>
    </div>
  );
};

export const RawAddressBookData = () => {
  const { addressBook } = useAddressBook();
  return <pre>{JSON.stringify(addressBook, null, 2)}</pre>;
};
