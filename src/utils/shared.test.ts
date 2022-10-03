import { getChainId, WrappedOrSignedOpenAttestationDocument } from "./shared";
import invoiceV2 from "../test/fixture/goerli/v2/invoice.json";
import invoiceV3 from "../test/fixture/goerli/v3/invoice.json";
import v2DID from "../test/fixture/did/dns-did-verified.json";
import v3DID from "../test/fixture/did/dns-did-signed.json";

describe("getChainId", () => {
  it("should return the correct chainId for v2 document", () => {
    const document = {
      ...invoiceV2,
      data: { ...invoiceV2.data, network: { chain: "ETH", chainId: "3" } },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(getChainId(document)).toStrictEqual(3);
  });

  it("should return 'undefined' when there is not network for v2 document", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { network, ...dataWithoutNetwork } = invoiceV2.data;
    const document = {
      ...invoiceV2,
      data: { ...dataWithoutNetwork },
    } as unknown as WrappedOrSignedOpenAttestationDocument;

    expect(getChainId(document)).toStrictEqual(undefined);
  });

  it("should throw an error when the chainId is not in the network object for v2 document", () => {
    const document = {
      ...invoiceV2,
      data: { ...invoiceV2.data, network: { chain: "ETH" } },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(() => getChainId(document)).toThrow("Invalid Document, please use a valid document.");
  });

  it("should throw an error when the chainId is not in the list of networks for v2 document", () => {
    const document = {
      ...invoiceV2,
      data: { ...invoiceV2.data, network: { chain: "ETH", chainId: "8" } },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(() => getChainId(document)).toThrow("Invalid Document, please use a valid document.");
  });

  it("should return 'undefined' when a V2 did document is being dropped", () => {
    expect(getChainId(v2DID as unknown as WrappedOrSignedOpenAttestationDocument)).toStrictEqual(undefined);
  });

  it("should return the correct chainId for v3 document", () => {
    const document = {
      ...invoiceV3,
      network: { chain: "ETH", chainId: "3" },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(getChainId(document)).toStrictEqual(3);
  });

  it("should return 'undefined' when there is not network for v3 document", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { network, ...documentWithoutNetwork } = invoiceV3;

    expect(getChainId(documentWithoutNetwork as unknown as WrappedOrSignedOpenAttestationDocument)).toStrictEqual(
      undefined
    );
  });

  it("should throw an error when the chainId is not in the network object for v3 document", () => {
    const document = {
      ...invoiceV3,
      network: { chain: "ETH" },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(() => getChainId(document)).toThrow("Invalid Document, please use a valid document.");
  });

  it("should throw an error when the chainId is not in the list of networks for v3 document", () => {
    const document = {
      ...invoiceV3,
      network: { chain: "ETH", chainId: "8" },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(() => getChainId(document)).toThrow("Invalid Document, please use a valid document.");
  });

  it("should return 'undefined' when a V3 did document is being dropped", () => {
    expect(getChainId(v3DID as unknown as WrappedOrSignedOpenAttestationDocument)).toStrictEqual(undefined);
  });
});
