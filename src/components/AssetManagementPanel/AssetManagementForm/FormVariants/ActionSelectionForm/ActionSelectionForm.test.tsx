import "@testing-library/jest-dom";
import { act, fireEvent, render } from "@testing-library/react";
import React from "react";
import { ActionSelectionForm } from "./ActionSelectionForm";

const defaultProps = {
  setShowEndorsementChain: () => {},
  onSetFormAction: () => {},
  tokenRegistryAddress: "0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2",
  beneficiary: "0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C",
  holder: "0xa61B056dA0084a5f391EC137583073096880C2e3",
  account: "0xa61B056dA0084a5f391EC137583073096880C2e3",
  canSurrender: false,
  onConnectToWallet: () => alert("Login to Metamask"),
  canChangeHolder: false,
  canEndorseBeneficiary: false,
  canNominateBeneficiaryHolder: false,
  isSurrendered: false,
  canEndorseTransfer: false,
};

describe("ActionSelectionForm", () => {
  it("should display the non-editable beneficiary & holder", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} />);
      const beneficiaryComponent = container.getByTestId("asset-title-beneficiary");
      const beneficiaryText = container.getByText("0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C");
      const holderComponent = container.getByTestId("asset-title-holder");
      const holderText = container.getByText("0xa61B056dA0084a5f391EC137583073096880C2e3");

      expect(beneficiaryComponent).not.toBeNull();
      expect(beneficiaryText).not.toBeNull();
      expect(holderComponent).not.toBeNull();
      expect(holderText).not.toBeNull();
    });
  });

  it("should fire login to browser wallet if user is not logged in", async () => {
    await act(async () => {
      const mockOnConnectToWallet = jest.fn();

      const container = render(
        <ActionSelectionForm {...defaultProps} account="" onConnectToWallet={mockOnConnectToWallet} />
      );

      fireEvent.click(container.getByTestId("connectToWallet"));
      expect(mockOnConnectToWallet).toHaveBeenCalled();
    });
  });

  it("should display the Manage Assets dropdown if user is logged in", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} canChangeHolder={true} />);

      const manageAssetsDropdown = container.getByTestId("manageAssetDropdown");
      expect(manageAssetsDropdown).not.toBeNull();
    });
  });

  it("should allow the selection of Surrender if user can surrender", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} canSurrender={true} />);

      await act(async () => {
        fireEvent.click(container.getByTestId("manageAssetDropdown"));
      });

      expect(container.queryByTestId("surrenderDropdown")).not.toBeNull();
    });
  });

  it("should not display the selection of Surrender if user cannot surrender", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} canSurrender={false} />);

      expect(container.queryByTestId("SurrenderDropdown")).toBeNull();
    });
  });

  it("should display the Surrender tag if document is surrendered", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} isSurrendered={true} />);

      expect(container.queryByText("Surrendered")).not.toBeNull();
    });
  });

  it("should change the state of the application to TransferHolder when we clicked on TransferHolder", async () => {
    await act(async () => {
      const mockOnSetFormAction = jest.fn();

      const container = render(
        <ActionSelectionForm {...defaultProps} onSetFormAction={mockOnSetFormAction} canChangeHolder={true} />
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
        <ActionSelectionForm {...defaultProps} onSetFormAction={mockOnSetFormAction} canEndorseBeneficiary={true} />
      );

      await act(async () => {
        fireEvent.click(container.getByTestId("manageAssetDropdown"));
      });

      await act(async () => {
        fireEvent.click(container.getByTestId("endorseBeneficiaryDropdown"));
      });

      expect(mockOnSetFormAction).toHaveBeenCalled();
    });
  });

  it("should display the dropdown option when canEndorseTransfer is true", async () => {
    await act(async () => {
      const mockOnSetFormAction = jest.fn();

      const container = render(
        <ActionSelectionForm {...defaultProps} onSetFormAction={mockOnSetFormAction} canEndorseTransfer={true} />
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
        <ActionSelectionForm {...defaultProps} onSetFormAction={mockOnSetFormAction} canEndorseTransfer={true} />
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
});
