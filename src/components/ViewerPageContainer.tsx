import React from "react";
import { useSelector } from "react-redux";
import { CertificateViewer } from "./CertificateViewer";
import { Redirect } from "react-router";
import { RootState } from "../reducers";

interface ViewerPageContainerProps {
  isMagicDemo?: boolean;
}
export const ViewerPageContainer = ({ isMagicDemo }: ViewerPageContainerProps): React.ReactElement => {
  console.log(isMagicDemo);
  // from here, toggle logic
  // pass into CertificateViewer ---> pass into DocumentStatus

  const certificate = useSelector((state: RootState) => state.certificate);
  const demoVerify = useSelector((state: RootState) => state.demoVerify);
  const document = certificate.rawModified ?? demoVerify.rawModifiedDocument;

  return document ? <CertificateViewer document={document} /> : <Redirect to="/" />;
};
