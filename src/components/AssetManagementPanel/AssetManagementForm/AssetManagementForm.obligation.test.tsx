import React from "react";
import { render } from "@testing-library/react";
import { AssetManagementForm } from "./AssetManagementForm";
import { AssetManagementActions } from "../AssetManagementActions";
import { FormState } from "../../../constants/FormState";
import { ObligationDocumentStatus } from "../../../constants/obligation";

const mockActionSelectionForm = jest.fn();
const mockShowOverlay = jest.fn();

jest.mock("./FormVariants/ActionSelectionForm", () => ({
  ActionSelectionForm: (props: any) => {
    mockActionSelectionForm(props);
    return <div data-testid="action-selection-form" />;
  },
}));

jest.mock("./FormVariants/ActionForm", () => ({
  ActionForm: () => <div data-testid="action-form" />,
}));

jest.mock("react", () => {
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    useContext: () => ({
      showOverlay: mockShowOverlay,
      closeOverlay: jest.fn(),
      isOverlayVisible: false,
    }),
  };
});

describe("AssetManagementForm BoE Issued — classic ETR parity", () => {
  const dualRole = "0x1234567890123456789012345678901234567890";
  const other = "0xDEADBEEFdeadbeefdeadbeefdeadbeefdeadbeef";

  const baseProps = {
    beneficiary: dualRole,
    holder: dualRole,
    nominee: undefined,
    account: dualRole,
    formAction: AssetManagementActions.None,
    tokenRegistryAddress: "0xTokenRegistry",
    onSetFormAction: jest.fn(),
    isReturnedToIssuer: false,
    isTokenBurnt: false,
    setShowEndorsementChain: jest.fn(),
    isTitleEscrow: true,
    isExpired: false,
    onTransferHolder: jest.fn(),
    holderTransferringState: FormState.UNINITIALIZED,
    onEndorseBeneficiary: jest.fn(),
    beneficiaryEndorseState: FormState.UNINITIALIZED,
    nominateBeneficiary: jest.fn(),
    nominateBeneficiaryState: FormState.UNINITIALIZED,
    transferOwners: jest.fn(),
    transferOwnersState: FormState.UNINITIALIZED,
    rejectTransferOwner: jest.fn(),
    rejectTransferOwnerState: FormState.UNINITIALIZED,
    rejectTransferHolder: jest.fn(),
    rejectTransferHolderState: FormState.UNINITIALIZED,
    rejectTransferOwnerHolder: jest.fn(),
    rejectTransferOwnerHolderState: FormState.UNINITIALIZED,
    onReturnToIssuer: jest.fn(),
    returnToIssuerState: FormState.UNINITIALIZED,
    onDestroyToken: jest.fn(),
    destroyTokenState: FormState.UNINITIALIZED,
    onRestoreToken: jest.fn(),
    restoreTokenState: FormState.UNINITIALIZED,
    isObligation: true,
    obligationStatus: ObligationDocumentStatus.Issued,
    onAcceptObligation: jest.fn(),
    acceptObligationState: FormState.UNINITIALIZED,
    onRejectObligation: jest.fn(),
    rejectObligationState: FormState.UNINITIALIZED,
    onDischargeObligation: jest.fn(),
    dischargeObligationState: FormState.UNINITIALIZED,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mirrors master Storybook BeneficiaryAndHolder (escrow issued dual-role form).
  it("Issued dual-role exposes transfer + return like BeneficiaryAndHolder", () => {
    render(<AssetManagementForm {...baseProps} />);

    expect(mockActionSelectionForm).toHaveBeenCalledWith(
      expect.objectContaining({
        canTransferHolder: true,
        canTransferBeneficiary: true,
        canTransferOwners: true,
        canReturnToIssuer: true,
        canAcceptObligation: false,
        canRejectObligation: false,
      })
    );
  });

  // Mirrors master Storybook Holder.
  it("Issued holder-only exposes transfer holdership + accept/reject", () => {
    render(<AssetManagementForm {...baseProps} beneficiary={other} holder={dualRole} account={dualRole} />);

    expect(mockActionSelectionForm).toHaveBeenCalledWith(
      expect.objectContaining({
        canTransferHolder: true,
        canAcceptObligation: true,
        canRejectObligation: true,
        canReturnToIssuer: false,
      })
    );
  });

  // Mirrors master Storybook Beneficiary.
  it("Issued beneficiary-only exposes nominate", () => {
    render(<AssetManagementForm {...baseProps} beneficiary={dualRole} holder={other} account={dualRole} />);

    expect(mockActionSelectionForm).toHaveBeenCalledWith(
      expect.objectContaining({
        canNominateBeneficiary: true,
        canTransferHolder: false,
        canAcceptObligation: false,
      })
    );
  });

  it("matches dual-role when account checksum casing differs", () => {
    render(
      <AssetManagementForm
        {...baseProps}
        account={dualRole.toUpperCase()}
        beneficiary={dualRole.toLowerCase()}
        holder={dualRole.toLowerCase()}
      />
    );

    expect(mockActionSelectionForm).toHaveBeenCalledWith(
      expect.objectContaining({
        canTransferHolder: true,
        canTransferOwners: true,
        canReturnToIssuer: true,
      })
    );
  });
});
