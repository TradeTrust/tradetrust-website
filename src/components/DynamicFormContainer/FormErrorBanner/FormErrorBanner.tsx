import React, { FunctionComponent, useState } from "react";
import { ChevronDown } from "react-feather";
import { AjvErrorMessage } from "./../../UI/AjvError";
import { FormErrors } from "../../../types";
import { IconError } from "@tradetrust-tt/tradetrust-ui-components";

interface FormErrorBanner {
  formErrorTitle: string | null;
  formErrors: FormErrors;
}

/**
 * FormErrorBanner
 * Shows a list of ajv errors for end user to self-diagnose and error recovery
 * @param formErrorTitle Custom error message title
 * @param formError Array of errors generated from ajv validation
 */
export const FormErrorBanner: FunctionComponent<FormErrorBanner> = ({ formErrorTitle, formErrors }) => {
  const [showAll, setShowAll] = useState(false);
  if (!formErrors || !(formErrors.length > 0)) return null;
  const visibleErrors = showAll ? formErrors : formErrors?.slice(0, 1);

  return (
    <div data-testid="form-error-banner" className="relative bg-red-100 rounded-lg mx-auto flex p-6 mt-4">
      {/* Top-right Show more/less */}
      {formErrors?.length > 1 && (
        <div
          onClick={() => setShowAll(!showAll)}
          className="absolute top-4 right-4 flex items-center font-gilroy-bold text-blue-600 text-sm hover:text-blue-700 transition-colors mt-2"
        >
          <span className="mr-1">{showAll ? "Show Less" : "Show More"}</span>
          <ChevronDown className={`w-4 h-4 transform transition-transform ${showAll ? "rotate-180" : "rotate-0"}`} />
        </div>
      )}
      <div className="flex">
        <IconError className="mr-2 w-5 h-5 shrink-0" />
        <div className="flex flex-col">
          {/* Title */}
          <p className="text-lg leading-none font-gilroy-bold mb-2">{formErrorTitle}</p>
          {/* Error messages */}
          <div className="flex flex-col space-y-1">
            {visibleErrors.map((error, index: number) => (
              <AjvErrorMessage key={index} error={error} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
