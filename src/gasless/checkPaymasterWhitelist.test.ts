import { createPublicClient } from "viem";
import { checkPaymasterWhitelist } from "./checkPaymasterWhitelist";

jest.mock("viem", () => ({
  ...jest.requireActual("viem"),
  createPublicClient: jest.fn(),
}));

describe("checkPaymasterWhitelist", () => {
  const paymasterAddress = "0x2222222222222222222222222222222222222222";
  const userAddress = "0x1111111111111111111111111111111111111111";
  const titleEscrowAddress = "0x3333333333333333333333333333333333333333";
  const rpcUrl = "https://rpc.example.com";

  const mockReadContract = jest.fn();

  beforeEach(() => {
    mockReadContract.mockReset();
    (createPublicClient as jest.Mock).mockReturnValue({ readContract: mockReadContract });
  });

  it("returns both flags true when caller and title escrow are authorized", async () => {
    mockReadContract.mockImplementation(({}: { functionName: string }) => Promise.resolve(true));

    const result = await checkPaymasterWhitelist(paymasterAddress, userAddress, titleEscrowAddress, rpcUrl);

    expect(result).toEqual({ isCallerAuthorized: true, isTitleEscrowAuthorized: true });
  });

  it("returns isCallerAuthorized=false when the caller is not whitelisted", async () => {
    mockReadContract.mockImplementation(({ functionName }: { functionName: string }) =>
      Promise.resolve(functionName === "authorizedCallers" ? false : true)
    );

    const result = await checkPaymasterWhitelist(paymasterAddress, userAddress, titleEscrowAddress, rpcUrl);

    expect(result).toEqual({ isCallerAuthorized: false, isTitleEscrowAuthorized: true });
  });

  it("returns isTitleEscrowAuthorized=false when the title escrow is not whitelisted", async () => {
    mockReadContract.mockImplementation(({ functionName }: { functionName: string }) =>
      Promise.resolve(functionName === "authorizedTitleEscrows" ? false : true)
    );

    const result = await checkPaymasterWhitelist(paymasterAddress, userAddress, titleEscrowAddress, rpcUrl);

    expect(result).toEqual({ isCallerAuthorized: true, isTitleEscrowAuthorized: false });
  });

  it("returns both flags false when neither is whitelisted", async () => {
    mockReadContract.mockResolvedValue(false);

    const result = await checkPaymasterWhitelist(paymasterAddress, userAddress, titleEscrowAddress, rpcUrl);

    expect(result).toEqual({ isCallerAuthorized: false, isTitleEscrowAuthorized: false });
  });

  it("calls readContract with the correct address/args for each check", async () => {
    mockReadContract.mockResolvedValue(true);

    await checkPaymasterWhitelist(paymasterAddress, userAddress, titleEscrowAddress, rpcUrl);

    expect(mockReadContract).toHaveBeenCalledWith(
      expect.objectContaining({
        address: paymasterAddress,
        functionName: "authorizedCallers",
        args: [userAddress],
      })
    );
    expect(mockReadContract).toHaveBeenCalledWith(
      expect.objectContaining({
        address: paymasterAddress,
        functionName: "authorizedTitleEscrows",
        args: [titleEscrowAddress],
      })
    );
  });

  it("propagates errors from the RPC call", async () => {
    mockReadContract.mockRejectedValue(new Error("RPC unreachable"));

    await expect(checkPaymasterWhitelist(paymasterAddress, userAddress, titleEscrowAddress, rpcUrl)).rejects.toThrow(
      "RPC unreachable"
    );
  });
});
