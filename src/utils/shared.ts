import {
  getAssetId,
  getDataV2,
  getDocumentData,
  getIssuerAddress,
  isTitleEscrowVersion,
  isWrappedV2Document,
  isWrappedV3Document,
  OpenAttestationDocument,
  SignedVerifiableCredential,
  v2,
  v3,
  WrappedDocument,
  isTransferableAsset as isTransferableOAAsset,
} from "@trustvc/trustvc";
import { TRANSFERABLE_RECORDS_TYPE } from "@trustvc/trustvc/verify/fragments";
import { TransferableRecordsCredentialStatus } from "@trustvc/trustvc/w3c/credential-status";
import { isSignedDocument } from "@trustvc/trustvc/w3c/vc";
import { TitleEscrowInterface } from "../common/contexts/TokenInformationContext";
import { getCurrentProvider } from "../common/contexts/provider";
import { getSupportedChainIds } from "../common/utils/chain-utils";
import { AvailableBlockChains, ChainId } from "../constants/chain-info";

export type WrappedOrSignedOpenAttestationDocument = WrappedDocument<OpenAttestationDocument>;
// note that the return type for getting attachments will normalise the structure into v2.Attachment
export type OpenAttestationAttachment = v2.Attachment;

export const getOpenAttestationData = (
  wrappedDocument: WrappedDocument<OpenAttestationDocument>
): OpenAttestationDocument => {
  if (isSignedDocument(wrappedDocument)) {
    return wrappedDocument as any;
  }
  return getDocumentData(wrappedDocument);
};

export const getTemplateUrl = (rawDocument: WrappedOrSignedOpenAttestationDocument): string | undefined => {
  if (isSignedDocument(rawDocument)) {
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

export const getKeyId = (wrappedDocument: WrappedDocument<OpenAttestationDocument>): string | undefined => {
  return getOpenAttestationData(wrappedDocument)?.id;
};

export const getAttachments = (rawDocument: WrappedOrSignedOpenAttestationDocument): v2.Attachment[] | undefined => {
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

export const isTransferableAsset = (document: WrappedOrSignedOpenAttestationDocument): boolean => {
  // TODO: HAN: Migrate isTransferableAsset to trustvc
  let isTransferableAssetVal: boolean = false;
  if (isSignedDocument(document)) {
    const credentialStatus = getTransferableRecordsCredentialStatus(document);
    isTransferableAssetVal = credentialStatus?.type === TRANSFERABLE_RECORDS_TYPE;
  } else {
    isTransferableAssetVal = isTransferableOAAsset(document);
  }

  return isTransferableAssetVal;
};

export const getTokenRegistryAddress = (
  document: WrappedOrSignedOpenAttestationDocument | SignedVerifiableCredential
): string | undefined => {
  // const issuerAddress = getIssuerAddress(document);
  // TODO: HAN: Migrate getIssuerAddress to trustvc
  let issuerAddress: string | string[] = "";
  if (isSignedDocument(document)) {
    const credentialStatus = getTransferableRecordsCredentialStatus(document);
    issuerAddress = credentialStatus?.tokenRegistry;
  } else {
    issuerAddress = getIssuerAddress(document);
  }
  return issuerAddress instanceof Array ? issuerAddress[0] : issuerAddress;
};

export const getTokenId = (document: WrappedOrSignedOpenAttestationDocument | SignedVerifiableCredential): string => {
  // const tokenId = `0x${utils.getAssetId(certificate)}`;
  // TODO: HAN: Migrate getAssetId to trustvc
  let tokenId: string | undefined = "";
  if (isSignedDocument(document)) {
    const credentialStatus = getTransferableRecordsCredentialStatus(document);
    tokenId = credentialStatus?.tokenId;
  } else {
    tokenId = getAssetId(document);
  }

  return `0x${tokenId}`;
};

export const getChainId = (
  rawDocument: WrappedOrSignedOpenAttestationDocument | SignedVerifiableCredential
): ChainId | undefined => {
  const throwError = () => {
    throw new Error("Invalid Document, please use a valid document.");
  };

  function processOAChainId(document: v2.OpenAttestationDocument | v3.OpenAttestationDocument): number | undefined {
    if (document.network) {
      // Check for current blockchain, "ETH" or "MATIC", and chainId, if need cater for other blockchain and network, update this accordingly.
      if (AvailableBlockChains.includes(document.network.chain) && document.network.chainId) {
        const networks: ChainId[] = getSupportedChainIds();
        const chainIdNumber = parseInt(document.network.chainId);
        const isChainIdInListedNetwork = networks.includes(chainIdNumber);
        if (!chainIdNumber || !isChainIdInListedNetwork) throwError();
        return chainIdNumber;
      }
      throwError();
    }
    console.warn(
      "You are using an older version of Open-Attestation Document, to use the auto network feature, please use an updated version. Otherwise, please make sure that you select the correct network."
    );
    return undefined;
  }

  // TODO: HAN: Migrate getChainId to trustvc
  if (isSignedDocument(rawDocument)) {
    const credentialStatus = getTransferableRecordsCredentialStatus(rawDocument);
    return credentialStatus?.tokenNetwork?.chainId as ChainId;
  } else if (isWrappedV2Document(rawDocument)) {
    const documentData = getDataV2(rawDocument);
    // Check for DID, ignore chainId when its DID
    const identityProofType = documentData.issuers[0].identityProof?.type;
    if (identityProofType === "DNS-DID" || identityProofType === "DID") return undefined;
    return processOAChainId(documentData);
  } else if (isWrappedV3Document(rawDocument)) {
    // Check for DID, ignore chainId when its DID
    const identityProofType = rawDocument.openAttestationMetadata.identityProof.type;
    if (identityProofType === "DNS-DID" || identityProofType === "DID") return undefined;
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

    const isTitleEscrowV4 = await isTitleEscrowVersion(TitleEscrowInterface.V4, registryAddress, tokenId, provider!);
    return isTitleEscrowV4;
  } catch (error) {
    return false;
  }
}
