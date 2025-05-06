import React, { FunctionComponent } from "react";
import { ErrorObject } from "ajv";

export const AjvErrorMessage: FunctionComponent<{ error: ErrorObject }> = (props) => {
  const { params } = props.error;

  return (
    <ul className="list-disc list-outside pl-5 text-left">
      {Object.keys(params).map((key, index) => {
        return (
          <li key={index}>
            <h6 data-testid="ajv-error-msg">
              <span className="font-semibold">{key}</span>: {params[key]}
            </h6>
          </li>
        );
      })}
    </ul>
  );
};
