import { isEthereumAddress } from "./";

describe("utils/isEthereumAddress", () => {
  test("should work", () => {
    expect(isEthereumAddress("0x")).toEqual(false);
    expect(isEthereumAddress("")).toEqual(false);
    expect(isEthereumAddress("foo")).toEqual(false);
    expect(isEthereumAddress("0x67b5Bc373cAA527Cee654d6A0f629ba1E84fAd02")).toEqual(true);
    expect(isEthereumAddress("0x67b5Bc373cAA527Cee654d6A0f629ba1E84fAd02".toLowerCase())).toEqual(true);
  });
});
