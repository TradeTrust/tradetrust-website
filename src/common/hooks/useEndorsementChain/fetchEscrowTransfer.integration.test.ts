import { ethers, providers } from "ethers";
import { useProviderContext } from "../../contexts/provider";
import { ALCHEMY_API_KEY } from "../../../config";
import { TitleEscrow__factory } from "@govtechsg/token-registry/dist/contracts";
import { fetchEscrowTransfers, fetchHolderTransfers, fetchOwnerTransfers, getParsedLogs } from "./fetchEscrowTransfer";

jest.mock("../../contexts/provider");

const mumbaiProvider = new ethers.providers.AlchemyProvider("maticmum", ALCHEMY_API_KEY);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Fetch Escrow Transfers", () => {
  jest.setTimeout(15000);

  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: mumbaiProvider, providerOrSigner: mumbaiProvider });
  });

  describe("fetch from title escrow transfers", () => {
    it("should return parsed transfer logs in valid format", async () => {
      const escrowTransfers = await fetchEscrowTransfers(mumbaiProvider, "0xF9F8Cf68F297D60743B1E43991EC5E47526c0f9E");
      expect(escrowTransfers).toEqual([
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 36546402,
          holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          transactionHash: "0x8b3dcd4586c25b8f3efe4f0e2b792e6f2e3afc4be3df90cbd4235fc1099bb8e6",
          transactionIndex: 13,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 36790987,
          holder: "0xE4D83Aa444AF12E2B39e9Eb80AA8D6F0A9c79e6D",
          transactionHash: "0xc13a561882a46bdc1f6b330abce725904451d82c1c73002fc2e5398315bbf671",
          transactionIndex: 22,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 36791033,
          holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          transactionHash: "0xb59ba6c9dac6ede91f0915d24f304cd57b8cf7c0ea83af98757fcf1ba9f48ab1",
          transactionIndex: 18,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          blockNumber: 36546402,
          owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          transactionHash: "0x8b3dcd4586c25b8f3efe4f0e2b792e6f2e3afc4be3df90cbd4235fc1099bb8e6",
          transactionIndex: 13,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xE4D83Aa444AF12E2B39e9Eb80AA8D6F0A9c79e6D",
          blockNumber: 36791009,
          transactionHash: "0x4d9d3ba1ae289777580115f294d2f478224329f17a6658dd52065351c48cca14",
          transactionIndex: 31,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          blockNumber: 36791033,
          transactionHash: "0xb59ba6c9dac6ede91f0915d24f304cd57b8cf7c0ea83af98757fcf1ba9f48ab1",
          transactionIndex: 18,
        },
      ]);
    });

    it("should return parsed transfer logs in valid format", async () => {
      const titleEscrow = TitleEscrow__factory.connect("0xF9F8Cf68F297D60743B1E43991EC5E47526c0f9E", mumbaiProvider);
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
      const titleEscrow = TitleEscrow__factory.connect("0xF9F8Cf68F297D60743B1E43991EC5E47526c0f9E", mumbaiProvider);
      const ownerTransfers = await fetchOwnerTransfers(titleEscrow, mumbaiProvider);
      expect(ownerTransfers).toEqual([
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          blockNumber: 36546402,
          transactionHash: "0x8b3dcd4586c25b8f3efe4f0e2b792e6f2e3afc4be3df90cbd4235fc1099bb8e6",
          transactionIndex: 13,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xE4D83Aa444AF12E2B39e9Eb80AA8D6F0A9c79e6D",
          blockNumber: 36791009,
          transactionHash: "0x4d9d3ba1ae289777580115f294d2f478224329f17a6658dd52065351c48cca14",
          transactionIndex: 31,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          blockNumber: 36791033,
          transactionHash: "0xb59ba6c9dac6ede91f0915d24f304cd57b8cf7c0ea83af98757fcf1ba9f48ab1",
          transactionIndex: 18,
        },
      ]);
    });
  });

  describe("fetch from title escrow holder transfers", () => {
    it("should return parsed transfer logs in valid format", async () => {
      const titleEscrow = TitleEscrow__factory.connect("0xF9F8Cf68F297D60743B1E43991EC5E47526c0f9E", mumbaiProvider);
      const holderTransfers = await fetchHolderTransfers(titleEscrow, mumbaiProvider);
      expect(holderTransfers).toEqual([
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 36546402,
          holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          transactionHash: "0x8b3dcd4586c25b8f3efe4f0e2b792e6f2e3afc4be3df90cbd4235fc1099bb8e6",
          transactionIndex: 13,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 36790987,
          holder: "0xE4D83Aa444AF12E2B39e9Eb80AA8D6F0A9c79e6D",
          transactionHash: "0xc13a561882a46bdc1f6b330abce725904451d82c1c73002fc2e5398315bbf671",
          transactionIndex: 22,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 36791033,
          holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
          transactionHash: "0xb59ba6c9dac6ede91f0915d24f304cd57b8cf7c0ea83af98757fcf1ba9f48ab1",
          transactionIndex: 18,
        },
      ]);
    });
  });
});
