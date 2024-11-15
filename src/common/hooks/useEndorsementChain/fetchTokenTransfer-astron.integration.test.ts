import { providers } from "ethers";
import { useProviderContext } from "../../contexts/provider";
import { fetchTokenTransfers, identifyTokenTransferEventsFunction } from "./fetchTokenTransfer";
import { TradeTrustToken__factory } from "@tradetrust-tt/token-registry/dist/contracts";
import { LogDescription, Result } from "ethers/lib/utils";
import { ChainId, ChainInfo } from "../../../constants/chain-info";

jest.mock("../../contexts/provider");

const astronProvider = new providers.JsonRpcProvider(ChainInfo[ChainId.Astron].rpcUrl);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Fetch Token Transfers", () => {
  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: astronProvider, providerOrSigner: astronProvider });
  });

  describe("fetch from token registry with token id", () => {
    it("should return parsed transfer logs in valid format", async () => {
      const tokenRegistry = TradeTrustToken__factory.connect(
        "0x0D5da59B93e8AC9b1781CE5694fbcE626586F4c9",
        astronProvider
      );
      if (!tokenRegistry) throw new Error("Unable to connect to token registry: Test Failed");
      const tokenTransfers = await fetchTokenTransfers(
        tokenRegistry,
        "0x31303535c19053deffa5f2c7c457992d988c0dc736e4d77b5b1202255cbdb58b"
      );
      expect(tokenTransfers).toEqual([
        {
          type: "INITIAL",
          from: "0x0000000000000000000000000000000000000000",
          to: "0xe9bBb0C3f3F12E73eBB6DF1fF7713B56CDCEF890",
          blockNumber: 846083,
          transactionHash: "0x717baa9dd71e557fa87a738f1a4bcb9b904c053c3346c43b50783097eec6e6dc",
          transactionIndex: 0,
        },
        {
          type: "SURRENDERED",
          from: "0xe9bBb0C3f3F12E73eBB6DF1fF7713B56CDCEF890",
          to: "0x0D5da59B93e8AC9b1781CE5694fbcE626586F4c9",
          blockNumber: 847113,
          transactionHash: "0xd775fec7f0efe24af92b9b908b415dd8cc3ba780657d8a3118289eabcf50e187",
          transactionIndex: 0,
        },
        {
          type: "SURRENDER_REJECTED",
          from: "0x0D5da59B93e8AC9b1781CE5694fbcE626586F4c9",
          to: "0xe9bBb0C3f3F12E73eBB6DF1fF7713B56CDCEF890",
          blockNumber: 847253,
          transactionHash: "0xc9b6741b7c6714a9c057791f7e9e9ec71da25269166b9bde1c0c32d22b703ad3",
          transactionIndex: 0,
        },
        {
          type: "SURRENDERED",
          from: "0xe9bBb0C3f3F12E73eBB6DF1fF7713B56CDCEF890",
          to: "0x0D5da59B93e8AC9b1781CE5694fbcE626586F4c9",
          blockNumber: 847307,
          transactionHash: "0x11406e2c34d924db360fa39a0680fca42e361041db190328cc01f9fda1b905ca",
          transactionIndex: 0,
        },
        {
          type: "SURRENDER_ACCEPTED",
          from: "0x0D5da59B93e8AC9b1781CE5694fbcE626586F4c9",
          to: "0x000000000000000000000000000000000000dEaD",
          blockNumber: 847318,
          transactionHash: "0x06873ca2f03502af50b9d36bea378399c81527fe68719859ec1aa5ab309a2fe4",
          transactionIndex: 0,
        },
      ]);
    });
  });
  describe("identify transfer events type", () => {
    const initialAddress = `0x0000000000000000000000000000000000000000`;
    const tokenRegistryAddress = `0x0000000000000000000000000000000000000001`;
    const titleEscrowAddress = `0x0000000000000000000000000000000000000002`;
    const burnAddress = `0x000000000000000000000000000000000000dEaD`;
    const identifyTokenTransferEvents = identifyTokenTransferEventsFunction(tokenRegistryAddress);

    const initialLogEvent = {
      args: {
        from: initialAddress,
        to: titleEscrowAddress,
      } as unknown as Result,
    } as LogDescription;
    expect(identifyTokenTransferEvents(initialLogEvent)).toBe("INITIAL");

    const surrenderLogEvent = {
      args: {
        from: titleEscrowAddress,
        to: tokenRegistryAddress,
      } as unknown as Result,
    } as LogDescription;
    expect(identifyTokenTransferEvents(surrenderLogEvent)).toBe("SURRENDERED");

    const burnLogEvent = {
      args: {
        from: titleEscrowAddress,
        to: burnAddress,
      } as unknown as Result,
    } as LogDescription;
    expect(identifyTokenTransferEvents(burnLogEvent)).toBe("SURRENDER_ACCEPTED");

    const surrenderRejectLogEvent = {
      args: {
        from: tokenRegistryAddress,
        to: titleEscrowAddress,
      } as unknown as Result,
    } as LogDescription;
    expect(identifyTokenTransferEvents(surrenderRejectLogEvent)).toBe("SURRENDER_REJECTED");
  });
});
