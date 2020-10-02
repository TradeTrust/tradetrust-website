import styled from "@emotion/styled";
import { format } from "date-fns";
import React, { FunctionComponent } from "react";
import { mixin, vars } from "../../../styles";
import { TradeTrustErc721Event, TitleEscrowEvent } from "../../../types";
import { ArrowLeft } from "react-feather";
import { AddressCell } from "./AddressCell";
import { EndorsementChainError } from "./EndorsementChainError";
import { EndorsementChainLoading } from "./EndorsementChainLoading";
import { TagBorderedRedLarge } from "../../UI/Tag";

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
      switch (tradetrustErc721Event.eventType) {
        case "Transfer":
          const beneficiaryChangeEvent = tradetrustErc721Event as TitleEscrowEvent;
          if (!beneficiaryChangeEvent.holderChangeEvents || !beneficiaryChangeEvent.beneficiary)
            return new Error("Invalid Event: Transfer Event does not have new beneficiary or new holder address");
          beneficiaryChangeEvent.holderChangeEvents.forEach((holderChangeEvent, holderIndex) => {
            tableRows.push(
              <div className="table-row" key={index++}>
                <div className="table-cell date">
                  {format(new Date(holderChangeEvent.timestamp), "do MMM yyyy, hh:mm aa")}
                </div>
                <div className="table-cell endorsement-ui-dash">
                  {eventIndex === 0 && holderIndex === 0 && <div className="mask" />}
                  <AddressCell
                    address={beneficiaryChangeEvent.beneficiary}
                    titleEscrowAddress={beneficiaryChangeEvent.documentOwner}
                    newAddress={!(previousBeneficiary === beneficiaryChangeEvent.beneficiary)}
                  />
                </div>
                <div className="table-cell endorsement-ui-dash">
                  {eventIndex === 0 && holderIndex === 0 && <div className="mask" />}
                  <AddressCell
                    address={holderChangeEvent.holder}
                    titleEscrowAddress={beneficiaryChangeEvent.documentOwner}
                    newAddress={!(previousHolder === holderChangeEvent.holder)}
                  />
                </div>
              </div>
            );
            previousBeneficiary = beneficiaryChangeEvent.beneficiary;
            previousHolder = holderChangeEvent.holder;
          });
          return;
        case "Surrender":
          tableRows.push(
            <div className="table-row" key={index++}>
              <div className="table-cell date">
                {format(new Date(tradetrustErc721Event?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
              </div>
              <td colSpan={2} className="endorsement-ui-dash border-top-none">
                <TagBorderedRedLarge>Surrendered To Issuer</TagBorderedRedLarge>
              </td>
            </div>
          );
          return;
        case "Burnt":
          tableRows.push(
            <div className="table-row" key={index++}>
              <div className="table-cell date">
                {format(new Date(tradetrustErc721Event?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
              </div>
              <td colSpan={2} className="endorsement-ui-dash border-top-none">
                <TagBorderedRedLarge>Surrendered Accepted</TagBorderedRedLarge>
              </td>
            </div>
          );
          return;
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
          <div className="table">
            <div className="table-header table-row">
              <div className="table-cell">Date</div>
              <div className="table-cell">Owner</div>
              <div className="table-cell">Holder</div>
            </div>
            {pending && <EndorsementChainLoading />}
            {endorsementChain && tableRows}
          </div>
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
    display: table;
    width: 100%;
    margin-bottom: 0;
  }

  .table-row {
    display: table-row;
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
`;
