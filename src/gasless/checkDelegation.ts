const EIP7702_PREFIX = "0xef0100";
const REQUEST_TIMEOUT_MS = 10_000;

export async function checkEIP7702Delegation(userAddress: string, rpcUrl: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getCode",
        params: [userAddress, "latest"],
      }),
    });
    clearTimeout(timeoutId);
    const { result } = (await response.json()) as { result?: string };
    return typeof result === "string" && result.toLowerCase().startsWith(EIP7702_PREFIX);
  } catch {
    return false;
  }
}
