import { ethers } from "ethers";
import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { useEndorsementChain } from "./useEndorsementChain";
import { useProviderContext } from "../../contexts/provider";
import { ALCHEMY_API_KEY } from "../../../config";

jest.mock("../../contexts/provider");

const mumbaiProvider = new ethers.providers.AlchemyProvider("maticmum", ALCHEMY_API_KEY);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("useEndorsementChain|integration", () => {
  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: mumbaiProvider, providerOrSigner: mumbaiProvider });
  });
  it("should work correctly for a given tokenRegistryAddress + tokenId with Transfer, Surrender, Burnt events", async () => {
    const { result } = renderHook(() =>
      useEndorsementChain(
        "0x072FB36B73a7f52A23ea53162583f78ba3Bc6DEa",
        "0x4c3e71fe22cc3a5fea77244fb974e148694437fe48c776719a3a2c9e1af3586e"
      )
    );
    await act(async () => {
      await waitFor(
        () => {
          expect(result.current.endorsementChain).toBeTruthy();
        },
        { timeout: 40000 }
      );
    });
    expect(result.current.endorsementChain).toEqual([
      {
        type: "INITIAL",
        transactionHash: "0x8b3dcd4586c25b8f3efe4f0e2b792e6f2e3afc4be3df90cbd4235fc1099bb8e6",
        transactionIndex: 13,
        blockNumber: 36546402,
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1686122577000,
      },
      {
        type: "TRANSFER_HOLDER",
        transactionHash: "0xc13a561882a46bdc1f6b330abce725904451d82c1c73002fc2e5398315bbf671",
        transactionIndex: 22,
        blockNumber: 36790987,
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        holder: "0xE4D83Aa444AF12E2B39e9Eb80AA8D6F0A9c79e6D",
        timestamp: 1686643609000,
      },
      {
        type: "TRANSFER_BENEFICIARY",
        transactionHash: "0x4d9d3ba1ae289777580115f294d2f478224329f17a6658dd52065351c48cca14",
        transactionIndex: 31,
        blockNumber: 36791009,
        owner: "0xE4D83Aa444AF12E2B39e9Eb80AA8D6F0A9c79e6D",
        holder: "0xE4D83Aa444AF12E2B39e9Eb80AA8D6F0A9c79e6D",
        timestamp: 1686643657000,
      },
      {
        type: "TRANSFER_OWNERS",
        transactionHash: "0xb59ba6c9dac6ede91f0915d24f304cd57b8cf7c0ea83af98757fcf1ba9f48ab1",
        transactionIndex: 18,
        blockNumber: 36791033,
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1686643707000,
      },
      {
        type: "SURRENDERED",
        transactionHash: "0xf779b4bac0e578190470c89147e400059c56cfed9546e14133b6c4b109ff00c6",
        transactionIndex: 35,
        blockNumber: 36792124,
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1686646030000,
      },
      {
        type: "SURRENDER_REJECTED",
        transactionHash: "0x6ee28c3e41b72c2487c0e3598bb91e3abcccc095bbeb40d03eb4dc7665955287",
        transactionIndex: 37,
        blockNumber: 36792132,
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1686646048000,
      },
    ]);
    expect(result.current.error).toBe("");
    expect(result.current.pending).toBe(false);
  }, 50000);
});
