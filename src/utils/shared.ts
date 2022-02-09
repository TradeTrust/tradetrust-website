import { getData, utils, v2, v3, OpenAttestationDocument, WrappedDocument } from "@govtechsg/open-attestation";
import { ChainId } from "../constants/chain-info";

export type WrappedOrSignedOpenAttestationDocument = WrappedDocument<OpenAttestationDocument>;
// note that the return type for getting attachments will normalise the structure into v2.Attachment
export type OpenAttestationAttachment = v2.Attachment;

export const getOpenAttestationData = (
  wrappedDocument: WrappedDocument<OpenAttestationDocument>
): OpenAttestationDocument => utils.getDocumentData(wrappedDocument);

export const getTemplateUrl = (rawDocument: WrappedOrSignedOpenAttestationDocument): string | undefined => {
  if (utils.isWrappedV2Document(rawDocument)) {
    const documentData = getData(rawDocument);
    return typeof documentData.$template === "object" ? documentData.$template.url : undefined;
  } else {
    return rawDocument.openAttestationMetadata.template?.url;
  }
};

export const getAttachments = (rawDocument: WrappedOrSignedOpenAttestationDocument): v2.Attachment[] | undefined => {
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

export const getTokenRegistryAddress = (document: WrappedOrSignedOpenAttestationDocument): string | undefined => {
  const issuerAddress = utils.getIssuerAddress(document);
  return issuerAddress instanceof Array ? issuerAddress[0] : issuerAddress;
};

export const getChainId = (rawDocument: WrappedOrSignedOpenAttestationDocument): ChainId | undefined => {
  const warn = () =>
    console.warn(
      "You are using an older version of Open-Attestation Document, to use the auto network feature, please use an updated version. Otherwise, please make sure that you select the correct network."
    );
  if (utils.isWrappedV2Document(rawDocument)) {
    const documentData = getData(rawDocument);
    if (documentData.network?.chain === "ETH" || documentData.network?.chain === "MATIC")
      return documentData.network?.chainId ? parseInt(documentData.network?.chainId) : undefined;
    warn();
    return undefined;
  }
  if (rawDocument.network?.chain === "ETH" || rawDocument.network?.chain === "MATIC")
    return rawDocument.network?.chainId ? parseInt(rawDocument.network?.chainId) : undefined;
  warn();
  return undefined;
};
