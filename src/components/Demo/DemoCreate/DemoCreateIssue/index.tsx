import React, { FunctionComponent, useCallback, useContext, useEffect } from "react";
import { saveAs } from "file-saver";
import { Button, LoaderSpinner, ProgressBar } from "@govtechsg/tradetrust-ui-components";
import { CheckCircle, XCircle } from "react-feather";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDocumentIssued,
  getDocumentPrepared,
  getWrappedDocument,
  getWrappedDocumentStatus,
  issuingDocument,
  wrappingDocument,
} from "../../../../reducers/demo-create";
import { ProviderContext } from "../../../../common/contexts/provider";
import { DemoFormContext } from "../contexts/DemoFormContext";
import { Banner } from "../../../UI/Banner";

export const DemoCreateIssue: FunctionComponent = () => {
  const { issued, error: issuedError } = useSelector(getDocumentIssued);
  const wrappedDocument = useSelector(getWrappedDocument);
  const wrapDocumentStatus = useSelector(getWrappedDocumentStatus);
  const { prepared, error: preparedError } = useSelector(getDocumentPrepared);
  const { formValues } = useContext(DemoFormContext);
  const dispatch = useDispatch();

  const error = issuedError || preparedError;

  const { provider } = useContext(ProviderContext);

  useEffect(() => {
    if (prepared) {
      dispatch(wrappingDocument(formValues));
    }
  }, [prepared, dispatch, formValues]);

  useEffect(() => {
    if (wrapDocumentStatus === "success") {
      dispatch(issuingDocument(provider));
    }
  }, [wrapDocumentStatus, dispatch, provider]);

  const downloadDocument = useCallback(() => {
    const blob = new Blob([JSON.stringify(wrappedDocument)], { type: "text/json;charset=utf-8" });
    saveAs(blob, `${formValues.documentName || `demo`}.tt`);
  }, [formValues.documentName, wrappedDocument]);

  useEffect(() => {
    if (issued) {
      downloadDocument();
    }
  }, [issued, downloadDocument]);

  return (
    <>
      <ProgressBar totalSteps={3} step={3} />
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          {!issued && !error && (
            <>
              <LoaderSpinner width="36px" className="mx-auto mb-4" primary="#3B8CC5" />
              {!prepared ? <h3>Preparing Document</h3> : <h3>Issuing Document</h3>}
            </>
          )}
          {issued && (
            <>
              <CheckCircle width="48px" height="48px" className="text-emerald w-full mb-4" />
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
          {error && (
            <>
              <XCircle width="48px" height="48px" className="text-rose w-full mb-4" />
              <h3>Failed</h3>
              <p className="py-5">
                Please check if you have internet connection,
                <br /> alternatively, see <Link to="/faq">FAQ</Link> or <Link to="/contact">Contact us</Link>
              </p>
              <Button className="bg-cerulean text-white rounded hover:bg-cerulean-500">
                <Link className="text-white hover:text-white" to="/demo">
                  Try Again
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
