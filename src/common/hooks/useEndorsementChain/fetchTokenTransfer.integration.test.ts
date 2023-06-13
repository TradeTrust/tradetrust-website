import { ethers } from "ethers";
import { useProviderContext } from "../../contexts/provider";
import { ALCHEMY_API_KEY } from "../../../config";
import { fetchTokenTransfers, identifyTokenTransferEventsFunction } from "./fetchTokenTransfer";
import { TradeTrustToken__factory } from "@govtechsg/token-registry/dist/contracts";
import { LogDescription, Result } from "ethers/lib/utils";

jest.mock("../../contexts/provider");

const mumbaiProvider = new ethers.providers.AlchemyProvider("maticmum", ALCHEMY_API_KEY);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Fetch Token Transfers", () => {
  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: mumbaiProvider, providerOrSigner: mumbaiProvider });
  });

  describe("fetch from token registry with token id", () => {
    it("should return parsed transfer logs in valid format", async () => {
      const tokenRegistry = TradeTrustToken__factory.connect(
        "0x072FB36B73a7f52A23ea53162583f78ba3Bc6DEa",
        mumbaiProvider
      );
      if (!tokenRegistry) throw new Error("Unable to connect to token registry: Test Failed");
      const tokenTransfers = await fetchTokenTransfers(
        tokenRegistry,
        "0x4c3e71fe22cc3a5fea77244fb974e148694437fe48c776719a3a2c9e1af3586e"
      );
      expect(tokenTransfers).toEqual([
        {
          type: "INITIAL",
          from: "0x0000000000000000000000000000000000000000",
          to: "0xF9F8Cf68F297D60743B1E43991EC5E47526c0f9E",
          blockNumber: 36546402,
          transactionHash: "0x8b3dcd4586c25b8f3efe4f0e2b792e6f2e3afc4be3df90cbd4235fc1099bb8e6",
          transactionIndex: 13,
        },
        {
          type: "SURRENDERED",
          from: "0xF9F8Cf68F297D60743B1E43991EC5E47526c0f9E",
          to: "0x072FB36B73a7f52A23ea53162583f78ba3Bc6DEa",
          blockNumber: 36792124,
          transactionHash: "0xf779b4bac0e578190470c89147e400059c56cfed9546e14133b6c4b109ff00c6",
          transactionIndex: 35,
        },
        {
          type: "SURRENDER_REJECTED",
          from: "0x072FB36B73a7f52A23ea53162583f78ba3Bc6DEa",
          to: "0xF9F8Cf68F297D60743B1E43991EC5E47526c0f9E",
          blockNumber: 36792132,
          transactionHash: "0x6ee28c3e41b72c2487c0e3598bb91e3abcccc095bbeb40d03eb4dc7665955287",
          transactionIndex: 37,
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
