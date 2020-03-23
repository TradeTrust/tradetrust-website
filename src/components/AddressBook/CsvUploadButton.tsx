import React from "react";
import web3 from "web3";
import { parse } from "papaparse";
import { useAddressBook, AddressBook } from "../../common/hooks/useAddressBook";
import { ButtonBordered } from "../UI/Button";

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

const csvToAddressBook = (csv: string) => {
  const { data } = parse(csv, { skipEmptyLines: true, header: true });
  const addressBook: AddressBook = {};
  data.forEach((row, index) => {
    const identifierText: string = row.Identifier || row.identifier;
    const addressText: string = row.Address || row.address;
    if (!identifierText) throw new Error(`Row ${index} does not have an identifer`);
    if (!addressText) throw new Error(`Row ${index} does not have an address`);
    if (!web3.utils.isAddress(addressText))
      throw new Error(`${addressText} in row ${index} is not a valid Ethereum address`);
    addressBook[addressText.toLowerCase()] = identifierText;
  });
  return addressBook;
};

export const CsvUploadButton = () => {
  const { setAddressBook } = useAddressBook();
  const handleUploadedFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const csvFile = event.target.files && event.target.files[0];
      if (csvFile?.type !== "text/csv") throw new Error("Uploaded file is not a csv file");
      const csv = await readAsText(csvFile);
      const addressBook = csvToAddressBook(csv);
      setAddressBook(addressBook);
    } catch (e) {
      alert(e.message || e);
    }
  };
  return (
    <div className="my-auto ml-2">
      <ButtonBordered color="tertiary">
        <>
          <input
            id="csv-file-input"
            type="file"
            name="file"
            onChange={handleUploadedFile}
            style={{ display: "none" }}
            accept=".csv"
          />
          <label className="mb-0" style={{ cursor: "pointer" }} htmlFor="csv-file-input">
            Upload Address Book
          </label>
        </>
      </ButtonBordered>
    </div>
  );
};

export const RawAddressBookData = () => {
  const { addressBook } = useAddressBook();
  return <pre>{JSON.stringify(addressBook, null, 2)}</pre>;
};
