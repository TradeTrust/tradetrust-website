import React, { useState, useEffect } from "react";
import { TitleView } from "../TitleView";
import { BLinfo } from "../TitleView/BLinfo";
import { getTokenOwner } from "./../../../services/token";
import { useEscrowContractUsers } from "../../../hooks";
import { WrappedDocument } from "@govtechsg/open-attestation";

interface TitleTransferPanelContentProps {
  document: WrappedDocument;
}

export const TitleTransferPanelContent = ({ document }: TitleTransferPanelContentProps) => {
  const [tokenOwnerAddress, setTokenOwnerAddress] = useState("");
  const { holderAddress, beneficiaryAddress } = useEscrowContractUsers({ escrowContractAddress: tokenOwnerAddress });

  const fetchTokenOwner = async (document: WrappedDocument) => {
    const address = await getTokenOwner({ document });
    setTokenOwnerAddress(address);
  };

  useEffect(() => {
    fetchTokenOwner(document);
  }, [document]);

  return (
    <>
      <div className="row">
        <div className="col-12 col-lg">
          <TitleView role="Beneficiary" address={beneficiaryAddress} />
          <TitleView role="Holder" address={holderAddress} />
        </div>
        <div className="col-12 col-lg">
          <BLinfo />
        </div>
      </div>
    </>
  );
};
