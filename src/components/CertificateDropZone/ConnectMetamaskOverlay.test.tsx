import { render, screen, fireEvent } from "@testing-library/react";
import { ConnectMetamaskOverlay } from "./ConnectMetamaskOverlay";
import React from "react";

describe("ConnectMetamaskOverlay", () => {
  it("should render the component correctly", () => {
    render(<ConnectMetamaskOverlay handleConnection={jest.fn()} handleDispatch={jest.fn()} />);

    // Check if header text is rendered
    expect(screen.getByText("Transferable Document Uploaded")).toBeInTheDocument();

    // Check if both buttons are rendered
    expect(screen.getByText("Connect with Metamask")).toBeInTheDocument();
    expect(screen.getByText("Proceed Anyway")).toBeInTheDocument();
  });

  it("should call handleConnection when 'Connect with Metamask' button is clicked", () => {
    const handleConnectionMock = jest.fn();
    render(<ConnectMetamaskOverlay handleConnection={handleConnectionMock} handleDispatch={jest.fn()} />);

    const connectButton = screen.getByText("Connect with Metamask");
    fireEvent.click(connectButton);

    expect(handleConnectionMock).toHaveBeenCalledTimes(1);
  });

  it("should call handleDispatch when 'Proceed Anyway' button is clicked", () => {
    const handleDispatchMock = jest.fn();
    render(<ConnectMetamaskOverlay handleConnection={jest.fn()} handleDispatch={handleDispatchMock} />);

    const proceedButton = screen.getByText("Proceed Anyway");
    fireEvent.click(proceedButton);

    expect(handleDispatchMock).toHaveBeenCalledTimes(1);
  });

  it("should have correct styles applied to buttons", () => {
    render(<ConnectMetamaskOverlay handleConnection={jest.fn()} handleDispatch={jest.fn()} />);

    const connectButton = screen.getByText("Connect with Metamask");
    const proceedButton = screen.getByText("Proceed Anyway");

    expect(connectButton).toHaveClass("bg-white text-cerulean-500 hover:bg-cloud-100");
    expect(proceedButton).toHaveClass("bg-cerulean-500 text-white hover:bg-cerulean-800");
  });
});
