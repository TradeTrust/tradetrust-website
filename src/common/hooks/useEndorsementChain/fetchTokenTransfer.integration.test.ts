import { ethers } from "ethers";
import { useProviderContext } from "../../contexts/provider";
import { INFURA_API_KEY } from "../../../config";
import { fetchTokenTransfers, identifyTokenTransferEventsFunction } from "./fetchTokenTransfer";
import { TradeTrustToken__factory } from "@govtechsg/token-registry/dist/contracts";
import { LogDescription, Result } from "ethers/lib/utils";

jest.mock("../../contexts/provider");

const goerliProvider = new ethers.providers.InfuraProvider("goerli", INFURA_API_KEY);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Fetch Token Transfers", () => {
  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: goerliProvider, providerOrSigner: goerliProvider });
  });

  describe("fetch from token registry with token id", () => {
    it("should return parsed transfer logs in valid format", async () => {
      const tokenRegistry = TradeTrustToken__factory.connect(
        "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
        goerliProvider
      );
      if (!tokenRegistry) throw new Error("Unable to connect to token registry: Test Failed");
      const tokenTransfers = await fetchTokenTransfers(
        tokenRegistry,
        "0xc38268c2b0248d6d9ba5b2dc35d19c99a7688f3221935457713d6621edc300c3"
      );
      expect(tokenTransfers).toEqual([
        {
          type: "INITIAL",
          from: "0x0000000000000000000000000000000000000000",
          to: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
          blockNumber: 7831157,
          transactionHash: "0x1144cd45c4b9deae74a885d38bececeb1a3e194dbbcc3ef6f8c180f911ac0bb0",
          transactionIndex: 104,
        },
        {
          type: "SURRENDERED",
          from: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
          to: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
          blockNumber: 7835698,
          transactionHash: "0xe11c49e31b47a27c13106213485cc4684f48d765b785005048ba57ea366a1639",
          transactionIndex: 62,
        },
        {
          type: "SURRENDER_REJECTED",
          from: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
          to: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
          blockNumber: 7835703,
          transactionHash: "0x9f074aa153b03b5d8f4cdd51142491bb821696a1bda21d24ee2d947891ada9d0",
          transactionIndex: 17,
        },
        {
          type: "SURRENDERED",
          from: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
          to: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
          blockNumber: 7835738,
          transactionHash: "0x6782d845fe298cd79584a25466d1e2d9a3ff8d14591b4b424922709b7605f58e",
          transactionIndex: 86,
        },
        {
          type: "SURRENDER_REJECTED",
          from: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
          to: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
          blockNumber: 7836089,
          transactionHash: "0x4668970e883841dab512dc53c63f05c7c7452e9876086c2838710cfd42286726",
          transactionIndex: 59,
        },
        {
          type: "SURRENDERED",
          from: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
          to: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
          blockNumber: 7836139,
          transactionHash: "0xf1193038431ec68ca26a2f2e52b9dfdb677411c5afa4d1048a43eade8313b3ea",
          transactionIndex: 206,
        },
        {
          type: "SURRENDER_REJECTED",
          from: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
          to: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
          blockNumber: 7836270,
          transactionHash: "0x6162961170520543c6d760c166a72c934b7cc84d0fa0eaf5097745071f3af334",
          transactionIndex: 46,
        },
        {
          type: "SURRENDERED",
          from: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
          to: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
          blockNumber: 7836273,
          transactionHash: "0xb30c0a48f5ebe6748b31f7f5f370b605eece7a093f950d7715f54ede2474fee7",
          transactionIndex: 59,
        },
        {
          type: "SURRENDER_ACCEPTED",
          from: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
          to: "0x000000000000000000000000000000000000dEaD",
          blockNumber: 7836281,
          transactionHash: "0x497395d2d58837a3fe686a883eaaaa2675b3d8ad10479abec2184349f7d38cb4",
          transactionIndex: 18,
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
