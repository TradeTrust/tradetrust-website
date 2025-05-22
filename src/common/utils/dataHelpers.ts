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
 * getDataW3C
 * Omit fields that are W3C related, we are only interested in document data.
 */
export const getDataW3C: any = (data: any) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { renderMethod, credentialSubject, ...rest } = data; // omit these fields

  delete rest["@context"]; // omit these fields
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
    return getDataW3C(data);
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

type AnyObject = Record<string, any>;

function isNonEmptyObject(obj: any): boolean {
  return (
    obj &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    Object.keys(obj).some((key) => {
      const val = obj[key];
      return (
        val !== null && val !== undefined && (typeof val !== "object" || isNonEmptyObject(val) || Array.isArray(val))
      );
    })
  );
}

function deepClean(data: any): any {
  if (Array.isArray(data)) {
    const cleanedArray = data
      .map(deepClean)
      .filter(
        (item) =>
          item !== null &&
          item !== undefined &&
          ((typeof item === "object" && isNonEmptyObject(item)) || typeof item !== "object")
      );
    return cleanedArray.length > 0 ? cleanedArray : undefined;
  }

  if (typeof data === "object" && data !== null) {
    const cleaned: AnyObject = {};
    for (const key in data) {
      const value = deepClean(data[key]);
      if (
        value !== null &&
        value !== undefined &&
        (typeof value !== "object" || isNonEmptyObject(value) || Array.isArray(value))
      ) {
        cleaned[key] = value;
      }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }

  return data;
}

function flattenNested(obj: AnyObject): AnyObject {
  const result: AnyObject = {};

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      const nested = flattenNested(value);
      Object.assign(result, nested);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function flattenData(obj: AnyObject): AnyObject {
  const cleaned = deepClean(obj) || {};

  function recurse(value: any): any {
    if (Array.isArray(value)) {
      return value
        .map((item) => {
          if (typeof item === "object" && item !== null) {
            return recurse(item);
          }
          return item;
        })
        .filter((item) => item !== undefined && (typeof item !== "object" || Object.keys(item).length > 0));
    }

    if (typeof value === "object" && value !== null) {
      const flat: AnyObject = {};
      for (const key in value) {
        const val = value[key];
        if (Array.isArray(val)) {
          flat[key] = recurse(val);
        } else if (typeof val === "object" && val !== null) {
          Object.assign(flat, flattenNested(val));
        } else {
          flat[key] = val;
        }
      }
      return flat;
    }

    return value;
  }

  return recurse(cleaned);
}
