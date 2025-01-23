import { providers } from "ethers";
import { useProviderContext } from "../../contexts/provider";
import { TransferBaseEvent } from "../../../types";
import { getEndorsementChain } from "./retrieveEndorsementChain";
import { ChainId, ChainInfo } from "../../../constants/chain-info";

jest.mock("../../contexts/provider");

const astronProvider = new providers.JsonRpcProvider(ChainInfo[ChainId.Astron].rpcUrl);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Fetch Endorsement Transfers", () => {
  jest.setTimeout(45000);

  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: astronProvider, providerOrSigner: astronProvider });
  });

  it("should format endorsement chain for display", async () => {
    const logChain = [
      {
        blockNumber: 846083,
        holder: "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
        owner: "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
        transactionHash: "0x717baa9dd71e557fa87a738f1a4bcb9b904c053c3346c43b50783097eec6e6dc",
        transactionIndex: 0,
        type: "INITIAL",
      },
      {
        blockNumber: 846116,
        holder: "0xb6741fcF165570c8d1b8af1A5610b8e5d9a0E85b",
        transactionHash: "0x59ed849cbee8c8092c1c233524d43a0c8130ac3980bd8754a7f884d532f1c042",
        transactionIndex: 0,
        type: "TRANSFER_HOLDER",
      },
      {
        blockNumber: 846116,
        owner: "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
        transactionHash: "0x7cf88d0e229b97206e0c987af4f91eff2823ab488f1dd0a22b2e18588d5718de",
        transactionIndex: 0,
        type: "TRANSFER_BENEFICIARY",
      },
      {
        blockNumber: 846495,
        holder: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        owner: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        transactionHash: "0x9b3bff8b8507bdaf715430218872d86dc6de4522b45593cef6b661699260e20f",
        transactionIndex: 0,
        type: "TRANSFER_OWNERS",
      },
      {
        blockNumber: 847113,
        from: "0xe9bbb0c3f3f12e73ebb6df1ff7713b56cdcef890",
        to: "0x0d5da59b93e8ac9b1781ce5694fbce626586f4c9",
        transactionHash: "0xd775fec7f0efe24af92b9b908b415dd8cc3ba780657d8a3118289eabcf50e187",
        transactionIndex: 0,
        type: "SURRENDERED",
      },
      {
        blockNumber: 847253,
        from: "0x0d5da59b93e8ac9b1781ce5694fbce626586f4c9",
        to: "0xe9bbb0c3f3f12e73ebb6df1ff7713b56cdcef890",
        transactionHash: "0xc9b6741b7c6714a9c057791f7e9e9ec71da25269166b9bde1c0c32d22b703ad3",
        transactionIndex: 0,
        type: "SURRENDER_REJECTED",
      },
      {
        blockNumber: 847307,
        from: "0xe9bbb0c3f3f12e73ebb6df1ff7713b56cdcef890",
        to: "0x0d5da59b93e8ac9b1781ce5694fbce626586f4c9",
        transactionHash: "0x11406e2c34d924db360fa39a0680fca42e361041db190328cc01f9fda1b905ca",
        transactionIndex: 0,
        type: "SURRENDERED",
      },
      {
        blockNumber: 847318,
        holder: "0x0000000000000000000000000000000000000000",
        owner: "0x0000000000000000000000000000000000000000",
        transactionHash: "0x06873ca2f03502af50b9d36bea378399c81527fe68719859ec1aa5ab309a2fe4",
        transactionIndex: 0,
        type: "SURRENDER_ACCEPTED",
      },
    ] as TransferBaseEvent[];

    const results = await getEndorsementChain(astronProvider, logChain);
    expect(results).toEqual([
      {
        blockNumber: 846083,
        holder: "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
        owner: "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
        timestamp: 1730881880000,
        transactionHash: "0x717baa9dd71e557fa87a738f1a4bcb9b904c053c3346c43b50783097eec6e6dc",
        transactionIndex: 0,
        type: "INITIAL",
      },
      {
        blockNumber: 846116,
        holder: "0xb6741fcF165570c8d1b8af1A5610b8e5d9a0E85b",
        owner: "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
        timestamp: 1730882045000,
        transactionHash: "0x59ed849cbee8c8092c1c233524d43a0c8130ac3980bd8754a7f884d532f1c042",
        transactionIndex: 0,
        type: "TRANSFER_HOLDER",
      },
      {
        blockNumber: 846116,
        holder: "0xb6741fcF165570c8d1b8af1A5610b8e5d9a0E85b",
        owner: "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
        timestamp: 1730882045000,
        transactionHash: "0x7cf88d0e229b97206e0c987af4f91eff2823ab488f1dd0a22b2e18588d5718de",
        transactionIndex: 0,
        type: "TRANSFER_BENEFICIARY",
      },
      {
        blockNumber: 846495,
        holder: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        owner: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        timestamp: 1730883940000,
        transactionHash: "0x9b3bff8b8507bdaf715430218872d86dc6de4522b45593cef6b661699260e20f",
        transactionIndex: 0,
        type: "TRANSFER_OWNERS",
      },
      {
        blockNumber: 847113,
        holder: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        owner: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        timestamp: 1730887030000,
        transactionHash: "0xd775fec7f0efe24af92b9b908b415dd8cc3ba780657d8a3118289eabcf50e187",
        transactionIndex: 0,
        type: "SURRENDERED",
      },
      {
        blockNumber: 847253,
        holder: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        owner: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        timestamp: 1730887730000,
        transactionHash: "0xc9b6741b7c6714a9c057791f7e9e9ec71da25269166b9bde1c0c32d22b703ad3",
        transactionIndex: 0,
        type: "SURRENDER_REJECTED",
      },
      {
        blockNumber: 847307,
        holder: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        owner: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
        timestamp: 1730888000000,
        transactionHash: "0x11406e2c34d924db360fa39a0680fca42e361041db190328cc01f9fda1b905ca",
        transactionIndex: 0,
        type: "SURRENDERED",
      },
      {
        blockNumber: 847318,
        holder: "0x0000000000000000000000000000000000000000",
        owner: "0x0000000000000000000000000000000000000000",
        timestamp: 1730888055000,
        transactionHash: "0x06873ca2f03502af50b9d36bea378399c81527fe68719859ec1aa5ab309a2fe4",
        transactionIndex: 0,
        type: "SURRENDER_ACCEPTED",
      },
    ]);
  });
});
