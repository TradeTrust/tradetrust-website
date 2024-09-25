import React, { FunctionComponent, useCallback, useContext, useEffect } from "react";
import { saveAs } from "file-saver";
import { Button, ProgressBar } from "@tradetrust-tt/tradetrust-ui-components";
import { gaEvent } from "@tradetrust-tt/tradetrust-utils";
import { CheckCircle, XCircle } from "react-feather";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDocumentIssued, getDocumentPrepared, getWrappedDocument } from "../../../../reducers/demo-create";
import { DemoFormContext } from "../contexts/DemoFormContext";
import { Banner } from "../../../UI/Banner";
import { GaAction, GaCategory } from "../../../../types";
import { URLS } from "../../../../constants";

export const DemoCreateIssue: FunctionComponent = () => {
  const { issued, error: issuedError } = useSelector(getDocumentIssued);
  const wrappedDocument = useSelector(getWrappedDocument);
  const { error: preparedError } = useSelector(getDocumentPrepared);
  const { formValues } = useContext(DemoFormContext);

  const error = issuedError || preparedError;

  const downloadDocument = useCallback(() => {
    const blob = new Blob([JSON.stringify(wrappedDocument)], { type: "text/json;charset=utf-8" });
    saveAs(blob, `${`demo-${formValues.documentName}` || `demo`}.tt`);
  }, [formValues.documentName, wrappedDocument]);

  useEffect(() => {
    if (issued) {
      downloadDocument();
      gaEvent({
        action: GaAction.MAGIC_DOWNLOADED,
        category: GaCategory.MAGIC_DEMO,
      });
    }
  }, [issued, downloadDocument]);

  return (
    <>
      <ProgressBar totalSteps={3} step={3} />
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          {error ? (
            <>
              <XCircle width="48px" height="48px" className="text-scarlet-500 w-full mb-4" />
              <h3>Failed</h3>
              <p className="py-5">
                Please check if you have internet connection,
                <br />
                alternatively, see{" "}
                <a href={URLS.FAQ} target="_blank" rel="noopener noreferrer">
                  FAQ
                </a>{" "}
                or <Link to="/contact">Contact us</Link>
              </p>
              <Button className="bg-cerulean-500 text-white rounded hover:bg-cerulean-800">
                <Link className="text-white hover:text-white" to="/demo">
                  Try Again
                </Link>
              </Button>
            </>
          ) : (
            <>
              <CheckCircle width="48px" height="48px" className="text-forest-500 w-full mb-4" />
              <h3>Success!</h3>
              <p className="py-5">
                Your file will be downloaded automatically, if it
                <br />
                doesn’t automatically download, click{" "}
                <a className="cursor-pointer" onClick={downloadDocument}>
                  here
                </a>
                .
              </p>
              <Banner
                to="/demo/verify"
                className="text-left"
                buttonText="Verify Document"
                title="Now that you have created your CoO, verify it to make sure it is working."
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
