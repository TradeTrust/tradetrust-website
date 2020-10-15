import React, { FunctionComponent } from "react";
// import { parse } from "papaparse";
import { useAddressBook, readAsText, csvToAddressBook } from "@govtechsg/address-identity-resolver";
import { FilePlus } from "react-feather";
import { LabelWhiteSecondary } from "../UI/Button";

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
    <div className="my-auto ml-md-2">
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
            <FilePlus />
          </div>
          <div className="col-auto">Import .csv</div>
        </div>
      </LabelWhiteSecondary>
    </div>
  );
};

//Todo: Unused....
export const RawAddressBookData = () => {
  const { addressBook } = useAddressBook();
  return <pre>{JSON.stringify(addressBook, null, 2)}</pre>;
};
