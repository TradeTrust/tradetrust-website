import { WrappedDocument } from "@govtechsg/open-attestation";
import { getData } from "@govtechsg/open-attestation";

export const getDocumentId = (document: WrappedDocument) => `0x${document.signature.targetHash}`;
export const getTokenRegistryAddress = (document: WrappedDocument) => getData(document).issuers[0].tokenRegistry;
