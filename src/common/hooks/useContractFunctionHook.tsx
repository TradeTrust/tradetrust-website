import { v5Contracts } from "@trustvc/trustvc";
import { TypedContractMethod } from "@trustvc/trustvc";
import { BaseContract, ContractReceipt, ContractTransaction } from "ethers";
import { useCallback, useState } from "react";

export type ContractFunctionState = "UNINITIALIZED" | "INITIALIZED" | "PENDING_CONFIRMATION" | "CONFIRMED" | "ERROR";
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type TitleEscrow = v5Contracts.TitleEscrow;
type TradeTrustToken = v5Contracts.TradeTrustToken;
// Todo
// Deploy
// Deploy & Initialize

// interface useContractFunctionHookReturn<T extends Contract, S extends keyof T> {
//   state: ContractFunctionState;
//   receipt?: ContractReceipt;
//   transaction?: ContractTransaction;
//   error?: Error;
//   value:
// }

export function useContractFunctionHook<T extends BaseContract | TitleEscrow | TradeTrustToken, S extends keyof T>(
  contract?: T,
  method?: S
): {
  call: TypedContractMethod<any[], ReturnType<T[S] extends (...args: any[]) => any ? T[S] : never>, "nonpayable">;
  send: TypedContractMethod<any[], [void], "nonpayable">;
  reset: () => void;
  state: ContractFunctionState;
  receipt?: ContractReceipt;
  transaction?: ContractTransaction;
  error?: Error;
  value?: UnwrapPromise<ReturnType<T[S] extends (...args: any[]) => any ? T[S] : never>>;
  events?: ContractReceipt["events"];
  transactionHash?: string;
  errorMessage?: string;
} {
  const [state, setState] = useState<ContractFunctionState>("UNINITIALIZED");
  const [receipt, setReceipt] = useState<ContractReceipt>();
  const [transaction, setTransaction] = useState<ContractTransaction>();
  const [error, setError] = useState<Error>();
  const [value, setValue] = useState<UnwrapPromise<ReturnType<T[S] extends (...args: any[]) => any ? T[S] : never>>>();

  // Reset state is added to allow the same hook to be used for multiple transactions although
  // it is highly unrecommended.
  const resetState = (): void => {
    setState("UNINITIALIZED");
    setReceipt(undefined);
    setTransaction(undefined);
    setError(undefined);
    setValue(undefined);
  };

  const sendFn = (async (...params: any[]) => {
    if (!contract || !method) {
      setState("ERROR");
      setError(new Error("Contract or method is not specified"));
      return;
    }
    resetState();

    try {
      // @ts-ignore: check for v4 contracts support
      const contractMethod = contract?.functions?.[method as string] ?? contract[method];
      const deferredTx = contractMethod(...params);
      setState("INITIALIZED");
      const _transaction: ContractTransaction = await deferredTx;
      setState("PENDING_CONFIRMATION");
      setTransaction(_transaction);
      const _receipt = await _transaction.wait();
      setState("CONFIRMED");
      setReceipt(_receipt);
    } catch (e) {
      setError(e as Error);
      setState("ERROR");
    }
  }) as TypedContractMethod<any[], ReturnType<T[S] extends (...args: any[]) => any ? T[S] : never>, "nonpayable">;

  const callFn = (async (...params: any[]) => {
    if (!contract || !method) {
      setState("ERROR");
      setError(new Error("Contract or method is not specified"));
      return;
    }
    resetState();

    // @ts-ignore: check for v4 contracts support
    const contractMethod = contract?.functions?.[method as string] ?? contract[method];
    const deferredTx = contractMethod(...params);
    setState("INITIALIZED");
    try {
      const response = await deferredTx;
      setState("CONFIRMED");
      setValue(response);
    } catch (e) {
      setError(e as Error);
      setState("ERROR");
    }
  }) as TypedContractMethod<any[], ReturnType<T[S] extends (...args: any[]) => any ? T[S] : never>, "nonpayable">;

  const transactionHash = transaction?.hash;
  const events = receipt?.events;
  const errorMessage = error?.message;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const send = useCallback(sendFn, [contract, method]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const call = useCallback(callFn, [contract, method]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reset = useCallback(resetState, [contract, method]);

  return { state, call, events, send, receipt, transaction, transactionHash, errorMessage, error, value, reset };
}
