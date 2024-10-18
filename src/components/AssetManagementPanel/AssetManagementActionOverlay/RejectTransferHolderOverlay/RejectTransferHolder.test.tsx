// import { OverlayContext } from "@tradetrust-tt/tradetrust-ui-components";

// import { fireEvent, render } from "@testing-library/react";
// import React from "react";
// import { act } from "react-dom/test-utils";
// import { FormState } from "../../../../constants/FormState";
// import { AssetManagementActions } from "../../AssetManagementActions";
// // import { RejectSurrenderedForm } from "./RejectSurrenderedForm";
// import { RejectTransferHolderOverlay } from "./RejectTransferHolder";

// describe("RejectTransferHolderOverlay", () => {
//   it("should have the cancel button and reject holder button", async () => {
//     await act(async () => {
//       const container = render(
//         <RejectTransferHolderOverlay
//           handleRejectTransferHolder={() => {}}
//           rejectTransferHolderState={FormState.UNINITIALIZED}
//           keyId="123"
//           setShowEndorsementChain={() => {}}
//           setFormActionNone={() => {}}
//         />
//       );
//       expect(container.queryByTestId("confirmRejectTransferHolderBtn")).not.toBeNull();
//       expect(container.queryByTestId("cancelRejectTransferHolderBtn")).not.toBeNull();
//     });
//   });

//   it("should show overlay confirmation when we clicked on reject surrender and confirm overlay", async () => {
//     await act(async () => {
//       const mockHandleRestoreToken = jest.fn();

//       const container = render(
//         <OverlayContext.Provider
//           value={{
//             overlayContent: undefined,
//             showOverlay: mockHandleRestoreToken,
//             isOverlayVisible: false,
//             setOverlayVisible: () => {},
//             closeOverlay: () => {},
//           }}
//         >
//           <RejectTransferHolderOverlay
//             handleRejectTransferHolder={() => {}}
//             rejectTransferHolderState={FormState.UNINITIALIZED}
//             keyId="123"
//             setShowEndorsementChain={() => {}}
//             setFormActionNone={() => {}}
//           />
//         </OverlayContext.Provider>
//       );

//       fireEvent.click(container.getByTestId("rejectSurrenderBtn"));
//       expect(mockHandleRestoreToken).toHaveBeenCalled();
//     });
//   });

//   it("should switch to waiting confirmation modal with dismiss button on  PENDING_CONFIRMATION", async () => {
//     await act(async () => {
//       const container = render(
//         <RejectTransferHolderOverlay
//           handleRejectTransferHolder={() => {}}
//           rejectTransferHolderState={FormState.PENDING_CONFIRMATION}
//           keyId="123"
//           setShowEndorsementChain={() => {}}
//           setFormActionNone={() => {}}
//         />
//       );

//       expect(container.queryByTestId("dismissBtn")).not.toBeNull();
//     });
//   });

//   it("should disable cancel and reject surrender button when the reject surrender state is in PENDING_CONFIRMATION", async () => {
//     await act(async () => {
//       const mockFormActionNone = jest.fn();
//       const mockHandleRestoreToken = jest.fn();

//       const container = render(
//         <RejectTransferHolderOverlay
//           handleRejectTransferHolder={() => {}}
//           rejectTransferHolderState={FormState.UNINITIALIZED}
//           keyId="123"
//           setShowEndorsementChain={() => {}}
//           setFormActionNone={() => {}}
//         />
//       );

//       fireEvent.click(container.getByTestId("cancelSurrenderBtn"));
//       expect(mockFormActionNone).not.toHaveBeenCalled();
//       fireEvent.click(container.getByTestId("rejectSurrenderBtn"));
//       expect(mockHandleRestoreToken).not.toHaveBeenCalled();
//     });
//   });
// });
