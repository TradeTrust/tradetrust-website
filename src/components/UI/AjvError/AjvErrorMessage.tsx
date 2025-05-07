import { ValidationError } from "@apideck/better-ajv-errors";
import React, { FunctionComponent } from "react";

export const AjvErrorMessage: FunctionComponent<{ error: ValidationError }> = ({ error }) => {
  const { message = "" } = error ?? {};

  return (
    <ul className="list-disc list-outside pl-5 text-left">
      <li>
        <h6 data-testid="ajv-error-msg">
          <span className="font-semibold">{message}</span>
        </h6>
      </li>
    </ul>
  );
};
