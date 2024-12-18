import { providers } from "ethers";
import { useProviderContext } from "../../contexts/provider";
import { TransferBaseEvent } from "../../../types";
import { getEndorsementChain } from "./retrieveEndorsementChain";
import { ChainId, ChainInfo } from "../../../constants/chain-info";

jest.mock("../../contexts/provider");

const amoyProvider = new providers.JsonRpcProvider(ChainInfo[ChainId.Amoy].rpcUrl);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Fetch Endorsement Transfers", () => {
  jest.setTimeout(120000);

  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: amoyProvider, providerOrSigner: amoyProvider });
  });

  it("should format endorsement chain for display", async () => {
    const logChain = [
      {
        blockNumber: 6202088,
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        transactionHash: "0xff88596d7b86e99dfa2851bec90ed47acc30dbde0c7d4924501584809d657135",
        transactionIndex: 1,
        type: "TRANSFER_HOLDER",
      },
      {
        blockNumber: 6202133,
        holder: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        transactionHash: "0x888ef1ce5cd0455e9bfa50122d76e12d54da87d3b93c34460c2439116c582ca6",
        transactionIndex: 3,
        type: "TRANSFER_HOLDER",
      },
      {
        blockNumber: 6203041,
        from: "0x1F6D8888Fc6B75E10b1840620E8229C3C487a925",
        to: "0x71D28767662cB233F887aD2Bb65d048d760bA694",
        transactionHash: "0x21b804d9bbd9953310eaa62f0d6b0cf9a2821af86913bf252ea75958f84d7b17",
        transactionIndex: 5,
        type: "RETURNED_TO_ISSUER",
      },
      {
        blockNumber: 6242100,
        from: "0x71D28767662cB233F887aD2Bb65d048d760bA694",
        to: "0x1F6D8888Fc6B75E10b1840620E8229C3C487a925",
        transactionHash: "0x611f48ddedeea93f470dd6a3ba96d2eeb9c896fc954e616c3fcb8811d92c3ea4",
        transactionIndex: 0,
        type: "RETURN_TO_ISSUER_REJECTED",
      },
      {
        blockNumber: 6242178,
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        transactionHash: "0xba94dbbd7905d706244fdd53121d41ec23c4d67ab08d2f0820287d07f4d03989",
        transactionIndex: 1,
        type: "TRANSFER_OWNERS",
      },
      {
        blockNumber: 6162747,
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        transactionHash: "0x2d98ae3908f0edd095a871a0c56dd3c0e1cfd657b53f28f7c01b1cb83bebc28b",
        transactionIndex: 5,
        type: "INITIAL",
      },
      {
        blockNumber: 6164050,
        holder: "0xd3DD13B7e8D7454F4Fdf0e1a630FDE4f9De84749",
        transactionHash: "0x38df7d1bd50f89aefa3a4385afe12f4d9dd320bcdc24d9ff7a775193fa5b6178",
        transactionIndex: 4,
        type: "TRANSFER_HOLDER",
      },
      {
        blockNumber: 6201774,
        owner: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        transactionHash: "0x4a3be9573991980738e99a1f39485b9141c9012419076cbc1bd87038b3efd313",
        transactionIndex: 3,
        type: "TRANSFER_BENEFICIARY",
      },
      {
        blockNumber: 6242197,
        holder: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        transactionHash: "0xd95d77620c7916290fecd2a38277dec9010e63872dc96be05f3126767b39ba4e",
        transactionIndex: 3,
        type: "TRANSFER_HOLDER",
      },
      {
        blockNumber: 6242545,
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        transactionHash: "0xee5eb7953687e0d2e05be34091e4a59256de4dc7df18eaeaf1a65cbb833ba6a8",
        transactionIndex: 3,
        type: "TRANSFER_HOLDER",
      },
      {
        blockNumber: 6242768,
        from: "0x1F6D8888Fc6B75E10b1840620E8229C3C487a925",
        to: "0x71D28767662cB233F887aD2Bb65d048d760bA694",
        transactionHash: "0x039f729fe72d703a799bfbe6736f51f84639ec166632da8c9ea4e1995016fa95",
        transactionIndex: 1,
        type: "RETURNED_TO_ISSUER",
      },
      {
        blockNumber: 6242791,
        holder: "0x0000000000000000000000000000000000000000",
        owner: "0x0000000000000000000000000000000000000000",
        transactionHash: "0xcf6968ef91efe74b8ada1770fc31e811f15989f80b0d518a42e06d4ab5bac8bd",
        transactionIndex: 3,
        type: "RETURN_TO_ISSUER_ACCEPTED",
      },
    ] as TransferBaseEvent[];

    const results = await getEndorsementChain(amoyProvider, logChain);
    expect(results).toEqual([
      {
        blockNumber: 6162747,
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1713778879000,
        transactionHash: "0x2d98ae3908f0edd095a871a0c56dd3c0e1cfd657b53f28f7c01b1cb83bebc28b",
        transactionIndex: 5,
        type: "INITIAL",
      },
      {
        blockNumber: 6164050,
        holder: "0xd3DD13B7e8D7454F4Fdf0e1a630FDE4f9De84749",
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1713782103000,
        transactionHash: "0x38df7d1bd50f89aefa3a4385afe12f4d9dd320bcdc24d9ff7a775193fa5b6178",
        transactionIndex: 4,
        type: "TRANSFER_HOLDER",
      },
      {
        blockNumber: 6201774,
        holder: "0xd3DD13B7e8D7454F4Fdf0e1a630FDE4f9De84749",
        owner: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        timestamp: 1713866365000,
        transactionHash: "0x4a3be9573991980738e99a1f39485b9141c9012419076cbc1bd87038b3efd313",
        transactionIndex: 3,
        type: "TRANSFER_BENEFICIARY",
      },
      {
        blockNumber: 6202088,
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        owner: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        timestamp: 1713867129000,
        transactionHash: "0xff88596d7b86e99dfa2851bec90ed47acc30dbde0c7d4924501584809d657135",
        transactionIndex: 1,
        type: "TRANSFER_HOLDER",
      },
      {
        blockNumber: 6202133,
        holder: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        owner: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        timestamp: 1713867225000,
        transactionHash: "0x888ef1ce5cd0455e9bfa50122d76e12d54da87d3b93c34460c2439116c582ca6",
        transactionIndex: 3,
        type: "TRANSFER_HOLDER",
      },
      {
        blockNumber: 6203041,
        holder: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        owner: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        timestamp: 1713869315000,
        transactionHash: "0x21b804d9bbd9953310eaa62f0d6b0cf9a2821af86913bf252ea75958f84d7b17",
        transactionIndex: 5,
        type: "RETURNED_TO_ISSUER",
      },
      {
        blockNumber: 6242100,
        holder: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        owner: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        timestamp: 1713956826000,
        transactionHash: "0x611f48ddedeea93f470dd6a3ba96d2eeb9c896fc954e616c3fcb8811d92c3ea4",
        transactionIndex: 0,
        type: "RETURN_TO_ISSUER_REJECTED",
      },
      {
        blockNumber: 6242178,
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1713956992000,
        transactionHash: "0xba94dbbd7905d706244fdd53121d41ec23c4d67ab08d2f0820287d07f4d03989",
        transactionIndex: 1,
        type: "TRANSFER_OWNERS",
      },
      {
        blockNumber: 6242197,
        holder: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1713957044000,
        transactionHash: "0xd95d77620c7916290fecd2a38277dec9010e63872dc96be05f3126767b39ba4e",
        transactionIndex: 3,
        type: "TRANSFER_HOLDER",
      },
      {
        blockNumber: 6242545,
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1713957840000,
        transactionHash: "0xee5eb7953687e0d2e05be34091e4a59256de4dc7df18eaeaf1a65cbb833ba6a8",
        transactionIndex: 3,
        type: "TRANSFER_HOLDER",
      },
      {
        blockNumber: 6242768,
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1713958374000,
        transactionHash: "0x039f729fe72d703a799bfbe6736f51f84639ec166632da8c9ea4e1995016fa95",
        transactionIndex: 1,
        type: "RETURNED_TO_ISSUER",
      },
      {
        blockNumber: 6242791,
        holder: "0x0000000000000000000000000000000000000000",
        owner: "0x0000000000000000000000000000000000000000",
        timestamp: 1713958422000,
        transactionHash: "0xcf6968ef91efe74b8ada1770fc31e811f15989f80b0d518a42e06d4ab5bac8bd",
        transactionIndex: 3,
        type: "RETURN_TO_ISSUER_ACCEPTED",
      },
    ]);
  });
});
