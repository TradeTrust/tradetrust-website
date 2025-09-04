import v3DID from "../test/fixture/did/dns-did-signed.json";
import v2DID from "../test/fixture/did/dns-did-verified.json";
import invoiceV2 from "../test/fixture/local/v2/invoice.json";
import invoiceV3 from "../test/fixture/local/v3/invoice.json";
import w3cV2Document from "../test/fixture/local/w3c/v2_tr_er_ECDSA_Derived.json";
import { getChainId, WrappedOrSignedOpenAttestationDocument } from "./shared";

describe("getChainId for v2 document", () => {
  it("should return the correct chainId for sepolia", () => {
    const document = {
      ...invoiceV2,
      data: { ...invoiceV2.data, network: { chain: "ETH", chainId: "11155111" } },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(getChainId(document)).toStrictEqual(11155111);
  });

  it("should return the correct chainId for polygon amoy network", () => {
    const document = {
      ...invoiceV2,
      data: { ...invoiceV2.data, network: { chain: "MATIC", chainId: "80002" } },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(getChainId(document)).toStrictEqual(80002);
  });

  it("should throw an error when there is a network object in the document but the value is not valid", () => {
    const document = {
      ...invoiceV2,
      data: { ...invoiceV2.data, network: { chain: "Amoy123", chainId: "80002" } },
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
      network: { chain: "ETH", chainId: "1337" },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(getChainId(document)).toStrictEqual(1337);
  });

  it("should return the correct chainId for polygon amoy network", () => {
    const document = {
      ...invoiceV3,
      network: { chain: "MATIC", chainId: "80002" },
    } as unknown as WrappedOrSignedOpenAttestationDocument;
    expect(getChainId(document)).toStrictEqual(80002);
  });

  it("should throw an error when there is a network object in the document but the value is not valid", () => {
    const document = {
      ...invoiceV3,
      network: { chain: "AMOY123", chainId: "80002" },
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

describe("getChainId for W3C v2 document", () => {
  it("should return the correct chainId for W3C v2.0 document with tokenNetwork", () => {
    // W3C v2 document has tokenNetwork.chainId: "1337"
    expect(getChainId(w3cV2Document as unknown as WrappedOrSignedOpenAttestationDocument)).toStrictEqual(1337);
  });

  it("should return the correct chainId when W3C v2.0 document has tokenNetwork with sepolia chainId", () => {
    // Modify the credentialStatus to have sepolia chainId
    const documentWithSepolia = {
      ...w3cV2Document,
      credentialStatus: {
        ...w3cV2Document.credentialStatus,
        tokenNetwork: { chain: "ETH", chainId: "11155111" },
      },
    };
    expect(getChainId(documentWithSepolia as unknown as WrappedOrSignedOpenAttestationDocument)).toStrictEqual(
      "11155111"
    );
  });

  it("should return the correct chainId when W3C v2.0 document has tokenNetwork with polygon amoy chainId", () => {
    // Modify the credentialStatus to have polygon amoy chainId
    const documentWithPolygon = {
      ...w3cV2Document,
      credentialStatus: {
        ...w3cV2Document.credentialStatus,
        tokenNetwork: { chain: "MATIC", chainId: "80002" },
      },
    };
    expect(getChainId(documentWithPolygon as unknown as WrappedOrSignedOpenAttestationDocument)).toStrictEqual(80002);
  });

  it("should throw an error when W3C v2.0 document has invalid chainId in tokenNetwork", () => {
    // Modify the credentialStatus to have invalid chainId
    const documentWithInvalidChainId = {
      ...w3cV2Document,
      credentialStatus: {
        ...w3cV2Document.credentialStatus,
        tokenNetwork: { chain: "ETH", chainId: "999" },
      },
    };
    expect(() => getChainId(documentWithInvalidChainId as unknown as WrappedOrSignedOpenAttestationDocument)).toThrow(
      "Invalid Document, please use a valid document."
    );
  });

  it("should return 'undefined' when W3C v2.0 document has no tokenNetwork", () => {
    // Remove the tokenNetwork from credentialStatus
    const documentWithoutTokenNetwork = {
      ...w3cV2Document,
      credentialStatus: {
        ...w3cV2Document.credentialStatus,
        tokenNetwork: undefined,
      },
    };
    expect(getChainId(documentWithoutTokenNetwork as unknown as WrappedOrSignedOpenAttestationDocument)).toStrictEqual(
      undefined
    );
  });

  it("should return 'undefined' when W3C v2.0 document has no credentialStatus", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { credentialStatus, ...documentWithoutCredentialStatus } = w3cV2Document;
    expect(
      getChainId(documentWithoutCredentialStatus as unknown as WrappedOrSignedOpenAttestationDocument)
    ).toStrictEqual(undefined);
  });
});
