import { getData, utils, v2, v3, WrappedDocument } from "@govtechsg/open-attestation";
import { ChainId } from "../constants/chain-info";
import { TradeTrustDocument, WrappedOrSignedTradeTrustDocument } from "../types";

// note that the return type for getting attachments will normalise the structure into v2.Attachment
export type OpenAttestationAttachment = v2.Attachment;

export const getOpenAttestationData = (wrappedDocument: WrappedDocument<TradeTrustDocument>): TradeTrustDocument =>
  utils.getDocumentData(wrappedDocument) as TradeTrustDocument;

export const getTemplateUrl = (rawDocument: WrappedOrSignedTradeTrustDocument): string | undefined => {
  if (utils.isWrappedV2Document(rawDocument)) {
    const documentData = getData(rawDocument);
    return typeof documentData.$template === "object" ? documentData.$template.url : undefined;
  } else {
    return rawDocument.openAttestationMetadata.template?.url;
  }
};

export const getAttachments = (
  rawDocument: WrappedOrSignedTradeTrustDocument
): OpenAttestationAttachment[] | undefined => {
  if (utils.isWrappedV2Document(rawDocument)) {
    const documentData = getData(rawDocument);
    return documentData.attachments;
  } else {
    return rawDocument.attachments?.map((attachment: v3.Attachment) => {
      return {
        data: attachment.data,
        filename: attachment.fileName,
        type: attachment.mimeType,
      };
    });
  }
};

export const getTokenRegistryAddress = (document: WrappedOrSignedTradeTrustDocument): string | undefined => {
  const issuerAddress = utils.getIssuerAddress(document);
  return issuerAddress instanceof Array ? issuerAddress[0] : issuerAddress;
};

export const getChainId = (rawDocument: WrappedOrSignedTradeTrustDocument): ChainId | undefined => {
  if (utils.isWrappedV2Document(rawDocument)) {
    const documentData = getData(rawDocument);
    return documentData.chainId ? parseInt(documentData.chainId) : undefined;
  }
  return rawDocument.chainId ? parseInt(rawDocument.chainId) : undefined;
};
