import {
  isSmartContract,
  areSmartContracts,
  getContractAddress
} from "./index";

describe("isSmartContract", () => {
  it("should return false when the address does not contain a smart contract", () => {
    const mockWeb3 = { eth: { getCode: jest.fn() } };

    const generator = isSmartContract("0xCONTRACT_ADDRESS");
    generator.next();
    generator.next(mockWeb3);

    const isValidContract = generator.next("0x").value;

    expect(mockWeb3.eth.getCode.mock.calls[0]).toEqual(["0xCONTRACT_ADDRESS"]);
    expect(isValidContract).toBe(false);
  });

  it("should return true when the address contains a smart contract", () => {
    const mockWeb3 = { eth: { getCode: jest.fn() } };

    const generator = isSmartContract("0xCONTRACT_ADDRESS");
    generator.next();
    generator.next(mockWeb3);

    const isValidContract = generator.next("0x608000").value;

    expect(mockWeb3.eth.getCode.mock.calls[0]).toEqual(["0xCONTRACT_ADDRESS"]);
    expect(isValidContract).toBe(true);
  });
});

describe("areSmartContracts", () => {
  it("should return true when all addresses contains smart contracts", () => {
    const addresses = ["0xETH_ADD1", "0xETH_ADD2"];

    const generator = areSmartContracts(addresses);
    generator.next();
    const result = generator.next([true, true]).value;
    expect(result).toBe(true);
  });

  it("should return false when any address contains smart contracts", () => {
    const addresses = ["0xETH_ADD1", "0xETH_ADD2"];

    const generator = areSmartContracts(addresses);
    generator.next();
    const result = generator.next([true, false]).value;
    expect(result).toBe(false);
  });
});

describe("getContractAddress", () => {
  it("should return the tokenRegistry", () => {
    const issuer = { tokenRegistry: "0xETH_ADD" };
    const address = getContractAddress(issuer);
    expect(address).toBe("0xETH_ADD");
  });
  it("should return the documentStore", () => {
    const issuer = { documentStore: "0xETH_ADD" };
    const address = getContractAddress(issuer);
    expect(address).toBe("0xETH_ADD");
  });
});
