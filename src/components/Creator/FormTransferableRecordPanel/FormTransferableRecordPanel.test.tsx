import { fireEvent, render, screen, act, within } from "@testing-library/react";
import React from "react";
import { FormTransferableRecordPanel } from "./FormTransferableRecordPanel";
import { OverlayAddressBook } from "../../AddressBook"; // Added for type checking in tests

const testAddress = "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638";
const testFileName = "Test-File.tt";
const testRemarks = "Test remarks";

// Mock useIdentifierResolver to return "Organisation X"
jest.mock("@govtechsg/address-identity-resolver", () => ({
  useIdentifierResolver: (address: string) => {
    if (address === testAddress) {
      return { identityName: "Organisation A", identityResolvedBy: "MOCK", identitySource: address };
    }
    return { identityName: "", identityResolvedBy: "MOCK", identitySource: address };
  },
}));

// Mock the OverlayContext to avoid errors
const mockShowOverlay = jest.fn(); // Defined here to be accessible in tests
jest.mock("../../../common/contexts/OverlayContext", () => ({
  useOverlayContext: () => ({
    showOverlay: mockShowOverlay,
    hideOverlay: jest.fn(),
    overlayContent: null,
  }),
  OverlayContextProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("FormTransferableRecordPanel", () => {
  beforeEach(() => {
    mockShowOverlay.mockClear(); // Clear mock before each test
  });

  describe("Edit Mode", () => {
    it("should display edit mode UI elements correctly", () => {
      render(
        <FormTransferableRecordPanel
          mode="edit"
          beneficiaryAddress=""
          holderAddress=""
          setBeneficiaryAddress={() => {}}
          setHolderAddress={() => {}}
          remarks=""
          setRemarks={() => {}}
        />
      );

      expect(screen.queryAllByText("Owner Wallet Address")).toHaveLength(1);
      expect(screen.queryAllByTestId("transferable-record-beneficiary-input")).not.toBeNull();
      expect(screen.queryAllByText("Holder Wallet Address")).toHaveLength(1);
      expect(screen.queryAllByTestId("transferable-record-holder-input")).not.toBeNull();
      expect(screen.queryAllByText("Remarks")).toHaveLength(1);
      expect(screen.queryAllByTestId("transferable-record-remarks-input")).not.toBeNull();
      expect(screen.getByText("Wallet Addresses")).toBeInTheDocument();
    });

    it("should fire 'setBeneficiaryAddress' onChange", () => {
      const mockSetBeneficiaryAddress = jest.fn();
      render(
        <FormTransferableRecordPanel
          mode="edit"
          beneficiaryAddress=""
          holderAddress=""
          setBeneficiaryAddress={mockSetBeneficiaryAddress}
          setHolderAddress={() => {}}
          remarks=""
          setRemarks={() => {}}
        />
      );

      fireEvent.change(screen.getByTestId("transferable-record-beneficiary-input"), {
        target: { value: "0x123456789" },
      });
      expect(mockSetBeneficiaryAddress).toHaveBeenCalledTimes(1);
      expect(mockSetBeneficiaryAddress).toHaveBeenCalledWith("0x123456789");
    });

    it("should fire 'setHolderAddress' onChange", () => {
      const mockSetHolderAddress = jest.fn();
      render(
        <FormTransferableRecordPanel
          mode="edit"
          beneficiaryAddress=""
          holderAddress=""
          setBeneficiaryAddress={() => {}}
          setHolderAddress={mockSetHolderAddress}
          remarks=""
          setRemarks={() => {}}
        />
      );

      fireEvent.change(screen.getByTestId("transferable-record-holder-input"), {
        target: { value: "0x987654321" },
      });
      expect(mockSetHolderAddress).toHaveBeenCalledTimes(1);
      expect(mockSetHolderAddress).toHaveBeenCalledWith("0x987654321");
    });

    it("should fire 'setRemarks' onChange", () => {
      const mockSetRemarks = jest.fn();
      render(
        <FormTransferableRecordPanel
          mode="edit"
          beneficiaryAddress=""
          holderAddress=""
          setBeneficiaryAddress={() => {}}
          setHolderAddress={() => {}}
          remarks=""
          setRemarks={mockSetRemarks}
        />
      );

      fireEvent.change(screen.getByTestId("transferable-record-remarks-input"), {
        target: { value: "Test remarks" },
      });
      expect(mockSetRemarks).toHaveBeenCalledTimes(1);
      expect(mockSetRemarks).toHaveBeenCalledWith("Test remarks");
    });

    it("should call showOverlay when beneficiary address book icon is clicked and update address on selection", () => {
      const mockSetBeneficiaryAddress = jest.fn();
      render(
        <FormTransferableRecordPanel
          mode="edit"
          beneficiaryAddress=""
          holderAddress=""
          setBeneficiaryAddress={mockSetBeneficiaryAddress}
          setHolderAddress={() => {}}
          remarks=""
          setRemarks={() => {}}
        />
      );

      const beneficiaryInput = screen.getByTestId("transferable-record-beneficiary-input");
      const beneficiaryBookButton = beneficiaryInput.nextElementSibling as HTMLElement;
      expect(beneficiaryBookButton).toBeInTheDocument();
      fireEvent.click(beneficiaryBookButton);

      expect(mockShowOverlay).toHaveBeenCalledTimes(1);
      const overlayArg = mockShowOverlay.mock.calls[0][0];
      expect(overlayArg.type).toBe(OverlayAddressBook);
      expect(overlayArg.props.network).toBe("amoy"); // Check default network

      const selectedAddress = "0xSelectedBeneficiary";
      act(() => {
        overlayArg.props.onAddressSelected(selectedAddress);
      });
      expect(mockSetBeneficiaryAddress).toHaveBeenCalledWith(selectedAddress);
    });

    it("should call showOverlay when holder address book icon is clicked and update address on selection", () => {
      const mockSetHolderAddress = jest.fn();
      render(
        <FormTransferableRecordPanel
          mode="edit"
          beneficiaryAddress=""
          holderAddress=""
          setBeneficiaryAddress={() => {}}
          setHolderAddress={mockSetHolderAddress}
          remarks=""
          setRemarks={() => {}}
        />
      );

      const holderInput = screen.getByTestId("transferable-record-holder-input");
      const holderBookButton = holderInput.nextElementSibling as HTMLElement;
      expect(holderBookButton).toBeInTheDocument();
      fireEvent.click(holderBookButton);

      expect(mockShowOverlay).toHaveBeenCalledTimes(1);
      const overlayArg = mockShowOverlay.mock.calls[0][0];
      expect(overlayArg.type).toBe(OverlayAddressBook);
      expect(overlayArg.props.network).toBe("amoy"); // Check default network

      const selectedAddress = "0xSelectedHolder";
      act(() => {
        overlayArg.props.onAddressSelected(selectedAddress);
      });
      expect(mockSetHolderAddress).toHaveBeenCalledWith(selectedAddress);
    });

    it("should pass provided network to OverlayAddressBook via onOverlayHandler", () => {
      const mockSetBeneficiaryAddress = jest.fn();
      const customNetwork = "sepolia";
      render(
        <FormTransferableRecordPanel
          mode="edit"
          beneficiaryAddress=""
          holderAddress=""
          setBeneficiaryAddress={mockSetBeneficiaryAddress}
          setHolderAddress={() => {}}
          remarks=""
          setRemarks={() => {}}
          network={customNetwork} // Provide custom network
        />
      );

      const beneficiaryInput = screen.getByTestId("transferable-record-beneficiary-input");
      const beneficiaryBookButton = beneficiaryInput.nextElementSibling as HTMLElement;
      fireEvent.click(beneficiaryBookButton);

      expect(mockShowOverlay).toHaveBeenCalledTimes(1);
      const overlayArg = mockShowOverlay.mock.calls[0][0];
      expect(overlayArg.type).toBe(OverlayAddressBook);
      expect(overlayArg.props.network).toBe(customNetwork); // Check custom network
    });

    it("should not render address book buttons if setter props are not provided", () => {
      render(
        <FormTransferableRecordPanel
          mode="edit"
          // setBeneficiaryAddress and setHolderAddress are omitted
        />
      );

      const beneficiaryInput = screen.getByTestId("transferable-record-beneficiary-input");
      expect(beneficiaryInput.nextElementSibling).toBeNull();

      const holderInput = screen.getByTestId("transferable-record-holder-input");
      expect(holderInput.nextElementSibling).toBeNull();
    });

    it("should render with default empty values if address/remarks props are not provided", () => {
      render(<FormTransferableRecordPanel mode="edit" setBeneficiaryAddress={() => {}} setHolderAddress={() => {}} />);
      expect(screen.getByTestId("transferable-record-beneficiary-input")).toHaveValue("");
      expect(screen.getByTestId("transferable-record-holder-input")).toHaveValue("");
      expect(screen.getByTestId("transferable-record-remarks-input")).toHaveValue("");
    });

    it("should display remarks helper text", () => {
      render(<FormTransferableRecordPanel mode="edit" setBeneficiaryAddress={() => {}} setHolderAddress={() => {}} />);
      const remarksHelperTextContainer = screen.getByTestId("remarks-icon-text");
      const paragraphElement = within(remarksHelperTextContainer).getByText(
        (content, element) =>
          element?.tagName.toLowerCase() === "p" &&
          content.startsWith("Any remarks provided will be accessible in the endorsement chain")
      );
      expect(paragraphElement).toBeInTheDocument();
    });
  });

  describe("View Mode", () => {
    it("should display view mode UI elements correctly", () => {
      render(
        <FormTransferableRecordPanel
          mode="view"
          beneficiaryAddress={testAddress}
          holderAddress={testAddress}
          remarks={testRemarks}
          fileName={testFileName}
        />
      );

      // Check file name is displayed
      expect(screen.getByText(testFileName)).toBeInTheDocument();

      // Check owner and holder sections
      expect(screen.getAllByText("Owner:")).toHaveLength(1);
      expect(screen.getAllByText("Holder:")).toHaveLength(1);
      expect(screen.getAllByText("Organisation A")).toHaveLength(2);

      // Check addresses are displayed
      expect(screen.getAllByText(testAddress)).toHaveLength(2);

      // Check remarks are displayed
      expect(screen.getByText("Remarks:")).toBeInTheDocument();
      expect(screen.getByText(testRemarks)).toBeInTheDocument();
    });

    it("should show remarks section even if remarks are empty", () => {
      render(<FormTransferableRecordPanel mode="view" beneficiaryAddress="0x123" holderAddress="0x456" remarks="" />);

      // The Remarks section is always displayed, even when empty
      expect(screen.getByText("Remarks:")).toBeInTheDocument();
      // The h6 element for remarks is present but empty
      const remarksContainer = screen.getByTestId("asset-title-remarks");
      const h6Element = remarksContainer.querySelector("div.break-all > h6");
      expect(h6Element).toBeInTheDocument();
      expect(h6Element?.textContent).toBe("");
    });

    it("should display default values if optional props are not provided", () => {
      render(<FormTransferableRecordPanel mode="view" />); // Omitting fileName, addresses, remarks, network

      // Check default file name
      expect(screen.getByText("Tradetrust-bill-of-lading.tt")).toBeInTheDocument();

      // Check owner (beneficiaryAddress="")
      const ownerLink = screen.getByTestId("non-editable-input-owner");
      const ownerH6 = ownerLink.querySelector("h6");
      expect(ownerH6).toHaveTextContent("");

      // Check holder (holderAddress="")
      const holderLink = screen.getByTestId("non-editable-input-holder");
      const holderH6 = holderLink.querySelector("h6");
      expect(holderH6).toHaveTextContent("");

      // Check remarks (remarks="")
      const remarksContainer = screen.getByTestId("asset-title-remarks");
      const remarksH6 = remarksContainer.querySelector("div.break-all > h6");
      expect(remarksH6).toBeInTheDocument();
      expect(remarksH6).toHaveTextContent("");
    });
  });
});
