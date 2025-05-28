import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { FormHeaderPanel } from "./FormHeaderPanel";
import { MemoryRouter } from "react-router-dom";
import { QueueState } from "../../../constants/QueueState";
import { FormErrors } from "../../../types";

// Mock the useHistory hook
const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("FormHeaderPanel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render with the correct title", () => {
    render(
      <MemoryRouter>
        <FormHeaderPanel step={1} title="Test Title" />
      </MemoryRouter>
    );

    expect(screen.getByTestId("test-title-title")).toHaveTextContent("Test Title");
  });

  it("should show Cancel button on step 1", () => {
    render(
      <MemoryRouter>
        <FormHeaderPanel step={1} title="Step 1" previousLabel="Cancel" />
      </MemoryRouter>
    );

    expect(screen.getByTestId("form-previous-button")).toHaveTextContent("Cancel");
  });

  it("should show Previous button on steps other than 1", () => {
    render(
      <MemoryRouter>
        <FormHeaderPanel step={2} title="Step 2" previousLabel="Go Back" />
      </MemoryRouter>
    );

    expect(screen.getByTestId("form-previous-button")).toHaveTextContent("Go Back");
  });

  it("should navigate to the next route when Next button is clicked", () => {
    render(
      <MemoryRouter>
        <FormHeaderPanel step={1} title="Step 1" nextRoute="/next-route" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("form-next-button"));
    expect(mockHistoryPush).toHaveBeenCalledWith("/next-route");
  });

  it("should navigate to the previous route when Previous button is clicked", () => {
    render(
      <MemoryRouter>
        <FormHeaderPanel step={2} title="Step 2" previousRoute="/prev-route" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("form-previous-button"));
    expect(mockHistoryPush).toHaveBeenCalledWith("/prev-route");
  });

  it("should call onNext callback when provided", () => {
    const onNextMock = jest.fn();
    render(
      <MemoryRouter>
        <FormHeaderPanel step={1} title="Step 1" onNext={onNextMock} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("form-next-button"));
    expect(onNextMock).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).not.toHaveBeenCalled();
  });

  it("should call onBack callback when provided", () => {
    const onBackMock = jest.fn();
    render(
      <MemoryRouter>
        <FormHeaderPanel step={2} title="Step 2" onPrevious={onBackMock} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("form-previous-button"));
    expect(onBackMock).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).not.toHaveBeenCalled();
  });

  it("should call onCancel when provided instead of showing BackModal", () => {
    const onCancelMock = jest.fn();
    render(
      <MemoryRouter>
        <FormHeaderPanel step={1} title="Step 1" onPrevious={onCancelMock} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("form-previous-button"));
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it("should display form errors when provided", () => {
    // Create a valid array of validation errors
    const formErrors = [
      {
        message: "Recipient is required",
        path: "document.recipient",
        context: {
          errorType: "required" as const,
        },
      },
    ];

    render(
      <MemoryRouter>
        <FormHeaderPanel
          step={1}
          title="Step 1"
          formErrors={formErrors}
          showErrorBanner={true}
          formErrorTitle="Error Title"
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Error Title")).toBeInTheDocument();
    expect(screen.getByText("Recipient is required")).toBeInTheDocument();
  });

  it("should not display form errors when showErrorBanner is false", () => {
    // Create a valid array of validation errors
    const formErrors = [
      {
        message: "Recipient is required",
        path: "document.recipient",
        context: {
          errorType: "required" as const,
        },
      },
    ];

    render(
      <MemoryRouter>
        <FormHeaderPanel step={1} title="Step 1" formErrors={formErrors} showErrorBanner={false} />
      </MemoryRouter>
    );

    // Error banner should not be shown
    expect(screen.queryByText("Field(s) Error")).not.toBeInTheDocument();
    expect(screen.queryByText("Recipient is required")).not.toBeInTheDocument();
  });

  describe("console warnings for missing actions", () => {
    let consoleWarnSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
      consoleWarnSpy.mockRestore();
    });

    it("should call console.warn when Previous button is clicked without onPrevious or previousRoute", () => {
      render(
        <MemoryRouter>
          <FormHeaderPanel step={1} title="Test Title" />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByTestId("form-previous-button"));
      expect(consoleWarnSpy).toHaveBeenCalledWith("No previous route or previous callback provided");
    });

    it("should call console.warn when Next button is clicked without onNext or nextRoute", () => {
      render(
        <MemoryRouter>
          <FormHeaderPanel step={1} title="Test Title" />
        </MemoryRouter>
      );
      fireEvent.click(screen.getByTestId("form-next-button"));
      expect(consoleWarnSpy).toHaveBeenCalledWith("No next route or next callback provided");
    });
  });

  describe("'Create Another Document' button", () => {
    const mockProcessAnotherDocumentFn = jest.fn();
    const defaultProps = {
      title: "Step 3",
      processAnotherDocumentFn: mockProcessAnotherDocumentFn,
    };

    it("should be visible and clickable when step is 3, queueState is CONFIRMED, and callback is provided", () => {
      render(
        <MemoryRouter>
          <FormHeaderPanel {...defaultProps} step={3} queueState={QueueState.CONFIRMED} />
        </MemoryRouter>
      );
      const button = screen.getByTestId("process-another-document-button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Create Another Document");
      fireEvent.click(button);
      expect(mockProcessAnotherDocumentFn).toHaveBeenCalledTimes(1);
    });

    it("should be hidden if step is not 3", () => {
      render(
        <MemoryRouter>
          <FormHeaderPanel {...defaultProps} step={2} queueState={QueueState.CONFIRMED} />
        </MemoryRouter>
      );
      expect(screen.queryByTestId("process-another-document-button")).not.toBeInTheDocument();
    });

    it("should be hidden if queueState is not CONFIRMED", () => {
      render(
        <MemoryRouter>
          <FormHeaderPanel {...defaultProps} step={3} queueState={QueueState.PENDING} />
        </MemoryRouter>
      );
      expect(screen.queryByTestId("process-another-document-button")).not.toBeInTheDocument();
    });

    it("should be hidden if processAnotherDocumentFn is not provided", () => {
      render(
        <MemoryRouter>
          <FormHeaderPanel title="Step 3" step={3} queueState={QueueState.CONFIRMED} />
        </MemoryRouter>
      );
      expect(screen.queryByTestId("process-another-document-button")).not.toBeInTheDocument();
    });
  });

  describe("FormErrorBanner conditional display and default titles", () => {
    const formErrors: FormErrors = [
      {
        message: "An error occurred",
        path: "some.path",
        context: { errorType: "required" as const },
      },
    ];

    it("should be visible with default title when showErrorBanner is true and formErrors are provided", () => {
      render(
        <MemoryRouter>
          <FormHeaderPanel step={1} title="Test With Banner" formErrors={formErrors} showErrorBanner={true} />
        </MemoryRouter>
      );
      expect(screen.getByText("Field(s) Error")).toBeInTheDocument();
      expect(screen.getByText("An error occurred")).toBeInTheDocument();
    });

    it("should be hidden when showErrorBanner is false", () => {
      render(
        <MemoryRouter>
          <FormHeaderPanel step={1} title="Test With Banner" formErrors={formErrors} showErrorBanner={false} />
        </MemoryRouter>
      );
      expect(screen.queryByText("Field(s) Error")).not.toBeInTheDocument();
    });
  });

  describe("Button visibility based on step", () => {
    it("should hide Previous and Next buttons when step is 3", () => {
      render(
        <MemoryRouter>
          <FormHeaderPanel step={3} title="Final Step" />
        </MemoryRouter>
      );
      expect(screen.queryByTestId("form-previous-button")).not.toBeInTheDocument();
      expect(screen.queryByTestId("form-next-button")).not.toBeInTheDocument();
    });
  });

  describe("Default prop usage", () => {
    it("should use default labels for Previous and Next buttons", () => {
      render(
        <MemoryRouter>
          <FormHeaderPanel step={1} title="Step 1 Default Labels" />
        </MemoryRouter>
      );
      expect(screen.getByTestId("form-previous-button")).toHaveTextContent("Previous");
      expect(screen.getByTestId("form-next-button")).toHaveTextContent("Next");
    });
  });
});
