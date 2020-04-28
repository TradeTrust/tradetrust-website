import React, { useEffect, useState } from "react";
import { useContractFunctionHook } from "@govtechsg/ethers-contract-hook";
import { TitleEscrowFactory } from "@govtechsg/token-registry";

import { LabelBordered } from "../UI/LabelBordered";
import { useDefaultProvider } from "../../common/hooks/useDefaultProvider";
import { TitleTransferPanelContent } from "./TitleTransferPanelContent";

import { ManageAssets } from "../ManageAssets";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";

interface TitleTransferProps {
  titleEscrow: TitleEscrow;
  document: WrappedDocument;
}

export const TitleTransferPanel = ({ titleEscrow, document }: TitleTransferProps) => {
  const [approvedEscrowInstance, setApprovedEscrowInstance] = useState<TitleEscrow | undefined>(undefined);

  const { provider } = useDefaultProvider();

  const { call: getApprovedTitleEscrowAddress, value: approvedEscrowContractAddress } = useContractFunctionHook(
    titleEscrow,
    "approvedTransferTarget"
  );

  useEffect(() => {
    getApprovedTitleEscrowAddress();
  }, [getApprovedTitleEscrowAddress]);

  useEffect(() => {
    if (approvedEscrowContractAddress) {
      const instance = TitleEscrowFactory.connect(approvedEscrowContractAddress, provider);
      setApprovedEscrowInstance(instance);
    }
  }, [approvedEscrowContractAddress, provider]);

  return (
    <div id="title-transfer-panel">
      <div className="container-custom">
        <div className="row">
          <div className="col-12">
            <div className="py-2">
              <LabelBordered color="red">This is a transferable record</LabelBordered>
              <LabelBordered color="red">Negotiable</LabelBordered>
            </div>
          </div>
        </div>
        {titleEscrow && <TitleTransferPanelContent titleEscrow={titleEscrow} />}
      </div>
      {titleEscrow && (
        <ManageAssets titleEscrow={titleEscrow} approvedEscrowInstance={approvedEscrowInstance} document={document} />
      )}
    </div>
  );
};
