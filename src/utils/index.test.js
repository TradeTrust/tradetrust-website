import { isEthereumAddress } from "./index";

describe("isEthereumAddress", () => {
  it("should return true on a valid ethereum address", () => {
    expect(isEthereumAddress("0x314159265dd8dbb310642f98f50c066173c1259b")).toBe(true);
  });

  it("should return false on invalid addresses", () => {
    expect(isEthereumAddress("foo")).toBe(false);
    expect(isEthereumAddress(123)).toBe(false);
    expect(isEthereumAddress("0x1232")).toBe(false);
  });

  it("should return false on empty strings", () => {
    expect(isEthereumAddress("")).toBe(false);
  });

  it("should return false on undefined", () => {
    expect(isEthereumAddress(undefined)).toBe(false);
  });
});
