import { providers } from "ethers";
import { useProviderContext } from "../../contexts/provider";
import { TitleEscrow__factory } from "@tradetrust-tt/token-registry/dist/contracts";
import { fetchEscrowTransfers, fetchHolderTransfers, fetchOwnerTransfers, getParsedLogs } from "./fetchEscrowTransfer";
import { ChainId, ChainInfo } from "../../../constants/chain-info";

jest.mock("../../contexts/provider");

const amoyProvider = new providers.JsonRpcProvider(ChainInfo[ChainId.Amoy].rpcUrl);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Fetch Escrow Transfers", () => {
  jest.setTimeout(15000);
  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: amoyProvider, providerOrSigner: amoyProvider });
  });

  describe("fetch from title escrow transfers", () => {
    it("should return parsed transfer logs in valid format", async () => {
      const blockNo = 6000000;
      const escrowTransfers = await fetchEscrowTransfers(
        amoyProvider,
        "0x1F6D8888Fc6B75E10b1840620E8229C3C487a925",
        blockNo
      );
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

  describe("fetch from title escrow owner transfers", () => {
    it("should return parsed transfer logs for beneficiary in valid format", async () => {
      const titleEscrow = TitleEscrow__factory.connect("0x1F6D8888Fc6B75E10b1840620E8229C3C487a925", amoyProvider);
      const blockNo = 6000000;
      const ownerTransfers = await fetchOwnerTransfers(titleEscrow, amoyProvider, blockNo);
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

  describe("fetch from title escrow holder transfers", () => {
    it("should return parsed transfer logs for holder in valid format", async () => {
      const titleEscrow = TitleEscrow__factory.connect("0x1F6D8888Fc6B75E10b1840620E8229C3C487a925", amoyProvider);
      const blockNo = 6000000;
      const holderTransfers = await fetchHolderTransfers(titleEscrow, amoyProvider, blockNo);
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
