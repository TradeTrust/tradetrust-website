const { accounts, defaultSender, contract, web3, provider, isHelpersConfigured } = require('@openzeppelin/test-environment'); 
import { ethers } from "ethers";
import { renderHook } from "@testing-library/react-hooks";
import { setWeb3Provider, setWallet, TitleEscrowOwner, createOwner } from "@govtechsg/oa-token";


import {abi as TitleEscrowABI, bytecode as TitleEscrowBytecode} from "./build/contracts/TitleEscrow.json";
import {abi as TradeTrustERC721ABI, bytecode as TradeTrustERC721Bytecode} from "./build/contracts/TradeTrustERC721.json";

const TradeTrustERC721 = contract.fromABI(TradeTrustERC721ABI, TradeTrustERC721Bytecode);
const TitleEscrow = contract.fromABI(TitleEscrowABI, TitleEscrowBytecode);
import { useEscrowContractUsers } from "./useEscrowContractUsers";
import {useWeb3Provider} from "./useWeb3Provider";

jest.mock("./useWeb3Provider");

describe("UseEscrowContractUsersHook", () => {
  let ERC721Address;
  let ERC721Instance;

  const [sender, receiver] = accounts;
  beforeEach(async () => {  
    ERC721Instance = await TradeTrustERC721.new("foo", "bar");
    ERC721Address = ERC721Instance.address;
    setWeb3Provider(provider);
  });

  afterEach(() => {
    setWeb3Provider(undefined);
    setWallet(undefined);
  });

  it("should return beneficiary and holder address from the escrow contract", async () => {
    useWeb3Provider.mockReturnValue({ web3Provider: provider });
    const escrowInstance = await TitleEscrow.new(ERC721Address, sender, receiver, {
      from: sender
    });
    const {result, waitForNextUpdate} = renderHook(() => useEscrowContractUsers({ escrowContractAddress: escrowInstance.address }));
    await waitForNextUpdate();
    expect(result.current.holderAddress).toEqual(sender);
    expect(result.current.beneficiaryAddress).toEqual(receiver);
  });
});