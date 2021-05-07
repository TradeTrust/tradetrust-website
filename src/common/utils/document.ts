import { WrappedDocument, getData, v2 } from "@govtechsg/open-attestation";

// TODO: change this to use the open-attestation library exported utilities when we upgrade the version
export const getDocumentId = (document: WrappedDocument): string => `0x${document.signature.targetHash}`;
export const getTokenRegistryAddress = (document: WrappedDocument<v2.OpenAttestationDocument>): string | undefined =>
  getData(document).issuers[0].tokenRegistry;
