import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { EndpointEntry } from "./EndpointEntry";
import { getFeatures } from "@tradetrust-tt/address-identity-resolver";

jest.mock("@tradetrust-tt/address-identity-resolver", () => ({
  getFeatures: jest.fn(),
}));

const mockOnUpdateEndpoint = jest.fn();
const mockGetFeatures = getFeatures as jest.Mock;

const defaultProps = {
  orderNumber: 0,
  api: "",
  name: "",
  apiHeader: "",
  apiKey: "",
  canEdit: true,
  removeEndpoint: () => {},
  onMoveEntryUp: () => {},
  onMoveEntryDown: () => {},
  onUpdateEndpoint: () => {},
  isEndpointUrlExists: () => true,
};

const enterInfo = (): void => {
  fireEvent.change(screen.getByPlaceholderText("Name"), {
    target: { value: "TEST" },
  });
  fireEvent.change(screen.getByPlaceholderText("Endpoint"), {
    target: { value: "https://example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("API Header"), {
    target: { value: "x-api-key" },
  });
  fireEvent.change(screen.getByPlaceholderText("API Key"), {
    target: { value: "KEY" },
  });
};

describe("endpointEntry", () => {
  beforeEach(() => {
    mockGetFeatures.mockReset();
    mockOnUpdateEndpoint.mockReset();
  });

  it("should validate endpoint and save when validation passes", async () => {
    mockGetFeatures.mockResolvedValueOnce({
      features: {
        addressResolution: {
          location: "/identifier",
        },
      },
    });
    render(
      <EndpointEntry {...defaultProps} onUpdateEndpoint={mockOnUpdateEndpoint} isEndpointUrlExists={() => false} />
    );
    enterInfo();
    fireEvent.click(screen.getByText("Save"));
    await waitFor(() => expect(mockGetFeatures).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockOnUpdateEndpoint).toHaveBeenCalledTimes(1));
    expect(mockGetFeatures).toHaveBeenCalledWith("https://example.com", "x-api-key", "KEY");
    expect(mockOnUpdateEndpoint).toHaveBeenCalledWith({
      name: "TEST",
      endpoint: "https://example.com",
      apiHeader: "x-api-key",
      apiKey: "KEY",
      path: {
        addressResolution: "/identifier",
      },
    });
  });
  it("should validate endpoint and display error when validation fails", async () => {
    mockGetFeatures.mockRejectedValueOnce(new Error("Api has gone home"));
    render(
      <EndpointEntry {...defaultProps} onUpdateEndpoint={mockOnUpdateEndpoint} isEndpointUrlExists={() => false} />
    );
    enterInfo();
    fireEvent.click(screen.getByText("Save"));
    await waitFor(() => expect(mockGetFeatures).toHaveBeenCalledTimes(1));
    expect(mockGetFeatures).toHaveBeenCalledWith("https://example.com", "x-api-key", "KEY");
    const errorMessages = await screen.findAllByText("Api has gone home");
    expect(errorMessages.length > 0).toBe(true);
  });
});
