import styled from "@emotion/styled";
import { format } from "date-fns";
import React, { FunctionComponent } from "react";
import { mixin, vars } from "../../../styles";
import { TradeTrustErc721Event, TitleEscrowEvent } from "../../../types";
import { ArrowLeft } from "react-feather";
import { AddressCell } from "./AddressCell";
import { EndorsementChainError } from "./EndorsementChainError";
import { EndorsementChainLoading } from "./EndorsementChainLoading";
import { getLogger } from "../../../utils/logger";

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
                <td className="table-cell date">
                  {format(new Date(holderChangeEvent.timestamp), "do MMM yyyy, hh:mm aa")}
                </td>
                <td className="table-cell endorsement-ui-dash">
                  {eventIndex === 0 && holderIndex === 0 && <div className="mask" />}
                  <AddressCell
                    address={beneficiaryChangeEvent.beneficiary}
                    titleEscrowAddress={beneficiaryChangeEvent.documentOwner}
                    newAddress={!(previousBeneficiary === beneficiaryChangeEvent.beneficiary)}
                  />
                </td>
                <td className="table-cell endorsement-ui-dash">
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
              <td colSpan={2} className="endorsement-ui-dash border-top-none">
                <div className="name-row">
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
              <td colSpan={2} className="endorsement-ui-dash border-top-none">
                <div className="name-row">
                  <div className="dot" data-testid="dot" />
                  <div className="name">Surrender of document accepted</div>
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
    <div className={`container-custom ${className} `}>
      <div className="table-container">
        <div className="back-button" onClick={() => setShowEndorsementChain(false)} data-testid="back-button">
          <div className="row align-items-center no-gutters">
            <div className="col-auto mr-1">
              <ArrowLeft />
            </div>
            <div className="col-auto">
              <p className="mb-0">Back</p>
            </div>
          </div>
        </div>
        <div className="endorsement-chain-title">Endorsement Chain</div>
        <div className="table-responsive">
          <table className="table">
            <thead>
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
    border-left: dashed 1px ${vars.teal};
    position: relative;
    min-width: 200px;
  }

  .mask {
    width: 3px;
    height: 22px;
    background-color: ${vars.white};
    position: absolute;
    left: -2px;
    top: 0px;
  }

  .back-button {
    color: ${vars.grey};
    cursor: pointer;
    margin-bottom: 10px;

    &[data-disabled="true"] {
      color: ${vars.greyLight};
      cursor: default;
    }
  }

  .endorsement-chain-title {
    color: ${vars.greyDark};
    font-size: ${mixin.fontSize(28)};
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .table-container {
    padding-bottom: 10rem;
  }

  .table {
    width: 100%;
    margin-bottom: 0;
  }

  .table-row {
    background-color: ${vars.white};
  }

  .table-row > div {
    display: table-cell;
  }

  .table-header {
    background-color: ${vars.blueDark};
    color: ${vars.white};
    font-size: ${mixin.fontSize(18)};
    font-weight: bold;
    width: 100%;
  }

  .table-cell {
    padding: 0.5rem;
  }

  .border-top-none {
    border-top: none;
  }

  .date {
    font-weight: bold;
    color: ${vars.greyDark};
    min-width: 140px;
  }

  .name {
    font-size: ${mixin.fontSize(18)};
    color: ${vars.greyDark};
    font-weight: bold;
  }

  .dot {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: ${vars.teal};
    margin: 0.25rem;
    position: absolute;
    left: -21.5px;
    top: 5px;
    z-index: 4;
  }

  .name-row {
    display: flex;
    align-items: center;
    position: relative;
    min-height: 27px;
  }

  .loading-cell {
    padding: 0;
    border-top: none;
  }
`;
