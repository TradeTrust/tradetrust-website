import { providers } from "ethers";
import { ChainId, ChainInfo } from "../../../constants/chain-info";
import { useProviderContext } from "../../contexts/provider";
import { fetchEscrowTransfersV5 } from "./fetchEscrowTransfer";

jest.mock("../../contexts/provider");

const amoyProvider = new providers.JsonRpcProvider(ChainInfo[ChainId.Amoy].rpcUrl);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Fetch Escrow Transfers, V5", () => {
  jest.setTimeout(15000);

  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: amoyProvider, providerOrSigner: amoyProvider });
  });

  describe("fetchEscrowTransfersV5, fetch from title escrow transfers", () => {
    it("should return parsed transfer logs in valid format", async () => {
      const escrowTransfers = await fetchEscrowTransfersV5(amoyProvider, "0xdc49a4125758c2ad62c078fd187283c84d1efc16");
      expect(escrowTransfers).toEqual([
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 13036219,
          holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
          transactionHash: "0xd7b2559f53b0aad1a47d052b6923beb10bf1c689b95a2e6a1d82a1b3ccaedb5d",
          transactionIndex: 1,
          remark: "0x",
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 13045757,
          holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
          transactionHash: "0x2cf515bb8a69e6d51839809cb63321ddfe9e6bb19d852deb1f14832a269c023a",
          transactionIndex: 1,
          remark: "0x7472616e73666572",
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 13045799,
          holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
          transactionHash: "0xde4ecbc5df9144c1d7350ca388e7727f0c7377342dcee15d212b0c350a3c80b7",
          transactionIndex: 4,
          remark: "0x72656a65637420686f6c646572",
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 13045995,
          holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
          transactionHash: "0xabcb5c8d62ac9acd6c5e59640ea0d6f120d0d5b995e2aebcae3d0eace47ed2dd",
          transactionIndex: 2,
          remark: "0x7472616e7366657220616c6c",
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 13049089,
          holder: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
          transactionHash: "0x750d2b15a9b448eb9aab3079da72edcc2e0c7485ce813f4cbd8b7fe3ba570381",
          transactionIndex: 0,
          remark: "0x72656a65637420616c6c",
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 13049855,
          holder: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
          transactionHash: "0xbc498e4e7717dab2da75bc6200cd1876be2797b4e06136bc077c22b40474712f",
          transactionIndex: 1,
          remark: "0x",
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 13152770,
          holder: "0x0000000000000000000000000000000000000000",
          transactionHash: "0x30144744f34eae5e44ab84f8621c64de977767b317998bfca0bc0ba7fa5c500d",
          transactionIndex: 1,
          remark: "0x",
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
          blockNumber: 13036219,
          transactionHash: "0xd7b2559f53b0aad1a47d052b6923beb10bf1c689b95a2e6a1d82a1b3ccaedb5d",
          transactionIndex: 1,
          remark: "0x",
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
          blockNumber: 13045917,
          transactionHash: "0xaffcbb25580cf220e972b6fc99527b3883b8d2cd27cbbdde5a72f9ef0967e2b5",
          transactionIndex: 1,
          remark: "0x6f776e6572",
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
          blockNumber: 13045946,
          transactionHash: "0x8e7957a9e181d3db099efffb5c9fc1a0b275ed9c244794e39a21625bf70ba4f2",
          transactionIndex: 2,
          remark: "0x72656a656374206f776e6572",
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
          blockNumber: 13045995,
          transactionHash: "0xabcb5c8d62ac9acd6c5e59640ea0d6f120d0d5b995e2aebcae3d0eace47ed2dd",
          transactionIndex: 2,
          remark: "0x7472616e7366657220616c6c",
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x433097a1C1b8a3e9188d8C54eCC057B1D69f1638",
          blockNumber: 13049089,
          transactionHash: "0x750d2b15a9b448eb9aab3079da72edcc2e0c7485ce813f4cbd8b7fe3ba570381",
          transactionIndex: 0,
          remark: "0x72656a65637420616c6c",
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x6F36BbCF16bac711Bcf71aBC9971d76285F44c6C",
          blockNumber: 13049874,
          transactionHash: "0x5e2a2c5fa9462b96eaf2b3fb4441a490853921e4a87fc783047ef17edef1f6af",
          transactionIndex: 0,
          remark: "0x",
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x0000000000000000000000000000000000000000",
          blockNumber: 13152770,
          transactionHash: "0x30144744f34eae5e44ab84f8621c64de977767b317998bfca0bc0ba7fa5c500d",
          transactionIndex: 1,
          remark: "0x",
        },
        {
          type: "INITIAL",
          from: "0x0000000000000000000000000000000000000000",
          to: "0xdc49a4125758c2ad62c078fd187283c84d1efc16",
          blockNumber: 13036219,
          transactionHash: "0xd7b2559f53b0aad1a47d052b6923beb10bf1c689b95a2e6a1d82a1b3ccaedb5d",
          transactionIndex: 1,
          remark: "0x6669727374206d696e74",
        },
        {
          type: "SURRENDER_REJECTED",
          from: "0x96cc41e7007Dee20eB409586E2e8206d5053219B",
          to: "0xdc49a4125758c2ad62c078fd187283c84d1efc16",
          blockNumber: 13050203,
          transactionHash: "0xf4002d91b42cdae6e1bc5b4c9285ee55e886126043f66b42abc6680404a38bb4",
          transactionIndex: 0,
          remark: "0x726573746f7265",
        },
        {
          type: "SURRENDERED",
          blockNumber: 13050056,
          from: "0xdc49a4125758c2ad62c078fd187283c84d1efc16",
          to: "0x96cc41e7007Dee20eB409586E2e8206d5053219B",
          transactionHash: "0xe5c8c1a94c7daf49b153d9626e25a5040822ef7f4bc1e6f301b5cd7f4374b51f",
          transactionIndex: 0,
          remark: "0x",
        },
        {
          type: "SURRENDERED",
          blockNumber: 13152611,
          from: "0xdc49a4125758c2ad62c078fd187283c84d1efc16",
          to: "0x96cc41e7007Dee20eB409586E2e8206d5053219B",
          transactionHash: "0x202061e97f34df6f41016714d4bfa3429bef3e7b4cf4f69c8a4d4e032e2453cf",
          transactionIndex: 1,
          remark: "0x73757272656e646572",
        },
        {
          type: "REJECT_TRANSFER_OWNERS",
          blockNumber: 13049089,
          transactionHash: "0x750d2b15a9b448eb9aab3079da72edcc2e0c7485ce813f4cbd8b7fe3ba570381",
          transactionIndex: 0,
          remark: "0x72656a65637420616c6c",
        },
        {
          type: "REJECT_TRANSFER_BENEFICIARY",
          blockNumber: 13045946,
          transactionHash: "0x8e7957a9e181d3db099efffb5c9fc1a0b275ed9c244794e39a21625bf70ba4f2",
          transactionIndex: 2,
          remark: "0x72656a656374206f776e6572",
        },
        {
          type: "REJECT_TRANSFER_HOLDER",
          blockNumber: 13045799,
          transactionHash: "0xde4ecbc5df9144c1d7350ca388e7727f0c7377342dcee15d212b0c350a3c80b7",
          transactionIndex: 4,
          remark: "0x72656a65637420686f6c646572",
        },
        {
          type: "SURRENDER_ACCEPTED",
          blockNumber: 13152770,
          from: "0x96cc41e7007Dee20eB409586E2e8206d5053219B",
          to: "0x00000000000000000000000000000000000dead",
          transactionHash: "0x30144744f34eae5e44ab84f8621c64de977767b317998bfca0bc0ba7fa5c500d",
          transactionIndex: 1,
          remark: "0x7368726564",
        },
      ]);
    });
  });
});
