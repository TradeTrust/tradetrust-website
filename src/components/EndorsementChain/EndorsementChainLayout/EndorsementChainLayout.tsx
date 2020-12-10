import styled from "@emotion/styled";
import { format } from "date-fns";
import React, { FunctionComponent } from "react";
import { ArrowLeft } from "react-feather";
import tw from "twin.macro";
import { TitleEscrowEvent, TradeTrustErc721Event } from "../../../types";
import { getLogger } from "../../../utils/logger";
import { AddressCell } from "./AddressCell";
import { EndorsementChainError } from "./EndorsementChainError";
import { EndorsementChainLoading } from "./EndorsementChainLoading";

const { trace } = getLogger("component: endorsementchainlayout");

interface EndorsementChainLayout {
  endorsementChain?: TradeTrustErc721Event[];
  className?: string;
  error?: string;
  pending: boolean;
  setShowEndorsementChain: (payload: boolean) => void;
}

const EndorsementChainLayoutUnstyled: FunctionComponent<EndorsementChainLayout> = ({
  endorsementChain,
  setShowEndorsementChain,
  className,
  error,
  pending,
}) => {
  let previousBeneficiary = "";
  let previousHolder = "";
  const tableRows: JSX.Element[] = [];
  let index = 0;
  endorsementChain &&
    endorsementChain.forEach((tradetrustErc721Event, eventIndex) => {
      // default not needed as eventType has only 3 possibilities which are all accounted for
      switch (tradetrustErc721Event.eventType) {
        case "Transfer":
          const beneficiaryChangeEvent = tradetrustErc721Event as TitleEscrowEvent;
          if (!beneficiaryChangeEvent.holderChangeEvents || !beneficiaryChangeEvent.beneficiary)
            return new Error("Invalid Event: Transfer Event does not have new beneficiary or new holder address");
          beneficiaryChangeEvent.holderChangeEvents.forEach((holderChangeEvent, holderIndex) => {
            tableRows.push(
              <tr className="table-row" key={index++}>
                <td className="table-cell date border-top-none">
                  {format(new Date(holderChangeEvent.timestamp), "do MMM yyyy, hh:mm aa")}
                </td>
                <td className="table-cell endorsement-ui-dash border-top-none">
                  {eventIndex === 0 && holderIndex === 0 && <div className="mask" />}
                  <AddressCell
                    address={beneficiaryChangeEvent.beneficiary}
                    titleEscrowAddress={beneficiaryChangeEvent.documentOwner}
                    newAddress={!(previousBeneficiary === beneficiaryChangeEvent.beneficiary)}
                  />
                </td>
                <td className="table-cell endorsement-ui-dash border-top-none">
                  {eventIndex === 0 && holderIndex === 0 && <div className="mask" />}
                  <AddressCell
                    address={holderChangeEvent.holder}
                    titleEscrowAddress={beneficiaryChangeEvent.documentOwner}
                    newAddress={!(previousHolder === holderChangeEvent.holder)}
                  />
                </td>
              </tr>
            );
            previousBeneficiary = beneficiaryChangeEvent.beneficiary;
            previousHolder = holderChangeEvent.holder;
          });
          break;
        case "Surrender":
          tableRows.push(
            <tr className="table-row" key={index++}>
              <td className="table-cell date border-top-none">
                {format(new Date(tradetrustErc721Event?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
              </td>
              <td className="table-cell endorsement-ui-dash border-top-none" colSpan={2}>
                <div className="relative flex">
                  <div className="dot" data-testid="dot" />
                  <div className="name">Document surrendered to Issuer</div>
                </div>
              </td>
            </tr>
          );
          break;
        case "Burnt":
          tableRows.push(
            <tr className="table-row" key={index++}>
              <td className="table-cell date border-top-none">
                {format(new Date(tradetrustErc721Event?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
              </td>
              <td className="table-cell endorsement-ui-dash border-top-none" colSpan={2}>
                <div className="relative flex">
                  <div className="dot" data-testid="dot" />
                  <div className="name">Surrender of document accepted</div>
                </div>
              </td>
            </tr>
          );
          break;
        case "Transfer to Wallet":
          tableRows.push(
            <tr className="table-row" key={index++}>
              <td className="table-cell date border-top-none">
                {format(new Date(tradetrustErc721Event?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
              </td>
              <td className="table-cell endorsement-ui-dash border-top-none" colSpan={2}>
                <div className="relative flex flex-col">
                  <div className="dot" data-testid="dot" />
                  <div className="name" data-testid="transferred-to-wallet">
                    Transferred to wallet
                  </div>
                  <div className="address">{tradetrustErc721Event.documentOwner}</div>
                </div>
              </td>
            </tr>
          );
          break;
        default:
          trace("Unknown event type please check event history");
          break;
      }
    });

  return (
    <div className={`container ${className} `}>
      <div className="table-container">
        <div className="back-button" onClick={() => setShowEndorsementChain(false)} data-testid="back-button">
          <div className="flex items-center">
            <div className="w-auto mr-1">
              <ArrowLeft />
            </div>
            <div className="w-auto">
              <p className="mb-0">Back</p>
            </div>
          </div>
        </div>
        <div className="endorsement-chain-title">Endorsement Chain</div>
        <div className="table-responsive">
          <table className="table">
            <thead className="text-left">
              <tr className="table-header table-row">
                <th className="table-cell">Date</th>
                <th className="table-cell">Owner</th>
                <th className="table-cell">Holder</th>
              </tr>
            </thead>
            <tbody>
              {pending && <EndorsementChainLoading />}
              {endorsementChain && tableRows}
            </tbody>
          </table>
        </div>
        {error && <EndorsementChainError error={error} />}
      </div>
    </div>
  );
};

export const EndorsementChainLayout = styled(EndorsementChainLayoutUnstyled)`
  .endorsement-ui-dash {
    ${tw`relative border-l border-dashed border-teal min-w-200`}
  }

  .mask {
    ${tw`absolute w-1 h-6 bg-white top-0`}
    left: -2px;
  }

  .back-button {
    ${tw`text-grey cursor-pointer mb-2`}

    &[data-disabled="true"] {
      ${tw`text-grey-300 cursor-default`}
    }
  }

  .endorsement-chain-title {
    ${tw`text-grey-700 text-3xl font-bold mb-4`}
  }

  .table-container {
    padding-bottom: 10rem;
  }

  .table {
    ${tw`w-full mb-0`}
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
  }

  .border-top-none {
    border-top: none;
  }

  .date {
    ${tw`font-bold text-grey-700 min-w-135`}
  }

  .name {
    ${tw`text-lg text-grey-700 font-bold`}
  }

  .address {
    color: ${vars.brandBlue};
    margin-bottom: 2rem;
    word-break: break-word;
  }

  .dot {
    ${tw`absolute h-3 w-3 rounded-full bg-teal m-1 z-10`}
    left: -18px;
    top: 4px;
  }

  .loading-cell {
    padding: 0;
    border-top: none;
  }
`;
