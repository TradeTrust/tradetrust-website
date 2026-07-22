import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { act, renderHook } from "@testing-library/react-hooks";
import { useProviderContext } from "../common/contexts/provider";
import { checkEIP7702Delegation } from "./checkDelegation";
import { checkPaymasterWhitelist } from "./checkPaymasterWhitelist";
import { buildSmartAccountClient } from "./buildSmartAccountClient";
import { useGaslessTransferHolder } from "./useGaslessTransferHolder";
import { useGaslessTransferBeneficiary } from "./useGaslessTransferBeneficiary";
import { useGaslessTransferOwners } from "./useGaslessTransferOwners";
import { useGaslessNominate } from "./useGaslessNominate";
import { useGaslessRejectTransferHolder } from "./useGaslessRejectTransferHolder";
import { useGaslessRejectTransferBeneficiary } from "./useGaslessRejectTransferBeneficiary";
import { useGaslessRejectTransferOwners } from "./useGaslessRejectTransferOwners";
import { useGaslessReturnToIssuer } from "./useGaslessReturnToIssuer";
import { useGaslessAcceptReturned } from "./useGaslessAcceptReturned";
import { useGaslessRejectReturned } from "./useGaslessRejectReturned";

jest.mock("@trustvc/trustvc", () => ({
  transferHolder: jest.fn(),
  transferHolderGasless: jest.fn(),
  transferBeneficiary: jest.fn(),
  transferBeneficiaryGasless: jest.fn(),
  transferOwners: jest.fn(),
  transferOwnersGasless: jest.fn(),
  nominate: jest.fn(),
  nominateGasless: jest.fn(),
  rejectTransferHolder: jest.fn(),
  rejectTransferHolderGasless: jest.fn(),
  rejectTransferBeneficiary: jest.fn(),
  rejectTransferBeneficiaryGasless: jest.fn(),
  rejectTransferOwners: jest.fn(),
  rejectTransferOwnersGasless: jest.fn(),
  returnToIssuer: jest.fn(),
  returnToIssuerGasless: jest.fn(),
  acceptReturned: jest.fn(),
  acceptReturnedGasless: jest.fn(),
  rejectReturned: jest.fn(),
  rejectReturnedGasless: jest.fn(),
}));
jest.mock("./checkDelegation", () => ({
  checkEIP7702Delegation: jest.fn(),
}));
jest.mock("./checkPaymasterWhitelist", () => ({
  checkPaymasterWhitelist: jest.fn(),
}));
jest.mock("./buildSmartAccountClient", () => ({
  buildSmartAccountClient: jest.fn(),
}));
jest.mock("../common/contexts/provider", () => ({
  useProviderContext: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const trustvc = require("@trustvc/trustvc");

const mockCheckDelegation = checkEIP7702Delegation as jest.Mock;
const mockCheckWhitelist = checkPaymasterWhitelist as jest.Mock;
const mockBuildSmartAccountClient = buildSmartAccountClient as jest.Mock;
const mockUseProviderContext = useProviderContext as jest.Mock;

const ACCOUNT = "0x1111111111111111111111111111111111111111";
const TITLE_ESCROW_ADDRESS = "0x2222222222222222222222222222222222222222";
const TOKEN_REGISTRY_ADDRESS = "0x3333333333333333333333333333333333333333";
const TOKEN_ID = "0xabc123";
const PAYMASTER_ADDRESS = "0x4444444444444444444444444444444444444444";
const CHAIN_ID = "80002"; // Polygon Amoy, supported by buildSmartAccountClient's CHAIN_MAP
const PROVIDER_OR_SIGNER = { isSigner: true };
const SMART_ACCOUNT_CLIENT = { sendTransaction: jest.fn() };

const store = createStore(() => ({ certificate: { keyId: null } }));

const wrapper = ({ children }: { children: JSX.Element }) => <Provider store={store}>{children}</Provider>;

interface HookConfig {
  label: string;
  useHook: (contractOptions: any, providerOrSigner: any, chainId?: string) => any;
  normalFn: string;
  gaslessFn: string;
  params: Record<string, any>;
  gaslessArgKey: "titleEscrowAddress" | "tokenRegistryAddress";
  requiredField: "titleEscrowAddress" | "tokenRegistryAddress";
  mergesTokenId: boolean;
}

const CONFIGS: HookConfig[] = [
  {
    label: "transferHolder",
    useHook: useGaslessTransferHolder,
    normalFn: "transferHolder",
    gaslessFn: "transferHolderGasless",
    params: { holderAddress: "0x5555555555555555555555555555555555555555", remarks: "0x" },
    gaslessArgKey: "titleEscrowAddress",
    requiredField: "titleEscrowAddress",
    mergesTokenId: false,
  },
  {
    label: "transferBeneficiary",
    useHook: useGaslessTransferBeneficiary,
    normalFn: "transferBeneficiary",
    gaslessFn: "transferBeneficiaryGasless",
    params: { newBeneficiaryAddress: "0x5555555555555555555555555555555555555555", remarks: "0x" },
    gaslessArgKey: "titleEscrowAddress",
    requiredField: "titleEscrowAddress",
    mergesTokenId: false,
  },
  {
    label: "transferOwners",
    useHook: useGaslessTransferOwners,
    normalFn: "transferOwners",
    gaslessFn: "transferOwnersGasless",
    params: {
      newHolderAddress: "0x5555555555555555555555555555555555555555",
      newBeneficiaryAddress: "0x6666666666666666666666666666666666666666",
      remarks: "0x",
    },
    gaslessArgKey: "titleEscrowAddress",
    requiredField: "titleEscrowAddress",
    mergesTokenId: false,
  },
  {
    label: "nominate",
    useHook: useGaslessNominate,
    normalFn: "nominate",
    gaslessFn: "nominateGasless",
    params: { newBeneficiaryAddress: "0x5555555555555555555555555555555555555555", remarks: "0x" },
    gaslessArgKey: "titleEscrowAddress",
    requiredField: "titleEscrowAddress",
    mergesTokenId: false,
  },
  {
    label: "rejectTransferHolder",
    useHook: useGaslessRejectTransferHolder,
    normalFn: "rejectTransferHolder",
    gaslessFn: "rejectTransferHolderGasless",
    params: { remarks: "0x" },
    gaslessArgKey: "titleEscrowAddress",
    requiredField: "titleEscrowAddress",
    mergesTokenId: false,
  },
  {
    label: "rejectTransferBeneficiary",
    useHook: useGaslessRejectTransferBeneficiary,
    normalFn: "rejectTransferBeneficiary",
    gaslessFn: "rejectTransferBeneficiaryGasless",
    params: { remarks: "0x" },
    gaslessArgKey: "titleEscrowAddress",
    requiredField: "titleEscrowAddress",
    mergesTokenId: false,
  },
  {
    label: "rejectTransferOwners",
    useHook: useGaslessRejectTransferOwners,
    normalFn: "rejectTransferOwners",
    gaslessFn: "rejectTransferOwnersGasless",
    params: { remarks: "0x" },
    gaslessArgKey: "titleEscrowAddress",
    requiredField: "titleEscrowAddress",
    mergesTokenId: false,
  },
  {
    label: "returnToIssuer",
    useHook: useGaslessReturnToIssuer,
    normalFn: "returnToIssuer",
    gaslessFn: "returnToIssuerGasless",
    params: { remarks: "0x" },
    gaslessArgKey: "titleEscrowAddress",
    requiredField: "titleEscrowAddress",
    mergesTokenId: false,
  },
  {
    label: "acceptReturned",
    useHook: useGaslessAcceptReturned,
    normalFn: "acceptReturned",
    gaslessFn: "acceptReturnedGasless",
    params: { remarks: "0x" },
    gaslessArgKey: "tokenRegistryAddress",
    requiredField: "tokenRegistryAddress",
    mergesTokenId: true,
  },
  {
    label: "rejectReturned",
    useHook: useGaslessRejectReturned,
    normalFn: "rejectReturned",
    gaslessFn: "rejectReturnedGasless",
    params: { remarks: "0x" },
    gaslessArgKey: "tokenRegistryAddress",
    requiredField: "tokenRegistryAddress",
    mergesTokenId: true,
  },
];

const baseContractOptions = () => ({
  titleEscrowAddress: TITLE_ESCROW_ADDRESS,
  tokenRegistryAddress: TOKEN_REGISTRY_ADDRESS,
  tokenId: TOKEN_ID,
});

describe.each(CONFIGS)(
  "$label",
  ({ useHook, normalFn, gaslessFn, params, gaslessArgKey, requiredField, mergesTokenId }) => {
    beforeEach(() => {
      jest.clearAllMocks();
      localStorage.clear();
      (window as any).ethereum = {};
      mockUseProviderContext.mockReturnValue({ account: ACCOUNT });
    });

    it("starts UNINITIALIZED and resets back to it after a completed send", async () => {
      trustvc[normalFn].mockResolvedValue({ wait: jest.fn().mockResolvedValue({ transactionHash: "0xnormalhash" }) });

      const { result } = renderHook(() => useHook(baseContractOptions(), PROVIDER_OR_SIGNER, CHAIN_ID), { wrapper });

      expect(result.current.state).toBe("UNINITIALIZED");
      expect(result.current.transactionHash).toBeUndefined();
      expect(result.current.errorMessage).toBeUndefined();

      await act(async () => {
        await result.current.send(params);
      });
      expect(result.current.state).toBe("CONFIRMED");

      act(() => {
        result.current.reset();
      });

      expect(result.current.state).toBe("UNINITIALIZED");
      expect(result.current.transactionHash).toBeUndefined();
      expect(result.current.errorMessage).toBeUndefined();
    });

    it("uses the normal (non-gasless) path when no paymaster address is configured", async () => {
      trustvc[normalFn].mockResolvedValue({ wait: jest.fn().mockResolvedValue({ transactionHash: "0xnormalhash" }) });

      const { result } = renderHook(() => useHook(baseContractOptions(), PROVIDER_OR_SIGNER, CHAIN_ID), { wrapper });

      await act(async () => {
        await result.current.send(params);
      });

      expect(mockCheckDelegation).not.toHaveBeenCalled();
      expect(mockCheckWhitelist).not.toHaveBeenCalled();
      expect(trustvc[gaslessFn]).not.toHaveBeenCalled();
      expect(trustvc[normalFn]).toHaveBeenCalledWith(
        mergesTokenId ? { tokenRegistryAddress: TOKEN_REGISTRY_ADDRESS } : baseContractOptions(),
        PROVIDER_OR_SIGNER,
        mergesTokenId ? { tokenId: TOKEN_ID, ...params } : params,
        { id: "" }
      );
      expect(result.current.state).toBe("CONFIRMED");
      expect(result.current.transactionHash).toBe("0xnormalhash");
    });

    it("uses the normal path when a paymaster is set but the wallet is not EIP-7702 delegated", async () => {
      localStorage.setItem(`tradetrust_paymaster_${ACCOUNT}`, PAYMASTER_ADDRESS);
      mockCheckDelegation.mockResolvedValue(false);
      trustvc[normalFn].mockResolvedValue({ wait: jest.fn().mockResolvedValue({ transactionHash: "0xnormalhash" }) });

      const { result } = renderHook(() => useHook(baseContractOptions(), PROVIDER_OR_SIGNER, CHAIN_ID), { wrapper });

      await act(async () => {
        await result.current.send(params);
      });

      expect(mockCheckDelegation).toHaveBeenCalledWith(ACCOUNT, expect.any(String));
      expect(mockCheckWhitelist).not.toHaveBeenCalled();
      expect(trustvc[gaslessFn]).not.toHaveBeenCalled();
      expect(trustvc[normalFn]).toHaveBeenCalled();
      expect(result.current.state).toBe("CONFIRMED");
    });

    it("uses the normal path when delegated but the paymaster does not whitelist the caller/title escrow", async () => {
      localStorage.setItem(`tradetrust_paymaster_${ACCOUNT}`, PAYMASTER_ADDRESS);
      mockCheckDelegation.mockResolvedValue(true);
      mockCheckWhitelist.mockResolvedValue({ isCallerAuthorized: false, isTitleEscrowAuthorized: true });
      trustvc[normalFn].mockResolvedValue({ wait: jest.fn().mockResolvedValue({ transactionHash: "0xnormalhash" }) });

      const { result } = renderHook(() => useHook(baseContractOptions(), PROVIDER_OR_SIGNER, CHAIN_ID), { wrapper });

      await act(async () => {
        await result.current.send(params);
      });

      expect(mockCheckWhitelist).toHaveBeenCalledWith(
        PAYMASTER_ADDRESS,
        ACCOUNT,
        TITLE_ESCROW_ADDRESS,
        expect.any(String)
      );
      expect(trustvc[gaslessFn]).not.toHaveBeenCalled();
      expect(trustvc[normalFn]).toHaveBeenCalled();
      expect(result.current.state).toBe("CONFIRMED");
    });

    it("sends a sponsored gasless transaction when a paymaster address is input, the wallet is delegated, and it's whitelisted", async () => {
      localStorage.setItem(`tradetrust_paymaster_${ACCOUNT}`, PAYMASTER_ADDRESS);
      mockCheckDelegation.mockResolvedValue(true);
      mockCheckWhitelist.mockResolvedValue({ isCallerAuthorized: true, isTitleEscrowAuthorized: true });
      mockBuildSmartAccountClient.mockResolvedValue({ smartAccountClient: SMART_ACCOUNT_CLIENT });
      trustvc[gaslessFn].mockResolvedValue("0xgaslesshash");

      const { result } = renderHook(() => useHook(baseContractOptions(), PROVIDER_OR_SIGNER, CHAIN_ID), { wrapper });

      await act(async () => {
        await result.current.send(params);
      });

      expect(mockBuildSmartAccountClient).toHaveBeenCalledWith(
        ACCOUNT,
        PAYMASTER_ADDRESS,
        Number(CHAIN_ID),
        expect.any(String),
        undefined
      );
      expect(trustvc[gaslessFn]).toHaveBeenCalledWith(
        { [gaslessArgKey]: gaslessArgKey === "titleEscrowAddress" ? TITLE_ESCROW_ADDRESS : TOKEN_REGISTRY_ADDRESS },
        SMART_ACCOUNT_CLIENT,
        mergesTokenId ? { tokenId: TOKEN_ID, ...params } : params,
        { id: "" }
      );
      expect(trustvc[normalFn]).not.toHaveBeenCalled();
      expect(result.current.state).toBe("CONFIRMED");
      expect(result.current.transactionHash).toBe("0xgaslesshash");
    });

    it("surfaces a MetaMask-friendly error message and sets ERROR state when the transaction is rejected", async () => {
      trustvc[normalFn].mockRejectedValue({ code: 4001 });

      const { result } = renderHook(() => useHook(baseContractOptions(), PROVIDER_OR_SIGNER, CHAIN_ID), { wrapper });

      await act(async () => {
        await result.current.send(params);
      });

      expect(result.current.state).toBe("ERROR");
      expect(result.current.errorMessage).toBe("User Rejected Transaction");
      expect(result.current.transactionHash).toBeUndefined();
    });

    it("surfaces the gasless path's rejection through the same error handling", async () => {
      localStorage.setItem(`tradetrust_paymaster_${ACCOUNT}`, PAYMASTER_ADDRESS);
      mockCheckDelegation.mockResolvedValue(true);
      mockCheckWhitelist.mockResolvedValue({ isCallerAuthorized: true, isTitleEscrowAuthorized: true });
      mockBuildSmartAccountClient.mockResolvedValue({ smartAccountClient: SMART_ACCOUNT_CLIENT });
      trustvc[gaslessFn].mockRejectedValue({ code: "ACTION_REJECTED" });

      const { result } = renderHook(() => useHook(baseContractOptions(), PROVIDER_OR_SIGNER, CHAIN_ID), { wrapper });

      await act(async () => {
        await result.current.send(params);
      });

      expect(result.current.state).toBe("ERROR");
      expect(result.current.errorMessage).toBe("User Rejected Transaction");
      expect(trustvc[normalFn]).not.toHaveBeenCalled();
    });

    it("errors out when the contract address required for the non-gasless send is missing", async () => {
      const contractOptions = { ...baseContractOptions(), [requiredField]: undefined };

      const { result } = renderHook(() => useHook(contractOptions, PROVIDER_OR_SIGNER, CHAIN_ID), { wrapper });

      await act(async () => {
        await result.current.send(params);
      });

      expect(trustvc[normalFn]).not.toHaveBeenCalled();
      expect(trustvc[gaslessFn]).not.toHaveBeenCalled();
      expect(result.current.state).toBe("ERROR");
    });
  }
);
