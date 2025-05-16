import { Button } from "../../Button";
import React, { FunctionComponent, useState } from "react";
import {
  readFileAsCsv,
  readFileAsJson,
  downloadCsvDataFile,
  downloadJsonDataFile,
} from "../../../common/utils/dataHelpers";
import { getLogger } from "../../../utils/logger";
import { FormErrorBanner } from "./../FormErrorBanner";
import { Draft04 as Core, JsonSchema } from "json-schema-library";
import { ToolTip } from "../../UI/ToolTip";
import { StyledDropZone } from "../../UI/StyledDropZone";
import { validateData, getDataToValidate } from "../../../common/utils/dataHelpers";
import { FormErrors } from "./../../../types";
import { betterAjvErrors } from "@apideck/better-ajv-errors";

const { stack } = getLogger("DataFileButton");

const text = {
  header: "You can either upload data file(.JSON or .CSV) to pre-fill fields on this form or enter the fields manually",
  buttonText: "Upload Data File",
  downloadJson: "Download .JSON Data Schema",
  downloadCsv: "Download .CSV Data Schema",
};

type DataFileDefault = {
  data: unknown;
  ownership?: {
    beneficiaryAddress: string;
    holderAddress: string;
  };
};

type DataFileCsv = JSON[];

type DataFileUpload = DataFileDefault | DataFileCsv;

interface DataFileButton {
  onDataFile: (dataFile: unknown) => void;
  schema: JsonSchema;
}

interface GetDataFileBasedOnExtension {
  dataFile: DataFileUpload;
  dataToValidate: unknown;
}

const getDataFileBasedOnExtension = async (file: File): Promise<GetDataFileBasedOnExtension> => {
  let dataFile;
  let dataToValidate;

  switch (file.type) {
    case "application/json":
      dataFile = await readFileAsJson<DataFileDefault>(file);
      dataToValidate = getDataToValidate(dataFile.data);
      break;
    case "text/csv":
      dataFile = await readFileAsCsv(file);
      dataToValidate = getDataToValidate(dataFile[0]); // use 1 item for fields validation
      break;
    default:
      throw Error("Data file type not supported.");
  }

  return { dataFile, dataToValidate };
};

export const DataFileButton: FunctionComponent<DataFileButton> = ({ onDataFile, schema }) => {
  const [fileErrors, setFileErrors] = useState<Error[]>([]);
  const [formErrors, setFormErrors] = useState<FormErrors>();

  const onDropAccepted = async (files: File[]): Promise<void> => {
    try {
      const file = files[0];
      const { dataFile, dataToValidate } = await getDataFileBasedOnExtension(file);
      const { isValid, ajvErrors } = validateData(schema, dataToValidate);

      if (!isValid) {
        const betterErrors = betterAjvErrors({ schema, data: dataToValidate, errors: ajvErrors, basePath: "Form" });
        setFormErrors(betterErrors);
        return;
      }

      setFormErrors(null);
      onDataFile(dataFile);
    } catch (e) {
      if (e instanceof Error) {
        stack(e);
        setFileErrors([...fileErrors, e]);
      }
    }
  };

  const core = new Core(schema);
  const jsonTemplate = core.getTemplate(undefined, undefined, { addOptionalProps: true });

  const defaultStyle = "bg-white-50";
  const activeStyle = "bg-white-100";

  // TODO: when change to Tailwindcss v2 for ui Update please update the background color, or use a color that is closes to this color.
  return (
    <>
      {formErrors && (
        <div className="my-2" data-testid="file-schema-error">
          <FormErrorBanner formErrorTitle="Uploaded data file format has errors." formErrors={formErrors} />
        </div>
      )}
      <StyledDropZone
        dropzoneOptions={{
          onDropAccepted,
          multiple: false,
          accept: {
            "text/csv": [".csv"],
            "application/json": [".json"],
          },
        }}
        defaultStyle={defaultStyle}
        activeStyle={activeStyle}
        fileErrors={fileErrors}
        dropzoneIcon="/static/images/uploadicon/upload-icon-dark.png"
        dataTestId="data-file-dropzone"
      >
        <p className="text-center mb-4">{text.header}</p>
        <div className="mb-4">
          <Button
            data-testid="data-upload-button"
            className="w-[200px] bg-cerulean-500 text-white hover:bg-cerulean-800 mt-4"
          >
            {text.buttonText}
          </Button>
        </div>
      </StyledDropZone>

      <div className="flex flex-col md:flex-row text-sm text-cerulean-300 mt-4 px-4 gap-2 md:gap-4">
        <div className="flex items-center">
          <div
            className="mr-2 cursor-pointer hover:underline"
            data-testid="download-json-data-schema-button"
            onClick={() => downloadJsonDataFile(jsonTemplate)}
          >
            {text.downloadJson}
          </div>
          <ToolTip toolTipText="JSON Schema is a lightweight data interchange format that generates clear, easy-to-understand documentation, making validation and testing easier. JSON Schema is used to describe the structure and validation constraints of JSON documents." />
        </div>
        <div className="flex items-center">
          <div
            className="mr-2 cursor-pointer hover:underline"
            data-testid="download-csv-data-schema-button"
            onClick={() => downloadCsvDataFile(jsonTemplate)}
          >
            {text.downloadCsv}
          </div>
          <ToolTip toolTipText="CSV Schema defines a textual language which can be used to define the data structure, types and rules for CSV data formats. A CSV data file is a delimited text file that uses a comma to separate values. Each line of the file is a data record. Each record consists of one or more fields, separated by commas." />
        </div>
      </div>
    </>
  );
};
