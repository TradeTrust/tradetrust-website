import {
  isRawV3Document,
  isRawV2Document,
  OpenAttestationDocument,
  SignedVerifiableCredential,
  vc,
  getDocumentData as getOADocumentData,
  WrappedDocument,
} from "@trustvc/trustvc";

interface QrCode {
  type: string;
  payload: {
    uri: string;
    key: string;
    permittedActions: string[];
    redirect: string;
  };
}
export const encodeQrCode = (payload: QrCode): string =>
  `https://actions.tradetrust.io?q=${encodeURIComponent(JSON.stringify(payload))}`;

export const decodeQrCode = (qrCode: string): QrCode => {
  const oaRegex = /https:\/\/action.openattestation.com\/?\?q=(.*)/;
  const ttRegex = /https:\/\/actions.tradetrust.io\/?\?q=(.*)/;

  if (oaRegex.test(qrCode) || ttRegex.test(qrCode)) {
    const matchedArray = (oaRegex.exec(qrCode) as RegExpExecArray) || (ttRegex.exec(qrCode) as RegExpExecArray);
    const encodedPayload = matchedArray[1];
    const decodedPayload = JSON.parse(decodeURIComponent(encodedPayload));
    return decodedPayload;
  }

  throw new Error("QR Code is not formatted to TradeTrust specifications");
};
export const getDocumentData = (document: OpenAttestationDocument | SignedVerifiableCredential): any => {
  if (isRawV3Document(document) || vc.isSignedDocument(document)) {
    return document.credentialSubject;
  } else {
    return getOADocumentData(document as unknown as WrappedDocument<OpenAttestationDocument>);
  }
};
export const getQRCodeLink = (document: OpenAttestationDocument | SignedVerifiableCredential): any => {
  const documentData = getDocumentData(document);
  if (vc.isSignedDocument(document)) {
    const { qrCode } = documentData.credentialSubject; // shoft to top
    return qrCode.uri;
  } else if (isRawV3Document(document)) {
    const { links } = documentData.credentialSubject;
    return links?.self?.href;
  } else if (isRawV2Document(document)) {
    const { links } = documentData;
    return links?.self?.href;
  }
};
