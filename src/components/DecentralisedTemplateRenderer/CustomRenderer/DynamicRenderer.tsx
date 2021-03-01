import "./index.css";
import React from "react";
import { get } from "lodash";

const DynamicRenderer = (props: any) => {
  const {
    doc: { metaData, additionalData },
  } = props;

  return (
    <table className="custom-template-renderer-table">
      <tbody>
        {/* Document type heading */}
        <tr>
          <td colSpan={2}>
            <h3 className="doc-type">{get(metaData, "documentType")}</h3>
          </td>
        </tr>
        {/* End of Document type heading */}

        {Object.keys(additionalData).map((key: string, keyIndex: number) => {
          const value = get(additionalData, key);
          if (typeof value === "string" || typeof value === "number") {
            return (
              <tr key={keyIndex}>
                <td>
                  <label>{key}</label>
                </td>
                <td>
                  <p>{value || `No value`}</p>
                </td>
              </tr>
            );
          } else if (typeof value === "object" || value.isArray()) {
            return (
              <tr key={keyIndex}>
                <td>
                  <label className="label">{key}</label>
                </td>
                <td>
                  <pre>{JSON.stringify(value, undefined, 2)}</pre>
                </td>
              </tr>
            );
          } else {
            return null;
          }
        })}
      </tbody>
    </table>
  );
};

export default DynamicRenderer;
