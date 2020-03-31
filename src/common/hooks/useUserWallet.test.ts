import { provider, defaultSender } from "@openzeppelin/test-environment";
import { renderHook } from "@testing-library/react-hooks";
import { ethers, providers } from "ethers";
import { useUserWallet } from "./useUserWallet";

import { useInjectedProvider } from "./useInjectedProvider";

jest.mock("./useInjectedProvider");

describe("UseUserWallet", () => {
  let web3Provider: providers.Web3Provider;
  beforeEach(async () => {
    web3Provider = new ethers.providers.Web3Provider(provider as any);
  });

  it("should return use wallet address and network name and id", async () => {
    (useInjectedProvider as jest.Mock).mockReturnValue({ provider: web3Provider });

    const { result, waitForNextUpdate } = renderHook(() => useUserWallet());

    expect(result.current.state.status).toEqual("loading");
    expect(result.current.userWalletAddress).toEqual("");
    expect(result.current.network).toEqual("ropsten");
    expect(result.current.networkId).toEqual(3);
    await waitForNextUpdate();
    expect(result.current.state.status).toEqual("loading");
    expect(result.current.userWalletAddress).toEqual(defaultSender);
    await waitForNextUpdate();
    expect(result.current.state.status).toEqual("success");
    expect(result.current.network).toEqual("unknown");
  });

  it("should throw error Accounts not found", async () => {
    (useInjectedProvider as jest.Mock).mockReturnValue({
      provider: {
        ...web3Provider,
        ...{ listAccounts: () => [], getNetwork: () => ({ chainId: 1, network: "abc" }) }
      }
    });
    const { result, waitForNextUpdate } = renderHook(() => useUserWallet());

    expect(result.current.state.status).toEqual("loading");
    expect(result.current.userWalletAddress).toEqual("");
    expect(result.current.network).toEqual("ropsten");
    expect(result.current.networkId).toEqual(3);
    await waitForNextUpdate();
    expect(result.current.state.status).toEqual("error");
    expect(result.current.state.error).toEqual("Accounts not found");
  });

  it("should throw error Can not detect metamask network", async () => {
    (useInjectedProvider as jest.Mock).mockReturnValue({
      provider: { ...web3Provider, ...{ listAccounts: () => ["0xABC"], getNetwork: () => null } }
    });
    const { result, waitForNextUpdate } = renderHook(() => useUserWallet());

    expect(result.current.state.status).toEqual("loading");
    expect(result.current.userWalletAddress).toEqual("");
    expect(result.current.network).toEqual("ropsten");
    expect(result.current.networkId).toEqual(3);
    await waitForNextUpdate();
    expect(result.current.state.status).toEqual("error");
    expect(result.current.state.error).toEqual("Can not detect metamask network");
  });
});
