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
// import { EndorsementJourney } from "./EndorsementJourney";
// import { SimpleTableRow } from "./SimpleTableRow";

const { trace } = getLogger("component: endorsementchainlayout");

interface EndorsementChainLayout {
  endorsementChain?: TradeTrustErc721Event[];
  error?: string;
  pending: boolean;
  setShowEndorsementChain: (payload: boolean) => void;
}

enum EventType {
  TRANSFER = "Transfer",
  SURRENDER = "Surrender",
  BURNT = "Burnt",
  TRANSFER_TO_WALLET = "Transfer to Wallet",
}

export const EndorsementChainLayout: FunctionComponent<EndorsementChainLayout> = ({
  endorsementChain,
  setShowEndorsementChain,
  error,
  pending,
}) => {
  // let previousOwner = "";
  // let previousHolder = "";
  // let noOfNewHolder = 0;
  // let noOfNewOwner = 0;
  let tableRowIndex = 0;
  // let noOfTransferActions = 0;

  const tableRows: JSX.Element[] = [
    // By default there will always be this 'Document has been issued'
    // <SimpleTableRow
    //   key={tableRowIndex++}
    //   index={tableRowIndex++}
    //   actionTitle="Document has been issued"
    //   displayDashHead={false}
    //   displayDot={true}
    //   displayDashTail={true}
    // />,
    <tr className="table-row" key={tableRowIndex++}>
      <td className="table-cell">
        <div className="action-title">Document has been issued</div>
      </td>

      <td className="table-cell">
        <AddressCell
          address=""
          isNewAddress={true}
          // displayDashHead={dotVisibility[eventsIndex].beneficiary || dotVisibility.length - eventsIndex > 1}
          displayDashTail={false}
        />
      </td>
      <td className="table-cell">
        <AddressCell address="" isNewAddress={false} displayDashHead={false} displayDashTail={false} />
      </td>
    </tr>,
  ];

  // scan endorsement chain for total number of holder change events and total number of NEW holders before building the ui.
  // let totalNumberOfTransferActions = 0;
  // let totalNumberOfNewBeneficiaryEvents = 0;
  // let totalNumberOfNewHolderEvents = 0;
  // let scanPreviousBeneficiary = "";
  // let scanPreviousHolder = "";
  // let eventTypes: any = [];

  const dotVisibility: any = [];
  let eventsIndex = 0;
  let previousBeneficiary2 = "";
  let previousHolder2 = "";

  // loop to check all events for the document
  endorsementChain &&
    endorsementChain.forEach((event) => {
      const titleEscrowEvent = event as TitleEscrowEvent;
      const beneficiary = titleEscrowEvent.beneficiary;

      switch (titleEscrowEvent.eventType) {
        case EventType.TRANSFER:
          titleEscrowEvent.holderChangeEvents.forEach((holderChangeEvent) => {
            // when surrendered document is rejected
            if (previousBeneficiary2 === beneficiary && previousHolder2 === holderChangeEvent.holder) {
              dotVisibility[eventsIndex] = { id: eventsIndex, beneficiary: true, holder: true };
              eventsIndex++;
              return;
            }

            if (previousBeneficiary2 === beneficiary)
              dotVisibility[eventsIndex] = { id: eventsIndex, beneficiary: false, holder: false };
            else dotVisibility[eventsIndex] = { id: eventsIndex, beneficiary: true, holder: false };

            if (previousHolder2 === holderChangeEvent.holder) {
              dotVisibility[eventsIndex] = { ...dotVisibility[eventsIndex], holder: false };
            } else dotVisibility[eventsIndex] = { ...dotVisibility[eventsIndex], holder: true };

            previousBeneficiary2 = beneficiary;
            previousHolder2 = holderChangeEvent.holder;
            eventsIndex++;
          });
          break;

        default:
          dotVisibility[eventsIndex] = { id: eventsIndex, beneficiary: true, holder: false };
          eventsIndex++;
      }
      // if (event.eventType !== EventType.TRANSFER) {
      //   dotVisibility[eventsIndex] = { beneficiary: true, holder: false };
      //   eventsIndex++;
      //   return;
      // }

      // titleEscrowEvent.holderChangeEvents.forEach((holderChangeEvent) => {
      //   if (previousBeneficiary2 !== beneficiary) dotVisibility[eventsIndex] = { beneficiary: true, holder: false };
      //   else dotVisibility[eventsIndex] = { beneficiary: false, holder: false };

      //   if (previousHolder2 === holderChangeEvent.holder) {
      //     dotVisibility[eventsIndex] = { ...dotVisibility[eventsIndex], holder: false };
      //   } else dotVisibility[eventsIndex] = { ...dotVisibility[eventsIndex], holder: true };

      //   previousBeneficiary2 = beneficiary;
      //   previousHolder2 = holderChangeEvent.holder;
      //   eventsIndex++;
      // });

      // eventTypes[index] = event.eventType;
      // if (event.eventType !== "Transfer") return;
      // const ownerChangeEvent = event as TitleEscrowEvent;
      // totalNumberOfTransferActions += ownerChangeEvent.holderChangeEvents.length;
      // // check for total number of new beneficiary when looping every title escrow object
      // if (scanPreviousBeneficiary !== ownerChangeEvent.beneficiary) totalNumberOfNewBeneficiaryEvents++;
      // scanPreviousBeneficiary = ownerChangeEvent.beneficiary;
      // // loop and check for total number of new holders in change holder event array in title escrow
      // ownerChangeEvent.holderChangeEvents.forEach((holderChangeEvent) => {
      //   if (scanPreviousHolder !== holderChangeEvent.holder) totalNumberOfNewHolderEvents++;
      //   scanPreviousHolder = holderChangeEvent.holder;
      // });
    });

  console.log(dotVisibility);

  eventsIndex = 0;

  // for each erc721 event, build the ui according to the event type.
  endorsementChain &&
    // endorsementChain.forEach((tradetrustErc721Event, eventIndex) => {
    endorsementChain.forEach((tradetrustErc721Event) => {
      // const isLastEvent = eventIndex + 1 === endorsementChain.length;
      let isLastEvent = eventsIndex + 1 === dotVisibility.length;

      const titleEscrowEvent = tradetrustErc721Event as TitleEscrowEvent;

      switch (titleEscrowEvent.eventType) {
        case "Transfer":
          titleEscrowEvent.holderChangeEvents.forEach((holderChangeEvent) => {
            const isFirstRow = eventsIndex === 0;
            isLastEvent = eventsIndex + 1 === dotVisibility.length;

            let dashHeadCountHolder = 0;

            // loop to determine if dash head of event->holder should be drawn
            if (dotVisibility[eventsIndex].holder === true) {
              for (let i = eventsIndex; i >= 1; i--) {
                dashHeadCountHolder++;
                if (dotVisibility[i - 1].holder === true) {
                  break;
                }
              }
            }

            tableRows.push(
              <tr className="table-row" key={tableRowIndex++}>
                <td className="table-cell">
                  {dotVisibility[eventsIndex].beneficiary && (
                    <div className="action-title">Endorse change of ownership</div>
                  )}
                  {!dotVisibility[eventsIndex].beneficiary && dotVisibility[eventsIndex].holder && (
                    <div className="action-title">Transfer holdership</div>
                  )}
                  {!dotVisibility[eventsIndex].beneficiary && !dotVisibility[eventsIndex].holder && (
                    <div className="action-title">Surrender of document rejected</div>
                  )}
                  <div className="date">{format(new Date(holderChangeEvent.timestamp), "do MMM yyyy, hh:mm aa")}</div>
                </td>

                <td className="table-cell">
                  <AddressCell
                    address={titleEscrowEvent.beneficiary}
                    titleEscrowAddress={titleEscrowEvent.documentOwner}
                    isNewAddress={dotVisibility[eventsIndex].beneficiary}
                    // displayDashHead={dotVisibility[eventsIndex].beneficiary || dotVisibility.length - eventsIndex > 1}
                    displayDashHead={dotVisibility[eventsIndex].beneficiary}
                    displayDashTail={!isLastEvent}
                  />
                </td>
                <td className="table-cell">
                  <AddressCell
                    address={holderChangeEvent.holder}
                    titleEscrowAddress={titleEscrowEvent.documentOwner}
                    isNewAddress={dotVisibility[eventsIndex].holder}
                    // displayDashHead={!isFirstRow && true}
                    displayDashHead={!isFirstRow && dotVisibility[eventsIndex].holder}
                    displayDashTail={!isLastEvent}
                    pathDistance={dashHeadCountHolder}
                  />
                </td>
              </tr>
            );

            eventsIndex++;
          });
          break;

        case "Surrender":
          tableRows.push(
            <tr className="table-row" key={tableRowIndex++}>
              <td className="table-cell">
                <div className="action-title">Document surrendered to issuer</div>
                <div className="date">
                  {format(new Date(titleEscrowEvent?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
                </div>
              </td>
              <td className="table-cell">
                <AddressCell
                  address=""
                  isNewAddress={dotVisibility[eventsIndex].beneficiary}
                  displayDashHead={true}
                  displayDashTail={!isLastEvent}
                />
              </td>
              <td className="table-cell">
                <AddressCell
                  address=""
                  isNewAddress={dotVisibility[eventsIndex].holder}
                  // displayDashHead={true}
                  displayDashHead={false}
                  displayDashTail={!isLastEvent}
                />
              </td>
            </tr>
          );

          eventsIndex++;
          break;

        case "Burnt":
          tableRows.push(
            <tr className="table-row" key={tableRowIndex++}>
              <td className="table-cell">
                <div className="action-title">Surrender of document accepted</div>
                <div className="date">
                  {format(new Date(titleEscrowEvent?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
                </div>
              </td>
              <td className="table-cell">
                <AddressCell
                  address=""
                  isNewAddress={dotVisibility[eventsIndex].beneficiary}
                  displayDashHead={true}
                  displayDashTail={!isLastEvent && true}
                />
              </td>
              <td className="table-cell">
                <AddressCell
                  address=""
                  isNewAddress={dotVisibility[eventsIndex].holder}
                  displayDashHead={false}
                  displayDashTail={!isLastEvent && true}
                />
              </td>
            </tr>
          );

          eventsIndex++;
          break;

        case "Transfer to Wallet":
          tableRows.push(
            <tr className="table-row" key={tableRowIndex++}>
              <td className="table-cell">
                <div className="action-title">Transfer to Wallet</div>
                <div className="date">
                  {format(new Date(titleEscrowEvent?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
                </div>
              </td>
              <td className="table-cell">
                <AddressCell
                  address={titleEscrowEvent.documentOwner}
                  isNewAddress={dotVisibility[eventsIndex].beneficiary}
                  displayDashHead={true}
                  displayDashTail={!isLastEvent && true}
                />
              </td>
              <td className="table-cell">
                <AddressCell
                  address=""
                  isNewAddress={dotVisibility[eventsIndex].holder}
                  // displayDashHead={true}
                  displayDashHead={false}
                  displayDashTail={!isLastEvent && true}
                />
              </td>
            </tr>
          );

          eventsIndex++;
          break;

        // case "Transfer":
        //   const ownerChangeEvent = tradetrustErc721Event as TitleEscrowEvent;

        //   if (!ownerChangeEvent.holderChangeEvents || !ownerChangeEvent.beneficiary) {
        //     return new Error("Invalid Event: Transfer Event does not have new owner or new holder address");
        //   }

        //   ownerChangeEvent.holderChangeEvents.forEach((holderChangeEvent, holderIndex) => {
        //     const isNewOwnerAddress = previousOwner !== ownerChangeEvent.beneficiary;
        //     const isNewHolderAddress = previousHolder !== holderChangeEvent.holder;
        //     let endorseChangeOfOwnershipFlag = false;
        //     let transferHoldershipFlag = false;
        //     let rejectedDocumentFlag = false;

        //     if (isNewOwnerAddress) noOfNewOwner++;
        //     if (isNewHolderAddress) noOfNewHolder++;

        //     if (isNewOwnerAddress) endorseChangeOfOwnershipFlag = true;
        //     if (isNewHolderAddress && !isNewOwnerAddress) transferHoldershipFlag = true;
        //     if (!isNewOwnerAddress && !isNewHolderAddress) rejectedDocumentFlag = true;

        //     const isFirstRowHolder = eventIndex === 0 && holderIndex === 0;
        //     noOfTransferActions++;

        //     // ui for each row of holderChangeEvent
        //     tableRows.push(
        //       <tr className="table-row" key={tableRowIndex++}>
        //         <td className="table-cell">
        //           {endorseChangeOfOwnershipFlag && <div className="action-title">Endorse change of ownership</div>}
        //           {transferHoldershipFlag && <div className="action-title">Transfer holdership</div>}
        //           {rejectedDocumentFlag && <div className="action-title">Surrender of document rejected</div>}
        //           <div className="date">{format(new Date(holderChangeEvent.timestamp), "do MMM yyyy, hh:mm aa")}</div>
        //         </td>
        //         <td className="table-cell">
        //           <AddressCell
        //             address={ownerChangeEvent.beneficiary}
        //             titleEscrowAddress={ownerChangeEvent.documentOwner}
        //             isNewAddress={isNewOwnerAddress || (!isNewOwnerAddress && !isNewHolderAddress)}
        //             displayDashHead={!isLastEvent || endorseChangeOfOwnershipFlag || rejectedDocumentFlag}
        //             displayDashTail={!isLastEvent || noOfNewOwner !== totalNumberOfNewBeneficiaryEvents}
        //           />
        //         </td>
        //         <td className="table-cell">
        //           <AddressCell
        //             address={holderChangeEvent.holder}
        //             titleEscrowAddress={ownerChangeEvent.documentOwner}
        //             isNewAddress={isNewHolderAddress || (!isNewOwnerAddress && !isNewHolderAddress)}
        //             displayDashHead={
        //               (!isFirstRowHolder && !isLastEvent) || transferHoldershipFlag || rejectedDocumentFlag
        //             }
        //             displayDashTail={
        //               noOfNewHolder !== totalNumberOfNewHolderEvents ||
        //               noOfTransferActions !== totalNumberOfTransferActions
        //             }
        //           />
        //         </td>
        //         {/* {console.log(noOfNewHolder, totalNumberOfNewHolderEvents)} */}
        //       </tr>
        //     );
        //     previousOwner = ownerChangeEvent.beneficiary;
        //     previousHolder = holderChangeEvent.holder;
        //   });
        //   break;

        // ui for each surrender row
        // case "Surrender":
        //   tableRows.push(
        //     <tr className="table-row" key={tableRowIndex++}>
        //       <td className="table-cell">
        //         <div className="action-title">Document surrendered to issuer</div>
        //         <div className="date">
        //           {format(new Date(tradetrustErc721Event?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
        //         </div>
        //       </td>
        //       <td className="table-cell">
        //         <AddressCell address="" isNewAddress={true} displayDashHead={true} displayDashTail={!isLastEvent} />
        //       </td>
        //       <td className="table-cell">
        //         <AddressCell
        //           address=""
        //           isNewAddress={false}
        //           displayDashHead={!isLastEvent && noOfTransferActions !== totalNumberOfTransferActions}
        //           displayDashTail={!isLastEvent && noOfTransferActions !== totalNumberOfTransferActions}
        //         />
        //       </td>
        //     </tr>
        //   );
        //   break;

        // ui for each accepted surrender row
        // case "Burnt":
        //   tableRows.push(
        //     <SimpleTableRow
        //       key={tableRowIndex++}
        //       index={tableRowIndex++}
        //       date={format(new Date(tradetrustErc721Event?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
        //       actionTitle="Surrender of document accepted"
        //       displayDashHead={true}
        //       displayDot={true}
        //       displayDashTail={!isLastEvent}
        //     />
        //   );
        //   break;

        // ui for each transfer to wallet row
        // case "Transfer to Wallet":
        //   tableRows.push(
        //     <tr className="table-row" key={tableRowIndex++}>
        //       <td className="table-cell">
        //         <div className="action-title" data-testid="transferred-to-wallet">
        //           Transferred to wallet
        //         </div>
        //         <div className="date">
        //           {format(new Date(tradetrustErc721Event?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
        //         </div>
        //       </td>
        //       <td className="table-cell">
        //         <EndorsementJourney displayDashHead={true} displayDot={true} displayDashTail={!isLastEvent} />
        //         <div className="address">{tradetrustErc721Event.documentOwner}</div>
        //       </td>
        //       <td className="table-cell">
        //         <EndorsementJourney
        //           displayDashHead={!isLastEvent && noOfTransferActions !== totalNumberOfTransferActions}
        //           displayDot={false}
        //           displayDashTail={!isLastEvent && noOfTransferActions !== totalNumberOfTransferActions}
        //         />
        //       </td>
        //     </tr>
        //   );
        //   break;

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
      ${tw`pl-7 pr-4 py-4`}
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
