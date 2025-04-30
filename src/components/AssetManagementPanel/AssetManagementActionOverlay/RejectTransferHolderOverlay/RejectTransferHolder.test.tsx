import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { OverlayContext } from "../../../../common/contexts/OverlayContext";
import { FormState } from "../../../../constants/FormState";
import { RejectTransferHolderOverlay } from "./RejectTransferHolder";

describe("RejectTransferHolderOverlay", () => {
  it("should have the cancel button and reject holder button", async () => {
    const mockHandleRejectTransferHolder = jest.fn();
    render(
      <RejectTransferHolderOverlay
        handleRejectTransferHolder={mockHandleRejectTransferHolder}
        rejectTransferHolderState={FormState.UNINITIALIZED}
        keyId="key123456789"
      />
    );

    expect(screen.queryByTestId("confirmRejectHoldershipBtn")).not.toBeNull();
    expect(screen.queryByTestId("cancelRejectHoldershipBtn")).not.toBeNull();
  });

  it("should close overlay when we clicked on Cancel button", async () => {
    const mockHandleDismissOverlay = jest.fn();
    const container = render(
      <OverlayContext.Provider
        value={{
          overlayContent: undefined,
          showOverlay: () => {},
          isOverlayVisible: false,
          setOverlayVisible: () => {},
          closeOverlay: mockHandleDismissOverlay,
          setCollapsible: () => {},
          collapsible: false,
        }}
      >
        <RejectTransferHolderOverlay
          handleRejectTransferHolder={() => {}}
          rejectTransferHolderState={FormState.UNINITIALIZED}
          keyId="123"
        />
      </OverlayContext.Provider>
    );

    fireEvent.click(container.getByTestId("cancelRejectHoldershipBtn"));

    expect(mockHandleDismissOverlay).toHaveBeenCalled();
  });

  test('should call handleRejectTransferHolder when "Confirm" button is clicked', async () => {
    const mockHandleRejectTransferHolder = jest.fn();
    await act(async () => {
      // Render RejectManagement with the mock function
      const container = render(
        <RejectTransferHolderOverlay
          handleRejectTransferHolder={mockHandleRejectTransferHolder}
          rejectTransferHolderState={FormState.UNINITIALIZED}
          keyId="bb6846cebd5d54785d0da525df09f2c47490171f"
        />
      );
      const holderInput = container.getByTestId("editable-remarks-input") as HTMLInputElement;
      fireEvent.change(holderInput, { target: { value: "hi its a remark" } });

      // Simulate a click on the Confirm button within ActionManagementSkeleton
      fireEvent.click(container.getByTestId("confirmRejectHoldershipBtn"));
    });

    // Check that the parent's handleRejectTransferHolder was called
    expect(mockHandleRejectTransferHolder).toHaveBeenCalled();
  });

  it("should update holder state when input value changes", async () => {
    const container = render(
      <RejectTransferHolderOverlay
        handleRejectTransferHolder={() => {}}
        rejectTransferHolderState={FormState.UNINITIALIZED}
        keyId="123"
      />
    );

    const holderInput = container.getByTestId("editable-remarks-input") as HTMLInputElement;
    fireEvent.change(holderInput, { target: { value: "hi its a remark" } });
    expect(holderInput).toHaveValue("hi its a remark");
  });
});
