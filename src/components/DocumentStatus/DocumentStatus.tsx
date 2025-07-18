import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { IssuedBy } from "./IssuedBy";
import { StatusChecks } from "./StatusChecks";
import { AssetManagementTags } from "../AssetManagementPanel/AssetManagementTags";
import { AssetInformationPanel } from "../AssetManagementPanel/AssetInformationPanel";

interface DocumentStatusProps {
  isMagicDemo?: boolean;
  isTransferableDocument?: boolean;
  tokenRegistryAddress?: string;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const DocumentStatus: FunctionComponent<DocumentStatusProps> = ({
  isMagicDemo,
  isTransferableDocument,
  tokenRegistryAddress,
  setShowEndorsementChain,
}) => {
  const rootState = useSelector((state: RootState) => state);
  const document = isMagicDemo ? rootState.demoVerify.rawModifiedDocument : rootState.certificate.rawModified;
  const verificationStatus = isMagicDemo
    ? rootState.demoVerify.verificationStatus
    : rootState.certificate.verificationStatus;

  if (!document || !verificationStatus) return null;

  return (
    <div
      id="document-status"
      className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid-flow-row gap-2 justify-between"
    >
      <div className="col-span-1">
        <IssuedBy
          title={isMagicDemo ? "Demo issued by" : "Issued by"}
          verificationStatus={verificationStatus}
          document={document}
        />
        <AssetManagementTags isTransferableDocument={isTransferableDocument} />
      </div>
      <div className="col-span-1">
        <StatusChecks verificationStatus={verificationStatus} />
      </div>
      {isTransferableDocument && (
        <div className="col-span-1">
          <AssetInformationPanel
            setShowEndorsementChain={setShowEndorsementChain}
            tokenRegistryAddress={tokenRegistryAddress!}
          />
        </div>
      )}
    </div>
  );
};
