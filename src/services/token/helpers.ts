import { useState } from "react";

export interface TransactionState {
  status: TransactionStateStatus;
  error: any;
}

export interface UseEthereumTransactionState {
  state: TransactionState;
  setLoading: () => void;
  setNoWallet: () => void;
  setReady: () => void;
  setSuccess: () => void;
  setMining: () => void;
  setError: (e: any) => void;
}

export enum TransactionStateStatus {
  LOADING = "loading",
  READY = "ready",
  SUCCESS = "success",
  NO_WALLET = "no_wallet",
  TRANSACTION_MINING = "transaction-mining",
  ERROR = "error"
}

export const useEthereumTransactionState = (): UseEthereumTransactionState => {
  const [state, setState] = useState<TransactionState>({ status: TransactionStateStatus.LOADING, error: undefined });

  const setLoading = (): void => setState({ status: TransactionStateStatus.LOADING, error: undefined });
  const setNoWallet = (): void => setState({ status: TransactionStateStatus.NO_WALLET, error: undefined });
  const setReady = (): void => setState({ status: TransactionStateStatus.READY, error: undefined });
  const setSuccess = (): void => setState({ status: TransactionStateStatus.SUCCESS, error: undefined });
  const setMining = (): void => setState({ status: TransactionStateStatus.TRANSACTION_MINING, error: undefined });

  const setError = (e: any): void => setState({ status: TransactionStateStatus.ERROR, error: e.message });

  return { state, setLoading, setNoWallet, setReady, setSuccess, setMining, setError };
};
