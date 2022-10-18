import { ethers } from "ethers";
import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { useEndorsementChain } from "./useEndorsementChain";
import { useProviderContext } from "../../contexts/provider";
import { INFURA_API_KEY } from "../../../config";

jest.mock("../../contexts/provider");

const goerliProvider = new ethers.providers.InfuraProvider("goerli", INFURA_API_KEY);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("useEndorsementChain|integration", () => {
  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: goerliProvider, providerOrSigner: goerliProvider });
  });
  it("should work correctly for a given tokenRegistryAddress + tokenId with Transfer, Surrender, Burnt events", async () => {
    const { result } = renderHook(() =>
      useEndorsementChain(
        "0x921dC7cEF00155ac3A33f04DA7395324d7809757",
        "0xd460ad40fd50acc71936d0fbcdb3d25c38544eba38d47bd16b1e5350eeef24f8"
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
        eventType: "Transfer",
        documentOwner: "0x7ABB00E62C37805A9231C004Eb94271dFC7FC8F5",
        beneficiary: "0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C",
        holderChangeEvents: [
          {
            blockNumber: 7713467,
            holder: "0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C",
            timestamp: 1664934528000,
          },
          {
            blockNumber: 7713590,
            holder: "0xa61B056dA0084a5f391EC137583073096880C2e3",
            timestamp: 1664936292000,
          },
        ],
      },
      {
        eventType: "Transfer",
        documentOwner: "0x05AD2ce3Bb0Cb6A3aaD7b5B03E808C5f02e68236",
        beneficiary: "0xa61B056dA0084a5f391EC137583073096880C2e3",
        holderChangeEvents: [
          {
            blockNumber: 7713598,
            holder: "0xa61B056dA0084a5f391EC137583073096880C2e3",
            timestamp: 1664936424000,
          },
        ],
      },
      {
        eventType: "Transfer",
        documentOwner: "0xA58Fa534bf076Ff4722885C9198eD6DAa8Ff8341",
        beneficiary: "0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e",
        holderChangeEvents: [
          {
            blockNumber: 7713602,
            holder: "0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e",
            timestamp: 1664936472000,
          },
        ],
      },
      {
        documentOwner: "0x921dC7cEF00155ac3A33f04DA7395324d7809757",
        eventTimestamp: 1664936544000,
        eventType: "Surrender",
      },
      {
        documentOwner: "0x000000000000000000000000000000000000dEaD",
        eventTimestamp: 1664936616000,
        eventType: "Burnt",
      },
    ]);
    expect(result.current.error).toBe("");
    expect(result.current.pending).toBe(false);
  }, 50000);
});
