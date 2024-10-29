import { OverlayContext } from "@tradetrust-tt/tradetrust-ui-components";

import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { FormState } from "../../../../constants/FormState";
import { RejectTransferOwnerOverlay } from "./RejectTransferOwner";

describe("RejectTransferOwnerOverlay", () => {
  it("should have the cancel button and reject owner button", async () => {
    await act(async () => {
      const mockHandleRejectTransferOwner = jest.fn();
      const container = render(
        <RejectTransferOwnerOverlay
          handleRejectTransferOwner={mockHandleRejectTransferOwner}
          rejectTransferOwnerState={FormState.UNINITIALIZED}
          keyId="blgpugbjb8kjb8123"
          setShowEndorsementChain={() => {}}
          setFormActionNone={() => {}}
        />
      );
      expect(container.queryByTestId("confirmRejectOwnershipBtn")).not.toBeNull();
      expect(container.queryByTestId("cancelRejectOwnershipBtn")).not.toBeNull();
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
          <RejectTransferOwnerOverlay
            handleRejectTransferOwner={() => {}}
            rejectTransferOwnerState={FormState.UNINITIALIZED}
            keyId="123"
            setShowEndorsementChain={() => {}}
            setFormActionNone={() => {}}
          />
        </OverlayContext.Provider>
      );

      fireEvent.click(container.getByTestId("cancelRejectOwnershipBtn"));
      expect(mockHandleDismissOverlay).toHaveBeenCalled();
    });
  });

  // test('should call handleRejectTransferOwner when "Confirm" button is clicked', async () => {
  //   await act(async () => {
  //     const mockHandleRejectTransferOwner = jest.fn();

  //     // Render RejectManagement with the mock function
  //     const container = render(
  //       <RejectTransferOwnerOverlay
  //         handleRejectTransferOwner={mockHandleRejectTransferOwner}
  //         rejectTransferOwnerState={FormState.UNINITIALIZED}
  //         keyId="0a281bb6846cebd5d54785d0da525df09f2c47490171f"
  //         setShowEndorsementChain={() => {}}
  //         setFormActionNone={() => {}}
  //       />
  //     );
  //     const ownerInput = container.getByTestId("editable-remarks-input") as HTMLInputElement;
  //     await fireEvent.change(ownerInput, { target: { value: "hi its a remark" } });

  //     // Simulate a click on the Confirm button within ActionManagementSkeleton
  //     fireEvent.click(container.getByTestId("confirmRejectOwnershipBtn"));

  //     // Check that the parent's handleRejectTransferOwner was called
  //     expect(mockHandleRejectTransferOwner).toHaveBeenCalled();
  //   });
  // });

  it("should update owner state when input value changes", async () => {
    await act(async () => {
      const container = render(
        <RejectTransferOwnerOverlay
          handleRejectTransferOwner={() => {}}
          rejectTransferOwnerState={FormState.UNINITIALIZED}
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
          <RejectTransferOwnerOverlay
            handleRejectTransferOwner={() => {}}
            rejectTransferOwnerState={FormState.PENDING_CONFIRMATION}
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
        <RejectTransferOwnerOverlay
          handleRejectTransferOwner={() => {}}
          rejectTransferOwnerState={FormState.PENDING_CONFIRMATION}
          keyId="123"
          setShowEndorsementChain={() => {}}
          setFormActionNone={() => {}}
        />
      );

      expect(container.queryByTestId("dismissBtn")).not.toBeNull();
    });
  });
});
