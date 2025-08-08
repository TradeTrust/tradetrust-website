import { waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import { ethers, providers } from "ethers";
import _ from "lodash";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { ChainId } from "../../../constants/chain-info";
import { TokenInformationContextProvider, useTokenInformationContext } from "../../contexts/TokenInformationContext";
import { useProviderContext } from "../../contexts/provider";
import { configureStore } from "../../../store";
import { useEndorsementChain } from "./useEndorsementChain";
import { mock } from "./useEndorsementChain.mock";

jest.mock("../../contexts/provider");

const amoyProvider = new providers.JsonRpcProvider("https://rpc-amoy.polygon.technology", ChainId.Amoy);

const mockUseProviderContext = useProviderContext as jest.Mock;

const store = configureStore();

const wrapper = ({ children }: { children: JSX.Element }) => (
  <Provider store={store}>
    <TokenInformationContextProvider>{children}</TokenInformationContextProvider>
  </Provider>
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
        { timeout: 120_000 }
      );
    });
  }, 120_000);

  it("should work correctly for a given tokenRegistryAddress + tokenId with Transfer, Surrender, Burnt events", async () => {
    // Mirror mock function from trustvc endorsement-chain.test.ts
    const grouped = _.groupBy(mock, "function");
    for (const [group, value] of Object.entries(
      grouped as { [key: string]: { function: string; params: any; result: any }[] }
    )) {
      const originalMethod = (ethers.providers.JsonRpcProvider.prototype as any)[group];
      jest
        .spyOn(ethers.providers.JsonRpcProvider.prototype, group as any)
        .mockImplementation(async function (this: InstanceType<typeof ethers.providers.Provider>, ...params: any[]) {
          const cache = new Map();
          for (const item of value) {
            cache.set(JSON.stringify(item.params), item.result);
          }
          if (cache.has(JSON.stringify(params))) {
            return cache.get(JSON.stringify(params));
          } else {
            const result = await originalMethod.apply(this, params);
            cache.set(JSON.stringify(params), result);
            return result;
          }
        });
    }
    const { result } = renderHook(
      () => {
        const tokenRegistryAddress = "0x3781bd0bbd15Bf5e45c7296115821933d47362be";
        const tokenId = "0xe3fa2bbdbfd093d2bb4e1555dde01338af25d5cf1d6d87bd0f22d7302f133f9a";

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
          expect(result.current.endorsementChain).toStrictEqual([
            {
              type: "INITIAL",
              transactionHash: "0x1a81b333253e30d992660ba9708d9deb47eab9479acaffb464dc7252eb0bcbcd",
              transactionIndex: 0,
              blockNumber: 15012819,
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              timestamp: 1732868913000,
              remark: "",
            },
            {
              blockNumber: 15068417,
              holder: "0xe0A71284EF59483795053266CB796B65E48B5124",
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              remark: "Transfer Holdership",
              timestamp: 1732987077000,
              transactionHash: "0xd6438cbcf121295023be61b96a01d71e31b53018b03110899091cbb082cc9360",
              transactionIndex: 1,
              type: "TRANSFER_HOLDER",
            },
            {
              blockNumber: 15068463,
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              remark: "Reject Holdership",
              timestamp: 1732987173000,
              transactionHash: "0x5010bf1c17b29f6c333c170b8293feadd7ea58be1d1098a33cbe2024b4d2a95f",
              transactionIndex: 1,
              type: "REJECT_TRANSFER_HOLDER",
            },
            {
              blockNumber: 15068525,
              holder: "0xe0A71284EF59483795053266CB796B65E48B5124",
              owner: "0xe0A71284EF59483795053266CB796B65E48B5124",
              remark: "Transfer of Ownership and Holdership",
              timestamp: 1732987305000,
              transactionHash: "0xedd28b262666c446354999c4f87f4b1eeaba61f5c95c6a41d80ccbf4059e51e1",
              transactionIndex: 0,
              type: "TRANSFER_OWNERS",
            },
            {
              blockNumber: 15068663,
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              remark: "Reject Ownership and Holdership",
              timestamp: 1732987599000,
              transactionHash: "0x6710fef3f921de7e3a3e4c782e0fff9222c0fd737f37d8a997b6af133086a86d",
              transactionIndex: 1,
              type: "REJECT_TRANSFER_OWNERS",
            },
            {
              blockNumber: 15068712,
              holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
              owner: "0xe0A71284EF59483795053266CB796B65E48B5124",
              remark: "Transfer Holdership",
              timestamp: 1732987703000,
              transactionHash: "0xadb9231bece27ae3aac4e2483752046014e983b80d54dfc490e3459da451dbfa",
              transactionIndex: 0,
              type: "TRANSFER_HOLDER",
            },
            {
              blockNumber: 15068740,
              holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
              owner: "0xe0A71284EF59483795053266CB796B65E48B5124",
              remark: "Endorse Ownership",
              timestamp: 1732987763000,
              transactionHash: "0x3982f31d4dcb46e44df176d00ead1b388de8cab7edbc75fd4424918a8e3d48ec",
              transactionIndex: 0,
              type: "TRANSFER_BENEFICIARY",
            },
            {
              blockNumber: 15068755,
              holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
              owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              remark: "Reject Ownership",
              timestamp: 1732987795000,
              transactionHash: "0x6352647f0ebba87639e79cc9667faba8e9ea7281b7d4981a2dbe9374406d6310",
              transactionIndex: 0,
              type: "REJECT_TRANSFER_BENEFICIARY",
            },
            {
              blockNumber: 15069476,
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              owner: "0xe0A71284EF59483795053266CB796B65E48B5124",
              remark: "Transfer Holder",
              timestamp: 1732989327000,
              transactionHash: "0x2d53578ffe1889dd82eecd5e923dabb06b57eb67a2d16e2c8b210e02b398c5c5",
              transactionIndex: 0,
              type: "TRANSFER_HOLDER",
            },
            {
              blockNumber: 15069490,
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              owner: "0xe0A71284EF59483795053266CB796B65E48B5124",
              remark: "Return To Issuer",
              timestamp: 1732989357000,
              transactionHash: "0x8e575e2a281d3bce5d6e4b6298e1e54b9c49bad0ef135ae9e68fc9d02ccc1ba1",
              transactionIndex: 0,
              type: "RETURNED_TO_ISSUER",
            },
            {
              blockNumber: 15069501,
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              owner: "0xe0A71284EF59483795053266CB796B65E48B5124",
              remark: "Reject Return To Issuer",
              timestamp: 1732989379000,
              transactionHash: "0x3bf456d1fa29e4b7cfc3cbfc3a568f5c2c4e1dd8454d25f8822eea3b65c66956",
              transactionIndex: 0,
              type: "RETURN_TO_ISSUER_REJECTED",
            },
            {
              blockNumber: 15069511,
              holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
              owner: "0xe0A71284EF59483795053266CB796B65E48B5124",
              remark: "Return To Issuer",
              timestamp: 1732989401000,
              transactionHash: "0x99e56c4a1ddcf1a8031402a46eb41b4c41f1379f420287aaa57cad0e18ed85ce",
              transactionIndex: 2,
              type: "RETURNED_TO_ISSUER",
            },
            {
              blockNumber: 15069519,
              holder: "0x0000000000000000000000000000000000000000",
              owner: "0x0000000000000000000000000000000000000000",
              remark: "Accept Return To Issuer",
              timestamp: 1732989417000,
              transactionHash: "0xbc9c0a07467310b45f4099578613b0531ab20975d52d1a3485c69e16901e3cb7",
              transactionIndex: 0,
              type: "RETURN_TO_ISSUER_ACCEPTED",
            },
          ]);
          expect(result.current.pending).toBe(false);
          expect(result.current.error).toBe("");
        },
        { timeout: 120_000 }
      );
    });
  }, 120_000);
});
