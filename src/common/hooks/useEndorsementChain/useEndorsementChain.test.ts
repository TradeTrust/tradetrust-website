import { getDefaultProvider } from "ethers";
import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { useEndorsementChain } from "./useEndorsementChain";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { fetchEscrowTransfers } from "./fetchEscrowTransfer";

jest.mock("../useTokenRegistryContract");
jest.mock("./fetchEscrowTransfer");

const mockUseTokenRegistryContract = useTokenRegistryContract as jest.Mock;
const mockFetchEscrowTransfers = fetchEscrowTransfers as jest.Mock;

const mockTransferFilter = jest.fn();
const mockQueryFilter = jest.fn();

const ropstenProvider = getDefaultProvider("ropsten");

const mockTitleEscrowEvent = {
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
};

const resetMock = () => {
  [mockUseTokenRegistryContract, mockFetchEscrowTransfers, mockTransferFilter, mockQueryFilter].forEach((mock) =>
    mock.mockReset()
  );
};

const setupMock = () => {
  mockUseTokenRegistryContract.mockReturnValue({
    tokenRegistry: { filters: { Transfer: mockTransferFilter }, queryFilter: mockQueryFilter },
  });
  mockFetchEscrowTransfers.mockResolvedValue(mockTitleEscrowEvent);
  mockQueryFilter.mockResolvedValue([
    { blockNumber: 1, transactionHash: "0xA0", args: { from: "0xA1", to: "0xA2" } },
    { blockNumber: 2, transactionHash: "0xB0", args: { from: "0xB1", to: "0xB2" } },
  ]);
  mockTransferFilter.mockReturnValue("MOCK_FILTER");
};

describe("useEndorsementChain", () => {
  beforeEach(() => {
    resetMock();
    setupMock();
  });

  it("should return the correct endorsement chain", async () => {
    const { result } = renderHook(() =>
      useEndorsementChain(
        "0x10E936e6BA85dC92505760259881167141365821",
        "0x38082975c9b82138f8c154d97206861bf0eaac46ab59855c1931ed218f82c54f",
        ropstenProvider
      )
    );
    await act(async () => {
      await waitFor(() => expect(result.current.endorsementChain).toBeTruthy());
    });
    expect(result.current.pending).toBe(false);
    expect(result.current.error).toBe("");
    expect(result.current.endorsementChain).toEqual([mockTitleEscrowEvent, mockTitleEscrowEvent]);

    expect(mockFetchEscrowTransfers.mock.calls[0][0]).toBe("0xA2");
    expect(mockFetchEscrowTransfers.mock.calls[1][0]).toBe("0xB2");

    expect(mockTransferFilter).toBeCalledWith(
      null,
      null,
      "0x38082975c9b82138f8c154d97206861bf0eaac46ab59855c1931ed218f82c54f"
    );
    expect(mockUseTokenRegistryContract.mock.calls[0][0]).toBe("0x10E936e6BA85dC92505760259881167141365821");
    expect(mockQueryFilter).toBeCalledWith("MOCK_FILTER");
  });

  it("should populate error and fail gracefully when an error occurs", async () => {
    mockFetchEscrowTransfers.mockResolvedValueOnce(mockTitleEscrowEvent);
    mockFetchEscrowTransfers.mockRejectedValueOnce(new Error("Something went wrong"));
    const { result } = renderHook(() =>
      useEndorsementChain(
        "0x10E936e6BA85dC92505760259881167141365821",
        "0x38082975c9b82138f8c154d97206861bf0eaac46ab59855c1931ed218f82c54f",
        ropstenProvider
      )
    );
    await act(async () => {
      await waitFor(() => expect(result.current.error).toBeTruthy());
    });
    expect(result.current.error).toBe("Something went wrong");
  });
});
