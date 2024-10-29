import { OverlayContext } from "@tradetrust-tt/tradetrust-ui-components";

import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { FormState } from "../../../../constants/FormState";
import { RejectTransferOwnerHolderOverlay } from "./RejectTransferOwnerHolder";

describe("RejectTransferOwnerHolderOverlay", () => {
  it("should have the cancel button and reject owner and holder button", async () => {
    await act(async () => {
      const mockHandleRejectTransferOwnerHolder = jest.fn();
      const container = render(
        <RejectTransferOwnerHolderOverlay
          handleRejectTransferOwnerHolder={mockHandleRejectTransferOwnerHolder}
          rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
          keyId="blgpugbjb8kjb8123"
          setShowEndorsementChain={() => {}}
          setFormActionNone={() => {}}
        />
      );
      expect(container.queryByTestId("confirmRejectOwnership & HoldershipBtn")).not.toBeNull();
      expect(container.queryByTestId("cancelRejectOwnership & HoldershipBtn")).not.toBeNull();
    });
  });

  it("should close overlay when we clicked on Cancel button", async () => {
    await act(async () => {
      const mockHandleDismissOverlay = jest.fn();

      const container = render(
        <OverlayContext.Provider
          value={{
            overlayContent: undefined,
            showOverlay: () => {},
            isOverlayVisible: false,
            setOverlayVisible: () => {},
            closeOverlay: mockHandleDismissOverlay,
          }}
        >
          <RejectTransferOwnerHolderOverlay
            handleRejectTransferOwnerHolder={() => {}}
            rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
            keyId="123"
            setShowEndorsementChain={() => {}}
            setFormActionNone={() => {}}
          />
        </OverlayContext.Provider>
      );

      fireEvent.click(container.getByTestId("cancelRejectOwnership & HoldershipBtn"));
      expect(mockHandleDismissOverlay).toHaveBeenCalled();
    });
  });

  //   test('should call handleRejectTransferOwnerHolder when "Confirm" button is clicked', async () => {
  //     await act(async () => {
  //       const mockHandleRejectTransferOwnerHolder = jest.fn();

  //       // Render RejectManagement with the mock function
  //       const container = render(
  //         <RejectTransferOwnerHolderOverlay
  //           handleRejectTransferOwnerHolder={mockHandleRejectTransferOwnerHolder}
  //           rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
  //           keyId="0x2d5f0d480bcb615ae590a281bb6846cebd5d54785d0da525df09f2c47490171f"
  //           setShowEndorsementChain={() => {}}
  //           setFormActionNone={() => {}}
  //         />
  //       );
  //       const ownerInput = container.getByTestId("editable-remarks-input") as HTMLInputElement;
  //       await fireEvent.change(ownerInput, { target: { value: "hi its a remark" } });

  //       // Simulate a click on the Confirm button within ActionManagementSkeleton
  //       fireEvent.click(container.getByTestId("confirmRejectOwnerHoldershipBtn"));

  //       // Check that the parent's handleRejectTransferOwnerHolder was called
  //       expect(mockHandleRejectTransferOwnerHolder).toHaveBeenCalled();
  //     });
  //   });

  it("should update owner and holder state when input value changes", async () => {
    await act(async () => {
      const container = render(
        <RejectTransferOwnerHolderOverlay
          handleRejectTransferOwnerHolder={() => {}}
          rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
          keyId="123"
          setShowEndorsementChain={() => {}}
          setFormActionNone={() => {}}
        />
      );

      const ownerInput = container.getByTestId("editable-remarks-input") as HTMLInputElement;
      await fireEvent.change(ownerInput, { target: { value: "hi its a remark" } });
      expect(ownerInput).toHaveValue("hi its a remark");
    });
  });

  it("should close overlay when we clicked on dismiss button", async () => {
    await act(async () => {
      const mockHandleDismissOverlay = jest.fn();

      const container = render(
        <OverlayContext.Provider
          value={{
            overlayContent: undefined,
            showOverlay: () => {},
            isOverlayVisible: false,
            setOverlayVisible: () => {},
            closeOverlay: mockHandleDismissOverlay,
          }}
        >
          <RejectTransferOwnerHolderOverlay
            handleRejectTransferOwnerHolder={() => {}}
            rejectTransferOwnerHolderState={FormState.PENDING_CONFIRMATION}
            keyId="123"
            setShowEndorsementChain={() => {}}
            setFormActionNone={() => {}}
          />
        </OverlayContext.Provider>
      );

      fireEvent.click(container.getByTestId("dismissBtn"));
      expect(mockHandleDismissOverlay).toHaveBeenCalled();
    });
  });

  it("should switch to waiting confirmation modal with dismiss button on  PENDING_CONFIRMATION", async () => {
    await act(async () => {
      const container = render(
        <RejectTransferOwnerHolderOverlay
          handleRejectTransferOwnerHolder={() => {}}
          rejectTransferOwnerHolderState={FormState.PENDING_CONFIRMATION}
          keyId="123"
          setShowEndorsementChain={() => {}}
          setFormActionNone={() => {}}
        />
      );

      expect(container.queryByTestId("dismissBtn")).not.toBeNull();
    });
  });
});
