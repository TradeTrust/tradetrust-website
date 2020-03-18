import { useReducer } from "react";

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

export type ActionType = { type: TransactionStateStatus; message?: string };
export type StateType = { status: TransactionStateStatus; error: undefined | string };

function ethereumStateReducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case TransactionStateStatus.LOADING:
      return { ...state, ...{ status: TransactionStateStatus.LOADING, error: undefined } };
    case TransactionStateStatus.READY:
      return { ...state, ...{ status: TransactionStateStatus.READY, error: undefined } };
    case TransactionStateStatus.NO_WALLET:
      return { ...state, ...{ status: TransactionStateStatus.NO_WALLET, error: undefined } };
    case TransactionStateStatus.SUCCESS:
      return { ...state, ...{ status: TransactionStateStatus.SUCCESS, error: undefined } };
    case TransactionStateStatus.TRANSACTION_MINING:
      return { ...state, ...{ status: TransactionStateStatus.TRANSACTION_MINING, error: undefined } };
    case TransactionStateStatus.ERROR:
      return { ...state, ...{ status: TransactionStateStatus.ERROR, error: action.message } };
    default:
      return { ...state, ...{ status: TransactionStateStatus.LOADING, error: undefined } };
  }
}

export const useEthereumTransactionState = () => {
  return useReducer(ethereumStateReducer, { status: TransactionStateStatus.LOADING, error: undefined });
};
