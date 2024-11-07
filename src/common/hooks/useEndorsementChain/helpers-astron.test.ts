import { providers } from "ethers";
import { useProviderContext } from "../../contexts/provider";
import { TradeTrustToken__factory } from "@tradetrust-tt/token-registry/dist/contracts";
import { fetchEventTime } from "./helpers";
import { retrieveTitleEscrowAddressOnFactory } from "../useTitleEscrowContract";
import { ChainId, ChainInfo } from "../../../constants/chain-info";

jest.mock("../../contexts/provider");

const astronProvider = new providers.JsonRpcProvider(ChainInfo[ChainId.Astron].rpcUrl);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Test all endorsement chain helpers", () => {
  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: astronProvider, providerOrSigner: astronProvider });
  });

  describe("fetchEventTime", () => {
    it("should return correct formatted timestamp in milliseconds for block 0 with amoy provider", async () => {
      const timeOfBlockZero = await fetchEventTime(0, astronProvider);
      expect(timeOfBlockZero).toBe(1595302908000);
    });

    it("should return correct formatted timestamp in milliseconds for block 1 with amoy provider", async () => {
      const timeOfBlockOne = await fetchEventTime(1, astronProvider);
      expect(timeOfBlockOne).toBe(1726651363000);
    });
  });

  it("extract title escrow address on surrendered/burn title escrow", async () => {
    const tokenRegistry = TradeTrustToken__factory.connect(
      "0x0D5da59B93e8AC9b1781CE5694fbcE626586F4c9",
      astronProvider
    );
    const result = await retrieveTitleEscrowAddressOnFactory(
      tokenRegistry,
      "0x31303535c19053deffa5f2c7c457992d988c0dc736e4d77b5b1202255cbdb58b",
      astronProvider
    );
    expect(result).toBe("0xe9bBb0C3f3F12E73eBB6DF1fF7713B56CDCEF890");
  });
});
