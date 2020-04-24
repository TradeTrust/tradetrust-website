import React from "react";
import { LabelBordered } from "../UI/LabelBordered";
import { useDefaultProvider } from "../../common/hooks/useDefaultProvider";
import { useTitleEscrowContract } from "../../common/hooks/useTitleEscrowContract";
import { TitleTransferPanelContent } from "./TitleTransferPanelContent";
import { getDocumentId, getTokenRegistryAddress } from "../../common/utils/document";

import { ManageAssets } from "../ManageAssets";
import { WrappedDocument } from "@govtechsg/open-attestation";

interface TitleTransferProps {
  document: WrappedDocument;
}

export const TitleTransferPanel = ({ document }: TitleTransferProps) => {
  const { provider } = useDefaultProvider(); // Component only need read only access
  const tokenRegistryAddress = getTokenRegistryAddress(document);
  const tokenId = getDocumentId(document);
  const { titleEscrow } = useTitleEscrowContract(tokenRegistryAddress, tokenId, provider);

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
      {titleEscrow && <ManageAssets titleEscrow={titleEscrow} document={document} />}
    </div>
  );
};
