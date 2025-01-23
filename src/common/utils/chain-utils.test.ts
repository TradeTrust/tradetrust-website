import { walletAddChain } from "./chain-utils";
import { ChainId, ChainInfo } from "../../constants/chain-info";

jest.mock("../../constants/chain-info", () => ({
  ChainId: {
    Ethereum: 1,
    Polygon: 137,
  },
  ChainInfo: {
    1: {
      label: "Ethereum",
      chainId: 1,
      iconImage: "/static/images/networks/ethereum.gif",
      networkName: "homestead",
      networkLabel: "Ethereum",
      explorerUrl: "https://etherscan.io",
      rpcUrl: undefined,
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18,
      },
    },
    137: {
      label: "Polygon",
      chainId: 137,
      iconImage: "/static/images/networks/polygon.gif",
      networkName: "matic",
      networkLabel: "Polygon",
      explorerUrl: "https://polygonscan.com",
      rpcUrl: "https://polygon-rpc.com",
      nativeCurrency: {
        name: "Matic",
        symbol: "MATIC",
        decimals: 18,
      },
    },
  },
}));

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
