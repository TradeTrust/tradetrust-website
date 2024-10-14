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
        const tokenRegistryAddress = "0x96cc41e7007dee20eb409586e2e8206d5053219b";
        const tokenId = "0xd97a8af5c38157b95c558b7801862f4b53171149926d76d0c5b2b279016eed0a";

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
          expect(result.current.endorsementChain).toEqual([
            {
              type: "INITIAL",
              transactionHash: "0xd7b2559f53b0aad1a47d052b6923beb10bf1c689b95a2e6a1d82a1b3ccaedb5d",
              transactionIndex: 1,
              blockNumber: 13036219,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              timestamp: 1728629803000,
              remark: "",
            },
            {
              type: "TRANSFER_HOLDER",
              transactionHash: "0x2cf515bb8a69e6d51839809cb63321ddfe9e6bb19d852deb1f14832a269c023a",
              transactionIndex: 1,
              blockNumber: 13045757,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1728651320000,
              remark: "transfer",
            },
            {
              type: "REJECT_TRANSFER_HOLDER",
              transactionHash: "0xde4ecbc5df9144c1d7350ca388e7727f0c7377342dcee15d212b0c350a3c80b7",
              transactionIndex: 4,
              blockNumber: 13045799,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              timestamp: 1728651426000,
              remark: "reject holder",
            },
            {
              type: "TRANSFER_BENEFICIARY",
              transactionHash: "0xaffcbb25580cf220e972b6fc99527b3883b8d2cd27cbbdde5a72f9ef0967e2b5",
              transactionIndex: 1,
              blockNumber: 13045917,
              owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1728651752000,
              remark: "owner",
            },
            {
              type: "REJECT_TRANSFER_BENEFICIARY",
              transactionHash: "0x8e7957a9e181d3db099efffb5c9fc1a0b275ed9c244794e39a21625bf70ba4f2",
              transactionIndex: 2,
              blockNumber: 13045946,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1728651818000,
              remark: "reject owner",
            },
            {
              type: "TRANSFER_OWNERS",
              transactionHash: "0xabcb5c8d62ac9acd6c5e59640ea0d6f120d0d5b995e2aebcae3d0eace47ed2dd",
              transactionIndex: 2,
              blockNumber: 13045995,
              owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1728651954000,
              remark: "transfer all",
            },
            {
              type: "REJECT_TRANSFER_OWNERS",
              transactionHash: "0x750d2b15a9b448eb9aab3079da72edcc2e0c7485ce813f4cbd8b7fe3ba570381",
              transactionIndex: 0,
              blockNumber: 13049089,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              timestamp: 1728660226000,
              remark: "reject all",
            },
            {
              type: "TRANSFER_HOLDER",
              transactionHash: "0xbc498e4e7717dab2da75bc6200cd1876be2797b4e06136bc077c22b40474712f",
              transactionIndex: 1,
              blockNumber: 13049855,
              owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1728662268000,
              remark: "",
            },
            {
              type: "TRANSFER_BENEFICIARY",
              transactionHash: "0x5e2a2c5fa9462b96eaf2b3fb4441a490853921e4a87fc783047ef17edef1f6af",
              transactionIndex: 0,
              blockNumber: 13049874,
              owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1728662310000,
              remark: "",
            },
            {
              type: "SURRENDERED",
              transactionHash: "0xe5c8c1a94c7daf49b153d9626e25a5040822ef7f4bc1e6f301b5cd7f4374b51f",
              transactionIndex: 0,
              blockNumber: 13050056,
              owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1728662696000,
              remark: "",
            },
            {
              type: "SURRENDER_REJECTED",
              transactionHash: "0xf4002d91b42cdae6e1bc5b4c9285ee55e886126043f66b42abc6680404a38bb4",
              transactionIndex: 0,
              blockNumber: 13050203,
              owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1728663008000,
              remark: "restore",
            },
            {
              type: "SURRENDERED",
              transactionHash: "0x202061e97f34df6f41016714d4bfa3429bef3e7b4cf4f69c8a4d4e032e2453cf",
              transactionIndex: 1,
              blockNumber: 13152611,
              owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
              timestamp: 1728889274000,
              remark: "surrender",
            },
            {
              type: "SURRENDER_ACCEPTED",
              transactionHash: "0x30144744f34eae5e44ab84f8621c64de977767b317998bfca0bc0ba7fa5c500d",
              transactionIndex: 1,
              blockNumber: 13152770,
              owner: "0x0000000000000000000000000000000000000000",
              holder: "0x0000000000000000000000000000000000000000",
              timestamp: 1728889636000,
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
