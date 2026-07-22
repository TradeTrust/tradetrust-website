import { ChainInfo } from "../constants/chain-info";

const METAMASK_NUMERIC_CODES: Record<number, string> = {
  4001: "User Rejected Transaction",
  4100: "Unauthorized: Account or method not authorized",
  4200: "Unsupported Method",
  4900: "Wallet Disconnected",
  4901: "Chain Disconnected",
  [-32700]: "Parse Error",
  [-32600]: "Invalid Request",
  [-32601]: "Method Not Found",
  [-32602]: "Invalid Parameters",
  [-32000]: "Invalid Input",
  [-32001]: "Resource Not Found",
  [-32002]: "Request Already Pending",
  [-32003]: "Transaction Rejected",
  [-32004]: "Method Not Supported",
  [-32005]: "Request Limit Exceeded",
};

const ETHERS_STRING_CODES: Record<string, string> = {
  ACTION_REJECTED: "User Rejected Transaction",
  INSUFFICIENT_FUNDS: "Insufficient Funds",
  UNPREDICTABLE_GAS_LIMIT: "Unable to Estimate Gas",
  NETWORK_ERROR: "Network Error",
  SERVER_ERROR: "Server Error",
  TIMEOUT: "Request Timed Out",
  CALL_EXCEPTION: "Contract Call Failed",
  TRANSACTION_REPLACED: "Transaction Replaced",
  NONCE_EXPIRED: "Nonce Already Used",
  REPLACEMENT_UNDERPRICED: "Replacement Transaction Underpriced",
};

export const getMetaMaskErrorMessage = (e: unknown): string => {
  const code = (e as any)?.code;
  if (typeof code === "number" && code in METAMASK_NUMERIC_CODES) {
    return METAMASK_NUMERIC_CODES[code];
  }
  if (typeof code === "string" && code in ETHERS_STRING_CODES) {
    return ETHERS_STRING_CODES[code];
  }
  return "";
};

export const getRpcUrl = (chainId: string | number): string | undefined => (ChainInfo as any)[Number(chainId)]?.rpcUrl;
