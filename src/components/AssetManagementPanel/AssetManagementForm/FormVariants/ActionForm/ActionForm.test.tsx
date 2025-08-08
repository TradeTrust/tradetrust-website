import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import * as chainUtils from "../../../../../common/utils/chain-utils";
import { FormState } from "../../../../../constants/FormState";
import { AssetManagementActions } from "../../../AssetManagementActions";
import {
  AcceptSurrenderedFormProps,
  ActionForm,
  EndorseBeneficiaryProps,
  NominateBeneficiaryFormProps,
  RejectSurrenderedFormProps,
  SurrenderFormProps,
  TransferHolderFormProps,
  TransferOwnerFormProps,
  TransferOwnerHolderFormProps,
} from "./ActionForm";

// Mock the chain-utils that's essential for testing encrypted remarks
jest.mock("../../../../../common/utils/chain-utils", () => ({
  encryptRemark: jest.fn().mockReturnValue("encryptedRemark"),
  getChainInfoFromNetworkName: jest.fn().mockReturnValue({ chainId: 1 }),
}));

// Mock the isEthereumAddress function for address validation
jest.mock("../../../../../utils", () => ({
  isEthereumAddress: jest.fn().mockImplementation((address) => {
    return address && address.startsWith("0x") && address !== "0xa61B056dA0084a5f391EC137583073096880C2e3";
  }),
}));

// Mock the OverlayContext hook - essential for overlay interactions
const mockShowOverlay = jest.fn();
jest.mock("react", () => {
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    useContext: () => ({ showOverlay: mockShowOverlay, setCollapsible: jest.fn() }),
  };
});

// Mock the TagBordered component as a simple div
jest.mock("../../../../UI/Tag", () => ({
  TagBordered: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const baseProps = {
  beneficiary: "0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C",
  holder: "0xa61B056dA0084a5f391EC137583073096880C2e3",
  setFormActionNone: jest.fn(),
  keyId: "key-id",
  setShowEndorsementChain: jest.fn(),
  isExpired: false,
};

describe("ActionForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mockImplementation to default
    (chainUtils.encryptRemark as jest.Mock).mockReturnValue("encryptedRemark");
  });

  describe("TransferHolder Form", () => {
    const transferHolderProps: TransferHolderFormProps = {
      ...baseProps,
      type: AssetManagementActions.TransferHolder,
      handleTransfer: jest.fn(),
      holderTransferringState: FormState.UNINITIALIZED,
    };

    it("should display the static beneficiary & editable holder when the app is in TransferHolder state", async () => {
      await act(async () => {
        const container = render(
          <ActionForm
            type={AssetManagementActions.TransferHolder}
            setFormActionNone={() => {}}
            beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
            holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
            handleTransfer={() => {}}
            holderTransferringState={FormState.UNINITIALIZED}
            setShowEndorsementChain={() => {}}
            isExpired={false}
          />
        );

        const beneficiaryComponent = container.getByTestId("asset-title-owner");
        const beneficiaryText = container.getByText(baseProps.beneficiary);
        const holderComponent = container.getByTestId("editable-input-holder");

        expect(container.queryByTestId("editable-input-owner")).toBeNull();
        expect(holderComponent).toHaveValue(baseProps.holder);
        expect(beneficiaryComponent).toBeInTheDocument();
        expect(beneficiaryText).toBeInTheDocument();
        expect(holderComponent).toBeInTheDocument();
        expect(container.queryByTestId("cancelTransferBtn")).toBeInTheDocument();
        expect(container.queryByTestId("transferBtn")).toBeInTheDocument();
      });
    });

    it("should call handleTransfer when transfer button is clicked", () => {
      // Always ensure encryptRemark returns the expected value
      (chainUtils.encryptRemark as jest.Mock).mockReturnValue("encryptedRemark");

      const mockHandleTransfer = jest.fn();
      const { getByTestId } = render(<ActionForm {...transferHolderProps} handleTransfer={mockHandleTransfer} />);

      const newHolderInput = getByTestId("editable-input-holder");
      fireEvent.change(newHolderInput, { target: { value: "0xNewHolderAddress" } });

      // Set remark to ensure 0xencryptedRemark is passed
      const remarkInput = getByTestId("editable-input-remark");
      fireEvent.change(remarkInput, { target: { value: "Test remark" } });

      const transferButton = getByTestId("transferBtn");
      fireEvent.click(transferButton);

      expect(mockHandleTransfer).toHaveBeenCalledWith({
        newHolderAddress: "0xNewHolderAddress",
        remarks: "Test remark",
      });
    });

    it("should disable transfer button when new holder is invalid", () => {
      const { getByTestId } = render(<ActionForm {...transferHolderProps} />);

      const transferButton = getByTestId("transferBtn");
      expect(transferButton).toBeDisabled();
      fireEvent.click(transferButton);
      expect(transferHolderProps.handleTransfer).not.toHaveBeenCalled();
    });

    it("should show error when changeHolder return error holderState", async () => {
      await act(async () => {
        const { getByTestId } = render(
          <ActionForm {...transferHolderProps} holderTransferringState={FormState.ERROR} />
        );

        const hasError = getByTestId("error-msg");
        expect(hasError).toBeInTheDocument();
      });
    });
  });

  describe("NominateBeneficiary Form", () => {
    const nominateBeneficiaryProps: NominateBeneficiaryFormProps = {
      ...baseProps,
      type: AssetManagementActions.NominateBeneficiary,
      handleNomination: jest.fn(),
      nominationState: FormState.UNINITIALIZED,
    };

    it("should render the form with editable owner field", () => {
      const { getByText, getByTestId } = render(<ActionForm {...nominateBeneficiaryProps} />);

      expect(getByText("Owner:")).toBeInTheDocument();
      expect(getByTestId("nominationBtn")).toBeInTheDocument();
      const beneficiaryComponent = getByTestId("editable-input-owner");
      const holderComponent = getByTestId("non-editable-input-holder");
      expect(beneficiaryComponent).toBeInTheDocument();
      expect(holderComponent).toBeInTheDocument();
      expect(getByTestId("cancelNominationBtn")).toBeInTheDocument();
      expect(getByTestId("nominationBtn")).toBeInTheDocument();
    });

    it("should call handleNomination when nominate button is clicked", () => {
      (chainUtils.encryptRemark as jest.Mock).mockReturnValue("encryptedRemark");

      const mockHandleNomination = jest.fn();
      const { getByTestId } = render(
        <ActionForm {...nominateBeneficiaryProps} handleNomination={mockHandleNomination} />
      );

      const newOwnerInput = getByTestId("editable-input-owner");
      fireEvent.change(newOwnerInput, { target: { value: "0xNewBeneficiary" } });

      const remarkInput = getByTestId("editable-input-remark");
      fireEvent.change(remarkInput, { target: { value: "Test remark" } });

      const nominateButton = getByTestId("nominationBtn");
      fireEvent.click(nominateButton);

      expect(mockHandleNomination).toHaveBeenCalledWith({
        newBeneficiaryAddress: "0xNewBeneficiary",
        remarks: "Test remark",
      });
    });

    it("should change the state of the application to None when we clicked on Cancel", async () => {
      await act(async () => {
        const mockHandleNomination = jest.fn();
        const { getByTestId } = render(
          <ActionForm {...nominateBeneficiaryProps} handleNomination={mockHandleNomination} />
        );

        fireEvent.click(getByTestId("cancelNominationBtn"));
        expect(baseProps.setFormActionNone).toHaveBeenCalled();
      });
    });

    it("should show error when nominateBeneficiary return error nominationState", async () => {
      await act(async () => {
        const mockHandleNomination = jest.fn();
        const { getAllByText } = render(
          <ActionForm
            {...nominateBeneficiaryProps}
            handleNomination={mockHandleNomination}
            nominationState={FormState.ERROR}
          />
        );

        expect(getAllByText("Unidentified address. Please check and input again.", { exact: false })).not.toBeNull();
      });
    });
  });

  describe("SurrenderForm", () => {
    const surrenderFormProps: SurrenderFormProps = {
      ...baseProps,
      type: AssetManagementActions.ReturnToIssuer,
      handleReturnToIssuer: jest.fn(),
      returnToIssuerState: FormState.UNINITIALIZED,
    };

    it("should render the surrender form with owner and holder fields", () => {
      const { getByText, getByTestId } = render(<ActionForm {...surrenderFormProps} />);

      expect(getByTestId("asset-title-owner")).toBeInTheDocument();
      expect(getByTestId("asset-title-holder")).toBeInTheDocument();
      expect(getByText("Owner:")).toBeInTheDocument();
      expect(getByText(baseProps.beneficiary)).toBeInTheDocument();
      expect(getByText("Holder:")).toBeInTheDocument();
      expect(getByText(baseProps.holder)).toBeInTheDocument();
      expect(getByTestId("cancelSurrenderBtn")).toBeInTheDocument();
      expect(getByTestId("surrenderBtn")).toBeInTheDocument();
    });

    it("should call handleReturnToIssuer when surrender button is clicked", () => {
      (chainUtils.encryptRemark as jest.Mock).mockReturnValue("encryptedRemark");

      const mockHandleReturnToIssuer = jest.fn();
      const { getByTestId } = render(
        <ActionForm {...surrenderFormProps} handleReturnToIssuer={mockHandleReturnToIssuer} />
      );

      const remarkInput = getByTestId("editable-input-remark");
      fireEvent.change(remarkInput, { target: { value: "Test remark" } });

      const surrenderButton = getByTestId("surrenderBtn");
      fireEvent.click(surrenderButton);

      expect(mockHandleReturnToIssuer).toHaveBeenCalledWith({
        remarks: "Test remark",
      });
    });

    it("should change the state of the application to None when we clicked on Cancel", async () => {
      await act(async () => {
        const mockHandleReturnToIssuer = jest.fn();
        const { getByTestId } = render(
          <ActionForm {...surrenderFormProps} handleReturnToIssuer={mockHandleReturnToIssuer} />
        );

        fireEvent.click(getByTestId("cancelSurrenderBtn"));
        expect(baseProps.setFormActionNone).toHaveBeenCalled();
      });
    });

    it("should show a loader when the surrender state is in PENDING_CONFIRMATION and button cannot be clicked", async () => {
      await act(async () => {
        const mockHandleReturnToIssuer = jest.fn();
        const { getByTestId } = render(
          <ActionForm
            {...surrenderFormProps}
            returnToIssuerState={FormState.PENDING_CONFIRMATION}
            handleReturnToIssuer={mockHandleReturnToIssuer}
          />
        );

        expect(getByTestId("loader")).toBeInTheDocument();
        fireEvent.click(getByTestId("surrenderBtn"));
        expect(mockHandleReturnToIssuer).not.toHaveBeenCalled();
      });
    });
  });

  describe("AcceptSurrenderedForm", () => {
    const acceptSurrenderedProps: AcceptSurrenderedFormProps = {
      ...baseProps,
      type: AssetManagementActions.AcceptReturnToIssuer,
      handleDestroyToken: jest.fn(),
      destroyTokenState: FormState.UNINITIALIZED,
    };

    it("should render the accept surrender form with surrender tag", () => {
      const { getByText, getByTestId } = render(<ActionForm {...acceptSurrenderedProps} />);

      expect(getByText("ETR returned to Issuer")).toBeInTheDocument();
      expect(getByTestId("cancelSurrenderBtn")).toBeInTheDocument();
      expect(getByTestId("acceptSurrenderBtn")).toBeInTheDocument();
    });

    it("should call handleDestroyToken when accept button is clicked", () => {
      (chainUtils.encryptRemark as jest.Mock).mockReturnValue("encryptedRemark");

      const mockHandleDestroyToken = jest.fn();
      const { getByTestId } = render(
        <ActionForm {...acceptSurrenderedProps} handleDestroyToken={mockHandleDestroyToken} />
      );

      const remarkInput = getByTestId("editable-input-remark");
      fireEvent.change(remarkInput, { target: { value: "Test remark" } });

      const acceptButton = getByTestId("acceptSurrenderBtn");
      fireEvent.click(acceptButton);

      expect(mockHandleDestroyToken).toHaveBeenCalledWith("Test remark");
    });

    it("should disable accept surrender and cancel button when the accept surrender state is in PENDING_CONFIRMATION", async () => {
      await act(async () => {
        const mockHandleDestroyToken = jest.fn();
        const mockHandleRestoreToken = jest.fn();

        const container = render(
          <ActionForm
            {...acceptSurrenderedProps}
            destroyTokenState={FormState.PENDING_CONFIRMATION}
            handleDestroyToken={mockHandleDestroyToken}
          />
        );

        expect(container.getByTestId("accept-loader")).toBeInTheDocument();
        fireEvent.click(container.getByTestId("acceptSurrenderBtn"));
        expect(mockHandleDestroyToken).not.toHaveBeenCalled();
        fireEvent.click(container.getByTestId("cancelSurrenderBtn"));
        expect(mockHandleRestoreToken).not.toHaveBeenCalled();
      });
    });
  });

  describe("RejectSurrenderedForm", () => {
    const rejectSurrenderedProps: RejectSurrenderedFormProps = {
      ...baseProps,
      type: AssetManagementActions.RejectReturnToIssuer,
      handleRestoreToken: jest.fn(),
      restoreTokenState: FormState.UNINITIALIZED,
    };

    it("should render the reject surrender form with surrender tag", () => {
      const { getByText, getByTestId } = render(<ActionForm {...rejectSurrenderedProps} />);

      expect(getByText("ETR returned to Issuer")).toBeInTheDocument();
      expect(getByTestId("rejectSurrenderBtn")).toBeInTheDocument();
      expect(getByTestId("cancelSurrenderBtn")).toBeInTheDocument();
    });

    it("should call showOverlay when reject button is clicked", () => {
      const { getByTestId } = render(<ActionForm {...rejectSurrenderedProps} />);

      const rejectButton = getByTestId("rejectSurrenderBtn");
      fireEvent.click(rejectButton);

      expect(mockShowOverlay).toHaveBeenCalled();
    });
    it("should show a loader and disable buttons when the reject surrender state is in PENDING_CONFIRMATION", async () => {
      await act(async () => {
        const { getByTestId } = render(
          <ActionForm {...rejectSurrenderedProps} restoreTokenState={FormState.PENDING_CONFIRMATION} />
        );

        expect(getByTestId("reject-loader")).toBeInTheDocument();

        fireEvent.click(getByTestId("cancelSurrenderBtn"));
        expect(rejectSurrenderedProps.setFormActionNone).not.toHaveBeenCalled();
        fireEvent.click(getByTestId("rejectSurrenderBtn"));
        expect(rejectSurrenderedProps.handleRestoreToken).not.toHaveBeenCalled();
      });
    });
  });

  describe("TransferOwnerForm", () => {
    const transferOwnerProps: TransferOwnerFormProps = {
      ...baseProps,
      type: AssetManagementActions.TransferOwner,
      handleBeneficiaryTransfer: jest.fn(),
      beneficiaryEndorseState: FormState.UNINITIALIZED,
    };

    it("should render the form with editable owner field", () => {
      const { getByText, getByTestId, queryByTestId } = render(<ActionForm {...transferOwnerProps} />);

      expect(getByText("Owner:")).toBeInTheDocument();
      expect(getByTestId("non-editable-input-holder")).toBeInTheDocument();
      expect(queryByTestId("editable-input-holder")).toBeNull();
      expect(getByTestId("editable-input-owner")).toBeInTheDocument();
      expect(getByTestId("cancelTransferBtn")).toBeInTheDocument();
      expect(getByTestId("transferBtn")).toBeInTheDocument();
    });

    it("should call handleBeneficiaryTransfer when transfer button is clicked", () => {
      (chainUtils.encryptRemark as jest.Mock).mockReturnValue("encryptedRemark");

      const mockHandleBeneficiaryTransfer = jest.fn();
      const { getByTestId } = render(
        <ActionForm {...transferOwnerProps} handleBeneficiaryTransfer={mockHandleBeneficiaryTransfer} />
      );

      const newOwnerInput = getByTestId("editable-input-owner");
      fireEvent.change(newOwnerInput, { target: { value: "0xNewOwner" } });

      const remarkInput = getByTestId("editable-input-remark");
      fireEvent.change(remarkInput, { target: { value: "Test remark" } });

      const transferButton = getByTestId("transferBtn");
      fireEvent.click(transferButton);

      expect(mockHandleBeneficiaryTransfer).toHaveBeenCalledWith({
        newBeneficiaryAddress: "0xNewOwner",
        remarks: "Test remark",
      });
    });
  });

  describe("TransferOwnerHolderForm", () => {
    const transferOwnerHolderProps: TransferOwnerHolderFormProps = {
      ...baseProps,
      beneficiary: baseProps.holder,
      holder: baseProps.holder,
      type: AssetManagementActions.TransferOwnerHolder,
      handleEndorseTransfer: jest.fn(),
      transferOwnersState: FormState.UNINITIALIZED,
    };

    it("should render the form with editable owner and holder fields", () => {
      const { getByText, getByTestId } = render(<ActionForm {...transferOwnerHolderProps} />);

      const ownerField = getByTestId("editable-input-owner");
      const holderField = getByTestId("editable-input-holder");
      expect(ownerField).toHaveValue(transferOwnerHolderProps.beneficiary);
      expect(holderField).toHaveValue(transferOwnerHolderProps.holder);
      expect(getByText("Owner:")).toBeInTheDocument();
      expect(getByText("Holder:")).toBeInTheDocument();
      expect(getByTestId("endorseTransferBtn")).toBeInTheDocument();
    });

    it("should call handleEndorseTransfer when transfer button is clicked", () => {
      (chainUtils.encryptRemark as jest.Mock).mockReturnValue("encryptedRemark");

      const mockHandleEndorseTransfer = jest.fn();
      const { getByTestId } = render(
        <ActionForm {...transferOwnerHolderProps} handleEndorseTransfer={mockHandleEndorseTransfer} />
      );

      const newOwnerInput = getByTestId("editable-input-owner");
      fireEvent.change(newOwnerInput, { target: { value: "0xNewOwner" } });

      const newHolderInput = getByTestId("editable-input-holder");
      fireEvent.change(newHolderInput, { target: { value: "0xNewHolder" } });

      const remarkInput = getByTestId("editable-input-remark");
      fireEvent.change(remarkInput, { target: { value: "Test remark" } });

      const transferButton = getByTestId("endorseTransferBtn");
      fireEvent.click(transferButton);

      expect(mockHandleEndorseTransfer).toHaveBeenCalledWith({
        newBeneficiaryAddress: "0xNewOwner",
        newHolderAddress: "0xNewHolder",
        remarks: "Test remark",
      });
    });

    it("should disable nominate button when holder/owner is empty", async () => {
      await act(async () => {
        const container = render(<ActionForm {...transferOwnerHolderProps} />);

        fireEvent.click(container.getByTestId("endorseTransferBtn"));
        expect(transferOwnerHolderProps.handleEndorseTransfer).not.toHaveBeenCalled();
      });
    });

    it("should fire the function to handle endorse transfer when 'endorse' button is clicked", async () => {
      await act(async () => {
        const container = render(<ActionForm {...transferOwnerHolderProps} />);

        const holderField = container.getByTestId("editable-input-holder");
        const ownerField = container.getByTestId("editable-input-owner");
        expect(holderField).toHaveValue(transferOwnerHolderProps.holder);
        expect(ownerField).toHaveValue(transferOwnerHolderProps.beneficiary);
        await fireEvent.change(holderField, { target: { value: "0xc0F28621Ca5454B66E51786003c798154FeBc6EB" } });
        await fireEvent.change(ownerField, { target: { value: "0xc0F28621Ca5454B66E51786003c798154FeBc6EB" } });
        expect(holderField).toHaveValue("0xc0F28621Ca5454B66E51786003c798154FeBc6EB");
        expect(ownerField).toHaveValue("0xc0F28621Ca5454B66E51786003c798154FeBc6EB");
        await fireEvent.click(container.getByTestId("endorseTransferBtn"));
        expect(transferOwnerHolderProps.handleEndorseTransfer).toBeCalled();
        expect(transferOwnerHolderProps.handleEndorseTransfer).toHaveBeenCalledWith({
          newBeneficiaryAddress: "0xc0F28621Ca5454B66E51786003c798154FeBc6EB",
          newHolderAddress: "0xc0F28621Ca5454B66E51786003c798154FeBc6EB",
          remarks: "",
        });
      });
    });
  });

  describe("EndorseBeneficiary Form", () => {
    const endorseBeneficiaryProps: EndorseBeneficiaryProps = {
      ...baseProps,
      type: AssetManagementActions.EndorseBeneficiary,
      nominee: "0xNominee",
      handleBeneficiaryTransfer: jest.fn(),
      beneficiaryEndorseState: FormState.UNINITIALIZED,
    };

    it("should render the form with nominee field", () => {
      const { getByText, getByTestId } = render(<ActionForm {...endorseBeneficiaryProps} />);

      const nomineeComponent = getByTestId("non-editable-input-nominee");
      const holderComponent = getByTestId("non-editable-input-holder");

      expect(nomineeComponent).not.toBeNull();
      expect(holderComponent).not.toBeNull();

      expect(getByText("Nominee:")).toBeInTheDocument();
      expect(getByText("0xNominee")).toBeInTheDocument();
      expect(getByTestId("cancelEndorseBtn")).toBeInTheDocument();
      expect(getByTestId("endorseBtn")).toBeInTheDocument();
    });

    it("should call handleBeneficiaryTransfer when endorse button is clicked", () => {
      (chainUtils.encryptRemark as jest.Mock).mockReturnValue("encryptedRemark");

      const mockHandleBeneficiaryTransfer = jest.fn();
      const { getByTestId } = render(
        <ActionForm {...endorseBeneficiaryProps} handleBeneficiaryTransfer={mockHandleBeneficiaryTransfer} />
      );

      const remarkInput = getByTestId("editable-input-remark");
      fireEvent.change(remarkInput, { target: { value: "Test remark" } });

      const endorseButton = getByTestId("endorseBtn");
      fireEvent.click(endorseButton);

      expect(mockHandleBeneficiaryTransfer).toHaveBeenCalledWith({
        newBeneficiaryAddress: "0xNominee",
        remarks: "Test remark",
      });
    });

    it("should change the state of the application to None when we clicked on Cancel", async () => {
      await act(async () => {
        const mockOnSetFormAction = jest.fn();

        const container = render(
          <ActionForm
            {...endorseBeneficiaryProps}
            setFormActionNone={mockOnSetFormAction}
            beneficiaryEndorseState={FormState.UNINITIALIZED}
          />
        );

        fireEvent.click(container.getByTestId("cancelEndorseBtn"));
        expect(mockOnSetFormAction).toHaveBeenCalled();
      });
    });

    it("should disable endorse button when nominee is empty", async () => {
      await act(async () => {
        const mockHandleEndorse = jest.fn();

        const container = render(
          <ActionForm
            {...endorseBeneficiaryProps}
            nominee=""
            handleBeneficiaryTransfer={mockHandleEndorse}
            beneficiaryEndorseState={FormState.UNINITIALIZED}
          />
        );

        fireEvent.click(container.getByTestId("endorseBtn"));
        expect(mockHandleEndorse).not.toHaveBeenCalled();
      });
    });

    it("should show error when changeBeneficiary return error endorseBeneficiaryState", async () => {
      await act(async () => {
        const { getAllByText } = render(
          <ActionForm {...endorseBeneficiaryProps} beneficiaryEndorseState={FormState.ERROR} />
        );

        expect(getAllByText("Unidentified address. Please check and input again.", { exact: false })).not.toBeNull();
      });
    });
  });
});
