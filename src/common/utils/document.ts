import { WrappedDocument, getData, v2 } from "@govtechsg/open-attestation";

export const getDocumentId = (document: WrappedDocument) => `0x${document.signature.targetHash}`;
export const getTokenRegistryAddress = (document: WrappedDocument<v2.OpenAttestationDocument>) =>
  getData(document).issuers[0].tokenRegistry;
