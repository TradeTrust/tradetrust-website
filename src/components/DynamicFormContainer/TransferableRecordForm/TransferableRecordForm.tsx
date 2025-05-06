import { ButtonIcon, OverlayAddressBook } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { Book, Info } from "react-feather";
import { TooltipIcon } from "../../UI/SvgIcon";
import { useOverlayContext } from "../../../common/contexts/OverlayContext";

interface TransferableRecordForm {
  beneficiaryAddress: string;
  holderAddress: string;
  remarks: string;
  setBeneficiaryAddress: (address: string) => void;
  setHolderAddress: (address: string) => void;
  setRemarks: (remarks: string) => void;
}

export const TransferableRecordForm: FunctionComponent<TransferableRecordForm> = ({
  beneficiaryAddress,
  setBeneficiaryAddress,
  holderAddress,
  setHolderAddress,
  remarks,
  setRemarks,
}) => {
  const { showOverlay } = useOverlayContext();
  const onOverlayHandler = (onAddressSelected: (address: string) => void): void => {
    showOverlay(<OverlayAddressBook title="Address Book" onAddressSelected={onAddressSelected} network={"local"} />);
  };

  return (
    <div data-testid="transferable-record-form" className="mb-3">
      <h4 className="pb-4">Wallet Addresses</h4>
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Owner */}
        <div className="w-full md:w-1/3">
          <div>Owner Wallet Address</div>
          <div className="w-full flex">
            <input
              data-testid="transferable-record-beneficiary-input"
              className="custom-input mr-2"
              value={beneficiaryAddress}
              type="text"
              onChange={(e) => setBeneficiaryAddress(e.target.value)}
            />
            <ButtonIcon
              className="bg-white text-cerulean-300 hover:bg-cloud-100"
              onClick={() => {
                onOverlayHandler(setBeneficiaryAddress);
              }}
            >
              <Book />
            </ButtonIcon>
          </div>
        </div>

        {/* Holder */}
        <div className="w-full md:w-1/3">
          <div>Holder Wallet Address</div>
          <div className="w-full flex">
            <input
              data-testid="transferable-record-holder-input"
              className="custom-input mr-2"
              value={holderAddress}
              type="text"
              onChange={(e) => setHolderAddress(e.target.value)}
            />
            <ButtonIcon
              className="bg-white text-cerulean-300 hover:bg-cloud-100"
              onClick={() => onOverlayHandler(setHolderAddress)}
            >
              <Book />
            </ButtonIcon>
          </div>
        </div>

        {/* Remarks */}
        <div className="w-full md:w-1/3">
          <div>Remarks</div>
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
            onChange={(e) => setRemarks(e.target.value)}
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
        </div>
      </div>
    </div>
  );
};
