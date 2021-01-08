import styled from "@emotion/styled";
import { BackArrow } from "@govtechsg/tradetrust-ui-components";
import { format } from "date-fns";
import React, { FunctionComponent } from "react";
import tw from "twin.macro";
import { TitleEscrowEvent, TradeTrustErc721Event } from "../../../types";
import { getLogger } from "../../../utils/logger";
import { AddressCell } from "./AddressCell";
import { EndorsementChainError } from "./EndorsementChainError";
import { EndorsementChainLoading } from "./EndorsementChainLoading";

const { trace } = getLogger("component: endorsementchainlayout");

interface EndorsementChainLayout {
  endorsementChain?: TradeTrustErc721Event[];
  error?: string;
  pending: boolean;
  setShowEndorsementChain: (payload: boolean) => void;
}

export const EndorsementChainLayout: FunctionComponent<EndorsementChainLayout> = ({
  endorsementChain,
  setShowEndorsementChain,
  error,
  pending,
}) => {
  let previousBeneficiary = "";
  let previousHolder = "";
  let index = 0;
  let transferIndex = 0;

  const tableRows: JSX.Element[] = [
    // By default there will always be this 'Document has been issued'
    <tr className="table-row" key={index++}>
      <td className="table-cell">
        <div className="action-title my-8">Document has been issued</div>
      </td>
      <td className="table-cell" colSpan={2}>
        <div className="first-dash" />
        <div className="relative flex h-5 mt-8">
          <div className="dot" data-testid="dot" />
        </div>
      </td>
    </tr>,
  ];

  // scan endorsement chain for total number of holder change events before building the ui.
  let totalNumberOfHolderEvents = 0;
  endorsementChain &&
    endorsementChain.forEach((event) => {
      if (event.eventType !== "Transfer") return;

      const beneficiaryChangeEvent = event as TitleEscrowEvent;
      totalNumberOfHolderEvents += beneficiaryChangeEvent.holderChangeEvents.length;
    });

  // for each erc721 event, generate the ui according to the event type.
  endorsementChain &&
    endorsementChain.forEach((tradetrustErc721Event, eventIndex) => {
      switch (tradetrustErc721Event.eventType) {
        // for transfer event we need to loop through the holderChangeEvents to get each holder change.
        case "Transfer":
          const beneficiaryChangeEvent = tradetrustErc721Event as TitleEscrowEvent;

          if (!beneficiaryChangeEvent.holderChangeEvents || !beneficiaryChangeEvent.beneficiary) {
            return new Error("Invalid Event: Transfer Event does not have new beneficiary or new holder address");
          }

          beneficiaryChangeEvent.holderChangeEvents.forEach((holderChangeEvent, holderIndex) => {
            const isNewBeneficiaryAddress = previousBeneficiary !== beneficiaryChangeEvent.beneficiary;
            const isNewHolderAddress = previousHolder !== holderChangeEvent.holder;
            const isFirstRowHolder = eventIndex === 0 && holderIndex === 0;
            transferIndex++;

            // ui for each row of holderChangeEvent
            tableRows.push(
              <tr className="table-row" key={index++}>
                <td className="table-cell">
                  {isNewBeneficiaryAddress && <div className="action-title">Endorse change of ownership</div>}
                  {isNewHolderAddress && !isNewBeneficiaryAddress && (
                    <div className="action-title">Transfer holdership</div>
                  )}
                  <div className="date">{format(new Date(holderChangeEvent.timestamp), "do MMM yyyy, hh:mm aa")}</div>
                </td>
                <td className="table-cell">
                  <div className={eventIndex + 1 === endorsementChain.length ? "last-transfer-dash" : "dash"} />
                  <AddressCell
                    address={beneficiaryChangeEvent.beneficiary}
                    titleEscrowAddress={beneficiaryChangeEvent.documentOwner}
                    newAddress={isNewBeneficiaryAddress}
                  />
                </td>
                <td className="table-cell">
                  {isFirstRowHolder ? (
                    <div className="first-transfer-dash" />
                  ) : (
                    <div className={transferIndex === totalNumberOfHolderEvents ? "last-transfer-dash" : "dash"} />
                  )}
                  <AddressCell
                    address={holderChangeEvent.holder}
                    titleEscrowAddress={beneficiaryChangeEvent.documentOwner}
                    newAddress={isNewHolderAddress}
                  />
                </td>
              </tr>
            );
            previousBeneficiary = beneficiaryChangeEvent.beneficiary;
            previousHolder = holderChangeEvent.holder;
          });
          break;

        // ui for each surrender row
        case "Surrender":
          tableRows.push(
            <tr className="table-row" key={index++}>
              <td className="table-cell">
                <div className="action-title">Document surrendered to issuer</div>
                <div className="date">
                  {format(new Date(tradetrustErc721Event?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
                </div>
              </td>
              <td className="table-cell" colSpan={2}>
                <div className={eventIndex + 1 === endorsementChain.length ? "last-dash" : "dash"} />
                <div className="relative flex">
                  <div className="dot" data-testid="dot" />
                  <div className="h-5 mb-12" />
                </div>
              </td>
            </tr>
          );
          break;

        // ui for each accepted surrender row
        case "Burnt":
          tableRows.push(
            <tr className="table-row" key={index++}>
              <td className="table-cell">
                <div className="action-title">Surrender of document accepted</div>
                <div className="date">
                  {format(new Date(tradetrustErc721Event?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
                </div>
              </td>
              <td className="table-cell" colSpan={2}>
                <div className={eventIndex + 1 === endorsementChain.length ? "last-dash" : "dash"} />
                <div className="relative flex">
                  <div className="dot" data-testid="dot" />
                  <div className="h-5 mb-12" />
                </div>
              </td>
            </tr>
          );
          break;

        // ui for each transfer to wallet row
        case "Transfer to Wallet":
          tableRows.push(
            <tr className="table-row" key={index++}>
              <td className="table-cell">
                <div className="action-title" data-testid="transferred-to-wallet">
                  Transferred to wallet
                </div>
                <div className="date">
                  {format(new Date(tradetrustErc721Event?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
                </div>
              </td>
              <td className="table-cell" colSpan={2}>
                <div className={eventIndex + 1 === endorsementChain.length ? "last-dash" : "dash"} />
                <div className="relative flex flex-col mb-12">
                  <div className="dot" data-testid="dot" />
                  <div className="address">{tradetrustErc721Event.documentOwner}</div>
                </div>
              </td>
            </tr>
          );
          break;

        // default not needed as eventType has only 3 possibilities which are all accounted for
        default:
          trace("Unknown event type please check event history");
          break;
      }
    });

  return (
    <EndorsementChainLayoutStyle className="container pb-40">
      <div className="back-button" onClick={() => setShowEndorsementChain(false)} data-testid="back-button">
        <BackArrow />
      </div>
      <div className="text-grey-700 text-3xl font-bold mb-4" data-testid="endorsement-chain-title">
        Endorsement Chain
      </div>
      <div className="table-responsive">
        <table className="w-full mb-0">
          <thead className="text-left">
            <tr className="w-full bg-blue-800 text-white text-lg font-bold">
              <th className="table-cell">Action/Date</th>
              <th className="table-cell">Owner</th>
              <th className="table-cell">Holder</th>
            </tr>
          </thead>
          <tbody>
            {pending && !endorsementChain && !error && <EndorsementChainLoading />}
            {!pending && endorsementChain && !error && tableRows}
            {!pending && !endorsementChain && error && <EndorsementChainError error={error} />}
          </tbody>
        </table>
      </div>
    </EndorsementChainLayoutStyle>
  );
};

const EndorsementChainLayoutStyle = styled.div`
  .first-dash {
    ${tw`absolute border-l border-dashed border-teal`}
    top: 50%;
    bottom: 0;
    left: 0;

    @media only screen and (max-width: 1023px) {
      top: 45%;
    }
  }

  .first-transfer-dash {
    ${tw`absolute border-l border-dashed border-teal`}
    top: 20%;
    bottom: 0;
    left: 0;

    @media only screen and (max-width: 767px) {
      top: 15%;
    }
  }

  .dash {
    ${tw`absolute border-l border-dashed border-teal`}
    top: 0;
    bottom: 0;
    left: 0;
  }

  .last-dash {
    ${tw`absolute border-l border-dashed border-teal`}
    top: 0;
    bottom: 80%;
    left: 0;

    @media only screen and (max-width: 767px) {
      bottom: 83%;
    }
  }

  .last-transfer-dash {
    ${tw`absolute border-l border-dashed border-teal`}
    top: 0;
    bottom: 80%;
    left: 0;

    @media only screen and (max-width: 767px) {
      bottom: 88%;
    }
  }

  .back-button {
    ${tw`text-grey cursor-pointer mb-2`}

    &[data-disabled="true"] {
      ${tw`text-grey-300 cursor-not-allowed`}
    }
  }

  .table-row {
    ${tw`bg-white`}
  }

  .table-row > div {
    display: table-cell;
  }

  .table-header {
    ${tw`w-full bg-blue-800 text-white text-lg font-bold`}
  }

  .table-cell {
    padding: 0.5rem;
    position: relative;
    vertical-align: top;
    border-top: none;
  }

  .date {
    ${tw`text-sm font-semibold text-grey min-w-135 flex justify-end pr-2 mb-8`}
  }

  .action-title {
    ${tw`text-lg text-grey-700 font-semibold flex justify-end pr-2 text-right`}
  }

  .address {
    ${tw`text-blue`}
    word-break: break-word;
  }

  .dot {
    ${tw`absolute rounded-full bg-teal m-1 z-10`}
    height: 9px;
    width: 9px;
    left: -1rem;
    top: 5px;
  }
`;
