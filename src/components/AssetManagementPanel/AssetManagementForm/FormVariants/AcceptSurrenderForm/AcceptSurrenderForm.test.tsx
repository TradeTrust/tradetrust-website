import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { FormState } from "../../../../../constants/FormState";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AcceptSurrenderForm } from "./AcceptSurrenderForm";
import { act } from "react-dom/test-utils";

describe("Accept surrender", () => {
  it("should have the accept surrender button and cancel button", async () => {
    await act(async () => {
      const container = render(
        <AcceptSurrenderForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          acceptSurrenderingState={FormState.UNINITIALIZED}
          handleAcceptSurrender={() => {}}
        />
      );
      expect(container.queryByTestId("cancelSurrenderBtn")).not.toBeNull();
      expect(container.queryByTestId("acceptSurrenderBtn")).not.toBeNull();
    });
  });

  it("should change the state of the application to Confirmed when we clicked on accept surrender", async () => {
    await act(async () => {
      const mockHandleAcceptSurrender = jest.fn();

      const container = render(
        <AcceptSurrenderForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          acceptSurrenderingState={FormState.UNINITIALIZED}
          handleAcceptSurrender={mockHandleAcceptSurrender}
        />
      );

      fireEvent.click(container.getByTestId("acceptSurrenderBtn"));
      expect(mockHandleAcceptSurrender).toHaveBeenCalled();
    });
  });

  it("should change the state of the application to None when we clicked on Cancel", async () => {
    await act(async () => {
      const mockOnSetFormAction = jest.fn();

      const container = render(
        <AcceptSurrenderForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={mockOnSetFormAction}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          acceptSurrenderingState={FormState.UNINITIALIZED}
          handleAcceptSurrender={() => {}}
        />
      );

      fireEvent.click(container.getByTestId("cancelSurrenderBtn"));
      expect(mockOnSetFormAction).toHaveBeenCalled();
    });
  });

  it("should show a loader when the accept surrender state is in PENDING_CONFIRMATION", async () => {
    await act(async () => {
      const container = render(
        <AcceptSurrenderForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          acceptSurrenderingState={FormState.PENDING_CONFIRMATION}
          handleAcceptSurrender={() => {}}
        />
      );

      expect(container.queryByTestId("loader")).not.toBeNull();
    });
  });

  it("should disable accept surrender and cancel button when the accept surrender state is in PENDING_CONFIRMATION", async () => {
    await act(async () => {
      const mockHandleSurrender = jest.fn();
      const mockOnSetFormAction = jest.fn();

      const container = render(
        <AcceptSurrenderForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={mockOnSetFormAction}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          acceptSurrenderingState={FormState.PENDING_CONFIRMATION}
          handleAcceptSurrender={mockHandleSurrender}
        />
      );

      fireEvent.click(container.getByTestId("acceptSurrenderBtn"));
      expect(mockHandleSurrender).not.toHaveBeenCalled();
      fireEvent.click(container.getByTestId("cancelSurrenderBtn"));
      expect(mockOnSetFormAction).not.toHaveBeenCalled();
    });
  });
});
