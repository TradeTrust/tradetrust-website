import { providers } from "ethers";
import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { useEndorsementChain } from "./useEndorsementChain";
import { useProviderContext } from "../../contexts/provider";
import { ChainId, ChainInfo } from "../../../constants/chain-info";

jest.mock("../../contexts/provider");

const amoyProvider = new providers.JsonRpcProvider(ChainInfo[ChainId.Amoy].rpcUrl);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("useEndorsementChain|integration", () => {
  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: amoyProvider, providerOrSigner: amoyProvider });
  });
  it("should work correctly for a given tokenRegistryAddress + tokenId with Transfer, Surrender, Burnt events", async () => {
    const { result } = renderHook(() =>
      useEndorsementChain(
        "0x71D28767662cB233F887aD2Bb65d048d760bA694",
        "0x780e38c6345dac12cedb7aacc69492ff31cc5236cd60da46261aa1c27691141e"
      )
    );
    await act(async () => {
      await waitFor(
        () => {
          expect(result.current.endorsementChain).toBeTruthy();
        },
        { timeout: 60000 }
      );
    });
    expect(result.current.endorsementChain).toEqual([
      {
        type: "INITIAL",
        transactionHash: "0x2d98ae3908f0edd095a871a0c56dd3c0e1cfd657b53f28f7c01b1cb83bebc28b",
        transactionIndex: 5,
        blockNumber: 6162747,
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1713778879000,
      },
      {
        type: "TRANSFER_HOLDER",
        transactionHash: "0x38df7d1bd50f89aefa3a4385afe12f4d9dd320bcdc24d9ff7a775193fa5b6178",
        transactionIndex: 4,
        blockNumber: 6164050,
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        holder: "0xd3DD13B7e8D7454F4Fdf0e1a630FDE4f9De84749",
        timestamp: 1713782103000,
      },
      {
        type: "TRANSFER_BENEFICIARY",
        transactionHash: "0x4a3be9573991980738e99a1f39485b9141c9012419076cbc1bd87038b3efd313",
        transactionIndex: 3,
        blockNumber: 6201774,
        owner: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        holder: "0xd3DD13B7e8D7454F4Fdf0e1a630FDE4f9De84749",
        timestamp: 1713866365000,
      },
      {
        type: "TRANSFER_HOLDER",
        transactionHash: "0xff88596d7b86e99dfa2851bec90ed47acc30dbde0c7d4924501584809d657135",
        transactionIndex: 1,
        blockNumber: 6202088,
        owner: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1713867129000,
      },
      {
        type: "TRANSFER_HOLDER",
        transactionHash: "0x888ef1ce5cd0455e9bfa50122d76e12d54da87d3b93c34460c2439116c582ca6",
        transactionIndex: 3,
        blockNumber: 6202133,
        owner: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        holder: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        timestamp: 1713867225000,
      },
      {
        type: "SURRENDERED",
        transactionHash: "0x21b804d9bbd9953310eaa62f0d6b0cf9a2821af86913bf252ea75958f84d7b17",
        transactionIndex: 5,
        blockNumber: 6203041,
        owner: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        holder: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        timestamp: 1713869315000,
      },
      {
        type: "SURRENDER_REJECTED",
        transactionHash: "0x611f48ddedeea93f470dd6a3ba96d2eeb9c896fc954e616c3fcb8811d92c3ea4",
        transactionIndex: 0,
        blockNumber: 6242100,
        owner: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        holder: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        timestamp: 1713956826000,
      },
      {
        type: "TRANSFER_OWNERS",
        transactionHash: "0xba94dbbd7905d706244fdd53121d41ec23c4d67ab08d2f0820287d07f4d03989",
        transactionIndex: 1,
        blockNumber: 6242178,
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1713956992000,
      },
      {
        type: "TRANSFER_HOLDER",
        transactionHash: "0xd95d77620c7916290fecd2a38277dec9010e63872dc96be05f3126767b39ba4e",
        transactionIndex: 3,
        blockNumber: 6242197,
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        holder: "0xB7F0Eb2b207E93D0aA4C90329F3227f6f599f885",
        timestamp: 1713957044000,
      },
      {
        type: "TRANSFER_HOLDER",
        transactionHash: "0xee5eb7953687e0d2e05be34091e4a59256de4dc7df18eaeaf1a65cbb833ba6a8",
        transactionIndex: 3,
        blockNumber: 6242545,
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1713957840000,
      },
      {
        type: "SURRENDERED",
        transactionHash: "0x039f729fe72d703a799bfbe6736f51f84639ec166632da8c9ea4e1995016fa95",
        transactionIndex: 1,
        blockNumber: 6242768,
        owner: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        holder: "0xCA93690Bb57EEaB273c796a9309246BC0FB93649",
        timestamp: 1713958374000,
      },
      {
        type: "SURRENDER_ACCEPTED",
        transactionHash: "0xcf6968ef91efe74b8ada1770fc31e811f15989f80b0d518a42e06d4ab5bac8bd",
        transactionIndex: 3,
        blockNumber: 6242791,
        owner: "0x0000000000000000000000000000000000000000",
        holder: "0x0000000000000000000000000000000000000000",
        timestamp: 1713958422000,
      },
    ]);
    expect(result.current.error).toBe("");
    expect(result.current.pending).toBe(false);
  }, 80000);
});
