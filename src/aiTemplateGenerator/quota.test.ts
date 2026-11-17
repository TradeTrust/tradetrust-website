import { getQuota } from "./quota";

describe("getQuota", () => {
  const fetchMock = window.fetch as jest.Mock;

  beforeEach(() => {
    fetchMock.mockReset();
  });

  it("returns the attempts remaining from GET /template-generator/quota", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ attemptsRemaining: 2, message: "do not show" }),
    });

    await expect(getQuota("token-a")).resolves.toEqual({ ok: true, attemptsRemaining: 2 });
    expect(fetchMock).toHaveBeenCalledWith("/template-generator/quota", {
      method: "GET",
      headers: { Accept: "application/json", Authorization: "Bearer token-a" },
    });
  });

  it("maps known codes and a bare 401, and drops any raw message", async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({ code: "RATE_LIMITED", message: "raw rate text" }),
    });
    await expect(getQuota("token-a")).resolves.toEqual({ ok: false, code: "RATE_LIMITED" });

    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: "raw auth text" }),
    });
    await expect(getQuota("token-a")).resolves.toEqual({ ok: false, code: "AUTH_REQUIRED" });

    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ code: "SOMETHING_ELSE", message: "stack" }),
    });
    await expect(getQuota("token-a")).resolves.toEqual({ ok: false, code: "UNKNOWN" });
  });

  it("does not surface a network failure", async () => {
    fetchMock.mockRejectedValue(new Error("socket hang up"));
    await expect(getQuota("token-a")).resolves.toEqual({ ok: false, code: "UNKNOWN" });
  });
});
