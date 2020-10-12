import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { FormState } from "../../../../../constants/FormState";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { HandleSurrenderedForm } from "./HandleSurrenderedForm";
import { act } from "react-dom/test-utils";
import { OverlayContext } from "../../../../../common/contexts/OverlayContext";
import { useEndorsementChain } from "../../../../../common/hooks/useEndorsementChain";

jest.mock("../../../../../common/hooks/useEndorsementChain");

const mockUseFeatureFlagOverride = useEndorsementChain as jest.Mock;
const sampleEndorsementChain = [
  {
    eventType: "Transfer",
    documentOwner: "0x07117cCE985E750D1709191BC2a345AbA85b6993",
    beneficiary: "0x1245e5B64D785b25057f7438F715f4aA5D965733",
    holderChangeEvents: [
      { blockNumber: 8829273, holder: "0x1245e5B64D785b25057f7438F715f4aA5D965733", timestamp: 1602050689000 },
    ],
  },
];

describe("Handle surrendered", () => {
  beforeEach(() => {
    jest.resetModules(); // this is important - it clears the cache
    mockUseFeatureFlagOverride.mockReturnValue({
      endorsementChain: sampleEndorsementChain,
    });
  });
  it("should have the accept surrender button and accept surrender button", async () => {
    await act(async () => {
      const container = render(
        <HandleSurrenderedForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          destroyTokenState={FormState.UNINITIALIZED}
          handleDestroyToken={() => {}}
          restoreTokenState={FormState.UNINITIALIZED}
          handleRestoreToken={() => {}}
          tokenId="0x33430b8a069f6f9115fe9403889162d6c779cccde4db8df04faaf09d6dc739ba"
        />
      );
      expect(container.queryByTestId("rejectSurrenderBtn")).not.toBeNull();
      expect(container.queryByTestId("acceptSurrenderBtn")).not.toBeNull();
    });
  });

  it("should change the state of the application to Confirmed when we clicked on accept surrender", async () => {
    await act(async () => {
      const mockHandleDestroyToken = jest.fn();

      const container = render(
        <HandleSurrenderedForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          destroyTokenState={FormState.UNINITIALIZED}
          handleDestroyToken={mockHandleDestroyToken}
          restoreTokenState={FormState.UNINITIALIZED}
          handleRestoreToken={() => {}}
          tokenId="0x33430b8a069f6f9115fe9403889162d6c779cccde4db8df04faaf09d6dc739ba"
        />
      );

      fireEvent.click(container.getByTestId("acceptSurrenderBtn"));
      expect(mockHandleDestroyToken).toHaveBeenCalled();
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
          }}
        >
          <HandleSurrenderedForm
            setShowEndorsementChain={() => {}}
            formAction={AssetManagementActions.Surrender}
            setFormActionNone={() => {}}
            tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
            beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
            holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
            destroyTokenState={FormState.UNINITIALIZED}
            handleDestroyToken={() => {}}
            restoreTokenState={FormState.UNINITIALIZED}
            handleRestoreToken={() => {}}
            tokenId="0x33430b8a069f6f9115fe9403889162d6c779cccde4db8df04faaf09d6dc739ba"
          />
        </OverlayContext.Provider>
      );

      fireEvent.click(container.getByTestId("rejectSurrenderBtn"));
      expect(mockHandleRestoreToken).toHaveBeenCalled();
    });
  });

  it("should show a loader when the accept surrender state is in PENDING_CONFIRMATION", async () => {
    await act(async () => {
      const container = render(
        <HandleSurrenderedForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          destroyTokenState={FormState.PENDING_CONFIRMATION}
          handleDestroyToken={() => {}}
          restoreTokenState={FormState.UNINITIALIZED}
          handleRestoreToken={() => {}}
          tokenId="0x33430b8a069f6f9115fe9403889162d6c779cccde4db8df04faaf09d6dc739ba"
        />
      );

      expect(container.queryByTestId("accept-loader")).not.toBeNull();
    });
  });

  it("should show a loader when the reject surrender state is in PENDING_CONFIRMATION", async () => {
    await act(async () => {
      const container = render(
        <HandleSurrenderedForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          destroyTokenState={FormState.UNINITIALIZED}
          handleDestroyToken={() => {}}
          restoreTokenState={FormState.PENDING_CONFIRMATION}
          handleRestoreToken={() => {}}
          tokenId="0x33430b8a069f6f9115fe9403889162d6c779cccde4db8df04faaf09d6dc739ba"
        />
      );

      expect(container.queryByTestId("reject-loader")).not.toBeNull();
    });
  });

  it("should disable accept surrender and reject button when the accept surrender state is in PENDING_CONFIRMATION", async () => {
    await act(async () => {
      const mockHandleDestroyToken = jest.fn();
      const mockHandleRestoreToken = jest.fn();

      const container = render(
        <HandleSurrenderedForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          destroyTokenState={FormState.PENDING_CONFIRMATION}
          handleDestroyToken={mockHandleDestroyToken}
          restoreTokenState={FormState.UNINITIALIZED}
          handleRestoreToken={mockHandleRestoreToken}
          tokenId="0x33430b8a069f6f9115fe9403889162d6c779cccde4db8df04faaf09d6dc739ba"
        />
      );

      fireEvent.click(container.getByTestId("acceptSurrenderBtn"));
      expect(mockHandleDestroyToken).not.toHaveBeenCalled();
      fireEvent.click(container.getByTestId("rejectSurrenderBtn"));
      expect(mockHandleRestoreToken).not.toHaveBeenCalled();
    });
  });

  it("should disable accept surrender and reject button when the reject surrender state is in PENDING_CONFIRMATION", async () => {
    await act(async () => {
      const mockHandleDestroyToken = jest.fn();
      const mockHandleRestoreToken = jest.fn();

      const container = render(
        <HandleSurrenderedForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.Surrender}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          destroyTokenState={FormState.UNINITIALIZED}
          handleDestroyToken={mockHandleDestroyToken}
          restoreTokenState={FormState.PENDING_CONFIRMATION}
          handleRestoreToken={mockHandleRestoreToken}
          tokenId="0x33430b8a069f6f9115fe9403889162d6c779cccde4db8df04faaf09d6dc739ba"
        />
      );

      fireEvent.click(container.getByTestId("acceptSurrenderBtn"));
      expect(mockHandleDestroyToken).not.toHaveBeenCalled();
      fireEvent.click(container.getByTestId("rejectSurrenderBtn"));
      expect(mockHandleRestoreToken).not.toHaveBeenCalled();
    });
  });
});
