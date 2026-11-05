import invoiceV2 from "../../test/fixture/local/v2/invoice.json";
import { verifyDocument as verifyDoc } from "@trustvc/trustvc";
import { getCurrentProvider } from "../../common/contexts/provider";
import { verifyDocument, VerifierType } from "./index";

jest.mock("@trustvc/trustvc", () => {
  const original = jest.requireActual("@trustvc/trustvc");
  return {
    ...original,
    verifyDocument: jest.fn().mockResolvedValue([]),
    verificationBuilder: jest.fn(() => jest.fn().mockResolvedValue([])),
  };
});

jest.mock("../../common/contexts/provider", () => ({
  getCurrentProvider: jest.fn(),
}));

describe("verifyDocument", () => {
  const mockedVerifyDoc = verifyDoc as jest.Mock;
  const mockedGetCurrentProvider = getCurrentProvider as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedVerifyDoc.mockResolvedValue([]);
    mockedGetCurrentProvider.mockReturnValue(undefined);
  });

  it("verifies XRPL EVM testnet documents against the public XRPL RPC", async () => {
    const document = {
      ...invoiceV2,
      data: { ...invoiceV2.data, network: { chain: "XRP", chainId: "1449000" } },
    };

    await verifyDocument(document as any);

    expect(mockedVerifyDoc).toHaveBeenCalledWith(document, "https://rpc.testnet.xrplevm.org");
  });

  it("falls back to the connected provider RPC when the document has no chain", async () => {
    mockedGetCurrentProvider.mockReturnValue({
      getNetwork: jest.fn().mockResolvedValue({ chainId: 11155111 }),
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { network, ...dataWithoutNetwork } = invoiceV2.data;
    const document = {
      ...invoiceV2,
      data: dataWithoutNetwork,
    };

    await verifyDocument(document as any);

    expect(mockedVerifyDoc).toHaveBeenCalledWith(document, expect.stringContaining("sepolia"));
  });

  it("does not call the on-chain verifier for demo documents", async () => {
    await verifyDocument(invoiceV2 as any, VerifierType.DEMO);
    expect(mockedVerifyDoc).not.toHaveBeenCalled();
  });
});
