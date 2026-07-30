import { createPublicClient, http } from "viem";

const PAYMASTER_ABI = [
  {
    name: "authorizedCallers",
    type: "function",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
  },
  {
    name: "authorizedTitleEscrows",
    type: "function",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
  },
] as const;

export interface PaymasterWhitelistResult {
  isCallerAuthorized: boolean;
  isTitleEscrowAuthorized: boolean;
}

export async function checkPaymasterWhitelist(
  paymasterAddress: string,
  userAddress: string,
  titleEscrowAddress: string,
  rpcUrl: string
): Promise<PaymasterWhitelistResult> {
  const publicClient = createPublicClient({ transport: http(rpcUrl) });

  const [isCallerAuthorized, isTitleEscrowAuthorized] = await Promise.all([
    publicClient.readContract({
      address: paymasterAddress as `0x${string}`,
      abi: PAYMASTER_ABI,
      functionName: "authorizedCallers",
      args: [userAddress as `0x${string}`],
    }),
    publicClient.readContract({
      address: paymasterAddress as `0x${string}`,
      abi: PAYMASTER_ABI,
      functionName: "authorizedTitleEscrows",
      args: [titleEscrowAddress as `0x${string}`],
    }),
  ]);

  return { isCallerAuthorized, isTitleEscrowAuthorized };
}
