import { ethers } from "ethers";
import { useProviderContext } from "../../contexts/provider";
import { INFURA_API_KEY } from "../../../config";
import { TradeTrustToken__factory } from "@govtechsg/token-registry/dist/contracts";
import { fetchEventTime, getHolderOwner, mergeTransfers, sortLogChain } from "./helpers";
import { TransferBaseEvent } from "../../../types";
import { retrieveTitleEscrowAddressOnFactory } from "../useTitleEscrowContract";

jest.mock("../../contexts/provider");

const goerliProvider = new ethers.providers.InfuraProvider("goerli", INFURA_API_KEY);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Test all endorsement chain helpers", () => {
  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: goerliProvider, providerOrSigner: goerliProvider });
  });

  describe("fetchEventTime", () => {
    it("should return correct formatted timestamp in milliseconds for block 0 with goerli provider", async () => {
      const timeOfFirstBlock = await fetchEventTime(0, goerliProvider);
      expect(timeOfFirstBlock).toBe(1548854791000);
    });

    it("should return correct formatted timestamp in milliseconds for block 1 with goerli provider", async () => {
      const timeOfFirstBlock = await fetchEventTime(1, goerliProvider);
      expect(timeOfFirstBlock).toBe(1548947453000);
    });
  });

  describe("getHolderOwner extracts holder and owner", () => {
    it("Merge Initial Transactions", () => {
      const testValues = {
        owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
      };
      const initialTransactions = [
        {
          type: "INITIAL",
          from: "0x0000000000000000000000000000000000000000",
          to: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
          blockNumber: 7831157,
          transactionHash: "0x1144cd45c4b9deae74a885d38bececeb1a3e194dbbcc3ef6f8c180f911ac0bb0",
          transactionIndex: 104,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7831157,
          holder: testValues.holder,
          transactionHash: "0x1144cd45c4b9deae74a885d38bececeb1a3e194dbbcc3ef6f8c180f911ac0bb0",
          transactionIndex: 104,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: testValues.owner,
          blockNumber: 7831157,
          transactionHash: "0x1144cd45c4b9deae74a885d38bececeb1a3e194dbbcc3ef6f8c180f911ac0bb0",
          transactionIndex: 104,
        },
      ] as TransferBaseEvent[];
      const mergedTransaction = getHolderOwner(initialTransactions);
      // To and From is not supported
      expect(mergedTransaction).toEqual(testValues);
    });
  });

  describe("mergeTransactions", () => {
    it("should merges all transactions with the same transaction hash", () => {
      const duplicatedTransactions = [
        {
          type: "INITIAL",
          from: "0x0000000000000000000000000000000000000000",
          to: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
          blockNumber: 7831157,
          transactionHash: "0x1144cd45c4b9deae74a885d38bececeb1a3e194dbbcc3ef6f8c180f911ac0bb0",
          transactionIndex: 104,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 7831157,
          holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          transactionHash: "0x1144cd45c4b9deae74a885d38bececeb1a3e194dbbcc3ef6f8c180f911ac0bb0",
          transactionIndex: 104,
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
          owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          blockNumber: 7835693,
          transactionHash: "0x80da1fd7ae5c6e0a01155ad13097a531d74167aa5a04a47b9a38844146b4682f",
          transactionIndex: 20,
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
          blockNumber: 7836281,
          holder: "0x0000000000000000000000000000000000000000",
          transactionHash: "0x497395d2d58837a3fe686a883eaaaa2675b3d8ad10479abec2184349f7d38cb4",
          transactionIndex: 18,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x0000000000000000000000000000000000000000",
          blockNumber: 7836281,
          transactionHash: "0x497395d2d58837a3fe686a883eaaaa2675b3d8ad10479abec2184349f7d38cb4",
          transactionIndex: 18,
        },
        {
          type: "SURRENDER_ACCEPTED",
          from: "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
          to: "0x000000000000000000000000000000000000dEaD",
          blockNumber: 7836281,
          transactionHash: "0x497395d2d58837a3fe686a883eaaaa2675b3d8ad10479abec2184349f7d38cb4",
          transactionIndex: 18,
        },
      ] as TransferBaseEvent[];
      const mergedTransaction = mergeTransfers(duplicatedTransactions);
      expect(mergedTransaction).toEqual([
        {
          type: "INITIAL",
          from: "0x0000000000000000000000000000000000000000",
          to: "0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279",
          blockNumber: 7831157,
          transactionHash: "0x1144cd45c4b9deae74a885d38bececeb1a3e194dbbcc3ef6f8c180f911ac0bb0",
          transactionIndex: 104,
          owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        },
        {
          type: "TRANSFER_OWNERS",
          owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
          blockNumber: 7835693,
          transactionHash: "0x80da1fd7ae5c6e0a01155ad13097a531d74167aa5a04a47b9a38844146b4682f",
          transactionIndex: 20,
          holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
        },
        {
          type: "SURRENDER_ACCEPTED",
          blockNumber: 7836281,
          holder: "0x0000000000000000000000000000000000000000",
          transactionHash: "0x497395d2d58837a3fe686a883eaaaa2675b3d8ad10479abec2184349f7d38cb4",
          transactionIndex: 18,
          owner: "0x0000000000000000000000000000000000000000",
        },
      ]);
    });
  });

  it("sort log chain in order", () => {
    const listOfBlocks = [
      {
        blockNumber: 5,
      },
      {
        blockNumber: 3,
      },
      {
        blockNumber: 1,
      },
      {
        blockNumber: 2,
      },
    ] as TransferBaseEvent[];

    const sortedListOfBlocks = [
      {
        blockNumber: 1,
      },
      {
        blockNumber: 2,
      },
      {
        blockNumber: 3,
      },
      {
        blockNumber: 5,
      },
    ] as TransferBaseEvent[];
    sortLogChain(listOfBlocks);
    expect(listOfBlocks).toEqual(sortedListOfBlocks);
  });

  it("extract title escrow address on surrendered/burn title escrow", async () => {
    const tokenRegistry = TradeTrustToken__factory.connect(
      "0x2B1B777614f8a90F9Cc29eC6Db521581c068a749",
      goerliProvider
    );
    const result = await retrieveTitleEscrowAddressOnFactory(
      tokenRegistry,
      "0xc38268c2b0248d6d9ba5b2dc35d19c99a7688f3221935457713d6621edc300c3",
      goerliProvider
    );
    expect(result).toBe("0xAAb472d3706E0E7F8Fb4354EADe34F2c43dDb279");
  });
});
