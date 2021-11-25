import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { CertificateViewer } from "./CertificateViewer";
import { RootState } from "../reducers";
import { useRouter } from "next/router";
import { ReactElement } from "react-markdown";

export interface ViewerPageContainerProps {
  isMagicDemo?: boolean;
}
export const ViewerPageContainer = ({ isMagicDemo }: ViewerPageContainerProps): ReactElement => {
  const rootState = useSelector((state: RootState) => state);
  const document = isMagicDemo ? rootState.demoVerify.rawModifiedDocument : rootState.certificate.rawModified;

  const router = useRouter();

  if (!document) {
    router.push("/");
    return <div />;
  } else {
    return <CertificateViewer isMagicDemo={isMagicDemo} document={document} />;
  }
};
