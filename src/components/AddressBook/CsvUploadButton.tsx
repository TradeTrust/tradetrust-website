import React from "react";
import { parse } from "papaparse";
import { useAddressBook, AddressBook } from "../../common/hooks/useAddressBook";

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
    const identifierText = row.Identifier || row.identifier;
    const addressText = row.Address || row.address;
    if (!identifierText) throw new Error(`Row ${index} does not have an identifer`);
    if (!addressText) throw new Error(`Row ${index} does not have an address`);
    addressBook[addressText] = identifierText;
  });
  return addressBook;
};

export const CsvUploadButton = () => {
  const { setAddressBook } = useAddressBook();
  const handleUploadedFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const csvFile = event.target.files && event.target.files[0];
    if (!csvFile) return;
    const csv = await readAsText(csvFile);
    const addressBook = csvToAddressBook(csv);
    setAddressBook(addressBook);
  };
  return <input type="file" name="file" onChange={handleUploadedFile} />;
};

export const RawAddressBookData = () => {
  const { addressBook } = useAddressBook();
  return <div>{JSON.stringify(addressBook)}</div>;
};
