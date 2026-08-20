import { act, fireEvent, render } from "@testing-library/react";
import React from "react";
import { ActionSelectionForm } from "./ActionSelectionForm";
import { ObligationDocumentStatus } from "../../../../../constants/obligation";
import * as registryVersion from "../../../../../common/hooks/useTokenRegistryVersion";
import { TokenRegistryVersions } from "../../../../../constants";

jest.spyOn(registryVersion, "useTokenRegistryVersion").mockReturnValue("V5" as TokenRegistryVersions.V5);

const defaultProps = {
  setShowEndorsementChain: () => {},
  onSetFormAction: () => {},
  tokenRegistryAddress: "0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2",
  beneficiary: "0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C",
  holder: "0xa61B056dA0084a5f391EC137583073096880C2e3",
  account: "0xa61B056dA0084a5f391EC137583073096880C2e3",
  canReturnToIssuer: false,
  canTransferHolder: false,
  canTransferBeneficiary: false,
  canTransferOwners: false,
  canEndorseBeneficiary: false,
  canNominateBeneficiary: false,
  isReturnedToIssuer: false,
  isTitleEscrow: true,
  isTokenBurnt: false,
  canRejectOwnerHolderTransfer: false,
  canRejectHolderTransfer: false,
  canRejectOwnerTransfer: false,
  isExpired: false,
};

describe("ActionSelectionForm BoE obligation lifecycle", () => {
  it("shows the Manage Assets dropdown when only canAcceptObligation is true", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} isObligation canAcceptObligation />);
      expect(container.getByTestId("manageAssetDropdown")).not.toBeNull();
    });
  });

  it("lists Accept the bill only when canAcceptObligation is true", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} isObligation canAcceptObligation />);

      await act(async () => {
        fireEvent.click(container.getByTestId("manageAssetDropdown"));
      });

      expect(container.queryByTestId("acceptObligationDropdown")).not.toBeNull();
      expect(container.queryByTestId("rejectObligationDropdown")).toBeNull();
      expect(container.queryByTestId("dischargeObligationDropdown")).toBeNull();
    });
  });

  it("dispatches AcceptObligation when the Accept the bill item is clicked", async () => {
    const mockOnSetFormAction = jest.fn();

    const container = render(
      <ActionSelectionForm {...defaultProps} onSetFormAction={mockOnSetFormAction} isObligation canAcceptObligation />
    );

    await act(async () => {
      fireEvent.click(container.getByTestId("manageAssetDropdown"));
    });
    await act(async () => {
      fireEvent.click(container.getByTestId("acceptObligationDropdown"));
    });

    expect(mockOnSetFormAction).toHaveBeenCalledWith("AcceptObligation");
  });

  it("dispatches RejectObligation when the Reject the bill item is clicked", async () => {
    const mockOnSetFormAction = jest.fn();

    const container = render(
      <ActionSelectionForm {...defaultProps} onSetFormAction={mockOnSetFormAction} isObligation canRejectObligation />
    );

    await act(async () => {
      fireEvent.click(container.getByTestId("manageAssetDropdown"));
    });
    await act(async () => {
      fireEvent.click(container.getByTestId("rejectObligationDropdown"));
    });

    expect(mockOnSetFormAction).toHaveBeenCalledWith("RejectObligation");
  });

  it("dispatches DischargeObligation when the Discharge the bill item is clicked", async () => {
    const mockOnSetFormAction = jest.fn();

    const container = render(
      <ActionSelectionForm
        {...defaultProps}
        onSetFormAction={mockOnSetFormAction}
        isObligation
        canDischargeObligation
      />
    );

    await act(async () => {
      fireEvent.click(container.getByTestId("manageAssetDropdown"));
    });
    await act(async () => {
      fireEvent.click(container.getByTestId("dischargeObligationDropdown"));
    });

    expect(mockOnSetFormAction).toHaveBeenCalledWith("DischargeObligation");
  });

  it("is keyboard operable — the new items are real buttons, unlike the shared DropdownItem", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} isObligation canAcceptObligation />);

      await act(async () => {
        fireEvent.click(container.getByTestId("manageAssetDropdown"));
      });

      expect(container.getByTestId("acceptObligationDropdown").tagName).toBe("BUTTON");
    });
  });

  it("shows a Status label and pill beside Owner/Holder when isObligation and obligationStatus are set", async () => {
    await act(async () => {
      const container = render(
        <ActionSelectionForm {...defaultProps} isObligation obligationStatus={ObligationDocumentStatus.Issued} />
      );
      expect(container.queryByTestId("asset-title-status")).not.toBeNull();
      expect(container.getByText("Status:")).toBeInTheDocument();
      expect(container.queryByTestId("obligationStatus")).not.toBeNull();
      expect(container.getByTestId("obligationStatus").textContent).toContain("Issued");
      expect(container.getByTestId("asset-title-owner")).toBeInTheDocument();
      expect(container.getByTestId("asset-title-holder")).toBeInTheDocument();
    });
  });

  it("shows only the burnt banner for reject/discharge (no duplicate Status pill)", async () => {
    await act(async () => {
      const container = render(
        <ActionSelectionForm
          {...defaultProps}
          isTokenBurnt
          isObligation
          obligationStatus={ObligationDocumentStatus.Rejected}
        />
      );
      // Match TrustVC: burnt banner carries the outcome; Status pill is for active titles only.
      expect(container.queryByTestId("obligationStatus")).toBeNull();
      expect(container.queryByText("Status:")).toBeNull();
      expect(container.getByText("Bill rejected")).toBeInTheDocument();
      expect(container.queryByText("Taken out of circulation")).toBeNull();
    });
  });

  it("shows Bill discharged when burnt after discharge", async () => {
    await act(async () => {
      const container = render(
        <ActionSelectionForm
          {...defaultProps}
          isTokenBurnt
          isObligation
          obligationStatus={ObligationDocumentStatus.Discharged}
        />
      );
      expect(container.getByText("Bill discharged")).toBeInTheDocument();
      expect(container.queryByTestId("obligationStatus")).toBeNull();
      expect(container.queryByText("Status:")).toBeNull();
    });
  });

  it("shows BoE taken out of circulation when burnt via return-to-issuer", async () => {
    await act(async () => {
      const container = render(
        <ActionSelectionForm
          {...defaultProps}
          isTokenBurnt
          isObligation
          obligationStatus={ObligationDocumentStatus.Accepted}
        />
      );
      expect(container.getByText("BoE taken out of circulation")).toBeInTheDocument();
    });
  });

  it("does not show a Status pill for classic ETR documents", async () => {
    await act(async () => {
      const container = render(<ActionSelectionForm {...defaultProps} />);
      expect(container.queryByTestId("obligationStatus")).toBeNull();
      expect(container.queryByTestId("asset-title-status")).toBeNull();
    });
  });

  it("does not claim pay-on-behalf when only obligation actions are available", async () => {
    await act(async () => {
      const container = render(
        <ActionSelectionForm {...defaultProps} isGaslessEnabled isObligation canAcceptObligation />
      );
      expect(container.queryByTestId("gasless-enabled-claim")).toBeNull();
    });
  });

  it("claims pay-on-behalf only for title escrow transactions when gasless-eligible actions exist", async () => {
    await act(async () => {
      const container = render(
        <ActionSelectionForm {...defaultProps} isGaslessEnabled isObligation canAcceptObligation canTransferHolder />
      );
      const claim = container.getByTestId("gasless-enabled-claim");
      expect(claim).not.toBeNull();
      expect(claim.textContent).toContain("title escrow transactions");
      expect(claim.textContent).not.toContain("all transaction");
    });
  });
});
