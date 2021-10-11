import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { CertificateViewer } from "./CertificateViewer";
import { Redirect } from "react-router";
import { RootState } from "../reducers";
import { WrappedOrSignedOpenAttestationDocument } from "../utils/shared";

const Viewer: FunctionComponent<{ document: WrappedOrSignedOpenAttestationDocument }> = ({ document }) => {
  return document ? <CertificateViewer document={document} /> : <Redirect to="/" />;
};

const ViewerDemo: FunctionComponent<{ document: string | null }> = ({ document }) => {
  return document ? <CertificateViewer document={document} /> : <Redirect to="/" />;
};

export const ViewerPageContainer = (): React.ReactElement => {
  const document = useSelector((state: RootState) => state.certificate.rawModified);

  return <Viewer document={document} />;
};

export const ViewerDemoPageContainer = (): React.ReactElement => {
  const document = useSelector((state: RootState) => state.demoVerify.rawModifiedDocument);

  return <ViewerDemo document={document} />;
};
