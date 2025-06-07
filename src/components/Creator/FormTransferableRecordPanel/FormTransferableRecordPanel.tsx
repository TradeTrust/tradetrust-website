import React, { FunctionComponent } from "react";
import { Book, Info } from "react-feather";
import { useOverlayContext } from "../../../common/contexts/OverlayContext";
import { OverlayAddressBook } from "../../AddressBook";
import { AssetTitle } from "../../AssetManagementPanel/AssetTitle";
import { ButtonIcon } from "../../Button";
import { ExternalLinkEtherscanAddress } from "../../UI/ExternalLink";
import { TooltipIcon } from "../../UI/SvgIcon";

interface FormTransferableRecordPanelProps {
  mode?: "edit" | "view";
  beneficiaryAddress?: string;
  holderAddress?: string;
  remarks?: string;
  setBeneficiaryAddress?: (address: string) => void;
  setHolderAddress?: (address: string) => void;
  setRemarks?: (remarks: string) => void;
  fileName?: string;
  network?: string;
}

export const FormTransferableRecordPanel: FunctionComponent<FormTransferableRecordPanelProps> = ({
  mode = "edit",
  beneficiaryAddress = "",
  holderAddress = "",
  remarks = "",
  setBeneficiaryAddress,
  setHolderAddress,
  setRemarks,
  fileName = "Tradetrust-bill-of-lading.tt",
  network = "amoy",
}) => {
  const { showOverlay } = useOverlayContext();
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";

  const onOverlayHandler = (onAddressSelected: (address: string) => void): void => {
    showOverlay(<OverlayAddressBook title="Address Book" onAddressSelected={onAddressSelected} network={network} />);
  };

  // For view mode, we'll use the AssetTitle component
  if (isViewMode) {
    return (
      <>
        <div className="gap-2">
          <h4>{fileName}</h4>
        </div>
        <hr className="mt-4" />
        <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid-flow-row gap-2 p-4 rounded-lg">
          <div className="col-span-1">
            <AssetTitle role="Owner" address={beneficiaryAddress}>
              <ExternalLinkEtherscanAddress
                name={beneficiaryAddress}
                address={beneficiaryAddress}
                data-testid="non-editable-input-owner"
              >
                <h6>{beneficiaryAddress}</h6>
              </ExternalLinkEtherscanAddress>
            </AssetTitle>
          </div>
          <div className="col-span-1">
            <AssetTitle role="Holder" address={holderAddress}>
              <ExternalLinkEtherscanAddress
                name={holderAddress}
                address={holderAddress}
                data-testid="non-editable-input-holder"
              >
                <h6>{holderAddress}</h6>
              </ExternalLinkEtherscanAddress>
            </AssetTitle>
          </div>
          <div className="col-span-1 xs:col-span-2 sm:col-span-1">
            <AssetTitle role="Remarks" address="">
              <div className="break-all">
                <h6>{remarks || ""}</h6>
              </div>
            </AssetTitle>
          </div>
        </div>
      </>
    );
  }

  // For edit mode, we'll use the form inputs
  return (
    <div data-testid="asset-record-form" className="mb-3">
      <h4 className="pb-4">Wallet Addresses</h4>
      <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid-flow-row gap-4 bg-cerulean-50 p-4 rounded-lg">
        {/* Owner */}
        <div className="col-span-1">
          <div className="mb-2">Owner Wallet Address</div>
          <div className="w-full flex">
            <input
              data-testid="transferable-record-beneficiary-input"
              className="flex-1 custom-input mr-2 w-full"
              value={beneficiaryAddress}
              type="text"
              onChange={(e) => setBeneficiaryAddress?.(e.target.value)}
              disabled={!isEditMode}
            />
            {isEditMode && setBeneficiaryAddress && (
              <ButtonIcon
                className="bg-white text-cerulean-300 hover:bg-cloud-100"
                onClick={() => {
                  onOverlayHandler(setBeneficiaryAddress);
                }}
              >
                <Book />
              </ButtonIcon>
            )}
          </div>
        </div>

        {/* Holder */}
        <div className="col-span-1">
          <div className="mb-2">Holder Wallet Address</div>
          <div className="w-full flex">
            <input
              data-testid="transferable-record-holder-input"
              className="custom-input mr-2 w-full"
              value={holderAddress}
              type="text"
              onChange={(e) => setHolderAddress?.(e.target.value)}
              disabled={!isEditMode}
            />
            {isEditMode && setHolderAddress && (
              <ButtonIcon
                className="bg-white text-cerulean-300 hover:bg-cloud-100"
                onClick={() => onOverlayHandler(setHolderAddress)}
              >
                <Book />
              </ButtonIcon>
            )}
          </div>
        </div>

        {/* Remarks */}
        <div className="col-span-1 xs:col-span-2 sm:col-span-1">
          <div className="mb-2">Remarks</div>
          {isEditMode ? (
            <>
              <textarea
                className="w-full rounded-xl font-normal py-2.5 px-3 border border-cloud-100 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-cerulean-500 placeholder-cloud-300"
                data-testid="transferable-record-remarks-input"
                maxLength={120}
                placeholder={`Enter remarks here (max 120 characters)`}
                style={{
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
                value={remarks}
                onChange={(e) => setRemarks?.(e.target.value)}
                disabled={!isEditMode}
              />
              <div className="text-cloud-300 my-2 flex items-start space-x-2 w-full" data-testid="remarks-icon-text">
                <div className="w-auto mr-2">
                  <TooltipIcon content="Any remarks provided will be accessible in the endorsement chain by any verifiers of this document.">
                    <Info />
                  </TooltipIcon>
                </div>
                <p
                  style={{
                    overflowWrap: "break-word",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    margin: 0,
                  }}
                >
                  Any remarks provided will be accessible in the endorsement chain by any verifiers of this document.
                </p>
              </div>
            </>
          ) : (
            <div className="text-cloud-500">
              <p>{remarks}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
