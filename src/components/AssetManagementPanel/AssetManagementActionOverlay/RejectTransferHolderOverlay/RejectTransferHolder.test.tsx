import { OverlayContext } from "@tradetrust-tt/tradetrust-ui-components";

import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { FormState } from "../../../../constants/FormState";
import { RejectTransferHolderOverlay } from "./RejectTransferHolder";

describe("RejectTransferHolderOverlay", () => {
  it("should have the cancel button and reject holder button", async () => {
    await act(async () => {
      const mockHandleRejectTransferHolder = jest.fn();
      const container = render(
        <RejectTransferHolderOverlay
          handleRejectTransferHolder={mockHandleRejectTransferHolder}
          rejectTransferHolderState={FormState.UNINITIALIZED}
          keyId="key123456789"
          setShowEndorsementChain={() => {}}
          setFormActionNone={() => {}}
        />
      );
      expect(container.queryByTestId("confirmRejectHoldershipBtn")).not.toBeNull();
      expect(container.queryByTestId("cancelRejectHoldershipBtn")).not.toBeNull();
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
          <RejectTransferHolderOverlay
            handleRejectTransferHolder={() => {}}
            rejectTransferHolderState={FormState.UNINITIALIZED}
            keyId="123"
            setShowEndorsementChain={() => {}}
            setFormActionNone={() => {}}
          />
        </OverlayContext.Provider>
      );

      fireEvent.click(container.getByTestId("cancelRejectHoldershipBtn"));
      expect(mockHandleDismissOverlay).toHaveBeenCalled();
    });
  });

  test('should call handleRejectTransferHolder when "Confirm" button is clicked', async () => {
    await act(async () => {
      const mockHandleRejectTransferHolder = jest.fn();

      // Render RejectManagement with the mock function
      const container = render(
        <RejectTransferHolderOverlay
          handleRejectTransferHolder={mockHandleRejectTransferHolder}
          rejectTransferHolderState={FormState.UNINITIALIZED}
          keyId="bb6846cebd5d54785d0da525df09f2c47490171f"
          setShowEndorsementChain={() => {}}
          setFormActionNone={() => {}}
        />
      );
      const holderInput = container.getByTestId("editable-remarks-input") as HTMLInputElement;
      await fireEvent.change(holderInput, { target: { value: "hi its a remark" } });

      // Simulate a click on the Confirm button within ActionManagementSkeleton
      fireEvent.click(container.getByTestId("confirmRejectHoldershipBtn"));

      // Check that the parent's handleRejectTransferHolder was called
      expect(mockHandleRejectTransferHolder).toHaveBeenCalled();
    });
  });

  it("should update holder state when input value changes", async () => {
    await act(async () => {
      const container = render(
        <RejectTransferHolderOverlay
          handleRejectTransferHolder={() => {}}
          rejectTransferHolderState={FormState.UNINITIALIZED}
          keyId="123"
          setShowEndorsementChain={() => {}}
          setFormActionNone={() => {}}
        />
      );

      const holderInput = container.getByTestId("editable-remarks-input") as HTMLInputElement;
      await fireEvent.change(holderInput, { target: { value: "hi its a remark" } });
      expect(holderInput).toHaveValue("hi its a remark");
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
          <RejectTransferHolderOverlay
            handleRejectTransferHolder={() => {}}
            rejectTransferHolderState={FormState.PENDING_CONFIRMATION}
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
        <RejectTransferHolderOverlay
          handleRejectTransferHolder={() => {}}
          rejectTransferHolderState={FormState.PENDING_CONFIRMATION}
          keyId="123"
          setShowEndorsementChain={() => {}}
          setFormActionNone={() => {}}
        />
      );

      expect(container.queryByTestId("dismissBtn")).not.toBeNull();
    });
  });
});
