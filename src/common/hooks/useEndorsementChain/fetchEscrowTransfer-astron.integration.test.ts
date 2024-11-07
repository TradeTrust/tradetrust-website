import { providers } from "ethers";
import { useProviderContext } from "../../contexts/provider";
import { TitleEscrow__factory } from "@tradetrust-tt/token-registry/dist/contracts";
import { fetchEscrowTransfers, fetchHolderTransfers, fetchOwnerTransfers, getParsedLogs } from "./fetchEscrowTransfer";
import { ChainId, ChainInfo } from "../../../constants/chain-info";

jest.mock("../../contexts/provider");

const astronProvider = new providers.JsonRpcProvider(ChainInfo[ChainId.Astron].rpcUrl);

const mockUseProviderContext = useProviderContext as jest.Mock;

describe("Fetch Escrow Transfers", () => {
  jest.setTimeout(15000);

  beforeAll(() => {
    mockUseProviderContext.mockReturnValue({ provider: astronProvider, providerOrSigner: astronProvider });
  });

  describe("fetch from title escrow transfers", () => {
    it("should return parsed transfer logs in valid format", async () => {
      const escrowTransfers = await fetchEscrowTransfers(astronProvider, "0xe9bbb0c3f3f12e73ebb6df1ff7713b56cdcef890");
      expect(escrowTransfers).toEqual([
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 846083,
          holder: "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
          transactionHash: "0x717baa9dd71e557fa87a738f1a4bcb9b904c053c3346c43b50783097eec6e6dc",
          transactionIndex: 0,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 846116,
          holder: "0xb6741fcF165570c8d1b8af1A5610b8e5d9a0E85b",
          transactionHash: "0x59ed849cbee8c8092c1c233524d43a0c8130ac3980bd8754a7f884d532f1c042",
          transactionIndex: 0,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 846495,
          holder: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
          transactionHash: "0x9b3bff8b8507bdaf715430218872d86dc6de4522b45593cef6b661699260e20f",
          transactionIndex: 0,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 847318,
          holder: "0x0000000000000000000000000000000000000000",
          transactionHash: "0x06873ca2f03502af50b9d36bea378399c81527fe68719859ec1aa5ab309a2fe4",
          transactionIndex: 0,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
          blockNumber: 846083,
          transactionHash: "0x717baa9dd71e557fa87a738f1a4bcb9b904c053c3346c43b50783097eec6e6dc",
          transactionIndex: 0,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xb6741fcF165570c8d1b8af1A5610b8e5d9a0E85b",
          blockNumber: 846154,
          transactionHash: "0x7cf88d0e229b97206e0c987af4f91eff2823ab488f1dd0a22b2e18588d5718de",
          transactionIndex: 0,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
          blockNumber: 846495,
          transactionHash: "0x9b3bff8b8507bdaf715430218872d86dc6de4522b45593cef6b661699260e20f",
          transactionIndex: 0,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x0000000000000000000000000000000000000000",
          blockNumber: 847318,
          transactionHash: "0x06873ca2f03502af50b9d36bea378399c81527fe68719859ec1aa5ab309a2fe4",
          transactionIndex: 0,
        },
      ]);
    });

    it("should return parsed transfer logs in valid format", async () => {
      const titleEscrow = TitleEscrow__factory.connect("0xe9bbb0c3f3f12e73ebb6df1ff7713b56cdcef890", astronProvider);
      const log = {
        blockNumber: 846117,
        blockHash: "0x32ab72d42f6fa0dc0f24de4ccd92ffd10449678b9d2871d2bb64569bc376ddd3",
        transactionIndex: 1,
        removed: false,
        address: "0xe9bBb0C3f3F12E73eBB6DF1fF7713B56CDCEF890",
        data: "0x0000000000000000000000000d5da59b93e8ac9b1781ce5694fbce626586f4c931303535c19053deffa5f2c7c457992d988c0dc736e4d77b5b1202255cbdb58b",
        topics: [
          "0xfebadd5e06bc3e2885248448caca94df39be7cf7fde139b4586ac7b92dfe70b2",
          "0x00000000000000000000000088f17c6964c859cf0bb9ee53d91685b2529e0976",
          "0x000000000000000000000000b6741fcf165570c8d1b8af1a5610b8e5d9a0e85b",
        ],
        transactionHash: "0x59ed849cbee8c8092c1c233524d43a0c8130ac3980bd8754a7f884d532f1c042",
        logIndex: 52,
      } as providers.Log;
      const parsedLogs = getParsedLogs([log], titleEscrow);
      expect(parsedLogs.length).toBe(1);
      const expectedResults = [
        {
          blockNumber: 846117,
          blockHash: "0x32ab72d42f6fa0dc0f24de4ccd92ffd10449678b9d2871d2bb64569bc376ddd3",
          transactionIndex: 1,
          removed: false,
          address: "0xe9bBb0C3f3F12E73eBB6DF1fF7713B56CDCEF890",
          data: "0x0000000000000000000000000d5da59b93e8ac9b1781ce5694fbce626586f4c931303535c19053deffa5f2c7c457992d988c0dc736e4d77b5b1202255cbdb58b",
          topics: [
            "0xfebadd5e06bc3e2885248448caca94df39be7cf7fde139b4586ac7b92dfe70b2",
            "0x00000000000000000000000088f17c6964c859cf0bb9ee53d91685b2529e0976",
            "0x000000000000000000000000b6741fcf165570c8d1b8af1a5610b8e5d9a0e85b",
          ],
          transactionHash: "0x59ed849cbee8c8092c1c233524d43a0c8130ac3980bd8754a7f884d532f1c042",
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
            "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
            "0xb6741fcF165570c8d1b8af1A5610b8e5d9a0E85b",
            "0x0D5da59B93e8AC9b1781CE5694fbcE626586F4c9",
            {
              type: "BigNumber",
              hex: "0x31303535c19053deffa5f2c7c457992d988c0dc736e4d77b5b1202255cbdb58b",
            },
          ],
        },
      ];
      expect(JSON.stringify(parsedLogs)).toEqual(JSON.stringify(expectedResults));
    });
  });

  describe("fetch from title escrow owner transfers", () => {
    it("should return parsed transfer logs for beneficiary in valid format", async () => {
      const titleEscrow = TitleEscrow__factory.connect("0xe9bbb0c3f3f12e73ebb6df1ff7713b56cdcef890", astronProvider);
      const ownerTransfers = await fetchOwnerTransfers(titleEscrow, astronProvider);
      expect(ownerTransfers).toEqual([
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
          blockNumber: 846083,
          transactionHash: "0x717baa9dd71e557fa87a738f1a4bcb9b904c053c3346c43b50783097eec6e6dc",
          transactionIndex: 0,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xb6741fcF165570c8d1b8af1A5610b8e5d9a0E85b",
          blockNumber: 846154,
          transactionHash: "0x7cf88d0e229b97206e0c987af4f91eff2823ab488f1dd0a22b2e18588d5718de",
          transactionIndex: 0,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
          blockNumber: 846495,
          transactionHash: "0x9b3bff8b8507bdaf715430218872d86dc6de4522b45593cef6b661699260e20f",
          transactionIndex: 0,
        },
        {
          type: "TRANSFER_BENEFICIARY",
          owner: "0x0000000000000000000000000000000000000000",
          blockNumber: 847318,
          transactionHash: "0x06873ca2f03502af50b9d36bea378399c81527fe68719859ec1aa5ab309a2fe4",
          transactionIndex: 0,
        },
      ]);
    });
  });

  describe("fetch from title escrow holder transfers", () => {
    it("should return parsed transfer logs for holder in valid format", async () => {
      const titleEscrow = TitleEscrow__factory.connect("0xe9bbb0c3f3f12e73ebb6df1ff7713b56cdcef890", astronProvider);
      const holderTransfers = await fetchHolderTransfers(titleEscrow, astronProvider);
      expect(holderTransfers).toEqual([
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 846083,
          holder: "0x88F17c6964c859CF0BB9EE53d91685B2529E0976",
          transactionHash: "0x717baa9dd71e557fa87a738f1a4bcb9b904c053c3346c43b50783097eec6e6dc",
          transactionIndex: 0,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 846116,
          holder: "0xb6741fcF165570c8d1b8af1A5610b8e5d9a0E85b",
          transactionHash: "0x59ed849cbee8c8092c1c233524d43a0c8130ac3980bd8754a7f884d532f1c042",
          transactionIndex: 0,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 846495,
          holder: "0xFbc0E039B75c1dd1AF9fb5786a305E5e700647bF",
          transactionHash: "0x9b3bff8b8507bdaf715430218872d86dc6de4522b45593cef6b661699260e20f",
          transactionIndex: 0,
        },
        {
          type: "TRANSFER_HOLDER",
          blockNumber: 847318,
          holder: "0x0000000000000000000000000000000000000000",
          transactionHash: "0x06873ca2f03502af50b9d36bea378399c81527fe68719859ec1aa5ab309a2fe4",
          transactionIndex: 0,
        },
      ]);
    });
  });
});
