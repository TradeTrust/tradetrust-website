// import styled from "@emotion/styled";
import { BackArrow } from "@govtechsg/tradetrust-ui-components";
import { format } from "date-fns";
import React, { FunctionComponent } from "react";
import { Info } from "react-feather";
// import tw from "twin.macro";
import { TitleEscrowEvent, TradeTrustErc721Event } from "../../../types";
// import { getLogger } from "../../../utils/logger";
import { TooltipIcon } from "../../UI/SvgIcon";
// import { AddressCell } from "./AddressCell";
import { EndorsementChainError } from "./EndorsementChainError";
import { EndorsementChainLoading } from "./EndorsementChainLoading";

// const { trace } = getLogger("component: endorsementchainlayout");

interface EndorsementChainLayout {
  endorsementChain?: (TradeTrustErc721Event | TitleEscrowEvent)[];
  error?: string;
  pending: boolean;
  setShowEndorsementChain: (payload: boolean) => void;
}

// const tableRow: FunctionComponent<{ key: number }> = ({ key }) => {
//   return (
//     <tr className="table-row" key={key}>
//       <td className="table-cell">
//         <div className="action-title">Document has been issued</div>
//       </td>
//       <td className="table-cell">
//         <AddressCell
//           address=""
//           isNewAddress={true}
//           // displayDashHead={dotVisibility[eventsIndex].beneficiary || dotVisibility.length - eventsIndex > 1}
//           displayDashTail={false}
//         />
//       </td>
//       <td className="table-cell">
//         <AddressCell address="" isNewAddress={false} displayDashHead={false} displayDashTail={false} />
//       </td>
//     </tr>
//   );
// };

enum EventType {
  TRANSFER = "Transfer",
  SURRENDER = "Surrender",
  BURNT = "Burnt",
  TRANSFER_TO_WALLET = "Transfer to Wallet",
}

enum ActionType {
  INITIAL = "Document has been issued",
  ENDORSE = "Endorse change of ownership",
  TRANSFER = "Transfer holdership",
  SURRENDERED = "Document surrendered to issuer",
  SURRENDER_REJECTED = "Surrender of document rejected",
  SURRENDER_ACCEPTED = "Surrender of document accepted", // burnt token
  TRANSFER_TO_WALLET = "Transfer to Wallet",
}

interface HistoryChain {
  action: ActionType;
  isNewBeneficiary: boolean;
  isNewHolder: boolean;
  documentOwner?: string;
  beneficiary?: string;
  holder?: string;
  timestamp?: number;
}

const EndorsementChainData: React.FunctionComponent<any> = ({ data }) => {
  const tooltipContent = (
    <div className="relative flex flex-col">
      <div className="text-white font-bold text-base">Title Escrow:</div>
      <div className="text-white text-base">{data.documentOwner}</div>
    </div>
  );
  return (
    <div className="mt-10">
      {/* <div className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10"> */}
      <div className="inline-block align-top px-5 z-10 lg:hidden">
        <div className="border-l border-dashed border-cerulean ml-1.5" data-testid="dash-head" />
        <div className="rounded-full bg-cerulean h-3 w-3" data-testid="dot" />
      </div>

      <div className="inline-block lg:flex lg:flex-row">
        <div className="pr-6 lg:w-4/12 lg:text-right">
          <div className="inline-block lg:w-10/12">
            <h4 className="text-cloud-900">{data.action}</h4>
            {data.timestamp && (
              <h6 className="text-gray-400">{format(new Date(data.timestamp ?? 0), "do MMM yyyy, hh:mm aa")}</h6>
            )}
          </div>

          <div className="hidden lg:inline-block lg:align-top lg:px-5 lg:w-2/12">
            <div className="border-l border-dashed border-cerulean ml-1.5" data-testid="dash-head" />
            <div className="rounded-full bg-cerulean h-3 w-3" data-testid="dot" />
          </div>
        </div>

        {data.beneficiary && (
          <div className="lg:w-4/12">
            <h5 className="inline-block text-gray-400 mr-2 lg:hidden">Owner</h5>
            <TooltipIcon className="inline-block h-5 w-5 icon" content={tooltipContent} placement="top">
              <Info />
            </TooltipIcon>

            <h6 className="text-cerulean break-all">{data.beneficiary}</h6>
          </div>
        )}

        {data.holder && (
          <div className="lg:w-4/12">
            <h5 className="inline-block text-gray-400 mr-2 lg:hidden">Holder</h5>
            <TooltipIcon className="inline-block h-5 w-5 icon" content={tooltipContent} placement="top">
              <Info />
            </TooltipIcon>
            <h6 className="text-cerulean break-all">{data.holder}</h6>
          </div>
        )}
      </div>
    </div>
  );
};

export const EndorsementChainLayout: FunctionComponent<EndorsementChainLayout> = ({
  endorsementChain,
  setShowEndorsementChain,
  error,
  pending,
}) => {
  // TODO - START
  const historyChain: HistoryChain[] = [
    {
      action: ActionType.INITIAL,
      isNewBeneficiary: true,
      isNewHolder: false,
    },
  ];

  let previousBeneficiary = "";
  let previousHolder = "";

  endorsementChain?.forEach((endorsementChainEvent) => {
    const chain = endorsementChainEvent as TitleEscrowEvent;
    const documentOwner = chain.documentOwner;
    const beneficiary = chain.beneficiary;
    const chainEventTimestamp = chain.eventTimestamp;

    switch (chain.eventType) {
      case EventType.TRANSFER:
        chain.holderChangeEvents.forEach((holderEvent) => {
          const holder = holderEvent.holder;
          const holderEventTimestamp = holderEvent.timestamp;
          const isNewBeneficiary = beneficiary !== previousBeneficiary;
          const isNewHolder = holder !== previousHolder;

          if (previousBeneficiary === beneficiary && previousHolder === holder) {
            historyChain.push({
              action: ActionType.SURRENDER_REJECTED,
              isNewBeneficiary,
              isNewHolder,
              documentOwner,
              beneficiary,
              holder,
              timestamp: holderEventTimestamp,
            });
          } else if (previousBeneficiary != beneficiary) {
            historyChain.push({
              action: ActionType.ENDORSE,
              isNewBeneficiary,
              isNewHolder,
              documentOwner,
              beneficiary,
              holder,
              timestamp: holderEventTimestamp,
            });
          } else if (previousHolder !== holder) {
            historyChain.push({
              action: ActionType.TRANSFER,
              isNewBeneficiary,
              isNewHolder,
              documentOwner,
              beneficiary,
              holder,
              timestamp: holderEventTimestamp,
            });
          }

          previousHolder = holder;
          previousBeneficiary = beneficiary;
        });
        break;
      case EventType.SURRENDER:
        historyChain.push({
          action: ActionType.SURRENDERED,
          isNewBeneficiary: true,
          isNewHolder: false,
          timestamp: chainEventTimestamp,
        });

        break;
      case EventType.BURNT:
        historyChain.push({
          action: ActionType.SURRENDER_ACCEPTED,
          isNewBeneficiary: true,
          isNewHolder: false,
          timestamp: chainEventTimestamp,
        });
        previousHolder = "";
        previousBeneficiary = "";
        break;
      case EventType.TRANSFER_TO_WALLET:
        historyChain.push({
          action: ActionType.TRANSFER_TO_WALLET,
          isNewBeneficiary: true,
          isNewHolder: false,
          timestamp: chainEventTimestamp,
          documentOwner,
          beneficiary,
        });
        previousHolder = "";
        previousBeneficiary = beneficiary;
        break;
      default:
        throw Error("eventType not matched");
    }
  });

  console.log(historyChain);
  // TODO - END

  return (
    <div className="">
      <div className="cursor-pointer" onClick={() => setShowEndorsementChain(false)} data-testid="back-button">
        <BackArrow />
      </div>
      <div data-testid="endorsement-chain-title">
        <h3>Endorsement Chain</h3>
      </div>
      <div className="bg-white rounded-xl shadow-xl px-3 py-8 lg:px-8">
        <div className="hidden lg:inline">
          <div className="flex text-gray-400">
            <h5 className="w-4/12">Action/Date</h5>
            <h5 className="w-4/12">Owner</h5>
            <h5 className="w-4/12">Holder</h5>
          </div>
          <div className="border-t mt-1" />
        </div>

        {pending && !endorsementChain && !error && <EndorsementChainLoading />}
        {!pending &&
          endorsementChain &&
          !error &&
          historyChain.map((item, key) => <EndorsementChainData data={item} key={key} />)}
        {!pending && !endorsementChain && error && <EndorsementChainError error={error} />}
      </div>
    </div>
  );
};

// comment above un-comment below
// export const EndorsementChainLayout: FunctionComponent<EndorsementChainLayout> = ({
//   endorsementChain,
//   setShowEndorsementChain,
//   error,
//   pending,
// }) => {
//   // TODO - START
//   const historyChain: HistoryChain[] = [
//     {
//       action: ActionType.INITIAL,
//       isNewBeneficiary: true,
//       isNewHolder: false,
//     },
//   ];

//   endorsementChain?.forEach((endorsementChainEvent) => {
//     const chain = endorsementChainEvent as TitleEscrowEvent;
//     let previousBeneficiary = "";
//     let previousHolder = "";

//     switch (chain.eventType) {
//       case EventType.TRANSFER:
//         const documentOwner = chain.documentOwner;
//         const beneficiary = chain.beneficiary;

//         chain.holderChangeEvents.forEach((holderEvent, index) => {
//           const holder = holderEvent.holder;
//           const timestamp = holderEvent.timestamp;
//           const isNewBeneficiary = beneficiary !== previousBeneficiary;
//           const isNewHolder = holder !== previousHolder;

//           if (index === 0) {
//             historyChain.push({
//               action: ActionType.ENDORSE,
//               isNewBeneficiary,
//               isNewHolder,
//               documentOwner,
//               beneficiary,
//               holder,
//               timestamp,
//             });
//           } else {
//             if (previousHolder !== holder) {
//               historyChain.push({
//                 action: ActionType.TRANSFER,
//                 isNewBeneficiary,
//                 isNewHolder,
//                 documentOwner,
//                 beneficiary,
//                 holder,
//                 timestamp,
//               });
//             } else if (previousBeneficiary !== beneficiary) {
//               historyChain.push({
//                 action: ActionType.ENDORSE,
//                 isNewBeneficiary,
//                 isNewHolder,
//                 documentOwner,
//                 beneficiary,
//                 holder,
//                 timestamp,
//               });
//             } else if (previousBeneficiary !== beneficiary && previousHolder !== holder) {
//               historyChain.push({
//                 action: ActionType.SURRENDER_REJECTED,
//                 isNewBeneficiary,
//                 isNewHolder,
//                 documentOwner,
//                 beneficiary,
//                 holder,
//                 timestamp,
//               });
//             } else {
//               throw Error("holderChangeEvents no scenarios met");
//             }
//           }

//           previousHolder = holder;
//           previousBeneficiary = beneficiary;
//         });
//         break;
//       case EventType.SURRENDER:
//         historyChain.push({
//           action: ActionType.SURRENDERED,
//           isNewBeneficiary: true,
//           isNewHolder: false,
//           timestamp: 0,
//           documentOwner: "TODO",
//           beneficiary: "TODO",
//           holder: "TODO",
//         });
//         break;
//       case EventType.BURNT:
//         historyChain.push({
//           action: ActionType.SURRENDER_ACCEPTED,
//           isNewBeneficiary: true,
//           isNewHolder: false,
//           timestamp: 0,
//           documentOwner: "TODO",
//           beneficiary: "TODO",
//           holder: "TODO",
//         });
//         break;
//       case EventType.TRANSFER_TO_WALLET:
//         historyChain.push({
//           action: ActionType.TRANSFER_TO_WALLET,
//           isNewBeneficiary: true,
//           isNewHolder: false,
//           timestamp: 0,
//           documentOwner: "TODO",
//           beneficiary: "TODO",
//           holder: "TODO",
//         });
//         break;
//       default:
//         throw Error("eventType not matched");
//     }
//   });

//   console.log(historyChain);
//   // TODO - END

//   let tableRowIndex = 0;
//   const dotVisibility: any = [];
//   let eventsIndex = 0;
//   let previousBeneficiary = "";
//   let previousHolder = "";

//   const tableRows: JSX.Element[] = [
//     <tr className="table-row" key={tableRowIndex++}>
//       <td className="table-cell">
//         <div className="action-title">Document has been issued</div>
//       </td>

//       <td className="table-cell">
//         <AddressCell
//           address=""
//           isNewAddress={true}
//           // displayDashHead={dotVisibility[eventsIndex].beneficiary || dotVisibility.length - eventsIndex > 1}
//           displayDashTail={false}
//         />
//       </td>
//       <td className="table-cell">
//         <AddressCell address="" isNewAddress={false} displayDashHead={false} displayDashTail={false} />
//       </td>
//     </tr>,
//   ];

//   // loop to check all events for the document
//   endorsementChain &&
//     endorsementChain.forEach((event) => {
//       const titleEscrowEvent = event as TitleEscrowEvent;
//       const beneficiary = titleEscrowEvent.beneficiary;

//       switch (titleEscrowEvent.eventType) {
//         case EventType.TRANSFER:
//           titleEscrowEvent.holderChangeEvents.forEach((holderChangeEvent) => {
//             // when surrendered document is rejected
//             if (previousBeneficiary === beneficiary && previousHolder === holderChangeEvent.holder) {
//               dotVisibility[eventsIndex] = { id: eventsIndex, beneficiary: true, holder: true };
//               eventsIndex++;
//               return;
//             }

//             if (previousBeneficiary === beneficiary)
//               dotVisibility[eventsIndex] = { id: eventsIndex, beneficiary: false, holder: false };
//             else dotVisibility[eventsIndex] = { id: eventsIndex, beneficiary: true, holder: false };

//             if (previousHolder === holderChangeEvent.holder) {
//               dotVisibility[eventsIndex] = { ...dotVisibility[eventsIndex], holder: false };
//             } else dotVisibility[eventsIndex] = { ...dotVisibility[eventsIndex], holder: true };

//             previousBeneficiary = beneficiary;
//             previousHolder = holderChangeEvent.holder;
//             eventsIndex++;
//           });
//           break;

//         default:
//           dotVisibility[eventsIndex] = { id: eventsIndex, beneficiary: true, holder: false };
//           eventsIndex++;
//       }
//     });

//   eventsIndex = 0;

//   // for each erc721 event, build the ui according to the event type.
//   endorsementChain &&
//     // endorsementChain.forEach((tradetrustErc721Event, eventIndex) => {
//     endorsementChain.forEach((tradetrustErc721Event) => {
//       // const isLastEvent = eventIndex + 1 === endorsementChain.length;
//       let isLastEvent = eventsIndex + 1 === dotVisibility.length;

//       const titleEscrowEvent = tradetrustErc721Event as TitleEscrowEvent;

//       switch (titleEscrowEvent.eventType) {
//         case "Transfer":
//           titleEscrowEvent.holderChangeEvents.forEach((holderChangeEvent) => {
//             const isFirstRow = eventsIndex === 0;
//             isLastEvent = eventsIndex + 1 === dotVisibility.length;

//             // let dashHeadCountHolder = 0;
//             // // loop to determine if dash head of event->holder should be drawn
//             // if (dotVisibility[eventsIndex].holder === true) {
//             //   for (let i = eventsIndex; i >= 1; i--) {
//             //     dashHeadCountHolder++;
//             //     if (dotVisibility[i - 1].holder === true) {
//             //       break;
//             //     }
//             //   }
//             // }

//             tableRows.push(
//               <tr className="table-row" key={tableRowIndex++}>
//                 <td className="table-cell">
//                   {dotVisibility[eventsIndex].beneficiary && (
//                     <div className="action-title">Endorse change of ownership</div>
//                   )}
//                   {!dotVisibility[eventsIndex].beneficiary && dotVisibility[eventsIndex].holder && (
//                     <div className="action-title">Transfer holdership</div>
//                   )}
//                   {!dotVisibility[eventsIndex].beneficiary && !dotVisibility[eventsIndex].holder && (
//                     <div className="action-title">Surrender of document rejected</div>
//                   )}
//                   <div className="date">{format(new Date(holderChangeEvent.timestamp), "do MMM yyyy, hh:mm aa")}</div>
//                 </td>

//                 <td className="table-cell">
//                   <AddressCell
//                     address={titleEscrowEvent.beneficiary}
//                     titleEscrowAddress={titleEscrowEvent.documentOwner}
//                     isNewAddress={dotVisibility[eventsIndex].beneficiary}
//                     // displayDashHead={dotVisibility[eventsIndex].beneficiary || dotVisibility.length - eventsIndex > 1}
//                     displayDashHead={dotVisibility[eventsIndex].beneficiary}
//                     displayDashTail={!isLastEvent}
//                   />
//                 </td>
//                 <td className="table-cell">
//                   <AddressCell
//                     address={holderChangeEvent.holder}
//                     titleEscrowAddress={titleEscrowEvent.documentOwner}
//                     isNewAddress={dotVisibility[eventsIndex].holder}
//                     // displayDashHead={!isFirstRow && true}
//                     displayDashHead={!isFirstRow && dotVisibility[eventsIndex].holder}
//                     displayDashTail={!isLastEvent}
//                   />
//                 </td>
//               </tr>
//             );

//             eventsIndex++;
//           });
//           break;

//         case "Surrender":
//           tableRows.push(
//             <tr className="table-row" key={tableRowIndex++}>
//               <td className="table-cell">
//                 <div className="action-title">Document surrendered to issuer</div>
//                 <div className="date">
//                   {format(new Date(titleEscrowEvent?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
//                 </div>
//               </td>
//               <td className="table-cell">
//                 <AddressCell
//                   address=""
//                   isNewAddress={dotVisibility[eventsIndex].beneficiary}
//                   displayDashHead={true}
//                   displayDashTail={!isLastEvent}
//                 />
//               </td>
//               <td className="table-cell">
//                 <AddressCell
//                   address=""
//                   isNewAddress={dotVisibility[eventsIndex].holder}
//                   // displayDashHead={true}
//                   displayDashHead={false}
//                   displayDashTail={!isLastEvent}
//                 />
//               </td>
//             </tr>
//           );

//           eventsIndex++;
//           break;

//         case "Burnt":
//           tableRows.push(
//             <tr className="table-row" key={tableRowIndex++}>
//               <td className="table-cell">
//                 <div className="action-title">Surrender of document accepted</div>
//                 <div className="date">
//                   {format(new Date(titleEscrowEvent?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
//                 </div>
//               </td>
//               <td className="table-cell">
//                 <AddressCell
//                   address=""
//                   isNewAddress={dotVisibility[eventsIndex].beneficiary}
//                   displayDashHead={true}
//                   displayDashTail={!isLastEvent && true}
//                 />
//               </td>
//               <td className="table-cell">
//                 <AddressCell
//                   address=""
//                   isNewAddress={dotVisibility[eventsIndex].holder}
//                   displayDashHead={false}
//                   displayDashTail={!isLastEvent && true}
//                 />
//               </td>
//             </tr>
//           );

//           eventsIndex++;
//           break;

//         case "Transfer to Wallet":
//           tableRows.push(
//             <tr className="table-row" key={tableRowIndex++}>
//               <td className="table-cell">
//                 <div className="action-title">Transfer to Wallet</div>
//                 <div className="date">
//                   {format(new Date(titleEscrowEvent?.eventTimestamp ?? 0), "do MMM yyyy, hh:mm aa")}
//                 </div>
//               </td>
//               <td className="table-cell">
//                 <AddressCell
//                   address={titleEscrowEvent.documentOwner}
//                   isNewAddress={dotVisibility[eventsIndex].beneficiary}
//                   displayDashHead={true}
//                   displayDashTail={!isLastEvent && true}
//                 />
//               </td>
//               <td className="table-cell">
//                 <AddressCell
//                   address=""
//                   isNewAddress={dotVisibility[eventsIndex].holder}
//                   // displayDashHead={true}
//                   displayDashHead={false}
//                   displayDashTail={!isLastEvent && true}
//                 />
//               </td>
//             </tr>
//           );

//           eventsIndex++;
//           break;
//         // default not needed as eventType has only 4 possibilities which are all accounted for
//         default:
//           trace("Unknown event type please check event history");
//           break;
//       }
//     });

//   return (
//     <EndorsementChainLayoutStyle className="container pb-40 my-4">
//       <div className="back-button" onClick={() => setShowEndorsementChain(false)} data-testid="back-button">
//         <BackArrow />
//       </div>
//       <div className="text-gray-700 text-3xl font-bold mb-4" data-testid="endorsement-chain-title">
//         Endorsement Chain
//       </div>
//       <div className="table-responsive">
//         <table className="w-full mb-0">
//           <thead className="text-left">
//             <tr className="w-full bg-denim-900 text-white text-lg font-bold">
//               <th className="table-cell">Action/Date</th>
//               <th className="table-cell">Owner</th>
//               <th className="table-cell">Holder</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pending && !endorsementChain && !error && <EndorsementChainLoading />}
//             {!pending && endorsementChain && !error && tableRows}
//             {!pending && !endorsementChain && error && <EndorsementChainError error={error} />}
//           </tbody>
//         </table>
//       </div>
//     </EndorsementChainLayoutStyle>
//   );
// };

// const EndorsementChainLayoutStyle = styled.div`
//   .back-button {
//     ${tw`text-gray-500 cursor-pointer mb-2`}

//     &[data-disabled="true"] {
//       ${tw`text-gray-300 cursor-not-allowed`}
//     }
//   }

//   .table-row {
//     ${tw`bg-white`}
//   }

//   .table-row > div {
//     display: table-cell;
//   }

//   .table-cell {
//     position: relative;
//     vertical-align: top;
//     border-top: none;
//   }

//   thead {
//     th {
//       ${tw`px-4 py-2`}
//     }
//   }

//   tbody {
//     td {
//       ${tw`pl-7 pr-4 py-4`}
//     }
//   }

//   .date {
//     ${tw`text-sm font-semibold text-gray-500 min-w-135 flex justify-end text-right`}
//   }

//   .action-title {
//     ${tw`text-lg text-gray-700 font-semibold flex justify-end text-right`}
//   }

//   .address {
//     ${tw`text-cerulean-500`}
//     word-break: break-word;
//   }
// `;
