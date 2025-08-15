import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { VerificationFragment } from "@trustvc/trustvc";
import React from "react";
import { OverlayContextProvider } from "../../../../../common/contexts/OverlayContext";
import * as obfuscatedDocument from "../../../../../test/fixture/local/v2/invoice-obfuscated-document.json";
import { whenDocumentValidAndIssuedByDns } from "../../../../../test/fixture/verifier-responses";
import { WrappedOrSignedOpenAttestationDocument } from "../../../../../utils/shared";
import { Overlay } from "../../../../UI/Overlay";
import { ActionSelectionForm } from "./ActionSelectionForm";
import { MemoryRouter } from "react-router-dom";
import * as registryVersion from "../../../../../common/hooks/useTokenRegistryVersion";
import { TokenRegistryVersions } from "../../../../../constants";

const defaultProps = {
  setShowEndorsementChain: () => {},
  onSetFormAction: () => {},
  tokenRegistryAddress: "0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2",
  beneficiary: "0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C",
  holder: "0xa61B056dA0084a5f391EC137583073096880C2e3",
  account: "0xa61B056dA0084a5f391EC137583073096880C2e3",
  canReturnToIssuer: false,
  canHandleSurrender: false,
  canTransferHolder: false,
  canTransferBeneficiary: false,
  canTransferOwners: false,
  canEndorseBeneficiary: false,
  canNominateBeneficiary: false,
  isReturnedToIssuer: false,
  canEndorseTransfer: false,
  isTitleEscrow: true,
  isTokenBurnt: false,
  document: obfuscatedDocument as WrappedOrSignedOpenAttestationDocument,
  verificationStatus: whenDocumentValidAndIssuedByDns as VerificationFragment[],
  canRejectOwnerHolderTransfer: false,
  canRejectHolderTransfer: false,
  canRejectOwnerTransfer: false,
  isExpired: false,
};

jest.spyOn(registryVersion, "useTokenRegistryVersion").mockReturnValue("V5" as TokenRegistryVersions.V5);

describe("ActionSelectionForm", () => {
  it("should display the active wallet", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} />);
      const beneficiaryComponent = container.getByTestId("asset-title-owner");
      const beneficiaryText = container.getByText("0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C");
      const holderComponent = container.getByTestId("asset-title-holder");
      const holderText = within(holderComponent).getByText("0xa61B056dA0084a5f391EC137583073096880C2e3");

      expect(beneficiaryComponent).not.toBeNull();
      expect(beneficiaryText).not.toBeNull();
      expect(holderComponent).not.toBeNull();
      expect(holderText).not.toBeNull();
    });
  });

  it("should fire login to browser wallet if user is not logged in", async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <OverlayContextProvider>
          <Overlay />
          <ActionSelectionForm {...defaultProps} account="" />
        </OverlayContextProvider>
      </MemoryRouter>
    );

    fireEvent.click(getByTestId("connectToWallet"));
    expect(screen.getByText("Connect to Blockchain Wallet")).toBeInTheDocument();
  });

  it("should display the Manage Assets dropdown if user is logged in", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} canTransferHolder={true} />);

      const manageAssetsDropdown = container.getByTestId("manageAssetDropdown");
      expect(manageAssetsDropdown).not.toBeNull();
    });
  });

  it("should allow the selection of Reject Holdership if user can reject holder", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} canRejectHolderTransfer={true} />);

      await act(async () => {
        fireEvent.click(container.getByTestId("manageAssetDropdown"));
      });

      expect(container.queryByTestId("rejectTransferHolderDropdown")).not.toBeNull();
    });
  });
  it("should allow the selection of Reject Ownership if user can reject holder", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} canRejectOwnerTransfer={true} />);

      await act(async () => {
        fireEvent.click(container.getByTestId("manageAssetDropdown"));
      });

      expect(container.queryByTestId("rejectTransferOwnerDropdown")).not.toBeNull();
    });
  });

  it("should allow the selection of Reject Ownership & Holdership if user can reject holder", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} canRejectOwnerHolderTransfer={true} />);

      await act(async () => {
        fireEvent.click(container.getByTestId("manageAssetDropdown"));
      });

      expect(container.queryByTestId("rejectTransferOwnerHolderDropdown")).not.toBeNull();
    });
  });
  it("should allow the selection of Surrender if user can surrender", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} canReturnToIssuer={true} />);

      await act(async () => {
        fireEvent.click(container.getByTestId("manageAssetDropdown"));
      });

      expect(container.queryByTestId("surrenderDropdown")).not.toBeNull();
    });
  });

  it("should not display the selection of Surrender if user cannot surrender", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} canReturnToIssuer={false} />);

      expect(container.queryByTestId("SurrenderDropdown")).toBeNull();
    });
  });

  it("should display the Surrender to issuer tag if document is owned by token registry", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} isReturnedToIssuer={true} />);

      expect(container.queryByText("ETR returned to Issuer")).not.toBeNull();
    });
  });

  it("should display the Surrender tag if document is surrendered", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} isTokenBurnt={true} />);

      expect(container.queryByText("Taken out of circulation")).not.toBeNull();
    });
  });

  it("should change the state of the application to TransferHolder when we clicked on TransferHolder", async () => {
    await act(async () => {
      const mockOnSetFormAction = jest.fn();

      const container = render(
        <ActionSelectionForm {...defaultProps} onSetFormAction={mockOnSetFormAction} canTransferHolder={true} />
      );

      await act(async () => {
        fireEvent.click(container.getByTestId("manageAssetDropdown"));
      });

      await act(async () => {
        fireEvent.click(container.getByTestId("transferHolderDropdown"));
      });

      expect(mockOnSetFormAction).toHaveBeenCalled();
    });
  });

  it("should change the state of the application to EndorseBeneficiary when we clicked on EndorseBeneficiary", async () => {
    await act(async () => {
      const mockOnSetFormAction = jest.fn();

      const container = render(
        <ActionSelectionForm {...defaultProps} onSetFormAction={mockOnSetFormAction} canTransferBeneficiary={true} />
      );

      await act(async () => {
        fireEvent.click(container.getByTestId("manageAssetDropdown"));
      });

      await act(async () => {
        fireEvent.click(container.getByTestId("transferOwnerDropdown"));
      });

      expect(mockOnSetFormAction).toHaveBeenCalled();
    });
  });

  it("should display the dropdown option when canEndorseTransfer is true", async () => {
    await act(async () => {
      const mockOnSetFormAction = jest.fn();

      const container = render(
        <ActionSelectionForm {...defaultProps} onSetFormAction={mockOnSetFormAction} canTransferOwners={true} />
      );

      await act(async () => {
        fireEvent.click(container.getByTestId("manageAssetDropdown"));
      });

      const endorseTransferDropdown = container.getByTestId("endorseTransferDropdown");
      expect(endorseTransferDropdown).not.toBeNull();
    });
  });

  it("should change the state of the action form to 'EndorseTransfer' when clicked on the dropdown", async () => {
    await act(async () => {
      const mockOnSetFormAction = jest.fn();

      const container = render(
        <ActionSelectionForm {...defaultProps} onSetFormAction={mockOnSetFormAction} canTransferOwners={true} />
      );

      await act(async () => {
        fireEvent.click(container.getByTestId("manageAssetDropdown"));
      });

      await act(async () => {
        fireEvent.click(container.getByTestId("endorseTransferDropdown"));
      });

      expect(mockOnSetFormAction).toHaveBeenCalled();
    });
  });

  it("should change the state of the action form to 'Accept Surrender' when clicked on the dropdown", async () => {
    const mockOnSetFormAction = jest.fn();

    const container = render(
      <ActionSelectionForm
        {...defaultProps}
        onSetFormAction={mockOnSetFormAction}
        isTitleEscrow={false}
        canHandleShred={true}
      />
    );

    await act(async () => {
      fireEvent.click(container.getByTestId("manageAssetDropdown"));
    });

    await act(async () => {
      fireEvent.click(container.getByTestId("acceptSurrenderDropdown"));
    });

    expect(mockOnSetFormAction).toHaveBeenCalled();
  });

  it("should change the state of the action form to 'Reject Surrender' when clicked on the dropdown", async () => {
    const mockOnSetFormAction = jest.fn();

    const container = render(
      <ActionSelectionForm
        {...defaultProps}
        onSetFormAction={mockOnSetFormAction}
        isTitleEscrow={false}
        canHandleRestore={true}
      />
    );

    await act(async () => {
      fireEvent.click(container.getByTestId("manageAssetDropdown"));
    });

    await act(async () => {
      fireEvent.click(container.getByTestId("rejectSurrenderDropdown"));
    });

    expect(mockOnSetFormAction).toHaveBeenCalled();
  });
  it("should change the state of the action form to 'Reject Holder' when clicked on the dropdown", async () => {
    const mockOnSetFormAction = jest.fn();

    const container = render(
      <ActionSelectionForm {...defaultProps} onSetFormAction={mockOnSetFormAction} canRejectHolderTransfer={true} />
    );

    await act(async () => {
      fireEvent.click(container.getByTestId("manageAssetDropdown"));
    });

    await act(async () => {
      fireEvent.click(container.getByTestId("rejectTransferHolderDropdown"));
    });

    expect(mockOnSetFormAction).toHaveBeenCalled();
  });
  it("should change the state of the action form to 'Reject Owner' when clicked on the dropdown", async () => {
    const mockOnSetFormAction = jest.fn();

    const container = render(
      <ActionSelectionForm {...defaultProps} onSetFormAction={mockOnSetFormAction} canRejectOwnerTransfer={true} />
    );

    await act(async () => {
      fireEvent.click(container.getByTestId("manageAssetDropdown"));
    });

    await act(async () => {
      fireEvent.click(container.getByTestId("rejectTransferOwnerDropdown"));
    });

    expect(mockOnSetFormAction).toHaveBeenCalled();
  });
  it("should change the state of the action form to 'Reject Owner & Holder' when clicked on the dropdown", async () => {
    const mockOnSetFormAction = jest.fn();

    const container = render(
      <ActionSelectionForm
        {...defaultProps}
        onSetFormAction={mockOnSetFormAction}
        canRejectOwnerHolderTransfer={true}
      />
    );

    await act(async () => {
      fireEvent.click(container.getByTestId("manageAssetDropdown"));
    });

    await act(async () => {
      fireEvent.click(container.getByTestId("rejectTransferOwnerHolderDropdown"));
    });

    expect(mockOnSetFormAction).toHaveBeenCalled();
  });
});
