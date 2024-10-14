import { providers } from "ethers";
import { useProviderContext } from "../../contexts/provider";
import { TitleEscrow__factory } from "@tradetrust-tt/token-registry/dist/contracts";
import {
  fetchEscrowTransfers,
  fetchEscrowTransfersV5,
  fetchHolderTransfers,
  fetchOwnerTransfers,
  getParsedLogs,
} from "./fetchEscrowTransfer";
import { ChainId, ChainInfo } from "../../../constants/chain-info";

jest.mock("../../contexts/provider");

const amoyProvider = new providers.JsonRpcProvider(ChainInfo[ChainId.Amoy].rpcUrl);

const mockUseProviderContext = useProviderContext as jest.Mock;

// TODO: HAN Remove V4 Token Registry function
// eslint-disable-next-line jest/no-disabled-tests
describe.skip("Fetch Escrow Transfers, V4", () => {
  jest.setTimeout(15000);

  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: amoyProvider, providerOrSigner: amoyProvider });
  });

  describe("fetchEscrowTransfers, fetch from title escrow transfers", () => {
    it("should return parsed transfer logs in valid format", async () => {
      const escrowTransfers = await fetchEscrowTransfers(amoyProvider, "0x1F6D8888Fc6B75E10b1840620E8229C3C487a925");
      expect(escrowTransfers).toEqual([
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6162747,
          holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          transactionHash: "0x2d98ae3908f0edd095a871a0c56dd3c0e1cfd657b53f28f7c01b1cb83bebc28b",
          transactionIndex: 5,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6164050,
          holder: "0xd3DD13B7e8D7454F4Fdf0e1a630FDE4f9De84749",
          transactionHash: "0x38df7d1bd50f89aefa3a4385afe12f4d9dd320bcdc24d9ff7a775193fa5b6178",
          transactionIndex: 4,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6202088,
          holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          transactionHash: "0xff88596d7b86e99dfa2851bec90ed47acc30dbde0c7d4924501584809d657135",
          transactionIndex: 1,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6202133,
          holder: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
          transactionHash: "0x888ef1ce5cd0455e9bfa50122d76e12d54da87d3b93c34460c2439116c582ca6",
          transactionIndex: 3,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6242178,
          holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          transactionHash: "0xba94dbbd7905d706244fdd53121d41ec23c4d67ab08d2f0820287d07f4d03989",
          transactionIndex: 1,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6242197,
          holder: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
          transactionHash: "0xd95d77620c7916290fecd2a38277dec9010e63872dc96be05f3126767b39ba4e",
          transactionIndex: 3,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6242545,
          holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          transactionHash: "0xee5eb7953687e0d2e05be34091e4a59256de4dc7df18eaeaf1a65cbb833ba6a8",
          transactionIndex: 3,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6242791,
          holder: "0x0000000000000000000000000000000000000000",
          transactionHash: "0xcf6968ef91efe74b8ada1770fc31e811f15989f80b0d518a42e06d4ab5bac8bd",
          transactionIndex: 3,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          blockNumber: 6162747,
          transactionHash: "0x2d98ae3908f0edd095a871a0c56dd3c0e1cfd657b53f28f7c01b1cb83bebc28b",
          transactionIndex: 5,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
          blockNumber: 6201774,
          transactionHash: "0x4a3be9573991980738e99a1f39485b9141c9012419076cbc1bd87038b3efd313",
          transactionIndex: 3,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          blockNumber: 6242178,
          transactionHash: "0xba94dbbd7905d706244fdd53121d41ec23c4d67ab08d2f0820287d07f4d03989",
          transactionIndex: 1,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x0000000000000000000000000000000000000000",
          blockNumber: 6242791,
          transactionHash: "0xcf6968ef91efe74b8ada1770fc31e811f15989f80b0d518a42e06d4ab5bac8bd",
          transactionIndex: 3,
        },
      ]);
    });

    it("should return parsed transfer logs in valid format", async () => {
      const titleEscrow = TitleEscrow__factory.connect("0x1F6D8888Fc6B75E10b1840620E8229C3C487a925", amoyProvider);
      const log = {
        blockNumber: 7836281,
        blockHash: "0x62f2ad472722a5ee2d78994608d668d8c7ab75dbc5419992c07900ed4dcf6ccc",
        transactionIndex: 18,
        removed: false,
        address: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
        data: "0x0000000000000000000000002b1b777614f8a90f9cc29ec6db521581c068a749c38268c2b0248d6d9ba5b2dc35d19c99a7688f3221935457713d6621edc300c3",
        topics: [
          "0xfebadd5e06bc3e2885248448caca94df39be7cf7fde139b4586ac7b92dfe70b2",
          "0x0000000000000000000000008d366250a96debe81c8619459a503a0eebe33ca6",
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        ],
        transactionHash: "0x497395d2d58837a3fe686a883eaaaa2675b3d8ad10479abec2184349f7d38cb4",
        logIndex: 52,
      } as providers.Log;
      const parsedLogs = getParsedLogs([log], titleEscrow);
      expect(parsedLogs.length).toBe(1);
      const expectedResults = [
        {
          blockNumber: 7836281,
          blockHash: "0x62f2ad472722a5ee2d78994608d668d8c7ab75dbc5419992c07900ed4dcf6ccc",
          transactionIndex: 18,
          removed: false,
          address: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
          data: "0x0000000000000000000000002b1b777614f8a90f9cc29ec6db521581c068a749c38268c2b0248d6d9ba5b2dc35d19c99a7688f3221935457713d6621edc300c3",
          topics: [
            "0xfebadd5e06bc3e2885248448caca94df39be7cf7fde139b4586ac7b92dfe70b2",
            "0x0000000000000000000000008d366250a96debe81c8619459a503a0eebe33ca6",
            "0x0000000000000000000000000000000000000000000000000000000000000000",
          ],
          transactionHash: "0x497395d2d58837a3fe686a883eaaaa2675b3d8ad10479abec2184349f7d38cb4",
          logIndex: 52,
          eventFragment: {
            name: "HolderTransfer",
            anonymous: false,
            inputs: [
              {
                name: "fromHolder",
                type: "address",
                indexed: true,
                components: null,
                arrayLength: null,
                arrayChildren: null,
                baseType: "address",
                _isParamType: true,
              },
              {
                name: "toHolder",
                type: "address",
                indexed: true,
                components: null,
                arrayLength: null,
                arrayChildren: null,
                baseType: "address",
                _isParamType: true,
              },
              {
                name: "registry",
                type: "address",
                indexed: false,
                components: null,
                arrayLength: null,
                arrayChildren: null,
                baseType: "address",
                _isParamType: true,
              },
              {
                name: "tokenId",
                type: "uint256",
                indexed: false,
                components: null,
                arrayLength: null,
                arrayChildren: null,
                baseType: "uint256",
                _isParamType: true,
              },
            ],
            type: "event",
            _isFragment: true,
          },
          name: "HolderTransfer",
          signature: "HolderTransfer(address,address,address,uint256)",
          topic: "0xfebadd5e06bc3e2885248448caca94df39be7cf7fde139b4586ac7b92dfe70b2",
          args: [
            "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
            "0x0000000000000000000000000000000000000000",
            "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
            {
              type: "BigNumber",
              hex: "0xc38268c2b0248d6d9ba5b2dc35d19c99a7688f3221935457713d6621edc300c3",
            },
          ],
        },
      ];
      expect(JSON.stringify(parsedLogs)).toEqual(JSON.stringify(expectedResults));
    });
  });

  describe("fetchOwnerTransfers, fetch from title escrow owner transfers", () => {
    it("should return parsed transfer logs for beneficiary in valid format", async () => {
      const titleEscrow = TitleEscrow__factory.connect("0x1F6D8888Fc6B75E10b1840620E8229C3C487a925", amoyProvider);
      const ownerTransfers = await fetchOwnerTransfers(titleEscrow, amoyProvider);
      expect(ownerTransfers).toEqual([
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          blockNumber: 6162747,
          transactionHash: "0x2d98ae3908f0edd095a871a0c56dd3c0e1cfd657b53f28f7c01b1cb83bebc28b",
          transactionIndex: 5,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
          blockNumber: 6201774,
          transactionHash: "0x4a3be9573991980738e99a1f39485b9141c9012419076cbc1bd87038b3efd313",
          transactionIndex: 3,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          blockNumber: 6242178,
          transactionHash: "0xba94dbbd7905d706244fdd53121d41ec23c4d67ab08d2f0820287d07f4d03989",
          transactionIndex: 1,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x0000000000000000000000000000000000000000",
          blockNumber: 6242791,
          transactionHash: "0xcf6968ef91efe74b8ada1770fc31e811f15989f80b0d518a42e06d4ab5bac8bd",
          transactionIndex: 3,
        },
      ]);
    });
  });

  describe("fetchHolderTransfers, fetch from title escrow holder transfers", () => {
    it("should return parsed transfer logs for holder in valid format", async () => {
      const titleEscrow = TitleEscrow__factory.connect("0x1F6D8888Fc6B75E10b1840620E8229C3C487a925", amoyProvider);
      const holderTransfers = await fetchHolderTransfers(titleEscrow, amoyProvider);
      expect(holderTransfers).toEqual([
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6162747,
          holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          transactionHash: "0x2d98ae3908f0edd095a871a0c56dd3c0e1cfd657b53f28f7c01b1cb83bebc28b",
          transactionIndex: 5,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6164050,
          holder: "0xd3DD13B7e8D7454F4Fdf0e1a630FDE4f9De84749",
          transactionHash: "0x38df7d1bd50f89aefa3a4385afe12f4d9dd320bcdc24d9ff7a775193fa5b6178",
          transactionIndex: 4,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6202088,
          holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          transactionHash: "0xff88596d7b86e99dfa2851bec90ed47acc30dbde0c7d4924501584809d657135",
          transactionIndex: 1,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6202133,
          holder: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
          transactionHash: "0x888ef1ce5cd0455e9bfa50122d76e12d54da87d3b93c34460c2439116c582ca6",
          transactionIndex: 3,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6242178,
          holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          transactionHash: "0xba94dbbd7905d706244fdd53121d41ec23c4d67ab08d2f0820287d07f4d03989",
          transactionIndex: 1,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6242197,
          holder: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
          transactionHash: "0xd95d77620c7916290fecd2a38277dec9010e63872dc96be05f3126767b39ba4e",
          transactionIndex: 3,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6242545,
          holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          transactionHash: "0xee5eb7953687e0d2e05be34091e4a59256de4dc7df18eaeaf1a65cbb833ba6a8",
          transactionIndex: 3,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 6242791,
          holder: "0x0000000000000000000000000000000000000000",
          transactionHash: "0xcf6968ef91efe74b8ada1770fc31e811f15989f80b0d518a42e06d4ab5bac8bd",
          transactionIndex: 3,
        },
      ]);
    });
  });
});

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
