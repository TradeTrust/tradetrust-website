import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";
import { useConfigContext } from "../../../common/contexts/ConfigContext";
import { useFormsContext } from "../../../common/contexts/FormsContext";
import * as DataHelpers from "../../../common/utils/dataHelpers";
import * as Utils from "../../../utils";
import { DynamicFormLayout } from "./DynamicFormLayout";

const mockUseFormsContext = useFormsContext as jest.Mock;
const mockUseConfigContext = useConfigContext as jest.Mock;
const mockSetForms = jest.fn();
const mockSetCurrentFormData = jest.fn();
const mockSetCurrentForm = jest.fn();
const mockSetCurrentFormOwnership = jest.fn();
const mockSetCurrentFormRemarks = jest.fn();
const mockSetConfig = jest.fn();

jest.mock("../../../common/contexts/FormsContext");
jest.mock("../../../common/contexts/ConfigContext");

// Mock the useHistory hook
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock("../../../common/utils/dataHelpers", () => {
  const original = jest.requireActual("../../../common/utils/dataHelpers");
  return {
    ...original,
    validateData: jest.fn(),
  };
});

const baseCurrentFormTemplate = {
  name: "COO",
  type: "VERIFIABLE_DOCUMENT",
  defaults: {},
  schema: {
    type: "object",
    properties: {
      foo: { type: "string", title: "Foo Field" },
      bar: { type: "string" },
    },
  },
};

const baseCurrentForm = {
  fileName: "document-1",
  data: { formData: {} },
  ownership: { holderAddress: "0xValidHolder", beneficiaryAddress: "0xValidBeneficiary" },
  remarks: "Initial remarks",
};

interface FormContextOverrides {
  currentForm?: Partial<typeof baseCurrentForm> | any;
  currentFormTemplate?: Partial<typeof baseCurrentFormTemplate>;
}

const whenActiveFormIsAvailable = (overrides: FormContextOverrides = {}) => {
  mockUseFormsContext.mockReturnValue({
    setForm: mockSetForms,
    setCurrentFormData: mockSetCurrentFormData,
    setCurrentForm: mockSetCurrentForm,
    setCurrentFormOwnership: mockSetCurrentFormOwnership,
    setCurrentFormRemarks: mockSetCurrentFormRemarks,
    currentForm: { ...baseCurrentForm, ...(overrides.currentForm || {}) },
    currentFormTemplate: { ...baseCurrentFormTemplate, ...(overrides.currentFormTemplate || {}) },
  });
  mockUseConfigContext.mockReturnValue({
    setConfig: mockSetConfig,
    config: { forms: { attachments: { allow: false } } },
  });
};

const whenIsTransferableRecord = (overrides: FormContextOverrides = {}) => {
  whenActiveFormIsAvailable({
    ...overrides,
    currentFormTemplate: {
      type: "TRANSFERABLE_RECORD",
      name: "Bill of Lading",
      ...(overrides.currentFormTemplate || {}),
    },
  });
};

describe("dynamicFormLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // jest.restoreAllMocks(); // This can conflict with module-level mocks
    // mockValidateData.mockImplementation(validateData);
  });

  describe("should display", () => {
    it("should render the progress bar", () => {
      whenActiveFormIsAvailable();
      render(
        <MemoryRouter>
          <DynamicFormLayout />
        </MemoryRouter>
      );
      expect(screen.getByTestId("progress-bar")).not.toBeNull();
    });

    it("should render the cancel button", () => {
      whenActiveFormIsAvailable();
      render(
        <MemoryRouter>
          <DynamicFormLayout />
        </MemoryRouter>
      );
      expect(screen.getByTestId("form-previous-button")).not.toBeNull();
    });

    it("should render the next button", () => {
      whenActiveFormIsAvailable();
      render(
        <MemoryRouter>
          <DynamicFormLayout />
        </MemoryRouter>
      );
      expect(screen.getByTestId("form-next-button")).not.toBeNull();
    });

    it("should render the active form", () => {
      whenActiveFormIsAvailable();
      render(
        <MemoryRouter>
          <DynamicFormLayout />
        </MemoryRouter>
      );
      expect(screen.getByLabelText("Foo Field")).not.toBeUndefined();
    });

    it("should display the modal when cancel button is clicked", () => {
      whenActiveFormIsAvailable();
      render(
        <MemoryRouter>
          <DynamicFormLayout />
        </MemoryRouter>
      );

      fireEvent.click(screen.getByTestId("form-previous-button"));
      expect(screen.getByTestId("modal-title")).not.toBeNull();
    });

    it("should show the TransferableRecordForm when a form is a transferable record", () => {
      whenIsTransferableRecord();
      render(
        <MemoryRouter>
          <DynamicFormLayout />
        </MemoryRouter>
      );
      expect(screen.getByTestId("asset-record-form")).not.toBeNull();
      expect(screen.queryAllByText("Owner Wallet Address")).toHaveLength(1);
      expect(screen.queryAllByText("Holder Wallet Address")).toHaveLength(1);
    });
  });

  describe("validateCurrentForm - attachments logic", () => {
    const mockValidateData = jest.spyOn(DataHelpers, "validateData");
    const formDataWithAttachments = {
      "@context": ["https://www.example.com"],
      credentialSubject: {},
      renderMethod: "",
      foo: "bar",
      attachments: [{ type: "generic", data: "some-data", filename: "attach.txt" }],
    };

    beforeEach(() => {
      jest.clearAllMocks();
      whenActiveFormIsAvailable();

      mockValidateData.mockReturnValue({ ajvErrors: [], isValid: true });
    });

    it("should remove attachments from data if config allows but schema does not define them", async () => {
      whenActiveFormIsAvailable({
        currentForm: {
          data: { formData: formDataWithAttachments, schema: baseCurrentFormTemplate.schema },
        },
      });
      mockUseConfigContext.mockReturnValue({
        setConfig: mockSetConfig,
        config: { forms: { attachments: { allow: true } } },
      });

      render(
        <MemoryRouter>
          <DynamicFormLayout />
        </MemoryRouter>
      );

      await act(async () => {
        fireEvent.click(screen.getByTestId("form-next-button"));
      });

      expect(mockValidateData).toHaveBeenCalledWith(expect.objectContaining(baseCurrentFormTemplate.schema), {
        foo: "bar",
      });
    });

    it("should keep attachments in data if config does not allow, even if schema doesn't define them", async () => {
      whenActiveFormIsAvailable({
        currentForm: {
          data: { formData: formDataWithAttachments, schema: baseCurrentFormTemplate.schema },
        },
      });

      render(
        <MemoryRouter>
          <DynamicFormLayout />
        </MemoryRouter>
      );

      await act(async () => {
        fireEvent.click(screen.getByTestId("form-next-button"));
      });

      expect(mockValidateData).toHaveBeenCalledWith(expect.objectContaining(baseCurrentFormTemplate.schema), {
        foo: formDataWithAttachments.foo,
        attachments: formDataWithAttachments.attachments,
      });
    });
  });

  describe("FormTransferableRecordPanel interaction", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      whenIsTransferableRecord();
      mockSetCurrentFormOwnership.mockClear();
      mockSetCurrentFormRemarks.mockClear();

      render(
        <MemoryRouter>
          <DynamicFormLayout />
        </MemoryRouter>
      );
      expect(screen.getByTestId("asset-record-form")).toBeInTheDocument();
    });

    it("should call setCurrentFormOwnership when beneficiary address changes", () => {
      const beneficiaryInput = screen.getByTestId("transferable-record-beneficiary-input");
      fireEvent.change(beneficiaryInput, { target: { value: "0xNewBeneficiary" } });
      expect(mockSetCurrentFormOwnership).toHaveBeenCalledWith({
        beneficiaryAddress: "0xNewBeneficiary",
        holderAddress: baseCurrentForm.ownership.holderAddress,
      });
    });

    it("should call setCurrentFormOwnership when holder address changes", () => {
      const holderInput = screen.getByTestId("transferable-record-holder-input");
      fireEvent.change(holderInput, { target: { value: "0xNewHolder" } });
      expect(mockSetCurrentFormOwnership).toHaveBeenCalledWith({
        beneficiaryAddress: baseCurrentForm.ownership.beneficiaryAddress,
        holderAddress: "0xNewHolder",
      });
    });

    it("should call setCurrentFormRemarks when remarks change", () => {
      const remarksInput = screen.getByTestId("transferable-record-remarks-input");
      fireEvent.change(remarksInput, { target: { value: "New remarks here" } });
      expect(mockSetCurrentFormRemarks).toHaveBeenCalledWith("New remarks here");
    });
  });

  describe("BackModal interaction and onBackToFormSelection", () => {
    beforeEach(() => {
      whenActiveFormIsAvailable();
      render(
        <MemoryRouter>
          <DynamicFormLayout />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByTestId("form-previous-button"));
      expect(screen.getByTestId("modal-title")).toBeInTheDocument();
    });

    it("should hide the modal when 'Cancel' in modal is clicked", () => {
      fireEvent.click(screen.getByTestId("confirm-modal-cancel-button"));
      expect(screen.queryByTestId("modal-title")).not.toBeInTheDocument();
    });

    it("should call context clear functions and navigate when 'Confirm' in modal is clicked", () => {
      fireEvent.click(screen.getByTestId("confirm-modal-confirm-button"));
      expect(mockSetForms).toHaveBeenCalledWith(undefined);
      expect(mockSetConfig).toHaveBeenCalledWith(undefined);
    });
  });

  describe("validateCurrentForm - getAddressErrors for TRANSFERABLE_RECORD", () => {
    let isEthereumAddressSpy: jest.SpyInstance;
    const validateDataSpy = jest.spyOn(DataHelpers, "validateData");

    beforeEach(() => {
      isEthereumAddressSpy = jest.spyOn(Utils, "isEthereumAddress");
      validateDataSpy.mockReturnValue({ isValid: true, ajvErrors: [] });
    });

    afterEach(() => {
      isEthereumAddressSpy.mockRestore();
    });

    it.each([
      [
        "valid owner, valid holder",
        "0x1234567890123456789012345678901234567890",
        "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
        0,
        [],
      ],
      [
        "invalid owner, valid holder",
        "abc",
        "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
        1,
        [/Invalid Ethereum address for 'owner wallet address'/i],
      ],
      [
        "valid owner, invalid holder",
        "0x1234567890123456789012345678901234567890",
        "def",
        1,
        [/Invalid Ethereum address for 'holder wallet address'/i],
      ],
      [
        "invalid owner, invalid holder",
        "abc",
        "def",
        2,
        [
          /Invalid Ethereum address for 'owner wallet address'/i,
          /Invalid Ethereum address for 'holder wallet address'/i,
        ],
      ],
      [
        "empty owner, empty holder",
        "",
        "",
        2,
        [
          /Invalid Ethereum address for 'owner wallet address'/i,
          /Invalid Ethereum address for 'holder wallet address'/i,
        ],
      ],
    ])("%s", async (_desc, beneficiaryAddress, holderAddress, expectedErrors, expectedMessages) => {
      // Set up isEthereumAddress mock based on test case
      isEthereumAddressSpy.mockImplementation((addr: string) => {
        if (addr === beneficiaryAddress) return addr.startsWith("0x");
        if (addr === holderAddress) return addr.startsWith("0x");
        return false;
      });

      whenIsTransferableRecord({
        currentForm: {
          ownership: { beneficiaryAddress, holderAddress },
        },
      });

      render(
        <MemoryRouter>
          <DynamicFormLayout />
        </MemoryRouter>
      );

      // await act(async () => {
      fireEvent.click(screen.getByTestId("form-next-button"));
      // });

      // Wait for form errors to be displayed
      if (expectedErrors > 0) {
        // Use waitFor to ensure the error banner is in the document
        await waitFor(() => {
          expect(screen.getByTestId("form-error-banner")).toBeInTheDocument();
        });

        if (expectedMessages?.length > 1) {
          // click on Show More
          const showMoreButton = (await screen.findByText("Show More")).parentElement;
          fireEvent.click(showMoreButton!);
        }

        // Check each expected error message
        for (const msg of expectedMessages) {
          expect(await screen.findByText(msg)).toBeInTheDocument();
        }
      } else {
        expect(
          screen.queryByText("Invalid Ethereum address for 'owner wallet address'", { exact: false })
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText("Invalid Ethereum address for 'holder wallet address'", { exact: false })
        ).not.toBeInTheDocument();
      }
    });
  });
});
