import { ethers, providers } from "ethers";
import { useProviderContext } from "../../contexts/provider";
import { INFURA_API_KEY } from "../../../config";
import { TitleEscrow__factory } from "@govtechsg/token-registry/dist/contracts";
import { fetchEscrowTransfers, fetchHolderTransfers, fetchOwnerTransfers, getParsedLogs } from "./fetchEscrowTransfer";

jest.mock("../../contexts/provider");

const goerliProvider = new ethers.providers.InfuraProvider("goerli", INFURA_API_KEY);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Fetch Escrow Transfers", () => {
  jest.setTimeout(15000);

  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: goerliProvider, providerOrSigner: goerliProvider });
  });

  describe("fetch from title escrow transfers", () => {
    it("should return parsed transfer logs in valid format", async () => {
      const escrowTransfers = await fetchEscrowTransfers(goerliProvider, "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279");
      expect(escrowTransfers).toEqual([
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7831157,
          holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          transactionHash: "0x1144cd45c4b9deae74a885d38bececeb1a3e194dbbcc3ef6f8c180f911ac0bb0",
          transactionIndex: 104,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7835445,
          holder: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
          transactionHash: "0xedb4de0f4af90140a6fe5926efbcc60246634f7aba41ce0fbaaf125e19a1d44c",
          transactionIndex: 9,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7835503,
          holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          transactionHash: "0xe8621e14bb5237a741e716f01990e6b9e856020afa49cd600e4ec586a81b5765",
          transactionIndex: 24,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7835673,
          holder: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
          transactionHash: "0x273adc427b8c9bacf3e125fc2d4ce7b6169c921116a191d18bb73cbcd1782392",
          transactionIndex: 16,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7835693,
          holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          transactionHash: "0x80da1fd7ae5c6e0a01155ad13097a531d74167aa5a04a47b9a38844146b4682f",
          transactionIndex: 20,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7835716,
          holder: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
          transactionHash: "0x0f4612708c301c844b30aee493f361a0d0a61543e988025ec933afa9762d6da2",
          transactionIndex: 63,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7835735,
          holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          transactionHash: "0xcf4537a4c8a6ba5cda883cb489318fff800379462cab535501876d37389305df",
          transactionIndex: 54,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7836281,
          holder: "0x0000000000000000000000000000000000000000",
          transactionHash: "0x497395d2d58837a3fe686a883eaaaa2675b3d8ad10479abec2184349f7d38cb4",
          transactionIndex: 18,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          blockNumber: 7831157,
          transactionHash: "0x1144cd45c4b9deae74a885d38bececeb1a3e194dbbcc3ef6f8c180f911ac0bb0",
          transactionIndex: 104,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
          blockNumber: 7835628,
          transactionHash: "0xaf4418d8acee750ac10fec640a3d3c1e3104c25400687483f5df534dbc420cc2",
          transactionIndex: 30,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          blockNumber: 7835693,
          transactionHash: "0x80da1fd7ae5c6e0a01155ad13097a531d74167aa5a04a47b9a38844146b4682f",
          transactionIndex: 20,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x0000000000000000000000000000000000000000",
          blockNumber: 7836281,
          transactionHash: "0x497395d2d58837a3fe686a883eaaaa2675b3d8ad10479abec2184349f7d38cb4",
          transactionIndex: 18,
        },
      ]);
    });

    it("should return parsed transfer logs in valid format", async () => {
      const titleEscrow = TitleEscrow__factory.connect("0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279", goerliProvider);
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
    it("should return parsed transfer logs in valid format", async () => {
      const titleEscrow = TitleEscrow__factory.connect("0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279", goerliProvider);
      const ownerTransfers = await fetchOwnerTransfers(titleEscrow, goerliProvider);
      expect(ownerTransfers).toEqual([
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          blockNumber: 7831157,
          transactionHash: "0x1144cd45c4b9deae74a885d38bececeb1a3e194dbbcc3ef6f8c180f911ac0bb0",
          transactionIndex: 104,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
          blockNumber: 7835628,
          transactionHash: "0xaf4418d8acee750ac10fec640a3d3c1e3104c25400687483f5df534dbc420cc2",
          transactionIndex: 30,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          blockNumber: 7835693,
          transactionHash: "0x80da1fd7ae5c6e0a01155ad13097a531d74167aa5a04a47b9a38844146b4682f",
          transactionIndex: 20,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x0000000000000000000000000000000000000000",
          blockNumber: 7836281,
          transactionHash: "0x497395d2d58837a3fe686a883eaaaa2675b3d8ad10479abec2184349f7d38cb4",
          transactionIndex: 18,
        },
      ]);
    });
  });

  describe("fetch from title escrow holder transfers", () => {
    it("should return parsed transfer logs in valid format", async () => {
      const titleEscrow = TitleEscrow__factory.connect("0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279", goerliProvider);
      const holderTransfers = await fetchHolderTransfers(titleEscrow, goerliProvider);
      expect(holderTransfers).toEqual([
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7831157,
          holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          transactionHash: "0x1144cd45c4b9deae74a885d38bececeb1a3e194dbbcc3ef6f8c180f911ac0bb0",
          transactionIndex: 104,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7835445,
          holder: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
          transactionHash: "0xedb4de0f4af90140a6fe5926efbcc60246634f7aba41ce0fbaaf125e19a1d44c",
          transactionIndex: 9,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7835503,
          holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          transactionHash: "0xe8621e14bb5237a741e716f01990e6b9e856020afa49cd600e4ec586a81b5765",
          transactionIndex: 24,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7835673,
          holder: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
          transactionHash: "0x273adc427b8c9bacf3e125fc2d4ce7b6169c921116a191d18bb73cbcd1782392",
          transactionIndex: 16,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7835693,
          holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          transactionHash: "0x80da1fd7ae5c6e0a01155ad13097a531d74167aa5a04a47b9a38844146b4682f",
          transactionIndex: 20,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7835716,
          holder: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
          transactionHash: "0x0f4612708c301c844b30aee493f361a0d0a61543e988025ec933afa9762d6da2",
          transactionIndex: 63,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7835735,
          holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          transactionHash: "0xcf4537a4c8a6ba5cda883cb489318fff800379462cab535501876d37389305df",
          transactionIndex: 54,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7836281,
          holder: "0x0000000000000000000000000000000000000000",
          transactionHash: "0x497395d2d58837a3fe686a883eaaaa2675b3d8ad10479abec2184349f7d38cb4",
          transactionIndex: 18,
        },
      ]);
    });
  });
});
