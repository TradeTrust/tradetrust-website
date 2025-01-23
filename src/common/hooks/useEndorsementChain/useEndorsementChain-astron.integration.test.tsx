import { providers } from "ethers";
import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { useEndorsementChain } from "./useEndorsementChain";
import { useProviderContext } from "../../contexts/provider";
import { ChainId, ChainInfo } from "../../../constants/chain-info";

jest.mock("../../contexts/provider");

const astronProvider = new providers.JsonRpcProvider(ChainInfo[ChainId.Astron].rpcUrl);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("useEndorsementChain|integration", () => {
  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: astronProvider, providerOrSigner: astronProvider });
  });
  it("should work correctly for a given tokenRegistryAddress + tokenId with Transfer, Surrender, Burnt events", async () => {
    const { result } = renderHook(() =>
      useEndorsementChain(
        "0x0D5da59B93e8AC9b1781CE5694fbcE626586F4c9",
        "0x31303535c19053deffa5f2c7c457992d988c0dc736e4d77b5b1202255cbdb58b"
      )
    );
    await act(async () => {
      await waitFor(
        () => {
          expect(result.current.endorsementChain).toBeTruthy();
        },
        { timeout: 60000 }
      );
    });
    expect(result.current.endorsementChain).toEqual([
      {
        type: "INITIAL",
        transactionHash: "0x717baa9dd71e557fa87a738f1a4bcb9b904c053c3346c43b50783097eec6e6dc",
        transactionIndex: 0,
        blockNumber: 846083,
        owner: "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
        holder: "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
        timestamp: 1730881880000,
      },
      {
        type: "TRANSFER_HOLDER",
        transactionHash: "0x59ed849cbee8c8092c1c233524d43a0c8130ac3980bd8754a7f884d532f1c042",
        transactionIndex: 0,
        blockNumber: 846116,
        owner: "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
        holder: "0xb6741fcF165570c8d1b8af1A5610b8e5d9a0E85b",
        timestamp: 1730882045000,
      },
      {
        type: "TRANSFER_BENEFICIARY",
        transactionHash: "0x7cf88d0e229b97206e0c987af4f91eff2823ab488f1dd0a22b2e18588d5718de",
        transactionIndex: 0,
        blockNumber: 846154,
        owner: "0xb6741fcF165570c8d1b8af1A5610b8e5d9a0E85b",
        holder: "0xb6741fcF165570c8d1b8af1A5610b8e5d9a0E85b",
        timestamp: 1730882235000,
      },
      {
        type: "TRANSFER_OWNERS",
        transactionHash: "0x9b3bff8b8507bdaf715430218872d86dc6de4522b45593cef6b661699260e20f",
        transactionIndex: 0,
        blockNumber: 846495,
        owner: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        holder: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        timestamp: 1730883940000,
      },
      {
        type: "SURRENDERED",
        transactionHash: "0xd775fec7f0efe24af92b9b908b415dd8cc3ba780657d8a3118289eabcf50e187",
        transactionIndex: 0,
        blockNumber: 847113,
        owner: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        holder: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        timestamp: 1730887030000,
      },
      {
        type: "SURRENDER_REJECTED",
        transactionHash: "0xc9b6741b7c6714a9c057791f7e9e9ec71da25269166b9bde1c0c32d22b703ad3",
        transactionIndex: 0,
        blockNumber: 847253,
        owner: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        holder: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        timestamp: 1730887730000,
      },
      {
        type: "SURRENDERED",
        transactionHash: "0x11406e2c34d924db360fa39a0680fca42e361041db190328cc01f9fda1b905ca",
        transactionIndex: 0,
        blockNumber: 847307,
        owner: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        holder: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        timestamp: 1730888000000,
      },
      {
        type: "SURRENDER_ACCEPTED",
        transactionHash: "0x06873ca2f03502af50b9d36bea378399c81527fe68719859ec1aa5ab309a2fe4",
        transactionIndex: 0,
        blockNumber: 847318,
        owner: "0x0000000000000000000000000000000000000000",
        holder: "0x0000000000000000000000000000000000000000",
        timestamp: 1730888055000,
      },
    ]);
    expect(result.current.error).toBe("");
    expect(result.current.pending).toBe(false);
  }, 80000);
});
