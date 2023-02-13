import { OverlayContext } from "@govtechsg/tradetrust-ui-components";

import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { FormState } from "../../../../../constants/FormState";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { RejectSurrenderedForm } from "./RejectSurrenderedForm";

describe("RejectSurrenderedForm", () => {
  it("should have the cancel button and reject surrender button", async () => {
    await act(async () => {
      const container = render(
        <RejectSurrenderedForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          restoreTokenState={FormState.UNINITIALIZED}
          handleRestoreToken={() => {}}
        />
      );
      expect(container.queryByTestId("rejectSurrenderBtn")).not.toBeNull();
      expect(container.queryByTestId("cancelSurrenderBtn")).not.toBeNull();
    });
  });

  it("should show overlay confirmation when we clicked on reject surrender and confirm overlay", async () => {
    await act(async () => {
      const mockHandleRestoreToken = jest.fn();

      const container = render(
        <OverlayContext.Provider
          value={{
            overlayContent: undefined,
            showOverlay: mockHandleRestoreToken,
            isOverlayVisible: false,
            setOverlayVisible: () => {},
            closeOverlay: () => {},
          }}
        >
          <RejectSurrenderedForm
            setShowEndorsementChain={() => {}}
            formAction={AssetManagementActions.Surrender}
            setFormActionNone={() => {}}
            tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
            beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
            holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
            restoreTokenState={FormState.UNINITIALIZED}
            handleRestoreToken={() => {}}
          />
        </OverlayContext.Provider>
      );

      fireEvent.click(container.getByTestId("rejectSurrenderBtn"));
      expect(mockHandleRestoreToken).toHaveBeenCalled();
    });
  });

  it("should show a loader when the reject surrender state is in PENDING_CONFIRMATION", async () => {
    await act(async () => {
      const container = render(
        <RejectSurrenderedForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          restoreTokenState={FormState.PENDING_CONFIRMATION}
          handleRestoreToken={() => {}}
        />
      );

      expect(container.queryByTestId("reject-loader")).not.toBeNull();
    });
  });

  it("should disable cancel and reject surrender button when the reject surrender state is in PENDING_CONFIRMATION", async () => {
    await act(async () => {
      const mockFormActionNone = jest.fn();
      const mockHandleRestoreToken = jest.fn();

      const container = render(
        <RejectSurrenderedForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={mockFormActionNone}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          restoreTokenState={FormState.PENDING_CONFIRMATION}
          handleRestoreToken={mockHandleRestoreToken}
        />
      );

      fireEvent.click(container.getByTestId("cancelSurrenderBtn"));
      expect(mockFormActionNone).not.toHaveBeenCalled();
      fireEvent.click(container.getByTestId("rejectSurrenderBtn"));
      expect(mockHandleRestoreToken).not.toHaveBeenCalled();
    });
  });
});
