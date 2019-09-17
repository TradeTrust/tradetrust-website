import { isSmartContract, areSmartContracts } from "./index";

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

it("should return true when all addresses contains smart contracts", () => {
  const addresses = ["0xETH_ADD1", "0xETH_ADD2"];

  const generator = areSmartContracts(addresses);
  generator.next();
  const result = generator.next([true, true]).value;
  expect(result).toBe(true);
});
