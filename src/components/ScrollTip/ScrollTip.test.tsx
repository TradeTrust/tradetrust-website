import React from "react";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { ScrollTip } from "./ScrollTip";

// Mock window methods
const originalScrollY = window.scrollY;
const originalScrollTo = window.scrollTo;
const originalScrollBy = window.scrollBy;
const originalScrollIntoView = Element.prototype.scrollIntoView;

describe("ScrollTip", () => {
  beforeEach(() => {
    // Setup mocks
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });

    window.scrollTo = jest.fn();
    window.scrollBy = jest.fn();
    Element.prototype.scrollIntoView = jest.fn();

    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 500, // Set this to be greater than the default referencePoint
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    // Set default innerHeight
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  afterEach(() => {
    // Restore original methods
    Object.defineProperty(window, "scrollY", {
      value: originalScrollY,
    });
    window.scrollTo = originalScrollTo;
    window.scrollBy = originalScrollBy;
    Element.prototype.scrollIntoView = originalScrollIntoView;
    jest.clearAllMocks();
    cleanup(); // Clean up DOM after each test
  });

  const CustomExample: React.FunctionComponent = ({ children }) => {
    return (
      <div>
        <div style={{ height: "500px" }} />
        <div style={{ height: "100px" }} id="test-target" />
        {children}
      </div>
    );
  };

  it("should render View More button initially", () => {
    render(
      <CustomExample>
        <ScrollTip targetId="test-target" />
      </CustomExample>
    );
    expect(screen.getByTestId("view-more")).toBeInTheDocument();
    expect(screen.queryByTestId("scroll-to-top")).not.toBeInTheDocument();
  });

  it("should not render when there is no targetId", () => {
    render(
      <CustomExample>
        <ScrollTip targetId="" />
      </CustomExample>
    );

    expect(screen.queryByTestId("view-more")).not.toBeInTheDocument();
    expect(screen.queryByTestId("scroll-to-top")).not.toBeInTheDocument();
  });

  it("should show Scroll to Top button when scrolled beyond reference point", () => {
    // Set scrollY beyond the default reference point (300)
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 500,
    });
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0, // Set this to be greater than the default referencePoint
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    render(
      <CustomExample>
        <ScrollTip targetId="test-target" />
      </CustomExample>
    );

    // Trigger scroll event to refresh component state
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    // View More button should be hidden and Scroll to Top should be visible
    expect(screen.queryByTestId("view-more")).not.toBeInTheDocument();
    expect(screen.getByTestId("scroll-to-top")).toBeInTheDocument();
  });

  it("should scroll to target element when View More is clicked", () => {
    // Setup a mock target element
    const targetId = "test-target1";
    const target = document.createElement("div");
    target.id = targetId;

    render(
      <CustomExample>
        <ScrollTip targetId={targetId} />
      </CustomExample>
    );

    document.body.appendChild(target);

    fireEvent.click(screen.getByTestId("view-more"));
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });

    // Clean up
    document.body.removeChild(target);
  });

  it("should scroll to top when Scroll to Top button is clicked", () => {
    // Set scrollY beyond the default reference point (300)
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 500,
    });
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0, // Set this to be greater than the default referencePoint
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    render(
      <CustomExample>
        <ScrollTip targetId="test-target" />
      </CustomExample>
    );

    // Trigger scroll event
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    // Click the scroll to top button
    fireEvent.click(screen.getByTestId("scroll-to-top"));

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("should apply custom class names", () => {
    // Test View More button first
    render(
      <CustomExample>
        <ScrollTip targetId="test-target" viewMoreClassName="custom-view-more" scrollTopClassName="custom-scroll-top" />
      </CustomExample>
    );

    // View More button should have the custom class
    expect(screen.getByTestId("view-more").className).toContain("custom-view-more");

    // Clean up first render
    cleanup();

    // Set scrollY beyond reference point and render again to test Scroll to Top button
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 500,
    });
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0, // Set this to be greater than the default referencePoint
      width: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));

    render(
      <CustomExample>
        <ScrollTip targetId="test-target" viewMoreClassName="custom-view-more" scrollTopClassName="custom-scroll-top" />
      </CustomExample>
    );

    // Trigger scroll event
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    // Scroll to Top button should have the custom class
    expect(screen.getByTestId("scroll-to-top").className).toContain("custom-scroll-top");
  });
});
