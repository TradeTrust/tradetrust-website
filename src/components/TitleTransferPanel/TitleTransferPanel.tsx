import React from "react";
import { LabelBordered } from "../UI/LabelBordered";
import { useDefaultProvider } from "../../common/hooks/useDefaultProvider";
import { useTitleEscrowContract } from "../../common/hooks/useTitleEscrowContract";
import { TitleTransferPanelContent } from "./TitleTransferPanelContent";
import styled from "@emotion/styled";

interface TitleTransferProps {
  tokenRegistryAddress: string;
  tokenId: string;
  className?: string;
}

export const TitleTransfer = ({ tokenRegistryAddress, tokenId, className }: TitleTransferProps) => {
  const { provider } = useDefaultProvider(); // Component only need read only access
  const { titleEscrow } = useTitleEscrowContract(tokenRegistryAddress, tokenId, provider);

  return (
    <section id="title-transfer-panel" className={`bg-blue-lighter py-3 ${className}`}>
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
    </section>
  );
};

export const TitleTransferPanel = styled(TitleTransfer)`
  @media print {
    display: none;
  }
`;
