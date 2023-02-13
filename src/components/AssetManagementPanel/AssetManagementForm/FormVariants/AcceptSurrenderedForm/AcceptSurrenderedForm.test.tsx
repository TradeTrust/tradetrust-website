import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { FormState } from "../../../../../constants/FormState";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AcceptSurrenderedForm } from "./AcceptSurrenderedForm";
import { act } from "react-dom/test-utils";

describe("AcceptSurrenderedForm", () => {
  it("should have the accept surrender button and cancel button", async () => {
    await act(async () => {
      const container = render(
        <AcceptSurrenderedForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          destroyTokenState={FormState.UNINITIALIZED}
          handleDestroyToken={() => {}}
        />
      );
      expect(container.queryByTestId("cancelSurrenderBtn")).not.toBeNull();
      expect(container.queryByTestId("acceptSurrenderBtn")).not.toBeNull();
    });
  });

  it("should change the state of the application to Confirmed when we clicked on accept surrender", async () => {
    await act(async () => {
      const mockHandleDestroyToken = jest.fn();

      const container = render(
        <AcceptSurrenderedForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          destroyTokenState={FormState.UNINITIALIZED}
          handleDestroyToken={mockHandleDestroyToken}
        />
      );

      fireEvent.click(container.getByTestId("acceptSurrenderBtn"));
      expect(mockHandleDestroyToken).toHaveBeenCalled();
    });
  });

  it("should show a loader when the accept surrender state is in PENDING_CONFIRMATION", async () => {
    await act(async () => {
      const container = render(
        <AcceptSurrenderedForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          destroyTokenState={FormState.PENDING_CONFIRMATION}
          handleDestroyToken={() => {}}
        />
      );

      expect(container.queryByTestId("accept-loader")).not.toBeNull();
    });
  });

  it("should disable accept surrender and cancel button when the accept surrender state is in PENDING_CONFIRMATION", async () => {
    await act(async () => {
      const mockHandleDestroyToken = jest.fn();
      const mockHandleRestoreToken = jest.fn();

      const container = render(
        <AcceptSurrenderedForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          destroyTokenState={FormState.PENDING_CONFIRMATION}
          handleDestroyToken={mockHandleDestroyToken}
        />
      );

      fireEvent.click(container.getByTestId("acceptSurrenderBtn"));
      expect(mockHandleDestroyToken).not.toHaveBeenCalled();
      fireEvent.click(container.getByTestId("cancelSurrenderBtn"));
      expect(mockHandleRestoreToken).not.toHaveBeenCalled();
    });
  });
});
