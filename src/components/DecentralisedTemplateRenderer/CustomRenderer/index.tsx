import "./index.css";
import React, { FunctionComponent, Ref, useImperativeHandle, useMemo } from "react";
import { WrappedDocument, v2, getData } from "@govtechsg/open-attestation";
import { get } from "lodash";
import BookingConfirmationRenderer from "./BookingConfirmationRenderer";
import DynamicRenderer from "./DynamicRenderer";

declare const document: any;
interface DecentralisedRendererProps {
  rawDocument: WrappedDocument<v2.OpenAttestationDocument>;
  forwardedRef: Ref<{ print: () => void } | undefined>;
}

export const CustomRenderer: FunctionComponent<DecentralisedRendererProps> = ({ rawDocument, forwardedRef }) => {
  const doc = useMemo(() => getData(rawDocument), [rawDocument]);

  useImperativeHandle(forwardedRef, () => ({
    print() {
      const content = document.getElementById("divcontents");
      const pri = document.getElementById("ifmcontentstoprint").contentWindow;
      pri.document.open();
      pri.document.write(`<html><head><style>
      table {
        width: 100%;
        border: solid #000 !important;
        border-width:1px 0 0 1px !important;
      }
      table, th, td {
        border-collapse: collapse;
      }
      th, td {
        border: solid #000 !important;
        border-width:0 1px 1px 0 !important;
      }
      table tr td {
        border: 1px solid black;
        padding: 5px;
        vertical-align: top;
      }
      table tr td .doc-type {
        margin: 5px auto;
        text-transform: uppercase;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        margin-bottom: 10px;
      }
      table tr td label {
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        font-size: 1rem;
      }
      table tr td .label {
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        margin-bottom: 5px;
        font-size: 1rem;
      }
      table tr td pre {
        font-size: 87.5%;
      }
      table tr td p {
        font-family: monospace;
      }</style>
      </head>
      <body>
      ${content.innerHTML}
      </body></html>`);
      pri.document.close();
      pri.focus();
      pri.print();
    },
  }));

  const getTemplate = () => {
    const documentType = get(doc, "metaData.documentType");
    switch (documentType) {
      case "booking-confirmation":
        return <BookingConfirmationRenderer doc={doc} />;

      default:
        return <DynamicRenderer doc={doc} />;
    }
  };

  return (
    <div className="container custom-template-renderer">
      <iframe id="ifmcontentstoprint" style={{ height: "0px", width: "0px", position: "absolute" }} />
      <div className="flex flex-wrap" id="divcontents">
        {getTemplate()}
      </div>
    </div>
  );
};

// eslint-disable-next-line react/display-name
const ForwardedRefCustomRenderer = React.forwardRef<
  { print: () => void } | undefined,
  {
    rawDocument: WrappedDocument<v2.OpenAttestationDocument>;
  }
>((props, ref) => <CustomRenderer {...props} forwardedRef={ref} />);

export const CustomRendererContainer = ForwardedRefCustomRenderer;
