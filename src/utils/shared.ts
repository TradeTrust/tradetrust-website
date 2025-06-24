import {
  errorMessages,
  getDataV2,
  getDocumentData,
  isTitleEscrowVersion,
  isWrappedV2Document,
  isWrappedV3Document,
  OpenAttestationDocument,
  RawVerifiableCredential,
  SignedVerifiableCredential,
  TitleEscrowInterface,
  v2,
  v3,
  vc,
  WrappedDocument,
} from "@trustvc/trustvc";
import { TransferableRecordsCredentialStatus } from "@trustvc/trustvc/w3c/credential-status";
import { CredentialSubject, isSignedDocument } from "@trustvc/trustvc/w3c/vc";
import { getCurrentProvider } from "../common/contexts/provider";
import { getSupportedChainIds, getUnsupportedChainIds } from "../common/utils/chain-utils";
import { AvailableBlockChains, ChainId } from "../constants/chain-info";
import { IS_DEVELOPMENT } from "../config";
import { ProcessedFiles } from "../types";

const { TYPES } = errorMessages;

export type WrappedOrSignedOpenAttestationDocument = WrappedDocument<OpenAttestationDocument>;
// note that the return type for getting attachments will normalise the structure into v2.Attachment
export type OpenAttestationAttachment = v2.Attachment;

export const getOpenAttestationData = (
  wrappedDocument: WrappedOrSignedOpenAttestationDocument
): OpenAttestationDocument => {
  if (isSignedDocument(wrappedDocument) || vc.isRawDocument(wrappedDocument)) {
    return wrappedDocument as any;
  }
  return getDocumentData(wrappedDocument);
};

export const getTemplateUrl = (
  rawDocument: WrappedOrSignedOpenAttestationDocument | SignedVerifiableCredential
): string | undefined => {
  if (isSignedDocument(rawDocument) || vc.isRawDocument(rawDocument)) {
    return [(rawDocument as unknown as SignedVerifiableCredential).renderMethod]?.flat()?.[0]?.id;
  } else if (isWrappedV2Document(rawDocument)) {
    const documentData = getDataV2(rawDocument);
    return typeof documentData.$template === "object" ? documentData.$template.url : undefined;
  } else if (isWrappedV3Document(rawDocument)) {
    return rawDocument.openAttestationMetadata.template?.url;
  }
  // disable v4 verification for the time being
  // else {
  //   return rawDocument.renderMethod?.url;
  // }
};
export const isV2Document = (document: any): document is v2.OpenAttestationDocument => {
  return !!document.$template;
};

export const isV3Document = (document: any): document is v3.OpenAttestationDocument => {
  return !!document["@context"] && !!document["openAttestationMetadata"];
};
export const getTemplateUrlFromUnsignedDocument = (
  rawDocument: WrappedOrSignedOpenAttestationDocument | RawVerifiableCredential
): string | undefined => {
  if (vc.isRawDocument(rawDocument) || vc.isSignedDocument(rawDocument)) {
    return [(rawDocument as unknown as SignedVerifiableCredential).renderMethod]?.flat()?.[0]?.id;
  }

  if (isV3Document(rawDocument) && rawDocument.openAttestationMetadata.template) {
    return rawDocument.openAttestationMetadata.template.name;
  }

  if (isV2Document(rawDocument) && typeof rawDocument.$template === "object") {
    return rawDocument.$template.name;
  }

  return "";
};

export const getKeyId = (wrappedDocument: WrappedDocument<OpenAttestationDocument>): string | undefined => {
  return getOpenAttestationData(wrappedDocument)?.id;
};

export const getAttachments = (
  rawDocument: WrappedOrSignedOpenAttestationDocument | RawVerifiableCredential
): OpenAttestationAttachment[] | undefined => {
  if (isWrappedV2Document(rawDocument)) {
    const documentData = getDataV2(rawDocument);
    return documentData.attachments;
  } else if (isWrappedV3Document(rawDocument)) {
    return rawDocument.attachments?.map((attachment: v3.Attachment) => {
      return {
        data: attachment.data,
        filename: attachment.fileName,
        type: attachment.mimeType,
      };
    });
  } else if (vc.isSignedDocument(rawDocument) || vc.isRawDocument(rawDocument)) {
    return [(rawDocument as SignedVerifiableCredential)?.credentialSubject]
      .flat()
      ?.map((s: CredentialSubject) => s.attachments)
      ?.filter(Boolean)
      ?.flat()
      ?.map((a: ProcessedFiles) => ({
        data: a.data,
        filename: a.filename,
        type: a.mimeType,
      }));
  } else {
    // attachments not included in v4 schema for now.
    return [];
  }
};

export const getTransferableRecordsCredentialStatus = (document: unknown): TransferableRecordsCredentialStatus => {
  return [
    (document as SignedVerifiableCredential)?.credentialStatus,
  ].flat()?.[0] as TransferableRecordsCredentialStatus;
};

export const getChainId = (
  rawDocument: WrappedOrSignedOpenAttestationDocument | SignedVerifiableCredential
): ChainId | undefined => {
  const throwError = () => {
    throw new Error("Invalid Document, please use a valid document.");
  };

  const validateChainId = (chainId: number): number => {
    if (!chainId) throwError();
    const supported = getSupportedChainIds();
    const unsupported = getUnsupportedChainIds();
    const isSupported = supported.includes(chainId);
    const isUnsupported = unsupported.includes(chainId);
    if (!isSupported) {
      if (!isUnsupported) throwError();
      throw new Error(IS_DEVELOPMENT ? TYPES.NETWORK_MISMATCH_TESTNET : TYPES.NETWORK_MISMATCH_MAINNET);
    }
    return chainId;
  };

  const processOAChainId = (document: v2.OpenAttestationDocument | v3.OpenAttestationDocument): number | undefined => {
    const network = document.network;
    if (network) {
      // Check for current blockchain, "ETH" or "MATIC", and chainId, if need cater for other blockchain and network, update this accordingly.
      if (!AvailableBlockChains.includes(network.chain as AvailableBlockChains) || !network.chainId) {
        throwError();
      }
      return validateChainId(parseInt(network.chainId!));
    }
    console.warn(
      "You are using an older version of Open-Attestation Document, to use the auto network feature, please use an updated version. Otherwise, please make sure that you select the correct network."
    );
    return undefined;
  };

  // TODO: HAN: Migrate getChainId to trustvc
  if (isSignedDocument(rawDocument)) {
    const rawChainId = getTransferableRecordsCredentialStatus(rawDocument)?.tokenNetwork?.chainId;
    const chainId = typeof rawChainId === "string" ? parseInt(rawChainId, 10) : rawChainId;
    return chainId ? validateChainId(chainId) : undefined;
  } else if (isWrappedV2Document(rawDocument)) {
    const documentData = getDataV2(rawDocument);
    return processOAChainId(documentData);
  } else if (isWrappedV3Document(rawDocument)) {
    return processOAChainId(rawDocument);
  } else {
    // for now v4 is only DID method so ignore chainID
    return undefined;
  }
};

export async function isTokenRegistryV4(registryAddress: string, tokenId: string): Promise<boolean> {
  try {
    const provider = getCurrentProvider();

    if (!provider) {
      return false;
    }
    const isTitleEscrowV4 = await isTitleEscrowVersion({
      tokenRegistryAddress: registryAddress,
      tokenId,
      versionInterface: TitleEscrowInterface.V4,
      provider: provider!,
    });
    return isTitleEscrowV4;
  } catch (error) {
    return false;
  }
}
