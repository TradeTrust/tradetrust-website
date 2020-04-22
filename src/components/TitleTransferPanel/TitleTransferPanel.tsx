import React from "react";
import { LabelBordered } from "../UI/LabelBordered";
import { useDefaultProvider } from "../../common/hooks/useDefaultProvider";
import { useTitleEscrowContract } from "../../common/hooks/useTitleEscrowContract";
import { TitleTransferPanelContent } from "./TitleTransferPanelContent";

interface TitleTransferProps {
  tokenRegistryAddress: string;
  tokenId: string;
}

export const TitleTransferPanel = ({ tokenRegistryAddress, tokenId }: TitleTransferProps) => {
  const { provider } = useDefaultProvider(); // Component only need read only access
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
    </div>
  );
};
