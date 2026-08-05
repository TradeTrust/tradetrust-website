import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { act, renderHook } from "@testing-library/react-hooks";
import { useContractFunctionHook } from "./useContractFunctionHook";

jest.mock("@trustvc/trustvc", () => ({
  transferHolder: jest.fn(),
  transferBeneficiary: jest.fn(),
  transferOwners: jest.fn(),
  rejectTransferHolder: jest.fn(),
  rejectTransferBeneficiary: jest.fn(),
  rejectTransferOwners: jest.fn(),
  nominate: jest.fn(),
  returnToIssuer: jest.fn(),
  rejectReturned: jest.fn(),
  acceptReturned: jest.fn(),
  acceptObligationRegistry: jest.fn(),
  rejectObligationRegistry: jest.fn(),
  dischargeObligationRegistry: jest.fn(),
  transferHolderObligationRegistry: jest.fn(),
  transferBeneficiaryObligationRegistry: jest.fn(),
  transferOwnersObligationRegistry: jest.fn(),
  nominateObligationRegistry: jest.fn(),
  returnToIssuerObligationRegistry: jest.fn(),
  rejectTransferHolderObligationRegistry: jest.fn(),
  rejectTransferBeneficiaryObligationRegistry: jest.fn(),
  rejectTransferOwnersObligationRegistry: jest.fn(),
  acceptReturnedObligationRegistry: jest.fn(),
  rejectReturnedObligationRegistry: jest.fn(),
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const trustvc = require("@trustvc/trustvc");

const TOKEN_REGISTRY_ADDRESS = "0x1111111111111111111111111111111111111111";
const TITLE_ESCROW_ADDRESS = "0x2222222222222222222222222222222222222222";
const TOKEN_ID = "0xabc123";
const PROVIDER_OR_SIGNER = { isSigner: true };
const CONTRACT = {} as any;

const contractOptions = () => ({
  tokenRegistryAddress: TOKEN_REGISTRY_ADDRESS,
  titleEscrowAddress: TITLE_ESCROW_ADDRESS,
  tokenId: TOKEN_ID,
});

const store = createStore(() => ({ certificate: { keyId: null } }));
const wrapper = ({ children }: { children: JSX.Element }) => <Provider store={store}>{children}</Provider>;

const confirmedTx = () => ({ wait: jest.fn().mockResolvedValue({ transactionHash: "0xhash" }) });

describe("useContractFunctionHook obligation routing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("routes a shared UI method name (transferHolder) to the classic function when isObligation is false", async () => {
    trustvc.transferHolder.mockResolvedValue(confirmedTx());

    const { result } = renderHook(
      () => useContractFunctionHook(CONTRACT, "transferHolder", contractOptions(), PROVIDER_OR_SIGNER, false),
      { wrapper }
    );

    await act(async () => {
      await result.current.send({ holderAddress: "0x3333333333333333333333333333333333333333", remarks: "0x" });
    });

    expect(trustvc.transferHolder).toHaveBeenCalledWith(
      contractOptions(),
      PROVIDER_OR_SIGNER,
      { holderAddress: "0x3333333333333333333333333333333333333333", remarks: "0x" },
      { id: "" }
    );
    expect(trustvc.transferHolderObligationRegistry).not.toHaveBeenCalled();
    expect(result.current.state).toBe("CONFIRMED");
  });

  it("routes the same UI method name (transferHolder) to the obligation function with mapped options when isObligation is true", async () => {
    trustvc.transferHolderObligationRegistry.mockResolvedValue(confirmedTx());

    const { result } = renderHook(
      () => useContractFunctionHook(CONTRACT, "transferHolder", contractOptions(), PROVIDER_OR_SIGNER, true),
      { wrapper }
    );

    await act(async () => {
      await result.current.send({ holderAddress: "0x3333333333333333333333333333333333333333", remarks: "0x" });
    });

    expect(trustvc.transferHolderObligationRegistry).toHaveBeenCalledWith(
      {
        obligationRegistryAddress: TOKEN_REGISTRY_ADDRESS,
        obligationEscrowAddress: TITLE_ESCROW_ADDRESS,
        tokenId: TOKEN_ID,
      },
      PROVIDER_OR_SIGNER,
      { holderAddress: "0x3333333333333333333333333333333333333333", remarks: "0x" },
      { id: "" }
    );
    expect(trustvc.transferHolder).not.toHaveBeenCalled();
    expect(result.current.state).toBe("CONFIRMED");
  });

  it.each(["accept", "reject", "discharge"] as const)(
    "dispatches the BoE lifecycle method '%s' only through the obligation map",
    async (method) => {
      const obligationFn = trustvc[`${method}ObligationRegistry`];
      obligationFn.mockResolvedValue(confirmedTx());

      const { result } = renderHook(
        () => useContractFunctionHook(CONTRACT, method as any, contractOptions(), PROVIDER_OR_SIGNER, true),
        { wrapper }
      );

      await act(async () => {
        await result.current.send({ remarks: "0x" });
      });

      expect(obligationFn).toHaveBeenCalledWith(
        {
          obligationRegistryAddress: TOKEN_REGISTRY_ADDRESS,
          obligationEscrowAddress: TITLE_ESCROW_ADDRESS,
          tokenId: TOKEN_ID,
        },
        PROVIDER_OR_SIGNER,
        { remarks: "0x" },
        { id: "" }
      );
      expect(result.current.state).toBe("CONFIRMED");
    }
  );

  it("errors out for the BoE lifecycle methods when isObligation is not set (they don't exist on the classic map)", async () => {
    const { result } = renderHook(
      () => useContractFunctionHook(CONTRACT, "accept" as any, contractOptions(), PROVIDER_OR_SIGNER, false),
      { wrapper }
    );

    await act(async () => {
      await result.current.send({ remarks: "0x" });
    });

    expect(result.current.state).toBe("ERROR");
    expect(trustvc.acceptObligationRegistry).not.toHaveBeenCalled();
  });

  it("leaves already-obligation-shaped contract options untouched", async () => {
    trustvc.acceptObligationRegistry.mockResolvedValue(confirmedTx());
    const preShapedOptions = {
      obligationRegistryAddress: TOKEN_REGISTRY_ADDRESS,
      obligationEscrowAddress: TITLE_ESCROW_ADDRESS,
      tokenId: TOKEN_ID,
    };

    const { result } = renderHook(
      () => useContractFunctionHook(CONTRACT, "accept" as any, preShapedOptions, PROVIDER_OR_SIGNER, true),
      { wrapper }
    );

    await act(async () => {
      await result.current.send({ remarks: "0x" });
    });

    expect(trustvc.acceptObligationRegistry).toHaveBeenCalledWith(
      preShapedOptions,
      PROVIDER_OR_SIGNER,
      { remarks: "0x" },
      { id: "" }
    );
  });
});
