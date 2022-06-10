import { walletAddChain } from "./chain-utils";
import { ChainId, ChainInfo } from "../../constants/chain-info";

describe("walletAddChain Tests", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.ethereum = jest.fn();
    window.ethereum.request = jest.fn().mockResolvedValue(undefined);
  });

  it("should call with the correct params", async () => {
    const chainInfo = ChainInfo[ChainId.Polygon];
    const expectedParams = [
      {
        chainId: `0x${ChainId.Polygon.toString(16)}`,
        chainName: chainInfo.networkLabel,
        nativeCurrency: chainInfo.nativeCurrency,
        blockExplorerUrls: [chainInfo.explorerUrl],
        rpcUrls: [chainInfo.rpcUrl],
      },
    ];

    await walletAddChain(ChainId.Polygon);

    expect(window.ethereum.request).toBeCalledWith({
      method: "wallet_addEthereumChain",
      params: expectedParams,
    });
  });

  it("should return if wallet is not installed", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.ethereum = jest.fn().mockReturnValue(undefined);
    const res = walletAddChain(ChainId.Ethereum);

    await expect(res).resolves.toEqual(undefined);
  });

  it("should return if rpc url is undefined", async () => {
    await walletAddChain(ChainId.Ethereum);

    expect(window.ethereum.request).not.toBeCalled();
  });

  it("should reject if user cancelled add network in wallet", async () => {
    window.ethereum.request = jest.fn().mockRejectedValue(new Error());

    const res = walletAddChain(ChainId.Polygon);

    await expect(res).rejects.toEqual(Error());
  });
});
