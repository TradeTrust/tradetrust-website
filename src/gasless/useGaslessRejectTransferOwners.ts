import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { rejectTransferOwners, rejectTransferOwnersGasless } from "@trustvc/trustvc";
import { ContractFunctionState } from "../common/hooks/useContractFunctionHook";
import { useProviderContext } from "../common/contexts/provider";
import { RootState } from "../reducers";
import { checkEIP7702Delegation } from "./checkDelegation";
import { checkPaymasterWhitelist } from "./checkPaymasterWhitelist";
import { buildSmartAccountClient } from "./buildSmartAccountClient";
import { getMetaMaskErrorMessage, getRpcUrl } from "./gaslessHelpers";
import { getPaymasterAddress } from "./paymasterStore";

const PAYMASTER_ADDRESS = process.env.REACT_APP_PAYMASTER_ADDRESS as string | undefined;
const PIMLICO_API_KEY = process.env.PIMLICO_API_KEY as string | undefined;

interface ContractOptions {
  titleEscrowAddress?: string;
  tokenRegistryAddress?: string;
  tokenId?: string;
}

interface RejectTransferParams {
  remarks?: string;
}

export function useGaslessRejectTransferOwners(
  contractOptions: ContractOptions,
  providerOrSigner: any,
  chainId?: string
) {
  const [state, setState] = useState<ContractFunctionState>("UNINITIALIZED");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [transactionHash, setTransactionHash] = useState<string | undefined>();

  const { account } = useProviderContext();
  const keyId = useSelector((rootState: RootState) => rootState?.certificate?.keyId);

  const reset = useCallback(() => {
    setState("UNINITIALIZED");
    setErrorMessage(undefined);
    setTransactionHash(undefined);
  }, []);

  const send = useCallback(
    async (params: RejectTransferParams = {}) => {
      reset();

      const { titleEscrowAddress, tokenRegistryAddress, tokenId } = contractOptions;

      try {
        setState("INITIALIZED");

        let useGasless = false;

        const resolvedPaymasterAddress = getPaymasterAddress(account) || PAYMASTER_ADDRESS;

        const hasGaslessConfig =
          !!account &&
          !!titleEscrowAddress &&
          !!resolvedPaymasterAddress &&
          !!chainId &&
          !!PIMLICO_API_KEY &&
          !!(window as any).ethereum;

        if (hasGaslessConfig) {
          const rpcUrl = getRpcUrl(chainId!);

          if (rpcUrl) {
            const isDelegated = await checkEIP7702Delegation(account!, rpcUrl);

            if (isDelegated) {
              const { isCallerAuthorized, isTitleEscrowAuthorized } = await checkPaymasterWhitelist(
                resolvedPaymasterAddress!,
                account!,
                titleEscrowAddress!,
                rpcUrl
              );

              useGasless = isCallerAuthorized && isTitleEscrowAuthorized;
            }
          }
        }

        setState("PENDING_CONFIRMATION");

        if (useGasless) {
          const { smartAccountClient } = await buildSmartAccountClient(
            account as `0x${string}`,
            resolvedPaymasterAddress as `0x${string}`,
            Number(chainId),
            getRpcUrl(chainId!)!,
            PIMLICO_API_KEY!
          );

          const txHash = await rejectTransferOwnersGasless(
            { titleEscrowAddress: titleEscrowAddress! },
            smartAccountClient as {
              sendTransaction(args: { to: `0x${string}`; value: bigint; data: `0x${string}` }): Promise<`0x${string}`>;
            },
            params,
            { id: keyId ?? "" }
          );

          setTransactionHash(txHash);
        } else {
          if (!titleEscrowAddress) throw new Error("titleEscrowAddress is required");
          const tx = await rejectTransferOwners(
            { titleEscrowAddress, tokenRegistryAddress, tokenId },
            providerOrSigner,
            params,
            { id: keyId ?? "" }
          );
          const receipt = await tx.wait();
          setTransactionHash(receipt.transactionHash);
        }

        setState("CONFIRMED");
      } catch (e: unknown) {
        setErrorMessage(getMetaMaskErrorMessage(e));
        setState("ERROR");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contractOptions, providerOrSigner, chainId, account, keyId]
  );

  return { send, state, transactionHash, errorMessage, reset };
}
