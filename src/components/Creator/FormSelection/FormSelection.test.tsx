import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { OverlayContextProvider } from "../../../common/contexts/OverlayContext";
import { FormTypes } from "../types";
import { FormSelection } from "./FormSelection";
import { Overlay } from "../../UI/Overlay";

jest.mock("react-feather", () => ({
  ChevronDown: () => <div data-testid="chevron-down-icon" />,
  ChevronUp: () => <div data-testid="chevron-up-icon" />,
}));

jest.mock("../../DocumentSetup/DocumentSetup", () => ({
  DocumentSetup: ({ types, formName }: any) => (
    <div data-testid="document-setup">
      DocumentSetup: {formName} Types: {types.join(", ")}
    </div>
  ),
  DocumentSetupType: {
    DID_WEB: "DID_WEB",
    TOKEN_REGISTRY: "TOKEN_REGISTRY",
  },
}));

jest.mock("../../ConnectToBlockchain", () => ({
  __esModule: true,
  default: ({ nextStep }: any) => (
    <div data-testid="connect-to-blockchain-model">ConnectToBlockchainModel NextStep: {nextStep}</div>
  ),
}));

const mockFormTypes: FormTypes[] = ["Transferable", "Non-Transferable"];

const renderFormSelection = (propsOverride = {}) => {
  const defaultProps = {
    formTypes: mockFormTypes,
    forms: [
      { type: "Transferable", name: "EBL" },
      { type: "Non-Transferable", name: "COO" },
    ],
  };

  return render(
    <OverlayContextProvider>
      <FormSelection {...defaultProps} {...propsOverride} />
      <div id="overlay">
        <Overlay />
      </div>
    </OverlayContextProvider>
  );
};

describe("FormSelection component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    // mockShowOverlaySpy.mockRestore(); // Clear the spy for each test
  });

  it("renders title and instructions", () => {
    renderFormSelection();
    expect(screen.getByTestId("form-selection-title")).toHaveTextContent("Select documents to preview or create.");
  });

  it("renders each form group and its forms", () => {
    renderFormSelection();
    expect(screen.getByText("Transferable Documents")).toBeInTheDocument();
    expect(screen.getByText("Non-Transferable Documents")).toBeInTheDocument();

    const transferableScreen = screen.getByTestId("forms-view-Transferable");
    const nonTransferableScreen = screen.getByTestId("forms-view-Non-Transferable");

    expect(transferableScreen).toBeInTheDocument();
    expect(nonTransferableScreen).toBeInTheDocument();

    expect(transferableScreen.querySelector("[data-testid='form-select-0']")).toHaveTextContent("EBL");
    expect(nonTransferableScreen.querySelector("[data-testid='form-select-0']")).toHaveTextContent("COO");
  });

  describe("Expand/Collapse functionality", () => {
    it("should toggle section visibility and chevron icon on click", () => {
      renderFormSelection();
      const transferableToggle = screen.getByTestId("toggle-expand-Transferable");
      const transferableFormsView = screen.getByTestId("forms-view-Transferable");

      // Initially expanded
      expect(transferableFormsView).toHaveClass("visible max-h-fit opacity-100");
      expect(within(transferableToggle).getByTestId("chevron-up-icon")).toBeInTheDocument();

      // Collapse
      fireEvent.click(transferableToggle);
      expect(transferableFormsView).toHaveClass("collapse max-h-0 opacity-0");
      expect(within(transferableToggle).getByTestId("chevron-down-icon")).toBeInTheDocument();
      expect(within(transferableToggle).queryByTestId("chevron-up-icon")).not.toBeInTheDocument();

      // Expand again
      fireEvent.click(transferableToggle);
      expect(transferableFormsView).toHaveClass("visible max-h-fit opacity-100");
      expect(within(transferableToggle).getByTestId("chevron-up-icon")).toBeInTheDocument();
      expect(within(transferableToggle).queryByTestId("chevron-down-icon")).not.toBeInTheDocument();
    });
  });

  describe("Create Document functionality", () => {
    it("calls showOverlay with ExpandPreview for Transferable documents, then ConnectToBlockchainModel", async () => {
      renderFormSelection();

      const transferableScreen = screen.getByTestId("forms-view-Transferable");
      const eblFormButton = transferableScreen.querySelector("[data-testid='form-select-0']");
      expect(eblFormButton).toBeInTheDocument();
      if (eblFormButton) {
        fireEvent.click(eblFormButton);
      }

      // Wait for ExpandPreview to appear
      const expandPreviewModal = await screen.findByTestId("expand-preview");
      expect(expandPreviewModal).toBeInTheDocument();

      // Click the 'Create Document' button within ExpandPreview
      const createButtonInPreview = within(expandPreviewModal).getByTestId("expandPreviewCreateDocument");
      fireEvent.click(createButtonInPreview);

      // Now, ConnectToBlockchainModel should appear, which then renders DocumentSetup
      const connectToBlockchainModal = await screen.findByTestId("connect-to-blockchain-model");
      expect(connectToBlockchainModal).toBeInTheDocument();
      expect(within(connectToBlockchainModal).getByTestId("document-setup")).toHaveTextContent(
        "DocumentSetup: EBL Types: DID_WEB, TOKEN_REGISTRY"
      );
    });

    it("calls showOverlay with ExpandPreview for Non-Transferable documents, then DocumentSetup", async () => {
      renderFormSelection();
      const nonTransferableScreen = screen.getByTestId("forms-view-Non-Transferable");
      const cooFormButton = nonTransferableScreen.querySelector("[data-testid='form-select-0']");
      expect(cooFormButton).toBeInTheDocument();
      if (cooFormButton) {
        fireEvent.click(cooFormButton);
      }

      // Wait for ExpandPreview to appear
      const expandPreviewModal = await screen.findByTestId("expand-preview");
      expect(expandPreviewModal).toBeInTheDocument();

      // Click the 'Create Document' button within ExpandPreview
      const createButtonInPreview = within(expandPreviewModal).getByTestId("expandPreviewCreateDocument");
      fireEvent.click(createButtonInPreview);

      // Now, DocumentSetup should appear directly
      const documentSetupModal = await screen.findByTestId("document-setup");
      expect(documentSetupModal).toBeInTheDocument();
      expect(documentSetupModal).toHaveTextContent("DocumentSetup: COO Types: DID_WEB");
    });
  });
});
