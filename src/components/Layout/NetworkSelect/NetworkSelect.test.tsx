import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { ProviderContextProvider } from "../../../common/contexts/provider";
import { getChainInfo } from "../../../common/utils/chain-utils";
import { ChainId, ChainInfoObject } from "../../../constants/chain-info";
import { NetworkSelect } from "./NetworkSelect";

const mockNetworks: ChainInfoObject[] = [getChainInfo(ChainId.Sepolia), getChainInfo(ChainId.PolygonMumbai)];
const mockUnsupportedNetwork: ChainInfoObject[] = [getChainInfo(ChainId.PolygonMumbai)];

describe("NetworkSelect", () => {
  it("should render unsupported network", () => {
    render(
      <ProviderContextProvider defaultChainId={ChainId.Sepolia} networks={mockUnsupportedNetwork}>
        <NetworkSelect />
      </ProviderContextProvider>
    );

    expect(screen.getByText("Unsupported Network")).toBeInTheDocument();
  });

  it("should render the default network as selected", async () => {
    render(
      <ProviderContextProvider defaultChainId={ChainId.PolygonMumbai} networks={mockNetworks}>
        <NetworkSelect />
      </ProviderContextProvider>
    );

    const selectedLabel = await screen.findByText(getChainInfo(ChainId.PolygonMumbai).label);
    expect(selectedLabel).toBeInTheDocument();
  });

  it("should render the select caption", async () => {
    render(
      <ProviderContextProvider defaultChainId={ChainId.PolygonMumbai} networks={mockNetworks}>
        <NetworkSelect />
      </ProviderContextProvider>
    );

    const dropdownButton = screen.getByRole("button");
    fireEvent.click(dropdownButton);

    expect(await screen.findByText("Select a Network")).toBeInTheDocument();
  });

  it("should render the list of networks when clicked", async () => {
    render(
      <ProviderContextProvider defaultChainId={ChainId.PolygonMumbai} networks={mockNetworks}>
        <NetworkSelect />
      </ProviderContextProvider>
    );

    const dropdownButton = screen.getByRole("button");
    fireEvent.click(dropdownButton);

    const polygonLabels = await screen.findAllByText(getChainInfo(ChainId.PolygonMumbai).label);
    const sepoliaLabels = await screen.findAllByText(getChainInfo(ChainId.Sepolia).label);
    expect(polygonLabels).toHaveLength(2);
    expect(sepoliaLabels).toHaveLength(1);
  });

  it("should render the selected network name when user switches network", async () => {
    render(
      <ProviderContextProvider defaultChainId={ChainId.Sepolia} networks={mockNetworks}>
        <NetworkSelect />
      </ProviderContextProvider>
    );

    const dropdownButton = screen.getByRole("button");
    fireEvent.click(dropdownButton);

    const polygonItem = screen.getByTestId(`network-select-dropdown-label-${ChainId.PolygonMumbai}`);
    fireEvent.click(polygonItem);
    await waitFor(() => {
      expect(screen.getAllByText("Polygon Mumbai")).toHaveLength(1);
    });
  });
});
