import { convertSecondsToMinAndSec, isEthereumAddress } from "./";

describe("utils/isEthereumAddress", () => {
  test("should work", () => {
    expect(isEthereumAddress("0x")).toEqual(false);
    expect(isEthereumAddress("")).toEqual(false);
    expect(isEthereumAddress("foo")).toEqual(false);
    expect(isEthereumAddress("0x67b5Bc373cAA527Cee654d6A0f629ba1E84fAd02")).toEqual(true);
    expect(isEthereumAddress("0x67b5Bc373cAA527Cee654d6A0f629ba1E84fAd02".toLowerCase())).toEqual(true);
  });
});

describe("convertSecondsToMinAndSec", () => {
  it("should return the correct min and sec based on the payload", () => {
    expect(convertSecondsToMinAndSec(5)).toEqual("0:05m");
    expect(convertSecondsToMinAndSec(60)).toEqual("1:00m");
    expect(convertSecondsToMinAndSec(730)).toEqual("12:10m");
    expect(convertSecondsToMinAndSec(1065)).toEqual("17:45m");
    expect(convertSecondsToMinAndSec(2368)).toEqual("39:28m");
  });
});
