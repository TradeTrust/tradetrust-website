import { getData, utils, v2, v3 } from "@govtechsg/open-attestation";
import { LEGACY_OPENCERTS_RENDERER } from "../config";

export type WrappedOrSignedOpenAttestationDocument = v2.WrappedDocument | v3.WrappedDocument;
// note that the return type for getting attachments will normalise the structure into v2.Attachment
export type OpenAttestationAttachment = v2.Attachment;

export const getOpenAttestationData = (
  rawDocument: WrappedOrSignedOpenAttestationDocument
): v3.WrappedDocument<v3.OpenAttestationDocument> | v2.OpenAttestationDocument =>
  utils.isWrappedV2Document(rawDocument) ? getData(rawDocument) : rawDocument;

export const getTemplate = (rawDocument: WrappedOrSignedOpenAttestationDocument): string | undefined => {
  if (utils.isWrappedV2Document(rawDocument)) {
    const documentData = getData(rawDocument);
    return typeof documentData.$template === "object" ? documentData.$template.url : LEGACY_OPENCERTS_RENDERER;
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
