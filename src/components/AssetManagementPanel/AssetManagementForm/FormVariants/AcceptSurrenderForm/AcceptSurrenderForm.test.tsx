import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { FormState } from "../../../../../constants/FormState";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { AcceptSurrenderForm } from "./AcceptSurrenderForm";
import { act } from "react-dom/test-utils";

describe("Accept surrender", () => {
  it("should have the accept surrender button and accept surrender button", async () => {
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
          rejectSurrenderingState={FormState.UNINITIALIZED}
          handleRejectSurrender={() => {}}
          tokenId=""
        />
      );
      expect(container.queryByTestId("rejectSurrenderBtn")).not.toBeNull();
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
          rejectSurrenderingState={FormState.UNINITIALIZED}
          handleRejectSurrender={() => {}}
          tokenId=""
        />
      );

      fireEvent.click(container.getByTestId("acceptSurrenderBtn"));
      expect(mockHandleAcceptSurrender).toHaveBeenCalled();
    });
  });

  it("should change the state of the application to Confirmed when we clicked on reject surrender", async () => {
    await act(async () => {
      const mockHandleRejectSurrender = jest.fn();

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
          rejectSurrenderingState={FormState.UNINITIALIZED}
          handleRejectSurrender={mockHandleRejectSurrender}
          tokenId=""
        />
      );

      fireEvent.click(container.getByTestId("rejectSurrenderBtn"));
      expect(mockHandleRejectSurrender).toHaveBeenCalled();
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
          rejectSurrenderingState={FormState.UNINITIALIZED}
          handleRejectSurrender={() => {}}
          tokenId=""
        />
      );

      expect(container.queryByTestId("accept-loader")).not.toBeNull();
    });
  });

  it("should show a loader when the reject surrender state is in PENDING_CONFIRMATION", async () => {
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
          rejectSurrenderingState={FormState.PENDING_CONFIRMATION}
          handleRejectSurrender={() => {}}
          tokenId=""
        />
      );

      expect(container.queryByTestId("reject-loader")).not.toBeNull();
    });
  });

  it("should disable accept surrender and reject button when the accept surrender state is in PENDING_CONFIRMATION", async () => {
    await act(async () => {
      const mockHandleAcceptSurrender = jest.fn();
      const mockHandleRejectSurrender = jest.fn();

      const container = render(
        <AcceptSurrenderForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          acceptSurrenderingState={FormState.PENDING_CONFIRMATION}
          handleAcceptSurrender={mockHandleAcceptSurrender}
          rejectSurrenderingState={FormState.UNINITIALIZED}
          handleRejectSurrender={mockHandleRejectSurrender}
          tokenId=""
        />
      );

      fireEvent.click(container.getByTestId("acceptSurrenderBtn"));
      expect(mockHandleAcceptSurrender).not.toHaveBeenCalled();
      fireEvent.click(container.getByTestId("rejectSurrenderBtn"));
      expect(mockHandleRejectSurrender).not.toHaveBeenCalled();
    });
  });

  it("should disable accept surrender and reject button when the reject surrender state is in PENDING_CONFIRMATION", async () => {
    await act(async () => {
      const mockHandleAcceptSurrender = jest.fn();
      const mockHandleRejectSurrender = jest.fn();

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
          rejectSurrenderingState={FormState.PENDING_CONFIRMATION}
          handleRejectSurrender={mockHandleRejectSurrender}
          tokenId=""
        />
      );

      fireEvent.click(container.getByTestId("acceptSurrenderBtn"));
      expect(mockHandleAcceptSurrender).not.toHaveBeenCalled();
      fireEvent.click(container.getByTestId("rejectSurrenderBtn"));
      expect(mockHandleRejectSurrender).not.toHaveBeenCalled();
    });
  });
});
