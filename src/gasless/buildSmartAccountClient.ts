import { createPublicClient, createWalletClient, custom, http, type Chain } from "viem";
import { sepolia, polygonAmoy } from "viem/chains";
import { entryPoint08Address } from "viem/account-abstraction";
import { createPimlicoClient } from "permissionless/clients/pimlico";
import { createSmartAccountClient } from "permissionless";
import { to7702SimpleSmartAccount } from "permissionless/accounts";

const CHAIN_MAP: Record<number, Chain> = {
  11155111: sepolia,
  80002: polygonAmoy,
};

export async function buildSmartAccountClient(
  userAddress: `0x${string}`,
  paymasterAddress: `0x${string}`,
  chainId: number,
  rpcUrl: string,
  pimlicoApiKey: string
) {
  const chain = CHAIN_MAP[chainId];
  if (!chain) throw new Error(`Unsupported chainId for gasless operations: ${chainId}`);

  const pimlicoUrl = `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoApiKey}`;

  const publicClient = createPublicClient({ chain, transport: http(rpcUrl) });

  const walletClient = createWalletClient({
    account: userAddress,
    chain,
    transport: custom((window as any).ethereum),
  });

  const pimlicoClient = createPimlicoClient({
    transport: http(pimlicoUrl),
    entryPoint: { address: entryPoint08Address, version: "0.8" },
  });

  const account = await to7702SimpleSmartAccount({
    client: publicClient,
    owner: walletClient,
  });

  const smartAccountClient = createSmartAccountClient({
    account,
    chain,
    bundlerTransport: http(pimlicoUrl),
    client: publicClient,
    paymaster: {
      async getPaymasterStubData() {
        return {
          paymaster: paymasterAddress,
          paymasterData: "0x" as `0x${string}`,
          paymasterVerificationGasLimit: 300_000n,
          paymasterPostOpGasLimit: 150_000n,
          isFinal: false,
        };
      },
      async getPaymasterData() {
        return {
          paymaster: paymasterAddress,
          paymasterData: "0x" as `0x${string}`,
          paymasterVerificationGasLimit: 300_000n,
          paymasterPostOpGasLimit: 150_000n,
        };
      },
    },
    userOperation: {
      estimateFeesPerGas: async () => {
        const { fast } = await pimlicoClient.getUserOperationGasPrice();
        return {
          maxFeePerGas: fast.maxFeePerGas,
          maxPriorityFeePerGas: fast.maxPriorityFeePerGas,
        };
      },
    },
  });

  return { smartAccountClient, publicClient };
}
