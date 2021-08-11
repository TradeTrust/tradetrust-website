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
import { EndorsementJourney } from "./EndorsementJourney";
import { SimpleTableRow } from "./SimpleTableRow";

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
  let previousOwner = "";
  let previousHolder = "";
  let noOfNewHolder = 0;
  let tableRowIndex = 0;
  let noOfTransferActions = 0;

  const tableRows: JSX.Element[] = [
    // By default there will always be this 'Document has been issued'
    <SimpleTableRow
      key={tableRowIndex++}
      index={tableRowIndex++}
      actionTitle="Document has been issued"
      displayDashHead={false}
      displayDot={true}
      displayDashTail={true}
    />,
  ];

  // scan endorsement chain for total number of holder change events and total number of NEW holders before building the ui.
  let totalNumberOfTransferActions = 0;
  let totalNumberOfNewHolderEvents = 0;
  let scanPreviousHolder = "";
  endorsementChain &&
    endorsementChain.forEach((event) => {
      if (event.eventType !== "Transfer") return;

      const ownerChangeEvent = event as TitleEscrowEvent;
      totalNumberOfTransferActions += ownerChangeEvent.holderChangeEvents.length;

      ownerChangeEvent.holderChangeEvents.forEach((holderChangeEvent) => {
        if (scanPreviousHolder !== holderChangeEvent.holder) totalNumberOfNewHolderEvents++;
        scanPreviousHolder = holderChangeEvent.holder;
      });
    });

  // for each erc721 event, build the ui according to the event type.
  endorsementChain &&
    endorsementChain.forEach((tradetrustErc721Event, eventIndex) => {
      const isLastEvent = eventIndex + 1 === endorsementChain.length;

      switch (tradetrustErc721Event.eventType) {
        // for transfer event we need to loop through the holderChangeEvents to get each holder change.
        case "Transfer":
          const ownerChangeEvent = tradetrustErc721Event as TitleEscrowEvent;

          if (!ownerChangeEvent.holderChangeEvents || !ownerChangeEvent.beneficiary) {
            return new Error("Invalid Event: Transfer Event does not have new owner or new holder address");
          }

          ownerChangeEvent.holderChangeEvents.forEach((holderChangeEvent, holderIndex) => {
            const isNewOwnerAddress = previousOwner !== ownerChangeEvent.beneficiary;
            const isNewHolderAddress = previousHolder !== holderChangeEvent.holder;
            if (isNewHolderAddress) noOfNewHolder++;
            const isFirstRowHolder = eventIndex === 0 && holderIndex === 0;
            noOfTransferActions++;

            // ui for each row of holderChangeEvent
            tableRows.push(
              <tr className="table-row" key={tableRowIndex++}>
                <td className="table-cell">
                  {isNewOwnerAddress && <div className="action-title">Endorse change of ownership</div>}
                  {isNewHolderAddress && !isNewOwnerAddress && <div className="action-title">Transfer holdership</div>}
                  <div className="date">{format(new Date(holderChangeEvent.timestamp), "do MMM yyyy, hh:mm aa")}</div>
                </td>
                <td className="table-cell">
                  <AddressCell
                    address={ownerChangeEvent.beneficiary}
                    titleEscrowAddress={ownerChangeEvent.documentOwner}
                    isNewAddress={isNewOwnerAddress}
                    displayDashHead={!(isLastEvent && !isNewOwnerAddress)}
                    displayDashTail={!isLastEvent}
                  />
                </td>
                <td className="table-cell">
                  <AddressCell
                    address={holderChangeEvent.holder}
                    titleEscrowAddress={ownerChangeEvent.documentOwner}
                    isNewAddress={isNewHolderAddress}
                    displayDashHead={
                      !(isFirstRowHolder || (noOfNewHolder === totalNumberOfNewHolderEvents && !isNewHolderAddress))
                    }
                    displayDashTail={
                      !(
                        (isFirstRowHolder && noOfTransferActions === totalNumberOfTransferActions) ||
                        noOfNewHolder === totalNumberOfNewHolderEvents
                      )
                    }
                  />
                </td>
              </tr>
            );
            previousOwner = ownerChangeEvent.beneficiary;
            previousHolder = holderChangeEvent.holder;
          });
          break;

        // ui for each surrender row
        case "Surrender":
          tableRows.push(
            <SimpleTableRow
              key={tableRowIndex++}
              index={tableRowIndex++}
              date={format(new Date(tradetrustErc721Event?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
              actionTitle="Document surrendered to issuer"
              displayDashHead={true}
              displayDot={true}
              displayDashTail={!isLastEvent}
            />
          );
          break;

        // ui for each accepted surrender row
        case "Burnt":
          tableRows.push(
            <SimpleTableRow
              key={tableRowIndex++}
              index={tableRowIndex++}
              date={format(new Date(tradetrustErc721Event?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
              actionTitle="Surrender of document accepted"
              displayDashHead={true}
              displayDot={true}
              displayDashTail={!isLastEvent}
            />
          );
          break;

        // ui for each transfer to wallet row
        case "Transfer to Wallet":
          tableRows.push(
            <tr className="table-row" key={tableRowIndex++}>
              <td className="table-cell">
                <div className="action-title" data-testid="transferred-to-wallet">
                  Transferred to wallet
                </div>
                <div className="date">
                  {format(new Date(tradetrustErc721Event?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
                </div>
              </td>
              <td className="table-cell">
                <EndorsementJourney displayDashHead={true} displayDot={true} displayDashTail={!isLastEvent} />
                <div className="address">{tradetrustErc721Event.documentOwner}</div>
              </td>
              <td className="table-cell">
                <EndorsementJourney
                  displayDashHead={!isLastEvent && noOfTransferActions !== totalNumberOfTransferActions}
                  displayDot={false}
                  displayDashTail={!isLastEvent && noOfTransferActions !== totalNumberOfTransferActions}
                />
              </td>
            </tr>
          );
          break;

        // default not needed as eventType has only 4 possibilities which are all accounted for
        default:
          trace("Unknown event type please check event history");
          break;
      }
    });

  return (
    <EndorsementChainLayoutStyle className="container pb-40 my-4">
      <div className="back-button" onClick={() => setShowEndorsementChain(false)} data-testid="back-button">
        <BackArrow />
      </div>
      <div className="text-gray-700 text-3xl font-bold mb-4" data-testid="endorsement-chain-title">
        Endorsement Chain
      </div>
      <div className="table-responsive">
        <table className="w-full mb-0">
          <thead className="text-left">
            <tr className="w-full bg-denim-900 text-white text-lg font-bold">
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
  .back-button {
    ${tw`text-gray-500 cursor-pointer mb-2`}

    &[data-disabled="true"] {
      ${tw`text-gray-300 cursor-not-allowed`}
    }
  }

  .table-row {
    ${tw`bg-white`}
  }

  .table-row > div {
    display: table-cell;
  }

  .table-cell {
    position: relative;
    vertical-align: top;
    border-top: none;
  }

  thead {
    th {
      ${tw`px-4 py-2`}
    }
  }

  tbody {
    td {
      ${tw`px-4 py-4`}
    }
  }

  .date {
    ${tw`text-sm font-semibold text-gray-500 min-w-135 flex justify-end text-right`}
  }

  .action-title {
    ${tw`text-lg text-gray-700 font-semibold flex justify-end text-right`}
  }

  .address {
    ${tw`text-cerulean-500`}
    word-break: break-word;
  }
`;
