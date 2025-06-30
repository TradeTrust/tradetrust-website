import { useIdentifierResolver } from "@govtechsg/address-identity-resolver";
import { format } from "date-fns";
import React, { FunctionComponent } from "react";
import { EndorsementChainError } from "./EndorsementChainError";
import { EndorsementChainLoading } from "./EndorsementChainLoading";
import { EndorsementChain } from "@trustvc/trustvc";
import { BackArrow } from "../../UI/Nav";

interface EndorsementChainLayout {
  endorsementChain?: EndorsementChain;
  error?: string;
  pending: boolean;
  setShowEndorsementChain: (payload: boolean) => void;
  providerDocumentationURL: string;
}

enum ActionType {
  INITIAL = "Document has been issued",
  NEW_OWNERS = "Transfer ownership and holdership",
  ENDORSE = "Transfer ownership",
  TRANSFER = "Transfer holdership",
  REJECT_TRANSFER_HOLDER = "Rejection of holdership",
  REJECT_TRANSFER_BENEFICIARY = "Rejection of ownership",
  RETURNED_TO_ISSUER = "ETR returned to issuer",
  RETURN_TO_ISSUER_REJECTED = "Return of ETR rejected",
  RETURN_TO_ISSUER_ACCEPTED = "ETR taken out of circulation", // burnt token
  TRANSFER_TO_WALLET = "Transferred to wallet",
}

interface HistoryChain {
  action: ActionType;
  isNewBeneficiary: boolean;
  isNewHolder: boolean;
  beneficiary?: string;
  holder?: string;
  timestamp?: number;
  hash?: string;
  remark?: string;
}

interface AddressResolvedNameProps {
  address: string;
}

const AddressResolvedName: React.FunctionComponent<AddressResolvedNameProps> = ({ address }) => {
  const { identityName } = useIdentifierResolver(address);
  return <h6 className="text-cloud-800 break-words">{identityName}</h6>;
};

interface AddressBlockProps {
  title: string;
  address: string;
}

interface RemarkBlockProps {
  remark?: string;
}

interface DetailsEntityProps extends Partial<AddressBlockProps>, Partial<RemarkBlockProps> {
  title: string;
}

const getHistoryChain = (endorsementChain?: EndorsementChain) => {
  const historyChain: HistoryChain[] = [];

  endorsementChain?.forEach((endorsementChainEvent) => {
    const beneficiary = endorsementChainEvent.owner;
    const holder = endorsementChainEvent.holder;
    const timestamp = endorsementChainEvent.timestamp;
    const hash = endorsementChainEvent.transactionHash;
    const remark = endorsementChainEvent?.remark;
    switch (endorsementChainEvent.type) {
      case "TRANSFER_OWNERS":
        historyChain.push({
          action: ActionType.NEW_OWNERS,
          isNewBeneficiary: true,
          isNewHolder: true,
          beneficiary,
          holder,
          timestamp,
          hash,
          remark,
        });
        break;
      case "TRANSFER_BENEFICIARY":
        historyChain.push({
          action: ActionType.ENDORSE,
          isNewBeneficiary: true,
          isNewHolder: false,
          beneficiary,
          holder,
          timestamp,
          hash,
          remark,
        });
        break;
      case "TRANSFER_HOLDER":
        historyChain.push({
          action: ActionType.TRANSFER,
          isNewBeneficiary: false,
          isNewHolder: true,
          beneficiary,
          holder,
          timestamp,
          hash,
          remark,
        });
        break;
      case "RETURNED_TO_ISSUER":
        historyChain.push({
          action: ActionType.RETURNED_TO_ISSUER,
          isNewBeneficiary: true,
          isNewHolder: false,
          timestamp,
          remark,
        });
        break;
      case "RETURN_TO_ISSUER_ACCEPTED":
        historyChain.push({
          action: ActionType.RETURN_TO_ISSUER_ACCEPTED,
          isNewBeneficiary: false,
          isNewHolder: false,
          timestamp,
          remark,
        });
        break;
      case "RETURN_TO_ISSUER_REJECTED":
        historyChain.push({
          action: ActionType.RETURN_TO_ISSUER_REJECTED,
          isNewBeneficiary: true,
          isNewHolder: true,
          timestamp,
          beneficiary,
          holder: beneficiary,
          hash,
          remark,
        });
        break;
      case "INITIAL":
        historyChain.push({
          action: ActionType.INITIAL,
          isNewBeneficiary: true,
          isNewHolder: true,
          beneficiary,
          holder,
          timestamp,
          hash,
          remark,
        });
        break;
      case "REJECT_TRANSFER_HOLDER":
        historyChain.push({
          action: ActionType.REJECT_TRANSFER_HOLDER,
          isNewBeneficiary: false,
          isNewHolder: true,
          beneficiary,
          holder,
          timestamp,
          hash,
          remark,
        });
        break;
      case "REJECT_TRANSFER_BENEFICIARY":
        historyChain.push({
          action: ActionType.REJECT_TRANSFER_BENEFICIARY,
          isNewBeneficiary: true,
          isNewHolder: false,
          beneficiary,
          holder,
          timestamp,
          hash,
          remark,
        });
        break;
      case "REJECT_TRANSFER_OWNERS":
        historyChain.push({
          action: ActionType.REJECT_TRANSFER_HOLDER,
          isNewBeneficiary: false,
          isNewHolder: true,
          beneficiary,
          holder,
          timestamp,
          hash,
          remark,
        });
        historyChain.push({
          action: ActionType.REJECT_TRANSFER_BENEFICIARY,
          isNewBeneficiary: true,
          isNewHolder: false,
          beneficiary,
          holder,
          timestamp,
          hash,
          remark,
        });
        break;

      default:
        throw Error("eventType not matched");
    }
  });

  return historyChain;
};

const AddressBlock: React.FunctionComponent<AddressBlockProps> = ({ title, address }) => {
  return (
    <div className="flex flex-nowrap flex-col gap-1 overflow-hidden self-center p-2">
      <h5 className="text-cloud-400 lg:hidden">{title}</h5>
      <h6 className="text-cerulean-500 break-all" data-testid="address-entity">
        {address}
      </h6>
      <AddressResolvedName address={address} />
    </div>
  );
};

const RemarkBlock: React.FunctionComponent<RemarkBlockProps> = ({ remark }) => {
  return <div className="bg-cloud-100/30 text-cloud-400 break-all w-full rounded-lg p-2 mb-0 lg:mb-2">{remark}</div>;
};

const LineDesign: React.FunctionComponent<{ first?: boolean }> = ({ first }) => {
  if (first) {
    return (
      <div className="relative shrink-0 lg:order-2" style={{ width: "40px" }}>
        <div className="absolute left-0 right-0 mx-auto h-full">
          <div className="absolute left-1/2 h-full border-l border-dashed border-cerulean-500 dot-path" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cerulean-500 h-3 w-3" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative shrink-0 lg:hidden" style={{ width: "40px" }}>
        <div className="absolute left-0 right-0 mx-auto h-full">
          <div className="absolute top-0 left-1/2 h-full border-l border-dashed border-cerulean-500 path" />
        </div>
      </div>
    );
  }
};

const DetailsEntity: React.FunctionComponent<DetailsEntityProps> = ({ title, address, remark }) => {
  return (
    <div className="w-full lg:w-1/4" data-testid={`row-event-${title}`}>
      <div className="flex flex-nowrap h-full w-full">
        <LineDesign />
        {address && <AddressBlock title={title} address={address} />}
        {remark && <RemarkBlock remark={remark} />}
      </div>
    </div>
  );
};

const EndorsementChainData: React.FunctionComponent<{ index: number; data: HistoryChain }> = ({ index, data }) => {
  return (
    <div className="flex flex-wrap align-stretch" data-testid={`row-event-${index}`}>
      <div className="w-full lg:w-1/4">
        <div className="flex flex-nowrap h-full w-full">
          <LineDesign first />
          <div className="lg:ml-auto lg:order-1 flex flex-nowrap p-2 h-full">
            <div className="lg:text-right flex flex-col flex-nowrap gap-1 self-center">
              <h4 className="text-cloud-800" data-testid="action-title">
                {data.action}
              </h4>
              {data.timestamp && (
                <h6 className="text-cloud-400">{format(new Date(data.timestamp ?? 0), "do MMM yyyy, hh:mm aa")}</h6>
              )}
            </div>
          </div>
        </div>
      </div>
      <DetailsEntity title="Owner" address={data.isNewBeneficiary ? data.beneficiary : ""} />
      <DetailsEntity title="Holder" address={data.isNewHolder ? data.holder : ""} />
      <DetailsEntity title="Remark" remark={data?.remark ?? ""} />
      <div className="w-full flex flex-nowrap lg:hidden divider">
        <LineDesign />
        <div className="border-b border-cloud-100 border-solid m-2 w-full" />
      </div>
    </div>
  );
};

export const EndorsementChainLayout: FunctionComponent<EndorsementChainLayout> = ({
  endorsementChain,
  setShowEndorsementChain,
  error,
  pending,
  providerDocumentationURL,
}) => {
  const historyChain = getHistoryChain(endorsementChain);

  return (
    <div className="container my-8">
      <div className="cursor-pointer" onClick={() => setShowEndorsementChain(false)} data-testid="back-button">
        <BackArrow />
      </div>
      <div className="my-4" data-testid="endorsement-chain-title">
        <h3>Endorsement Chain</h3>
      </div>
      {!!error && (
        <div className="py-3 bg-red-100" data-testid="endorsement-chain-error">
          <p className="text-cloud-800 text-center">
            There might be some issue with your Remote Procedure Call (RPC). Click{" "}
            <a href={providerDocumentationURL}>here</a> to learn how to change your RPC Provider.
          </p>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-xl px-4 py-8 lg:px-8">
        <div className="hidden lg:block">
          <div className="flex text-cloud-800 p-2">
            <h5 className="w-1/4">Action/Date</h5>
            <h5 className="w-1/4">Owner</h5>
            <h5 className="w-1/4">Holder</h5>
            <h5 className="w-1/4">Remark</h5>
          </div>
          <div className="border-t border-cloud-100 border-solid my-2 w-full" />
        </div>

        {pending && !endorsementChain && !error && <EndorsementChainLoading />}
        {!pending && endorsementChain && !error && (
          <div className="endorsement-chain">
            {historyChain.map((item, key) => (
              <EndorsementChainData index={key} data={item} key={key} />
            ))}
          </div>
        )}
        {!pending && !endorsementChain && error && <EndorsementChainError error={error} />}
      </div>
    </div>
  );
};
