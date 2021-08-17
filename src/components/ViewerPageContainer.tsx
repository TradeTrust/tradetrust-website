import React from "react";
import { useSelector } from "react-redux";
import { CertificateViewer } from "./CertificateViewer";
import { Redirect } from "react-router";

const ViewerPageContainer = (): React.ReactElement => {
  const certificateState = useSelector((state: any) => state?.certificate);
  const { rawModified: document } = certificateState;

  return document ? <CertificateViewer document={document} /> : <Redirect to="/" />;
};

export default ViewerPageContainer;
