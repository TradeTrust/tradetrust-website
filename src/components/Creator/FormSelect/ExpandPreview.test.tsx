import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ExpandPreview } from "./ExpandPreview";

// Mock useOverlayContext
const mockCloseOverlay = jest.fn();
jest.mock("../../../common/contexts/OverlayContext", () => ({
  useOverlayContext: () => ({
    closeOverlay: mockCloseOverlay,
  }),
}));

const mockHandleCreateDocument = jest.fn();
const mockForm = {
  name: "Test Document Name",
  img: "test-image-url.jpg",
};

describe("ExpandPreview", () => {
  beforeEach(() => {
    // Clear mocks before each test
    mockCloseOverlay.mockClear();
    mockHandleCreateDocument.mockClear();
  });

  it("should render correctly with initial props and state", () => {
    render(<ExpandPreview handleCreateDocument={mockHandleCreateDocument} form={mockForm} />);

    // Check document name
    expect(screen.getByText("Test Document Name")).toBeInTheDocument();

    // Check image
    const image = screen.getByAltText("Document Preview Image") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("test-image-url.jpg");

    // Check initial zoom display
    expect(screen.getByText("100%")).toBeInTheDocument();

    // Check image container initial style (zoom 100%)
    // The image itself is inside a styled div. Let's find that div.
    const imageContainer = image.parentElement;
    expect(imageContainer).toHaveStyle("width: 100%");
    expect(imageContainer).toHaveStyle("height: 100%");

    // Check buttons
    expect(screen.getByTestId("expandPreviewDismiss")).toBeInTheDocument();
    expect(screen.getByTestId("expandPreviewCreateDocument")).toBeInTheDocument();
  });

  it("should call closeOverlay when 'Dismiss' button is clicked", () => {
    render(<ExpandPreview handleCreateDocument={mockHandleCreateDocument} form={mockForm} />);
    fireEvent.click(screen.getByTestId("expandPreviewDismiss"));
    expect(mockCloseOverlay).toHaveBeenCalledTimes(1);
  });

  it("should call handleCreateDocument when 'Create Document' button is clicked", () => {
    render(<ExpandPreview handleCreateDocument={mockHandleCreateDocument} form={mockForm} />);
    fireEvent.click(screen.getByTestId("expandPreviewCreateDocument"));
    expect(mockHandleCreateDocument).toHaveBeenCalledTimes(1);
  });

  describe("Zoom functionality", () => {
    it("should decrease zoom when '-' button is clicked and update display", () => {
      render(<ExpandPreview handleCreateDocument={mockHandleCreateDocument} form={mockForm} />);
      const zoomOutButton = screen.getByText("-");
      const image = screen.getByAltText("Document Preview Image") as HTMLImageElement;
      const imageContainer = image.parentElement;

      act(() => {
        fireEvent.click(zoomOutButton);
      });
      // Zoom is MIN (100) - 5 = 95, but capped at MIN (100)
      expect(screen.getByText("100%")).toBeInTheDocument();
      expect(imageContainer).toHaveStyle("width: 100%");

      // Click again to ensure it doesn't go below 100
      act(() => {
        fireEvent.click(zoomOutButton);
      });
      expect(screen.getByText("100%")).toBeInTheDocument();
      expect(imageContainer).toHaveStyle("width: 100%");
    });

    it("should increase zoom when '+' button is clicked and update display", () => {
      render(<ExpandPreview handleCreateDocument={mockHandleCreateDocument} form={mockForm} />);
      const zoomInButton = screen.getByText("+");
      const image = screen.getByAltText("Document Preview Image") as HTMLImageElement;
      const imageContainer = image.parentElement;

      act(() => {
        fireEvent.click(zoomInButton);
      });
      expect(screen.getByText("105%")).toBeInTheDocument();
      expect(imageContainer).toHaveStyle("width: 105%");

      // Increase multiple times
      act(() => {
        fireEvent.click(zoomInButton); // zoom becomes 105 + 5 = 110
      });
      act(() => {
        fireEvent.click(zoomInButton); // zoom becomes 110 + 5 = 115
      });
      expect(screen.getByText("115%")).toBeInTheDocument();
      expect(imageContainer).toHaveStyle("width: 115%");
    });

    it("should not increase zoom beyond MAX (200%) when '+' button is clicked", () => {
      render(<ExpandPreview handleCreateDocument={mockHandleCreateDocument} form={mockForm} />);
      const zoomInButton = screen.getByText("+");
      const image = screen.getByAltText("Document Preview Image") as HTMLImageElement;
      const imageContainer = image.parentElement;

      // Click 20 times to reach 200% (100 + 20*5 = 200)
      for (let i = 0; i < 20; i++) {
        act(() => {
          fireEvent.click(zoomInButton);
        });
      }
      expect(screen.getByText("200%")).toBeInTheDocument();
      expect(imageContainer).toHaveStyle("width: 200%");

      // Click again, should stay at 200%
      act(() => {
        fireEvent.click(zoomInButton);
      });
      expect(screen.getByText("200%")).toBeInTheDocument();
      expect(imageContainer).toHaveStyle("width: 200%");
    });

    it("should update zoom when range input is changed", () => {
      render(<ExpandPreview handleCreateDocument={mockHandleCreateDocument} form={mockForm} />);
      const rangeInput = screen.getByRole("slider");
      const image = screen.getByAltText("Document Preview Image") as HTMLImageElement;
      const imageContainer = image.parentElement;

      act(() => {
        fireEvent.change(rangeInput, { target: { value: "150" } });
      });
      expect(screen.getByText("150%")).toBeInTheDocument();
      expect(imageContainer).toHaveStyle("width: 150%");

      act(() => {
        fireEvent.change(rangeInput, { target: { value: "125" } });
      });
      expect(screen.getByText("125%")).toBeInTheDocument();
      expect(imageContainer).toHaveStyle("width: 125%");
    });
  });
});
