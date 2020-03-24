import { accounts, contract, provider } from "@openzeppelin/test-environment";
import { renderHook } from "@testing-library/react-hooks";
import { ethers, providers } from "ethers";
import {
  TitleEscrowABI,
  TitleEscrowByteCode,
  TokenRegistryByteCode,
  TokenRegistryABI,
  TokenRegistry
} from "@govtechsg/oa-token";

const TradeTrustERC721 = contract.fromABI(TokenRegistryABI, TokenRegistryByteCode);
const TitleEscrow = contract.fromABI(TitleEscrowABI, TitleEscrowByteCode);
import { useEscrowContractUsers } from "./useEscrowContractUsers";
import { useWeb3Provider } from "./useWeb3Provider";

jest.mock("./useWeb3Provider");

describe("UseEscrowContractUsersHook", () => {
  let ERC721Address: string;
  let ERC721Instance: TokenRegistry;
  let web3Provider: providers.Web3Provider;

  const [sender, receiver] = accounts;
  beforeEach(async () => {
    ERC721Instance = await TradeTrustERC721.new("foo", "bar");
    ERC721Address = ERC721Instance.address;
    web3Provider = new ethers.providers.Web3Provider(provider as any);
  });

  it("should return beneficiary and holder address from the escrow contract", async () => {
    (useWeb3Provider as jest.Mock).mockReturnValue({ web3Provider });
    const escrowInstance = await TitleEscrow.new(ERC721Address, sender, receiver, {
      from: sender
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useEscrowContractUsers({ escrowContractAddress: escrowInstance.address })
    );

    expect(result.current.state.status).toEqual("loading");
    expect(result.current.holderAddress).toEqual("");
    expect(result.current.beneficiaryAddress).toEqual("");
    await waitForNextUpdate();
    expect(result.current.state.status).toEqual("success");
    expect(result.current.holderAddress).toEqual(receiver);
    expect(result.current.beneficiaryAddress).toEqual(sender);
  });

  it("should throw error if address is not an escrow contract", async () => {
    (useWeb3Provider as jest.Mock).mockReturnValue({ web3Provider });

    const { result, waitForNextUpdate } = renderHook(() => useEscrowContractUsers({ escrowContractAddress: sender }));

    expect(result.current.state.status).toEqual("loading");
    expect(result.current.holderAddress).toEqual("");
    expect(result.current.beneficiaryAddress).toEqual("");
    await waitForNextUpdate();
    expect(result.current.state.status).toEqual("error");
    expect(result.current.state.error).toEqual("Address is not an Escrow contract");
  });
});
