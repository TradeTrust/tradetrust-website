import Ajv, { ErrorObject } from "ajv";
import { saveAs } from "file-saver";
import converter, { csv2jsonAsync } from "json-2-csv";
import { JsonSchema } from "json-schema-library";

export function readFileAsJson<T>(file: File): Promise<T> {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    if (reader.error) {
      reject(reader.error);
    }
    reader.onload = () => {
      try {
        const json: T = JSON.parse(reader.result as string);
        resolve(json);
      } catch (e) {
        reject(e);
      }
    };
    reader.readAsText(file);
  });
}

export function readFileAsCsv(file: File): Promise<Array<JSON>> {
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    if (reader.error) {
      reject(reader.error);
    }
    reader.onload = async () => {
      const data: JSON[] = await csv2jsonAsync(reader.result as string);
      resolve(data);
    };
    reader.readAsText(file);
  });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const downloadCsvDataFile = (jsonTemplate: any): void => {
  converter.json2csv(jsonTemplate, (err, csv) => {
    if (err) {
      throw err;
    }
    if (!csv) {
      throw new Error("There seem to be an error in the CSV data file you are downloading, please try again later.");
    }

    const csvBlob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    saveAs(csvBlob, "sample-data.csv");
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const downloadJsonDataFile = (jsonTemplate: any): void => {
  const jsonData = JSON.stringify({ data: jsonTemplate });

  const jsonBlob = new Blob([jsonData], { type: "text/json;charset=utf-8" });
  saveAs(jsonBlob, "sample-data.json");
};

/*
 * getDataV3
 * Omit fields that are VC + OA V3 related, we are only interested in document data.
 */
export const getDataV3: any = (data: any) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    version,
    type,
    issuanceDate,
    openAttestationMetadata,
    issuer,
    credentialSubject,
    attachments,
    network,
    ...rest
  } = data; // omit these fields
  /* eslint-enable @typescript-eslint/no-unused-vars */

  delete rest["@context"]; // omit these fields
  return rest;
};

/*
 * getDataV2
 * Omit fields that are OA V2 related, we are only interested in document data.
 */
const getDataV2: any = (data: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { issuers, $template, ownership, attachments, network, ...rest } = data; // omit these fields
  return rest;
};

/*
 * getData
 * Omit fields that are EBL related, we are only interested in document data.
 */
const getData: any = (data: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ownership, ...rest } = data; // omit these fields
  return rest;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const hasVcContext = (document: any) => {
  return !!document["@context"]; // Unable to use utils.isRawV3Document, due how document data is handled throughout the application
};

const hasTemplate = (document: any) => {
  return !!document["$template"]; // Unable to use utils.isRawV2Document, due how document data is handled throughout the application
};

/*
 * getDataToValidate
 * Omit fields that are interfering with ajv validation rule of `additionalProperties`, returning back data in correct shape.
 * This function is a hotfix to enable proper ajv validation, while not breaking existing flows of:
 * 1. data file upload flow - single document, data populated by json file.
 * 2. data file upload flow - multiple documents, data populated by csv file.
 * 3. user input flow - single document, data manually filled by user.
 */
export const getDataToValidate: any = (data: any) => {
  if (hasVcContext(data)) {
    return getDataV3(data);
  } else if (hasTemplate(data)) {
    return getDataV2(data);
  } else {
    return getData(data);
  }
};

export const validateData = (
  schema: JsonSchema,
  data: unknown
): { isValid: boolean; ajvErrors: ErrorObject[] | null | undefined } => {
  const ajv = new Ajv({ allErrors: true });
  const isValid = ajv.validate(schema, data);

  return { isValid, ajvErrors: ajv.errors };
};
