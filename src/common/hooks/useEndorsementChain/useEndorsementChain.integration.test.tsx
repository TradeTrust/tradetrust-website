import { act, renderHook } from "@testing-library/react-hooks";
import { providers } from "ethers";
import { ChainId, ChainInfo } from "../../../constants/chain-info";
import { TokenInformationContextProvider, useTokenInformationContext } from "../../contexts/TokenInformationContext";
import { useProviderContext } from "../../contexts/provider";
import { useEndorsementChain } from "./useEndorsementChain";

jest.mock("../../contexts/provider");

const amoyProvider = new providers.JsonRpcProvider(ChainInfo[ChainId.Amoy].rpcUrl, ChainId.Amoy);

const mockUseProviderContext = useProviderContext as jest.Mock;

import { waitFor } from "@testing-library/react";
import React, { useEffect } from "react";

const wrapper = ({ children }: { children: JSX.Element }) => (
  <TokenInformationContextProvider>{children}</TokenInformationContextProvider>
);

describe("useEndorsementChain|integration", () => {
  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: amoyProvider, providerOrSigner: amoyProvider });
  });

  it("should show error message when token registry version is invalid", async () => {
    const { result } = renderHook(
      () => {
        const tokenRegistryAddress = "0x71D28767662cB233F887aD2Bb65d048d760bA694";
        const tokenId = "0x780e38c6345dac12cedb7aacc69492ff31cc5236cd60da46261aa1c27691141e";

        const { initialize } = useTokenInformationContext();
        useEffect(() => {
          initialize(tokenRegistryAddress, tokenId);
        }, [initialize, tokenRegistryAddress, tokenId]);
        const hook = useEndorsementChain(tokenRegistryAddress, tokenId);

        return hook;
      },
      { wrapper }
    );

    await act(async () => {
      await waitFor(
        () => {
          expect(result.current.error).toBe('"Only Token Registry V5 is supported"');
          expect(result.current.endorsementChain).toBe(undefined);
          expect(result.current.pending).toBe(false);
        },
        { timeout: 60000 }
      );
    });
  }, 60000);

  it("should work correctly for a given tokenRegistryAddress + tokenId with Transfer, Surrender, Burnt events", async () => {
    const { result } = renderHook(
      () => {
        const tokenRegistryAddress = "0x0f99945c7Ebae71a9A615c422D716fe1EeaB2B2e";
        const tokenId = "0xd97a8af5c38157b95c558b7801862f4b53171149926d76d0c5b2b279016eed0b";

        const { initialize } = useTokenInformationContext();
        useEffect(() => {
          initialize(tokenRegistryAddress, tokenId);
        }, [initialize, tokenRegistryAddress, tokenId]);
        const hook = useEndorsementChain(tokenRegistryAddress, tokenId);

        return hook;
      },
      { wrapper }
    );

    await act(async () => {
      await waitFor(
        () => {
          expect(result.current.endorsementChain).toBeTruthy();
          console.log("result.current.endorsementChain", result.current.endorsementChain);
          expect(result.current.endorsementChain).toEqual([
            {
              type: "INITIAL",
              transactionHash: "0xa81ac02febba3ce2a1a8d4caf723d14c10da981629b939391b0e8f0a668b1471",
              transactionIndex: 1,
              blockNumber: 13977564,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              timestamp: 1730651140000,
              remark: "",
            },
            {
              type: "TRANSFER_HOLDER",
              transactionHash: "0x68aafaa63ad089dfe4e90cd3a07fba57aba080006712716266c2e29c865d27b6",
              transactionIndex: 1,
              blockNumber: 13977968,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1730652000000,
              remark: "transfer",
            },
            {
              type: "REJECT_TRANSFER_HOLDER",
              transactionHash: "0xb7c8df0434a63671d7b4c80fd6f2f2b055634bb04ddffad29485a7a3bcb2f5ba",
              transactionIndex: 3,
              blockNumber: 13978194,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              timestamp: 1730652480000,
              remark: ".�I\x06���<N�40�L����\x1Er>`�\x11�\x00\x04g\n�\x05\x07",
            },
            {
              type: "TRANSFER_BENEFICIARY",
              transactionHash: "0xf3b2d0eef0c463190c8d3ca478cb2d6f7fe6d79e1bb2aab5a219ffdb485380e5",
              transactionIndex: 0,
              blockNumber: 13978243,
              owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1730652584000,
              remark: "owner",
            },
            {
              type: "REJECT_TRANSFER_BENEFICIARY",
              transactionHash: "0x5d1bf97938fb6bf1578f8ca35c3742224766fd077ab08cd5733685d7bef6a834",
              transactionIndex: 0,
              blockNumber: 13978273,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1730652648000,
              remark: "reject owner",
            },
            {
              type: "TRANSFER_OWNERS",
              transactionHash: "0xa3acca2e7e6b77348a6cfb1020db88d1dd94b15c051500044b21f4a66b8c5be7",
              transactionIndex: 1,
              blockNumber: 13978310,
              owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1730652726000,
              remark: "transfer all",
            },
            {
              type: "REJECT_TRANSFER_OWNERS",
              transactionHash: "0xa9d2078b7a582f9c8837368e319c6748ff92dc5ea0fe6869a861952161122c79",
              transactionIndex: 0,
              blockNumber: 13978345,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              timestamp: 1730652800000,
              remark: "reject all",
            },
            {
              type: "TRANSFER_HOLDER",
              transactionHash: "0xd22df5e45aac0266f7989077f12e8d3d3bf6bde5eaa8679655fea8f1fa3ddcac",
              transactionIndex: 0,
              blockNumber: 13978372,
              owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1730652858000,
              remark: "",
            },
            {
              type: "TRANSFER_BENEFICIARY",
              transactionHash: "0x4c3c92efa90dea6ace34e8125f839efdf76b30f81b221a8511ee61b9bc35d28d",
              transactionIndex: 0,
              blockNumber: 13978413,
              owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1730652944000,
              remark: "",
            },
            {
              type: "RETURNED_TO_ISSUER",
              transactionHash: "0x34c3c6761fff4535f5a6f88b762f1494aa933f2ec12a41e4bcfc08737e720d71",
              transactionIndex: 0,
              blockNumber: 13978442,
              owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1730653006000,
              remark: "",
            },
            {
              type: "RETURN_TO_ISSUER_REJECTED",
              transactionHash: "0x0501d2166b4cbac857e0697cd4c17c539c9d52c46bbdc26ca3d6393a4d8da795",
              transactionIndex: 0,
              blockNumber: 13978497,
              owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1730653124000,
              remark: "restore",
            },
            {
              type: "RETURNED_TO_ISSUER",
              transactionHash: "0xb7aa88c9088b693c96e297107170b5160b0e95d78fee85d473bcf717d135a70b",
              transactionIndex: 1,
              blockNumber: 13978538,
              owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1730653210000,
              remark: "surrender",
            },
            {
              type: "RETURN_TO_ISSUER_ACCEPTED",
              transactionHash: "0x409a72563f6e452366533d514e706dc9e500ba91bd369520152e83b38d4dbcfb",
              transactionIndex: 0,
              blockNumber: 13979272,
              owner: "0x0000000000000000000000000000000000000000",
              holder: "0x0000000000000000000000000000000000000000",
              timestamp: 1730654770000,
              remark: "",
            },
          ]);
          expect(result.current.error).toBe("");
          expect(result.current.pending).toBe(false);
        },
        { timeout: 60000 }
      );
    });
  }, 60000);
});
