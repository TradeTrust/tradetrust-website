import v3DID from "../test/fixture/did/dns-did-signed.json";
import v2DID from "../test/fixture/did/dns-did-verified.json";
import invoiceV2 from "../test/fixture/local/v2/invoice.json";
import invoiceV3 from "../test/fixture/local/v3/invoice.json";
import { getChainId, WrappedOrSignedOpenAttestationDocument } from "./shared";

describe("getChainId for v2 document", () => {
  it("should return the correct chainId for sepolia", () => {
    const document = {
      ...invoiceV2,
      data: { ...invoiceV2.data, network: { chain: "ETH", chainId: "11155111" } },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(getChainId(document)).toStrictEqual(11155111);
  });

  it("should return the correct chainId for polygon mumbai network", () => {
    const document = {
      ...invoiceV2,
      data: { ...invoiceV2.data, network: { chain: "MATIC", chainId: "80001" } },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(getChainId(document)).toStrictEqual(80001);
  });

  it("should throw an error when there is a network object in the document but the value is not valid", () => {
    const document = {
      ...invoiceV2,
      data: { ...invoiceV2.data, network: { chain: "MATICMUM", chainId: "80001" } },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(() => getChainId(document)).toThrow("Invalid Document, please use a valid document.");
  });

  it("should return 'undefined' when there is no network", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { network, ...dataWithoutNetwork } = invoiceV2.data;
    const document = {
      ...invoiceV2,
      data: { ...dataWithoutNetwork },
    } as unknown as WrappedOrSignedOpenAttestationDocument;

    expect(getChainId(document)).toStrictEqual(undefined);
  });

  it("should throw an error when the chainId is not in the network object", () => {
    const document = {
      ...invoiceV2,
      data: { ...invoiceV2.data, network: { chain: "ETH" } },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(() => getChainId(document)).toThrow("Invalid Document, please use a valid document.");
  });

  it("should throw an error when the chainId is not in the list of networks", () => {
    const document = {
      ...invoiceV2,
      data: { ...invoiceV2.data, network: { chain: "ETH", chainId: "8" } },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(() => getChainId(document)).toThrow("Invalid Document, please use a valid document.");
  });

  it("should return 'undefined' when did document is being dropped", () => {
    expect(getChainId(v2DID as unknown as WrappedOrSignedOpenAttestationDocument)).toStrictEqual(undefined);
  });
});

describe("getChainId for v3 document", () => {
  it("should return the correct chainId for local", () => {
    const document = {
      ...invoiceV3,
      network: { chain: "ETH", chainId: "11155111" },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(getChainId(document)).toStrictEqual(11155111);
  });

  it("should return the correct chainId for polygon mumbai network", () => {
    const document = {
      ...invoiceV3,
      network: { chain: "MATIC", chainId: "80001" },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(getChainId(document)).toStrictEqual(80001);
  });

  it("should throw an error when there is a network object in the document but the value is not valid", () => {
    const document = {
      ...invoiceV3,
      network: { chain: "MATICMUM", chainId: "80001" },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(() => getChainId(document)).toThrow("Invalid Document, please use a valid document.");
  });

  it("should return 'undefined' when there is no network", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { network, ...documentWithoutNetwork } = invoiceV3;

    expect(getChainId(documentWithoutNetwork as unknown as WrappedOrSignedOpenAttestationDocument)).toStrictEqual(
      undefined
    );
  });

  it("should throw an error when the chainId is not in the network object", () => {
    const document = {
      ...invoiceV3,
      network: { chain: "ETH" },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(() => getChainId(document)).toThrow("Invalid Document, please use a valid document.");
  });

  it("should throw an error when the chainId is not in the list of networks", () => {
    const document = {
      ...invoiceV3,
      network: { chain: "ETH", chainId: "8" },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(() => getChainId(document)).toThrow("Invalid Document, please use a valid document.");
  });

  it("should return 'undefined' when did document is being dropped", () => {
    expect(getChainId(v3DID as unknown as WrappedOrSignedOpenAttestationDocument)).toStrictEqual(undefined);
  });
});
