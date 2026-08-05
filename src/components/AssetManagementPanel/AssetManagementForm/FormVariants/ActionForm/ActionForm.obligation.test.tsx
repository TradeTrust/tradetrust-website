import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import * as chainUtils from "../../../../../common/utils/chain-utils";
import { FormState } from "../../../../../constants/FormState";
import { AssetManagementActions } from "../../../AssetManagementActions";
import {
  AcceptObligationFormProps,
  ActionForm,
  DischargeObligationFormProps,
  RejectObligationFormProps,
} from "./ActionForm";
import * as registryVersion from "../../../../../common/hooks/useTokenRegistryVersion";
import { TokenRegistryVersions } from "../../../../../constants";

jest.mock("../../../../../common/utils/chain-utils", () => ({
  encryptRemark: jest.fn().mockReturnValue("encryptedRemark"),
  getChainInfoFromNetworkName: jest.fn().mockReturnValue({ chainId: 1 }),
}));

jest.mock("../../../../../utils", () => ({
  isEthereumAddress: jest.fn().mockImplementation((address) => {
    return address && address.startsWith("0x") && address !== "0xa61B056dA0084a5f391EC137583073096880C2e3";
  }),
}));

const mockShowOverlay = jest.fn();
jest.mock("react", () => {
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    useContext: () => ({ showOverlay: mockShowOverlay, setCollapsible: jest.fn() }),
  };
});

jest.mock("../../../../UI/Tag", () => ({
  TagBordered: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const baseProps = {
  beneficiary: "0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C",
  holder: "0xa61B056dA0084a5f391EC137583073096880C2e3",
  setFormActionNone: jest.fn(),
  setShowEndorsementChain: jest.fn(),
  isExpired: false,
};

jest.spyOn(registryVersion, "useTokenRegistryVersion").mockReturnValue("V5" as TokenRegistryVersions.V5);

describe("ActionForm BoE obligation lifecycle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (chainUtils.encryptRemark as jest.Mock).mockReturnValue("encryptedRemark");
  });

  describe("AcceptObligationForm", () => {
    const acceptObligationProps: AcceptObligationFormProps = {
      ...baseProps,
      type: AssetManagementActions.AcceptObligation,
      handleAcceptObligation: jest.fn(),
      acceptObligationState: FormState.UNINITIALIZED,
    };

    it("renders the remark field and action buttons", () => {
      const { getByTestId } = render(<ActionForm {...acceptObligationProps} />);

      expect(getByTestId("editable-input-remark")).toBeInTheDocument();
      expect(getByTestId("cancelAcceptObligationBtn")).toBeInTheDocument();
      expect(getByTestId("acceptObligationBtn")).toBeInTheDocument();
    });

    it("calls handleAcceptObligation with the entered remark when confirmed", () => {
      const mockHandleAcceptObligation = jest.fn();
      const { getByTestId } = render(
        <ActionForm {...acceptObligationProps} handleAcceptObligation={mockHandleAcceptObligation} />
      );

      fireEvent.change(getByTestId("editable-input-remark"), { target: { value: "Accepting the bill" } });
      fireEvent.click(getByTestId("acceptObligationBtn"));

      expect(mockHandleAcceptObligation).toHaveBeenCalledWith({ remarks: "Accepting the bill" });
    });

    it("calls setFormActionNone when cancel is clicked", () => {
      const mockSetFormActionNone = jest.fn();
      const { getByTestId } = render(
        <ActionForm {...acceptObligationProps} setFormActionNone={mockSetFormActionNone} />
      );

      fireEvent.click(getByTestId("cancelAcceptObligationBtn"));
      expect(mockSetFormActionNone).toHaveBeenCalled();
    });

    it("disables both buttons and shows a loader while pending confirmation", () => {
      const mockHandleAcceptObligation = jest.fn();
      const { getByTestId } = render(
        <ActionForm
          {...acceptObligationProps}
          acceptObligationState={FormState.PENDING_CONFIRMATION}
          handleAcceptObligation={mockHandleAcceptObligation}
        />
      );

      expect(getByTestId("loader")).toBeInTheDocument();
      fireEvent.click(getByTestId("acceptObligationBtn"));
      expect(mockHandleAcceptObligation).not.toHaveBeenCalled();
    });
  });

  describe("RejectObligationForm", () => {
    const rejectObligationProps: RejectObligationFormProps = {
      ...baseProps,
      type: AssetManagementActions.RejectObligation,
      handleRejectObligation: jest.fn(),
      rejectObligationState: FormState.UNINITIALIZED,
    };

    it("renders the remark field and action buttons", () => {
      const { getByTestId } = render(<ActionForm {...rejectObligationProps} />);

      expect(getByTestId("editable-input-remark")).toBeInTheDocument();
      expect(getByTestId("cancelRejectObligationBtn")).toBeInTheDocument();
      expect(getByTestId("rejectObligationBtn")).toBeInTheDocument();
    });

    it("calls handleRejectObligation with the entered remark when confirmed", () => {
      const mockHandleRejectObligation = jest.fn();
      const { getByTestId } = render(
        <ActionForm {...rejectObligationProps} handleRejectObligation={mockHandleRejectObligation} />
      );

      fireEvent.change(getByTestId("editable-input-remark"), { target: { value: "Rejecting the bill" } });
      fireEvent.click(getByTestId("rejectObligationBtn"));

      expect(mockHandleRejectObligation).toHaveBeenCalledWith({ remarks: "Rejecting the bill" });
    });

    it("disables both buttons and shows a loader while pending confirmation", async () => {
      await act(async () => {
        const mockHandleRejectObligation = jest.fn();
        const { getByTestId } = render(
          <ActionForm
            {...rejectObligationProps}
            rejectObligationState={FormState.PENDING_CONFIRMATION}
            handleRejectObligation={mockHandleRejectObligation}
          />
        );

        expect(getByTestId("loader")).toBeInTheDocument();
        fireEvent.click(getByTestId("rejectObligationBtn"));
        expect(mockHandleRejectObligation).not.toHaveBeenCalled();
      });
    });
  });

  describe("DischargeObligationForm", () => {
    const dischargeObligationProps: DischargeObligationFormProps = {
      ...baseProps,
      type: AssetManagementActions.DischargeObligation,
      handleDischargeObligation: jest.fn(),
      dischargeObligationState: FormState.UNINITIALIZED,
    };

    it("renders the remark field and action buttons", () => {
      const { getByTestId } = render(<ActionForm {...dischargeObligationProps} />);

      expect(getByTestId("editable-input-remark")).toBeInTheDocument();
      expect(getByTestId("cancelDischargeObligationBtn")).toBeInTheDocument();
      expect(getByTestId("dischargeObligationBtn")).toBeInTheDocument();
    });

    it("calls handleDischargeObligation with the entered remark when confirmed", () => {
      const mockHandleDischargeObligation = jest.fn();
      const { getByTestId } = render(
        <ActionForm {...dischargeObligationProps} handleDischargeObligation={mockHandleDischargeObligation} />
      );

      fireEvent.change(getByTestId("editable-input-remark"), { target: { value: "Discharging the bill" } });
      fireEvent.click(getByTestId("dischargeObligationBtn"));

      expect(mockHandleDischargeObligation).toHaveBeenCalledWith({ remarks: "Discharging the bill" });
    });

    it("disables both buttons and shows a loader while pending confirmation", () => {
      const mockHandleDischargeObligation = jest.fn();
      const { getByTestId } = render(
        <ActionForm
          {...dischargeObligationProps}
          dischargeObligationState={FormState.PENDING_CONFIRMATION}
          handleDischargeObligation={mockHandleDischargeObligation}
        />
      );

      expect(getByTestId("loader")).toBeInTheDocument();
      fireEvent.click(getByTestId("dischargeObligationBtn"));
      expect(mockHandleDischargeObligation).not.toHaveBeenCalled();
    });
  });
});
