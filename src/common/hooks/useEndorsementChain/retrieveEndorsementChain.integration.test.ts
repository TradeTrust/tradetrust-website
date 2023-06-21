import { ethers } from "ethers";
import { useProviderContext } from "../../contexts/provider";
import { ALCHEMY_API_KEY } from "../../../config";
import { TransferBaseEvent } from "../../../types";
import { getEndorsementChain } from "./retrieveEndorsementChain";

jest.mock("../../contexts/provider");

const mumbaiProvider = new ethers.providers.AlchemyProvider("maticmum", ALCHEMY_API_KEY);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Fetch Endorsement Transfers", () => {
  jest.setTimeout(45000);

  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: mumbaiProvider, providerOrSigner: mumbaiProvider });
  });

  it("should format endorsement chain for display", async () => {
    const logChain = [
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
        type: "TRANSFER_BENEFICIARY",
        owner: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
        blockNumber: 7835628,
        transactionHash: "0xaf4418d8acee750ac10fec640a3d3c1e3104c25400687483f5df534dbc420cc2",
        transactionIndex: 30,
      },
      {
        type: "SURRENDERED",
        from: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
        to: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
        blockNumber: 7835698,
        transactionHash: "0xe11c49e31b47a27c13106213485cc4684f48d765b785005048ba57ea366a1639",
        transactionIndex: 62,
      },
      {
        type: "SURRENDER_REJECTED",
        from: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
        to: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
        blockNumber: 7835703,
        transactionHash: "0x9f074aa153b03b5d8f4cdd51142491bb821696a1bda21d24ee2d947891ada9d0",
        transactionIndex: 17,
      },
      {
        type: "SURRENDERED",
        from: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
        to: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
        blockNumber: 7835738,
        transactionHash: "0x6782d845fe298cd79584a25466d1e2d9a3ff8d14591b4b424922709b7605f58e",
        transactionIndex: 86,
      },
      {
        type: "SURRENDER_REJECTED",
        from: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
        to: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
        blockNumber: 7836089,
        transactionHash: "0x4668970e883841dab512dc53c63f05c7c7452e9876086c2838710cfd42286726",
        transactionIndex: 59,
      },
      {
        type: "SURRENDERED",
        from: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
        to: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
        blockNumber: 7836139,
        transactionHash: "0xf1193038431ec68ca26a2f2e52b9dfdb677411c5afa4d1048a43eade8313b3ea",
        transactionIndex: 206,
      },
      {
        type: "SURRENDER_REJECTED",
        from: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
        to: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
        blockNumber: 7836270,
        transactionHash: "0x6162961170520543c6d760c166a72c934b7cc84d0fa0eaf5097745071f3af334",
        transactionIndex: 46,
      },
      {
        type: "SURRENDERED",
        from: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
        to: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
        blockNumber: 7836273,
        transactionHash: "0xb30c0a48f5ebe6748b31f7f5f370b605eece7a093f950d7715f54ede2474fee7",
        transactionIndex: 59,
      },
      {
        type: "INITIAL",
        blockNumber: 7831157,
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        transactionHash: "0x1144cd45c4b9deae74a885d38bececeb1a3e194dbbcc3ef6f8c180f911ac0bb0",
        transactionIndex: 104,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
      },
      {
        type: "TRANSFER_OWNERS",
        blockNumber: 7835693,
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        transactionHash: "0x80da1fd7ae5c6e0a01155ad13097a531d74167aa5a04a47b9a38844146b4682f",
        transactionIndex: 20,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
      },
      {
        type: "SURRENDER_ACCEPTED",
        blockNumber: 7836281,
        holder: "0x0000000000000000000000000000000000000000",
        transactionHash: "0x497395d2d58837a3fe686a883eaaaa2675b3d8ad10479abec2184349f7d38cb4",
        transactionIndex: 18,
        owner: "0x0000000000000000000000000000000000000000",
      },
    ] as TransferBaseEvent[];

    const results = await getEndorsementChain(mumbaiProvider, logChain);
    expect(results).toEqual([
      {
        type: "INITIAL",
        transactionHash: "0x1144cd45c4b9deae74a885d38bececeb1a3e194dbbcc3ef6f8c180f911ac0bb0",
        transactionIndex: 104,
        blockNumber: 7831157,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        timestamp: 1607504532000,
      },
      {
        type: "TRANSFER_HOLDER",
        transactionHash: "0xedb4de0f4af90140a6fe5926efbcc60246634f7aba41ce0fbaaf125e19a1d44c",
        transactionIndex: 9,
        blockNumber: 7835445,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        holder: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
        timestamp: 1607513376000,
      },
      {
        type: "TRANSFER_HOLDER",
        transactionHash: "0xe8621e14bb5237a741e716f01990e6b9e856020afa49cd600e4ec586a81b5765",
        transactionIndex: 24,
        blockNumber: 7835503,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        timestamp: 1607513496000,
      },
      {
        type: "TRANSFER_BENEFICIARY",
        transactionHash: "0xaf4418d8acee750ac10fec640a3d3c1e3104c25400687483f5df534dbc420cc2",
        transactionIndex: 30,
        blockNumber: 7835628,
        owner: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        timestamp: 1607513754000,
      },
      {
        type: "TRANSFER_HOLDER",
        transactionHash: "0x273adc427b8c9bacf3e125fc2d4ce7b6169c921116a191d18bb73cbcd1782392",
        transactionIndex: 16,
        blockNumber: 7835673,
        owner: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
        holder: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
        timestamp: 1607513848000,
      },
      {
        type: "TRANSFER_OWNERS",
        transactionHash: "0x80da1fd7ae5c6e0a01155ad13097a531d74167aa5a04a47b9a38844146b4682f",
        transactionIndex: 20,
        blockNumber: 7835693,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        timestamp: 1607513888000,
      },
      {
        type: "SURRENDERED",
        transactionHash: "0xe11c49e31b47a27c13106213485cc4684f48d765b785005048ba57ea366a1639",
        transactionIndex: 62,
        blockNumber: 7835698,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        timestamp: 1607513898000,
      },
      {
        type: "SURRENDER_REJECTED",
        transactionHash: "0x9f074aa153b03b5d8f4cdd51142491bb821696a1bda21d24ee2d947891ada9d0",
        transactionIndex: 17,
        blockNumber: 7835703,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        timestamp: 1607513908000,
      },
      {
        type: "TRANSFER_HOLDER",
        transactionHash: "0x0f4612708c301c844b30aee493f361a0d0a61543e988025ec933afa9762d6da2",
        transactionIndex: 63,
        blockNumber: 7835716,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        holder: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
        timestamp: 1607513938000,
      },
      {
        type: "TRANSFER_HOLDER",
        transactionHash: "0xcf4537a4c8a6ba5cda883cb489318fff800379462cab535501876d37389305df",
        transactionIndex: 54,
        blockNumber: 7835735,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        timestamp: 1607513976000,
      },
      {
        type: "SURRENDERED",
        transactionHash: "0x6782d845fe298cd79584a25466d1e2d9a3ff8d14591b4b424922709b7605f58e",
        transactionIndex: 86,
        blockNumber: 7835738,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        timestamp: 1607513982000,
      },
      {
        type: "SURRENDER_REJECTED",
        transactionHash: "0x4668970e883841dab512dc53c63f05c7c7452e9876086c2838710cfd42286726",
        transactionIndex: 59,
        blockNumber: 7836089,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        timestamp: 1607514704000,
      },
      {
        type: "SURRENDERED",
        transactionHash: "0xf1193038431ec68ca26a2f2e52b9dfdb677411c5afa4d1048a43eade8313b3ea",
        transactionIndex: 206,
        blockNumber: 7836139,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        timestamp: 1607514808000,
      },
      {
        type: "SURRENDER_REJECTED",
        transactionHash: "0x6162961170520543c6d760c166a72c934b7cc84d0fa0eaf5097745071f3af334",
        transactionIndex: 46,
        blockNumber: 7836270,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        timestamp: 1607515078000,
      },
      {
        type: "SURRENDERED",
        transactionHash: "0xb30c0a48f5ebe6748b31f7f5f370b605eece7a093f950d7715f54ede2474fee7",
        transactionIndex: 59,
        blockNumber: 7836273,
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        timestamp: 1607515084000,
      },
      {
        type: "SURRENDER_ACCEPTED",
        transactionHash: "0x497395d2d58837a3fe686a883eaaaa2675b3d8ad10479abec2184349f7d38cb4",
        transactionIndex: 18,
        blockNumber: 7836281,
        owner: "0x0000000000000000000000000000000000000000",
        holder: "0x0000000000000000000000000000000000000000",
        timestamp: 1607515100000,
      },
    ]);
  });
});
