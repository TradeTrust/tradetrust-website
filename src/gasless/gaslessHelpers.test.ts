import { getMetaMaskErrorMessage, getRpcUrl } from "./gaslessHelpers";
import { ChainInfo, ChainId } from "../constants/chain-info";

describe("getMetaMaskErrorMessage", () => {
  it("maps known MetaMask numeric codes", () => {
    expect(getMetaMaskErrorMessage({ code: 4001 })).toBe("User Rejected Transaction");
    expect(getMetaMaskErrorMessage({ code: 4100 })).toBe("Unauthorized: Account or method not authorized");
    expect(getMetaMaskErrorMessage({ code: -32000 })).toBe("Invalid Input");
    expect(getMetaMaskErrorMessage({ code: -32002 })).toBe("Request Already Pending");
  });

  it("maps known ethers string codes", () => {
    expect(getMetaMaskErrorMessage({ code: "ACTION_REJECTED" })).toBe("User Rejected Transaction");
    expect(getMetaMaskErrorMessage({ code: "INSUFFICIENT_FUNDS" })).toBe("Insufficient Funds");
    expect(getMetaMaskErrorMessage({ code: "CALL_EXCEPTION" })).toBe("Contract Call Failed");
    expect(getMetaMaskErrorMessage({ code: "NONCE_EXPIRED" })).toBe("Nonce Already Used");
  });

  const FALLBACK_MESSAGE = "An unexpected error occurred while processing the transaction";

  it("returns the fallback message for an unrecognized numeric code", () => {
    expect(getMetaMaskErrorMessage({ code: 9999 })).toBe(FALLBACK_MESSAGE);
  });

  it("returns the fallback message for an unrecognized string code", () => {
    expect(getMetaMaskErrorMessage({ code: "SOME_UNKNOWN_CODE" })).toBe(FALLBACK_MESSAGE);
  });

  it("returns the fallback message when the error has no code", () => {
    expect(getMetaMaskErrorMessage(new Error("plain failure"))).toBe(FALLBACK_MESSAGE);
  });

  it("returns the fallback message for non-object inputs", () => {
    expect(getMetaMaskErrorMessage(undefined)).toBe(FALLBACK_MESSAGE);
    expect(getMetaMaskErrorMessage(null)).toBe(FALLBACK_MESSAGE);
    expect(getMetaMaskErrorMessage("string error")).toBe(FALLBACK_MESSAGE);
  });
});

describe("getRpcUrl", () => {
  it("returns the RPC URL for a known chain id (number)", () => {
    const knownChainId = Number(ChainId.Amoy);
    expect(getRpcUrl(knownChainId)).toBe((ChainInfo as any)[knownChainId]?.rpcUrl);
    expect(getRpcUrl(knownChainId)).toBeTruthy();
  });

  it("returns the RPC URL for a known chain id passed as a string", () => {
    const knownChainId = Number(ChainId.Amoy);
    expect(getRpcUrl(String(knownChainId))).toBe((ChainInfo as any)[knownChainId]?.rpcUrl);
  });

  it("returns the public RPC URL for XRPL EVM mainnet and testnet", () => {
    expect(getRpcUrl(ChainId.XRPLEVM)).toBe("https://rpc.xrplevm.org");
    expect(getRpcUrl(ChainId.XRPLEVMTestnet)).toBe("https://rpc.testnet.xrplevm.org");
  });

  it("returns undefined for an unknown chain id", () => {
    expect(getRpcUrl(999999999)).toBeUndefined();
  });

  it("returns undefined for a non-numeric chain id string", () => {
    expect(getRpcUrl("not-a-chain-id")).toBeUndefined();
  });
});
