import { providers } from "ethers";
import { useProviderContext } from "../../contexts/provider";
import { fetchTokenTransfers, identifyTokenTransferEventsFunction } from "./fetchTokenTransfer";
import { TradeTrustToken__factory } from "@tradetrust-tt/token-registry/dist/contracts";
import { LogDescription, Result } from "ethers/lib/utils";
import { ChainId, ChainInfo } from "../../../constants/chain-info";

jest.mock("../../contexts/provider");

const amoyProvider = new providers.JsonRpcProvider(ChainInfo[ChainId.Amoy].rpcUrl);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Fetch Token Transfers", () => {
  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: amoyProvider, providerOrSigner: amoyProvider });
  });

  describe("fetch from token registry with token id", () => {
    it("should return parsed transfer logs in valid format", async () => {
      const tokenRegistry = TradeTrustToken__factory.connect(
        "0x71D28767662cB233F887aD2Bb65d048d760bA694",
        amoyProvider
      );
      const blockNo = 6000000;
      if (!tokenRegistry) throw new Error("Unable to connect to token registry: Test Failed");
      const tokenTransfers = await fetchTokenTransfers(
        amoyProvider,
        tokenRegistry,
        "0xe8b9fb84485cbf9dd59eabe1dcddf44d9e3ff820aedb7d02a138ef4a116f0ec9",
        blockNo
      );
      expect(tokenTransfers).toEqual([
        {
          type: "INITIAL",
          from: "0x0000000000000000000000000000000000000000",
          to: "0x85b6A38870eea302ee220A98cF492209CFed96ff",
          blockNumber: 6203293,
          transactionHash: "0x5e25cf43dee3027b1aa3fb8222d1f0dcd9d5b206a4264db2147eb3264f6a29d0",
          transactionIndex: 3,
        },
        {
          type: "SURRENDERED",
          from: "0x85b6A38870eea302ee220A98cF492209CFed96ff",
          to: "0x71D28767662cB233F887aD2Bb65d048d760bA694",
          blockNumber: 6203554,
          transactionHash: "0x3929b5a343ec5cebe8a08f60580fdd5a417dc7beafa5f2dd45f38640875e6b22",
          transactionIndex: 0,
        },
        {
          type: "SURRENDER_REJECTED",
          from: "0x71D28767662cB233F887aD2Bb65d048d760bA694",
          to: "0x85b6A38870eea302ee220A98cF492209CFed96ff",
          blockNumber: 6203580,
          transactionHash: "0xef671a870dce0069628cba2c30abee03627df9dca1c9436defc837e593e29871",
          transactionIndex: 1,
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
