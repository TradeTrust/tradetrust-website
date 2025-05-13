import React, { FunctionComponent } from "react";
import { FilePlus } from "react-feather";
import { LabelButton } from "../Button";

interface CsvUploadButtonProps {
  handleLocalAddressBookCsv: (csvFile: File) => Promise<void>;
}

export const CsvUploadButton: FunctionComponent<CsvUploadButtonProps> = ({ handleLocalAddressBookCsv }) => {
  const handleUploadedFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    try {
      const csvFile = event.target.files && event.target.files[0];
      if (!csvFile) throw new Error("No file selected");
      handleLocalAddressBookCsv(csvFile);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message || e);
      }
    }
  };
  return (
    <div className="ml-2">
      <input
        id="csv-file-input"
        type="file"
        name="file"
        onChange={handleUploadedFile}
        style={{ display: "none" }}
        accept=".csv"
      />
      <LabelButton className="bg-white text-cerulean-500 rounded-xl hover:bg-gray-50" htmlFor="csv-file-input">
        <div className="flex items-center mx-0">
          <div className="col-auto mr-2">
            <FilePlus />
          </div>
          <div className="col-auto">Import</div>
        </div>
      </LabelButton>
    </div>
  );
};
