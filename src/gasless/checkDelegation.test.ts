import { checkEIP7702Delegation } from "./checkDelegation";

describe("checkEIP7702Delegation", () => {
  const rpcUrl = "https://rpc.example.com";
  const userAddress = "0x1111111111111111111111111111111111111111";

  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
  });

  it("returns true when eth_getCode returns the EIP-7702 delegation prefix", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ result: "0xef0100aabbccddeeff00112233445566778899aabb" }),
    });

    const result = await checkEIP7702Delegation(userAddress, rpcUrl);

    expect(result).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      rpcUrl,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getCode",
          params: [userAddress, "latest"],
        }),
      })
    );
  });

  it("matches the delegation prefix case-insensitively", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ result: "0xEF0100aabbccddeeff00112233445566778899aabb" }),
    });

    const result = await checkEIP7702Delegation(userAddress, rpcUrl);

    expect(result).toBe(true);
  });

  it("returns false when the account has no code", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ result: "0x" }),
    });

    const result = await checkEIP7702Delegation(userAddress, rpcUrl);

    expect(result).toBe(false);
  });

  it("returns false when the account has unrelated contract code", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ result: "0x608060405234801561001057600080fd5b50" }),
    });

    const result = await checkEIP7702Delegation(userAddress, rpcUrl);

    expect(result).toBe(false);
  });

  it("returns false when the RPC response has no result field", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => ({ error: { code: -32000, message: "boom" } }),
    });

    const result = await checkEIP7702Delegation(userAddress, rpcUrl);

    expect(result).toBe(false);
  });

  it("returns false when fetch rejects", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("network down"));

    const result = await checkEIP7702Delegation(userAddress, rpcUrl);

    expect(result).toBe(false);
  });

  it("returns false when response.json() rejects", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      json: async () => {
        throw new Error("invalid json");
      },
    });

    const result = await checkEIP7702Delegation(userAddress, rpcUrl);

    expect(result).toBe(false);
  });
});
