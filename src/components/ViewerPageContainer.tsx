import React, { Profiler } from "react";
import { useSelector } from "react-redux";
import { CertificateViewer } from "./CertificateViewer";
import { Redirect } from "react-router";
import { RootState } from "../reducers";
import { renderCallbackLogger } from "../profiling";

interface ViewerPageContainerProps {
  isMagicDemo?: boolean;
}
export const ViewerPageContainer = ({ isMagicDemo }: ViewerPageContainerProps): React.ReactElement => {
  const rootState = useSelector((state: RootState) => state);
  const document = isMagicDemo ? rootState.demoVerify.rawModifiedDocument : rootState.certificate.rawModified;

  return document ? (
    <Profiler id="CertificateViewer" onRender={renderCallbackLogger}>
      <CertificateViewer isMagicDemo={isMagicDemo} document={document} />
    </Profiler>
  ) : (
    <Redirect to="/" />
  );
};
