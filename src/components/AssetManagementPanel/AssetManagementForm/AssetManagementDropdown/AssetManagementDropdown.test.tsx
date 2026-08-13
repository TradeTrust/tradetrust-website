import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { AssetManagementDropdown } from "./AssetManagementDropdown";
import { AssetManagementActions } from "../../AssetManagementActions";

const defaultProps = {
  onSetFormAction: jest.fn(),
  canReturnToIssuer: false,
  canTransferHolder: false,
  canTransferBeneficiary: false,
  canNominateBeneficiary: false,
  canEndorseBeneficiary: false,
  canTransferOwners: false,
  canRejectOwnerHolderTransfer: false,
  canRejectOwnerTransfer: false,
  canRejectHolderTransfer: false,
};

describe("AssetManagementDropdown", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("BoE obligation lifecycle items", () => {
    it("does not render any obligation item by default", () => {
      const { getByTestId, queryByTestId } = render(<AssetManagementDropdown {...defaultProps} canTransferHolder />);
      fireEvent.click(getByTestId("manageAssetDropdown"));

      expect(queryByTestId("acceptObligationDropdown")).toBeNull();
      expect(queryByTestId("rejectObligationDropdown")).toBeNull();
      expect(queryByTestId("dischargeObligationDropdown")).toBeNull();
    });

    it("renders Accept the bill and dispatches AcceptObligation on click", () => {
      const onSetFormAction = jest.fn();
      const { getByTestId } = render(
        <AssetManagementDropdown {...defaultProps} onSetFormAction={onSetFormAction} canAcceptObligation />
      );
      fireEvent.click(getByTestId("manageAssetDropdown"));

      const item = getByTestId("acceptObligationDropdown");
      expect(item).toBeInTheDocument();
      expect(item.textContent).toBe("Accept the bill");

      fireEvent.click(item);
      expect(onSetFormAction).toHaveBeenCalledWith(AssetManagementActions.AcceptObligation);
    });

    it("renders Reject the bill and dispatches RejectObligation on click", () => {
      const onSetFormAction = jest.fn();
      const { getByTestId } = render(
        <AssetManagementDropdown {...defaultProps} onSetFormAction={onSetFormAction} canRejectObligation />
      );
      fireEvent.click(getByTestId("manageAssetDropdown"));

      const item = getByTestId("rejectObligationDropdown");
      expect(item).toBeInTheDocument();
      expect(item.textContent).toBe("Reject the bill");

      fireEvent.click(item);
      expect(onSetFormAction).toHaveBeenCalledWith(AssetManagementActions.RejectObligation);
    });

    it("renders Discharge the bill and dispatches DischargeObligation on click", () => {
      const onSetFormAction = jest.fn();
      const { getByTestId } = render(
        <AssetManagementDropdown {...defaultProps} onSetFormAction={onSetFormAction} canDischargeObligation />
      );
      fireEvent.click(getByTestId("manageAssetDropdown"));

      const item = getByTestId("dischargeObligationDropdown");
      expect(item).toBeInTheDocument();
      expect(item.textContent).toBe("Discharge the bill");

      fireEvent.click(item);
      expect(onSetFormAction).toHaveBeenCalledWith(AssetManagementActions.DischargeObligation);
    });

    it("renders the obligation items as real, keyboard-focusable buttons unlike the shared DropdownItem", () => {
      const { getByTestId } = render(
        <AssetManagementDropdown {...defaultProps} canAcceptObligation canTransferHolder />
      );
      fireEvent.click(getByTestId("manageAssetDropdown"));

      expect(getByTestId("acceptObligationDropdown").tagName).toBe("BUTTON");
      expect(getByTestId("transferHolderDropdown").tagName).toBe("DIV");
    });
  });

  describe("classic ETR items (regression guard)", () => {
    it("still renders classic items unaffected by the new obligation props", () => {
      const onSetFormAction = jest.fn();
      const { getByTestId } = render(
        <AssetManagementDropdown {...defaultProps} onSetFormAction={onSetFormAction} canReturnToIssuer />
      );
      fireEvent.click(getByTestId("manageAssetDropdown"));

      const item = getByTestId("surrenderDropdown");
      fireEvent.click(item);
      expect(onSetFormAction).toHaveBeenCalledWith(AssetManagementActions.ReturnToIssuer);
    });
  });
});
