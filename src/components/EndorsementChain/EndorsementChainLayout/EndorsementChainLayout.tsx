import { BackArrow } from "@govtechsg/tradetrust-ui-components";
import { useIdentifierResolver } from "@govtechsg/address-identity-resolver";
import { format } from "date-fns";
import React, { FunctionComponent } from "react";
import { EndorsementChain } from "../../../types";
import { EndorsementChainError } from "./EndorsementChainError";
import { EndorsementChainLoading } from "./EndorsementChainLoading";

interface EndorsementChainLayout {
  endorsementChain?: EndorsementChain;
  error?: string;
  pending: boolean;
  setShowEndorsementChain: (payload: boolean) => void;
}

enum EventType {
  TRANSFER = "Transfer",
  SURRENDER = "Surrender",
  BURNT = "Burnt",
  SURRENDER_REJECTED = "Surrender Rejected",
  INITIAL = "Document Issued",
}

enum ActionType {
  INITIAL = "Document has been issued",
  NEW_OWNERS = "Change Owners",
  ENDORSE = "Endorse change of ownership",
  TRANSFER = "Transfer holdership",
  SURRENDERED = "Document surrendered to issuer",
  SURRENDER_REJECTED = "Surrender of document rejected",
  SURRENDER_ACCEPTED = "Surrender of document accepted", // burnt token
  TRANSFER_TO_WALLET = "Transferred to wallet",
}

interface HistoryChain {
  action: ActionType;
  isNewBeneficiary: boolean;
  isNewHolder: boolean;
  documentOwner?: string;
  beneficiary?: string;
  holder?: string;
  timestamp?: number;
  hash?: string;
}

interface AddressResolvedNameProps {
  address: string;
}

const AddressResolvedName: React.FunctionComponent<AddressResolvedNameProps> = ({ address }) => {
  const { identityName } = useIdentifierResolver(address);
  return <>{identityName && <div className="mr-2">{identityName}</div>}</>;
};

interface DetailsEntityProps {
  title: string;
  address: string;
  documentOwner: string;
}

const getHistoryChain = (endorsementChain?: EndorsementChain) => {
  const historyChain: HistoryChain[] = [
    // {
    //   action: ActionType.INITIAL,
    //   isNewBeneficiary: true,
    //   isNewHolder: false,
    // },
  ];

  // let previousBeneficiary = "";
  // let previousHolder = "";

  endorsementChain?.forEach((endorsementChainEvent) => {
    // const chain = endorsementChainEvent as TitleEscrowEvent;
    const documentOwner = endorsementChainEvent.owner;
    const beneficiary = endorsementChainEvent.owner;
    const holder = endorsementChainEvent.holder;
    const timestamp = endorsementChainEvent.timestamp;
    const hash = endorsementChainEvent.transactionHash;

    // TRANSFER = "Transfer",
    // SURRENDER = "Surrender",
    // BURNT = "Burnt",
    // SURRENDER_REJECTED = "Surrender Rejected",
    // INITIAL = "Document Issued"

    switch (endorsementChainEvent.type) {
      // case EventType.TRANSFER:
      //   const timelineHolder = chain.holder || previousHolder;
      //   const timelineBeneficiary = chain.beneficiary || previousBeneficiary || beneficiary;
      //   const timestamp = chain.timestamp;
      //   const isNewBeneficiary = timelineBeneficiary !== previousBeneficiary;
      //   const isNewHolder = timelineHolder !== previousHolder;

      // if (isNewBeneficiary && isNewHolder) {
      case "TRANSFER_OWNERS":
        historyChain.push({
          action: ActionType.NEW_OWNERS,
          isNewBeneficiary: true,
          isNewHolder: true,
          documentOwner,
          beneficiary,
          holder,
          timestamp,
          hash,
        });
        break;
      // } else if (isNewBeneficiary) {
      case "TRANSFER_BENEFICIARY":
        historyChain.push({
          action: ActionType.ENDORSE,
          isNewBeneficiary: true,
          isNewHolder: false,
          documentOwner,
          beneficiary,
          holder,
          timestamp,
          hash,
        });
        break;
      // } else if (isNewHolder) {
      case "TRANSFER_HOLDER":
        historyChain.push({
          action: ActionType.TRANSFER,
          isNewBeneficiary: false,
          isNewHolder: true,
          documentOwner,
          beneficiary,
          holder,
          timestamp,
          hash,
        });
        break;
      // }
      // previousHolder = timelineHolder;
      // previousBeneficiary = timelineBeneficiary || "";

      case "SURRENDERED":
        historyChain.push({
          action: ActionType.SURRENDERED,
          isNewBeneficiary: true,
          isNewHolder: false,
          timestamp,
        });
        // not reassigning previousBeneficiary and previousHolder so that it takes the addresses from the point just before it was surrendered
        break;
      case "SURRENDER_ACCEPTED":
        historyChain.push({
          action: ActionType.SURRENDER_ACCEPTED,
          isNewBeneficiary: true,
          isNewHolder: false,
          timestamp,
        });
        break;
      case "SURRENDER_REJECTED":
        historyChain.push({
          action: ActionType.SURRENDER_REJECTED,
          isNewBeneficiary: true,
          isNewHolder: true,
          timestamp,
          documentOwner,
          beneficiary: documentOwner,
          holder: documentOwner,
          hash,
        });
        // previousHolder = previousHolder;
        // previousBeneficiary = previousBeneficiary;
        break;
      case "INITIAL":
        historyChain.push({
          action: ActionType.INITIAL,
          isNewBeneficiary: true,
          isNewHolder: true,
          documentOwner,
          beneficiary,
          holder,
          timestamp,
          hash,
        });
        break;

      default:
        throw Error("eventType not matched");
    }
  });

  return historyChain;
};

const DetailsEntity: React.FunctionComponent<DetailsEntityProps> = ({ title, address }) => {
  return (
    <div className="w-full lg:w-1/3" data-testid={`row-event-${title}`}>
      <div className="flex flex-nowrap pr-8">
        <div className="relative shrink-0 lg:hidden" style={{ width: "40px" }}>
          <div className="absolute left-0 right-0 mx-auto h-full">
            <div className="absolute top-0 left-1/2 h-full border-l border-dashed border-cerulean-500 path" />
          </div>
        </div>
        <div className="pb-4 lg:pb-0">
          <h5 className="text-cloud-800 mr-2 lg:hidden">{title}</h5>
          <h6 className="text-cerulean-500 break-all" data-testid="address-entity">
            {address}
            <AddressResolvedName address={address} />
          </h6>
        </div>
      </div>
    </div>
  );
};

const EndorsementChainData: React.FunctionComponent<any> = ({ index, data }) => {
  return (
    <div className="flex flex-wrap items-center" data-testid={`row-event-${index}`}>
      <div className="w-full lg:w-1/3">
        <div className="flex flex-nowrap">
          <div className="relative shrink-0 lg:order-2" style={{ width: "40px" }}>
            <div className="absolute left-0 right-0 mx-auto h-full">
              <div className="absolute left-1/2 h-full border-l border-dashed border-cerulean-500 dot-path" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cerulean-500 h-3 w-3" />
            </div>
          </div>
          <div className="lg:ml-auto lg:order-1">
            <div className="lg:text-right py-6 lg:py-4">
              <h4 className="text-cloud-800" data-testid="action-title">
                {data.action}
              </h4>
              {data.timestamp && (
                <h6 className="text-cloud-800">{format(new Date(data.timestamp ?? 0), "do MMM yyyy, hh:mm aa")}</h6>
              )}
            </div>
          </div>
        </div>
      </div>
      {data.beneficiary && (
        <DetailsEntity title="Owner" address={data.beneficiary} documentOwner={data.documentOwner} />
      )}
      {data.holder && <DetailsEntity title="Holder" address={data.holder} documentOwner={data.documentOwner} />}
    </div>
  );
};

export const EndorsementChainLayout: FunctionComponent<EndorsementChainLayout> = ({
  endorsementChain,
  setShowEndorsementChain,
  error,
  pending,
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
      <div className="bg-white rounded-xl shadow-xl px-3 py-8 lg:px-8">
        <div className="hidden lg:block mb-8">
          <div className="flex text-cloud-800">
            <h5 className="w-1/3">Action/Date</h5>
            <h5 className="w-1/3">Owner</h5>
            <h5 className="w-1/3">Holder</h5>
          </div>
          <div className="border-t" />
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
