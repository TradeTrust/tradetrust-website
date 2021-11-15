import { getData, utils, v2, v3, OpenAttestationDocument, WrappedDocument } from "@govtechsg/open-attestation";

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
