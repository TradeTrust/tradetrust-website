import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";
import { SIGNER_TYPE, useProviderContext } from "../../common/contexts/provider";
import { useQueue } from "../../common/hooks/useQueue";
import { QueueState } from "../../constants/QueueState";
import { FormEntry, FormTemplate } from "../../types";
import * as utils from "../../utils";
import { ProcessDocumentScreen, getDisplayTitle } from "./ProcessDocumentScreen";
import { saveAs } from "file-saver";

// Mocks
jest.mock("../../common/contexts/provider");
jest.mock("../../common/hooks/useQueue");
jest.mock("../../utils");
jest.mock("file-saver");

jest.mock("../Creator/FormHeaderPanel/FormHeaderPanel", () => ({
  FormHeaderPanel: jest.fn(({ title, queueState, processAnotherDocumentFn, step, totalSteps }) => (
    <div data-testid="form-header-panel">
      <div data-testid="form-header-title-wrapper">{title}</div>
      <div data-testid="form-header-queue-state">{queueState}</div>
      <button data-testid="form-header-process-another" onClick={processAnotherDocumentFn}>
        Process Another
      </button>
      <div data-testid="form-header-step">{`${step}/${totalSteps}`}</div>
    </div>
  )),
}));

jest.mock("./ProcessDocumentContent", () => ({
  ProcessDocumentContent: jest.fn(
    ({ queueState, document, fileName, extension, downloadErrorName, downloadErrorLink, downloadAllFn }) => (
      <div data-testid="process-document-content">
        <div>Queue State: {queueState}</div>
        {document && <div data-testid="document-data">{JSON.stringify(document)}</div>}
        <div>File Name: {fileName}</div>
        <div>Extension: {extension}</div>
        <div>Error Name: {downloadErrorName}</div>
        <a href={downloadErrorLink} data-testid="error-link">
          Download Error
        </a>
        <button data-testid="download-all-button" onClick={downloadAllFn}>
          Download All
        </button>
      </div>
    )
  ),
}));

const mockUseProviderContext = useProviderContext as jest.Mock;
const mockUseQueue = useQueue as jest.Mock;
const mockGenerateFileName = utils.generateFileName as jest.Mock;
const mockSaveAs = saveAs as unknown as jest.Mock;

const mockProcessDocument = jest.fn();
const mockOnDocumentReady = jest.fn();
const mockProcessAnotherDocument = jest.fn();

const baseFormEntry: FormEntry = {
  fileName: "test-document",
  data: { formData: { foo: "bar" } },
  extension: "tt",
  ownership: { holderAddress: "0xHolder", beneficiaryAddress: "0xBeneficiary" },
  remarks: "Initial remarks",
};

const baseFormTemplate: FormTemplate = {
  name: "COO",
  type: "VERIFIABLE_DOCUMENT",
  defaults: {},
  schema: { type: "object", properties: { foo: { type: "string" } } },
};

describe("getDisplayTitle", () => {
  it("should return 'Issuing Document...' for PENDING state with LoaderSpinner", () => {
    const titleElement = getDisplayTitle(QueueState.PENDING, undefined);
    render(titleElement);
    expect(screen.getByTestId("process-title")).toHaveTextContent("Issuing Document...");
    expect(document.querySelector(".animate-spin")).toBeInTheDocument(); // Check for LoaderSpinner presence
    expect(screen.queryByText("Please confirm the transaction on MetaMask")).not.toBeInTheDocument();
  });

  it("should return 'Issuing Document...' and MetaMask message for PENDING state with SIGNER_TYPE.METAMASK", () => {
    const titleElement = getDisplayTitle(QueueState.PENDING, SIGNER_TYPE.METAMASK);
    render(titleElement);
    expect(screen.getByTestId("process-title")).toHaveTextContent("Issuing Document...");
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
    expect(screen.getByText("Please confirm the transaction on MetaMask")).toBeInTheDocument();
  });

  it("should return 'Document issued successfully' for CONFIRMED state with CheckCircle", () => {
    const titleElement = getDisplayTitle(QueueState.CONFIRMED);
    render(titleElement);
    expect(screen.getByTestId("process-title")).toHaveTextContent("Document issued successfully");
    expect(document.querySelector("svg.text-forest-500")).toBeInTheDocument(); // Check for CheckCircle presence
  });

  it("should return 'Document failed to issue' for ERROR state with XCircle", () => {
    const titleElement = getDisplayTitle(QueueState.ERROR);
    render(titleElement);
    expect(screen.getByTestId("process-title")).toHaveTextContent("Document failed to issue");
    expect(document.querySelector("svg.text-scarlet-500")).toBeInTheDocument(); // Check for XCircle presence
  });

  it("should return 'Please wait while we prepare your document' for INITIALIZED state", () => {
    const titleElement = getDisplayTitle(QueueState.INITIALIZED);
    render(titleElement);
    expect(screen.getByTestId("process-title")).toHaveTextContent("Please wait while we prepare your document");
  });

  it("should return 'Please wait while we prepare your document' for undefined state", () => {
    const titleElement = getDisplayTitle(undefined);
    render(titleElement);
    expect(screen.getByTestId("process-title")).toHaveTextContent("Please wait while we prepare your document");
  });
});

// Placeholder for ProcessDocumentScreen tests
describe("ProcessDocumentScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock for useProviderContext, can be overridden in specific tests
    mockUseProviderContext.mockReturnValue({
      providerType: undefined,
      setProviderType: jest.fn(),
      currentChainId: 1,
    });
    mockUseQueue.mockReturnValue({
      processDocument: mockProcessDocument,
      queueState: QueueState.INITIALIZED,
      document: null,
      error: null,
    });
    mockGenerateFileName.mockImplementation(({ fileName, extension }) => `${fileName}.${extension}`);
  });

  const renderComponent = (formProps = {}, templateProps = {}) => {
    return render(
      <MemoryRouter>
        <ProcessDocumentScreen
          processAnotherDocument={mockProcessAnotherDocument}
          form={{ ...baseFormEntry, ...formProps }}
          formTemplate={{ ...baseFormTemplate, ...templateProps }}
          onDocumentReady={mockOnDocumentReady}
        />
      </MemoryRouter>
    );
  };

  it("should call processDocument on initial render", () => {
    renderComponent();
    expect(mockProcessDocument).toHaveBeenCalledTimes(1);
  });

  it("should call onDocumentReady when document is available", () => {
    const mockDocument = { id: "test-doc" };
    mockUseQueue.mockReturnValueOnce({
      processDocument: mockProcessDocument,
      queueState: QueueState.INITIALIZED,
      document: null,
      error: null,
    });
    const { rerender } = renderComponent();

    expect(mockOnDocumentReady).not.toHaveBeenCalled();

    mockUseQueue.mockReturnValueOnce({
      processDocument: mockProcessDocument,
      queueState: QueueState.CONFIRMED, // Or any state where document might be present
      document: mockDocument,
      error: null,
    });

    // Rerender with new context value. We need to ensure the useEffect in ProcessDocumentScreen runs.
    // This typically happens when the hook's state updates, causing the component to rerender.
    // Forcing a rerender here simulates that.
    rerender(
      <MemoryRouter>
        <ProcessDocumentScreen
          processAnotherDocument={mockProcessAnotherDocument}
          form={baseFormEntry}
          formTemplate={baseFormTemplate}
          onDocumentReady={mockOnDocumentReady}
        />
      </MemoryRouter>
    );
    expect(mockOnDocumentReady).toHaveBeenCalledWith(mockDocument);
    expect(mockOnDocumentReady).toHaveBeenCalledTimes(1);
  });

  describe("QueueState - INITIALIZED", () => {
    it("should render correctly for INITIALIZED state", () => {
      mockUseQueue.mockReturnValue({
        processDocument: mockProcessDocument,
        queueState: QueueState.INITIALIZED,
        document: null,
        error: null,
      });
      renderComponent();

      expect(screen.getByTestId("form-header-title-wrapper").textContent).toContain(
        "Please wait while we prepare your document"
      );
      expect(screen.getByTestId("form-header-queue-state")).toHaveTextContent(QueueState.INITIALIZED);
      expect(screen.queryByTestId("process-document-content")).not.toBeInTheDocument();
    });
  });

  describe("QueueState - PENDING", () => {
    it("should render correctly for PENDING state (API provider)", () => {
      mockUseQueue.mockReturnValue({
        processDocument: mockProcessDocument,
        queueState: QueueState.PENDING,
        document: null,
        error: null,
      });
      renderComponent();

      expect(screen.getByTestId("form-header-title-wrapper").textContent).toContain("Issuing Document...");
      expect(screen.getByTestId("form-header-queue-state")).toHaveTextContent(QueueState.PENDING);
      expect(screen.getByTestId("process-document-content")).toBeInTheDocument();
      expect(screen.getByTestId("process-document-content")).toHaveTextContent(`Queue State: ${QueueState.PENDING}`);
    });

    it("should render correctly for PENDING state (MetaMask provider)", () => {
      mockUseProviderContext.mockReturnValue({
        providerType: SIGNER_TYPE.METAMASK,
        setProviderType: jest.fn(),
        currentChainId: 1,
      });
      mockUseQueue.mockReturnValue({
        processDocument: mockProcessDocument,
        queueState: QueueState.PENDING,
        document: null,
        error: null,
      });
      renderComponent();

      expect(screen.getByTestId("form-header-title-wrapper").textContent).toContain("Issuing Document...");
      // MetaMask specific message is part of the title component, tested in getDisplayTitle tests
      expect(screen.getByTestId("form-header-queue-state")).toHaveTextContent(QueueState.PENDING);
      expect(screen.getByTestId("process-document-content")).toBeInTheDocument();
    });
  });

  describe("QueueState - CONFIRMED", () => {
    it("should render correctly for CONFIRMED state", () => {
      const mockDocument = { data: "finalized document" };
      mockUseQueue.mockReturnValue({
        processDocument: mockProcessDocument,
        queueState: QueueState.CONFIRMED,
        document: mockDocument,
        error: null,
      });
      renderComponent();

      expect(screen.getByTestId("form-header-title-wrapper").textContent).toContain("Document issued successfully");
      expect(screen.getByTestId("form-header-queue-state")).toHaveTextContent(QueueState.CONFIRMED);
      expect(screen.getByTestId("process-document-content")).toBeInTheDocument();
      expect(screen.getByTestId("process-document-content")).toHaveTextContent(`Queue State: ${QueueState.CONFIRMED}`);
      expect(screen.getByTestId("document-data")).toHaveTextContent(JSON.stringify(mockDocument));
      expect(screen.getByTestId("process-document-content")).toHaveTextContent(`File Name: ${baseFormEntry.fileName}`);
      expect(screen.getByTestId("process-document-content")).toHaveTextContent(`Extension: ${baseFormEntry.extension}`);
    });
  });

  describe("QueueState - ERROR", () => {
    it("should render correctly for ERROR state", () => {
      const mockError = { message: "Test error" };
      mockUseQueue.mockReturnValue({
        processDocument: mockProcessDocument,
        queueState: QueueState.ERROR,
        document: null,
        error: mockError,
      });
      mockGenerateFileName.mockReturnValueOnce("error-log.txt"); // For downloadErrorName

      renderComponent();

      expect(screen.getByTestId("form-header-title-wrapper").textContent).toContain("Document failed to issue");
      expect(screen.getByTestId("form-header-queue-state")).toHaveTextContent(QueueState.ERROR);
      expect(screen.getByTestId("process-document-content")).toBeInTheDocument();
      expect(screen.getByTestId("process-document-content")).toHaveTextContent(`Queue State: ${QueueState.ERROR}`);
      expect(screen.getByTestId("process-document-content")).toHaveTextContent("Error Name: error-log.txt");
      expect(screen.getByTestId("error-link")).toHaveAttribute(
        "href",
        `data:text/plain;charset=UTF-8,${JSON.stringify(mockError, null, 2)}`
      );
    });
  });

  it("should call processAnotherDocument when the button in FormHeaderPanel is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("form-header-process-another"));
    expect(mockProcessAnotherDocument).toHaveBeenCalledTimes(1);
  });

  it("should call saveAs with correct parameters when downloadAllFn is invoked", () => {
    const mockDocument = { content: "final document data" };
    mockUseQueue.mockReturnValue({
      processDocument: mockProcessDocument,
      queueState: QueueState.CONFIRMED,
      document: mockDocument,
      error: null,
    });
    mockGenerateFileName.mockImplementation(({ fileName, extension }) => {
      if (fileName === "error-log") return "error-log.txt";
      return `${fileName}.${extension}`;
    });

    renderComponent({ fileName: "my-doc", extension: "json" });

    const downloadButton = screen.getByTestId("download-all-button");
    fireEvent.click(downloadButton);

    expect(mockSaveAs).toHaveBeenCalledTimes(1);
    const expectedFileName = "my-doc.json";
    expect(mockGenerateFileName).toHaveBeenCalledWith({ fileName: "my-doc", extension: "json" });

    const blob = mockSaveAs.mock.calls[0][0];
    const fileName = mockSaveAs.mock.calls[0][1];

    expect(fileName).toBe(expectedFileName);
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe("application/json;charset=utf-8");

    // To check blob content, we need to read it, which is async
    // This is a simplified check. For full verification, you might need a FileReader mock or similar.
    // For now, we trust that the JSON.stringify and Blob constructor work as expected.
  });

  it("should not call saveAs if document is null when downloadAllFn is invoked", () => {
    mockUseQueue.mockReturnValue({
      processDocument: mockProcessDocument,
      queueState: QueueState.CONFIRMED, // Or any state where download might be attempted
      document: null, // Crucially, document is null
      error: null,
    });

    renderComponent();

    const downloadButton = screen.getByTestId("download-all-button");
    fireEvent.click(downloadButton);

    expect(mockSaveAs).not.toHaveBeenCalled();
  });

  it("should correctly render NetworkPanel when form is a TRANSFERABLE_RECORD", () => {
    // Ensure useProviderContext returns a chainId for NetworkPanel to use
    mockUseProviderContext.mockReturnValue({ providerType: undefined, setProviderType: jest.fn(), currentChainId: 1 });
    renderComponent({}, { type: "TRANSFERABLE_RECORD" });
    expect(screen.getByTestId("selected-network")).toBeInTheDocument();
    // Assuming chainId 1 is Ethereum Mainnet, as per getChainInfo utility
    expect(screen.getByTestId("selected-network")).toHaveTextContent("Ethereum Network");
  });

  it("should correctly render NetworkPanel (i.e., render null) when form is a VERIFIABLE_DOCUMENT", () => {
    renderComponent({}, { type: "VERIFIABLE_DOCUMENT" });
    // NetworkPanel returns null when isTransferableRecord is false
    expect(screen.queryByTestId("selected-network")).not.toBeInTheDocument();
  });
});
