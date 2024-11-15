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
        const tokenId = "0x8801dd1f667155f1a7c346684bf8211c97c26fd68f06d90f3c3fc51032b56f7c";

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
          // console.log("result.current.endorsementChain", result.current.endorsementChain);
          expect(result.current.endorsementChain).toEqual([
            {
              type: "INITIAL",
              transactionHash: "0x8b2020dafd991d59602ee10c8df24f9fa87e9f5f28ffd79ea12996f3987a920f",
              transactionIndex: 0,
              blockNumber: 13991837,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              timestamp: 1730681476000,
              remark: "",
            },
            {
              type: "TRANSFER_HOLDER",
              transactionHash: "0x04ca4811e5ac924c8749fd8c90240cf83584dfea6683a8289cd6d1ec7aaa44b9",
              transactionIndex: 0,
              blockNumber: 14404069,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x35C7dCd81E59A4621Ff0086f3FceAbe1b5975Fe0",
              timestamp: 1731562448000,
              remark: "Transfer",
            },
            {
              type: "REJECT_TRANSFER_HOLDER",
              transactionHash: "0xf6d6939cf048336cd33bda90f107d662e087428eb776df5f71ba0f5d050c0b23",
              transactionIndex: 2,
              blockNumber: 14404210,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              timestamp: 1731562748000,
              remark: "Reject Transfer",
            },
            {
              type: "TRANSFER_OWNERS",
              transactionHash: "0x46b4c72bac304ed0d47de6f654b73c210f923cc2ab93ee2b2ec351108d0dc76b",
              transactionIndex: 2,
              blockNumber: 14404408,
              owner: "0x35C7dCd81E59A4621Ff0086f3FceAbe1b5975Fe0",
              holder: "0x35C7dCd81E59A4621Ff0086f3FceAbe1b5975Fe0",
              timestamp: 1731563168000,
              remark: "Owner",
            },
            {
              type: "REJECT_TRANSFER_OWNERS",
              transactionHash: "0x09e0c00f62da3a19306e25b01bfb50f5166fdd48247aac5a8b698b8dedb53fd7",
              transactionIndex: 1,
              blockNumber: 14404563,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              timestamp: 1731563498000,
              remark: "Reject All",
            },
            {
              type: "RETURNED_TO_ISSUER",
              transactionHash: "0x26e122f57943e383120879f94319cc02bb9673f3182bea2d07f91e227ea5e127",
              transactionIndex: 2,
              blockNumber: 14404894,
              owner: "0x35C7dCd81E59A4621Ff0086f3FceAbe1b5975Fe0",
              holder: "0x35C7dCd81E59A4621Ff0086f3FceAbe1b5975Fe0",
              timestamp: 1731564200000,
              remark: "Return",
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
