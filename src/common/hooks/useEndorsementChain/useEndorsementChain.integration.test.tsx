import { getDefaultProvider } from "ethers";
import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { useEndorsementChain } from "./useEndorsementChain";
import { useProviderContext } from "../../contexts/provider";

jest.mock("../../contexts/provider");

const ropstenProvider = getDefaultProvider("ropsten");

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("useEndorsementChain|integration", () => {
  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: ropstenProvider });
  });
  it("should work correctly for a given document ID and token registry", async () => {
    const { result } = renderHook(() =>
      useEndorsementChain(
        "0x10E936e6BA85dC92505760259881167141365821",
        "0x38082975c9b82138f8c154d97206861bf0eaac46ab59855c1931ed218f82c54f"
      )
    );
    await act(async () => {
      await waitFor(() => expect(result.current.endorsementChain).toBeTruthy(), { timeout: 15000 });
    });
    expect(result.current.endorsementChain).toEqual([
      {
        titleEscrowAddress: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
        beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
        holderChangeEvents: [
          {
            blockNumber: 8282976,
            holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
            timestamp: 1594608110000,
          },
          {
            blockNumber: 8283034,
            holder: "0x8e87c7cEc2D4464119C937bfef3398ebb1d9452e",
            timestamp: 1594608809000,
          },
        ],
      },
      {
        titleEscrowAddress: "0xe23e0E06DF75279Fb9A4471adCbeb9c240E5C4F3",
        beneficiary: "0x32507B8838562c0fc881dA6Ce00162B184a34955",
        holderChangeEvents: [
          {
            blockNumber: 8283040,
            holder: "0x32507B8838562c0fc881dA6Ce00162B184a34955",
            timestamp: 1594608903000,
          },
        ],
      },
      {
        titleEscrowAddress: "0xd413cF518B7aE838fbd994a653Af350AF6f72379",
        beneficiary: "0x5B1c22C60E66E58B07Fc00191e5603d0C41d3538",
        holderChangeEvents: [
          {
            blockNumber: 8283046,
            holder: "0x5B1c22C60E66E58B07Fc00191e5603d0C41d3538",
            timestamp: 1594609044000,
          },
        ],
      },
      {
        titleEscrowAddress: "0xBee0875Ba8069ed5c48E6A670118EF1C6B1E7fC0",
        beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
        holderChangeEvents: [
          {
            blockNumber: 8283050,
            holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
            timestamp: 1594609105000,
          },
        ],
      },
    ]);
    expect(result.current.error).toBe("");
    expect(result.current.pending).toBe(false);
  }, 30000);
});
