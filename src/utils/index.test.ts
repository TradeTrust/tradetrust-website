import { combinedHash, isEthereumAddress } from "./index";

describe("combinedHash", () => {
  it("should work with two strings", () => {
    expect(combinedHash("foo", "bar").toString("hex")).toBe(
      "24e03926e272d3112eace88e8d04303e287d51571475e2334346dcc69f21041f"
    );
  });
});

describe("isEthereumAddress", () => {
  it("should return true on a valid ethereum address", () => {
    expect(isEthereumAddress("0x314159265dd8dbb310642f98f50c066173c1259b")).toBe(true);
  });

  it("should return false on invalid addresses", () => {
    expect(isEthereumAddress("foo")).toBe(false);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(isEthereumAddress(123)).toBe(false);
    expect(isEthereumAddress("0x1232")).toBe(false);
  });

  it("should return false on empty strings", () => {
    expect(isEthereumAddress("")).toBe(false);
  });

  it("should return false on undefined", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(isEthereumAddress(undefined)).toBe(false);
  });
});
