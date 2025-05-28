import React from "react";
import { render, screen, act } from "@testing-library/react";
import { FormPreviewComponent } from "./FormPreviewComponent";
import { TemplateProps } from "../../../types";
import { MultiTabs } from "../../DecentralisedTemplateRenderer/MultiTabs";

// Mock dependencies
const mockGetAttachments = jest.fn();
jest.mock("../../../utils/shared", () => ({
  getAttachments: (doc: any) => mockGetAttachments(doc),
}));

const mockSetSelectedTemplateTab = jest.fn();
jest.mock("../../DecentralisedTemplateRenderer/MultiTabs", () => ({
  MultiTabs: jest.fn((props) => {
    // Allow tests to trigger setSelectedTemplate by calling mockSetSelectedTemplateTab
    if (props.setSelectedTemplate) {
      mockSetSelectedTemplateTab.mockImplementation(props.setSelectedTemplate);
    }
    return <div data-testid="multitabs-mock">MultiTabs Mock</div>;
  }),
}));

jest.mock("../../TabPaneAttachments", () => ({
  TabPaneAttachments: jest.fn(() => <div data-testid="tabpaneattachments-mock">TabPaneAttachments Mock</div>),
}));

jest.mock("../../CertificateViewerErrorBoundary/CertificateViewerErrorBoundary", () => ({
  CertificateViewerErrorBoundary: jest.fn(({ children }) => <>{children}</>),
}));

let mockUpdateTemplatesCallback: (templates: TemplateProps[]) => void;
jest.mock("../../DecentralisedTemplateRenderer/DecentralisedRenderer", () => ({
  DecentralisedRendererContainer: jest.fn(({ updateTemplates }) => {
    // Store the updateTemplates callback so tests can call it
    if (updateTemplates) {
      mockUpdateTemplatesCallback = updateTemplates;
    }
    return <div data-testid="decentralisedrenderercontainer-mock">DecentralisedRendererContainer Mock</div>;
  }),
}));

const mockDocument = { id: "test-doc" } as any; // Simple mock for document

describe("FormPreviewComponent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default behavior for getAttachments
    mockGetAttachments.mockReturnValue([]); // No attachments by default
  });

  it("should render initial components and call getAttachments", () => {
    render(<FormPreviewComponent document={mockDocument} />);

    expect(mockGetAttachments).toHaveBeenCalledWith(mockDocument);
    expect(screen.getByTestId("multitabs-mock")).toBeInTheDocument();
    expect(screen.getByTestId("decentralisedrenderercontainer-mock")).toBeInTheDocument();
  });

  describe("updateTemplates callback", () => {
    const sampleTemplates: TemplateProps[] = [
      { id: "1", label: "Template 1", type: "custom-template" },
      { id: "2", label: "Template 2", type: "application/pdf" },
      { id: "3", label: "Template 3", type: "" }, // type is undefined in original, now empty string for validity
      { id: "4", label: "Template 4", type: "invalid-type" },
      { id: "5", label: "Template 5", type: "custom-template" },
    ];

    it("should filter templates and set the first valid one as selected", () => {
      render(<FormPreviewComponent document={mockDocument} />);

      // Simulate DecentralisedRendererContainer calling updateTemplates
      act(() => {
        mockUpdateTemplatesCallback(sampleTemplates);
      });

      // Check that MultiTabs received the filtered templates and correct selectedTemplate
      // The MultiTabs mock is a jest.fn(), so we can inspect its calls.
      const multiTabsMocked = MultiTabs as jest.Mock;
      expect(multiTabsMocked).toHaveBeenCalled();

      // Get the props from the last call to MultiTabs
      const lastProps = multiTabsMocked.mock.calls[multiTabsMocked.mock.calls.length - 1][0];

      expect(lastProps.templates).toEqual([
        { id: "1", label: "Template 1", type: "custom-template" },
        { id: "2", label: "Template 2", type: "application/pdf" },
        { id: "3", label: "Template 3", type: "" },
        { id: "5", label: "Template 5", type: "custom-template" },
      ]);
      expect(lastProps.selectedTemplate).toBe("1");
    });
  });

  describe("Conditional Rendering", () => {
    it("should show attachments tab and hide renderer when selectedTemplate is 'attachmentTab' and attachments exist", () => {
      mockGetAttachments.mockReturnValue([{ id: "att1", filename: "file.pdf", type: "application/pdf", data: "" }]);
      render(<FormPreviewComponent document={mockDocument} />);

      // Simulate MultiTabs setting selectedTemplate to 'attachmentTab'
      act(() => {
        mockSetSelectedTemplateTab("attachmentTab");
      });

      expect(screen.getByTestId("tabpaneattachments-mock").parentElement).toHaveClass("block");
      expect(screen.getByTestId("tabpaneattachments-mock").parentElement).not.toHaveClass("hidden");
      expect(screen.getByTestId("decentralisedrenderercontainer-mock").parentElement).toHaveClass("hidden");
      expect(screen.getByTestId("decentralisedrenderercontainer-mock").parentElement).not.toHaveClass("block");
    });

    it("should hide attachments tab and show renderer when selectedTemplate is not 'attachmentTab' and attachments exist", () => {
      mockGetAttachments.mockReturnValue([{ id: "att1", filename: "file.pdf", type: "application/pdf", data: "" }]);
      render(<FormPreviewComponent document={mockDocument} />);

      // Initial state or after selecting a different tab
      act(() => {
        // Simulate updateTemplates being called, which sets a default selectedTemplate
        mockUpdateTemplatesCallback([{ id: "tmpl1", label: "T1", type: "custom-template" }]);
      });

      expect(screen.getByTestId("tabpaneattachments-mock").parentElement).toHaveClass("hidden");
      expect(screen.getByTestId("tabpaneattachments-mock").parentElement).not.toHaveClass("block");
      expect(screen.getByTestId("decentralisedrenderercontainer-mock").parentElement).toHaveClass("block");
      expect(screen.getByTestId("decentralisedrenderercontainer-mock").parentElement).not.toHaveClass("hidden");
    });

    it("should not render TabPaneAttachments container if no attachments exist", () => {
      mockGetAttachments.mockReturnValue([]); // No attachments
      render(<FormPreviewComponent document={mockDocument} />);

      // Even if selectedTemplate was 'attachmentTab', the parent div shouldn't render
      act(() => {
        mockSetSelectedTemplateTab("attachmentTab");
      });

      expect(screen.queryByTestId("tabpaneattachments-mock")).toBeNull();
      expect(screen.getByTestId("decentralisedrenderercontainer-mock").parentElement).toHaveClass("hidden"); // Renderer should be hidden when attachmentTab is selected
    });
  });
});
