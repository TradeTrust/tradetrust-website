import {
  isRawV3Document,
  isRawV2Document,
  OpenAttestationDocument,
  SignedVerifiableCredential,
  vc,
  getDocumentData as getOADocumentData,
  WrappedDocument,
  WrappedOrSignedOpenAttestationDocument,
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
  const ttRegex = /https:\/\/actions.tradetrust.io\/?\?q=(.*)/;

  if (ttRegex.test(qrCode)) {
    const matchedArray = ttRegex.exec(qrCode) as RegExpExecArray;
    const encodedPayload = matchedArray[1];
    const decodedPayload = JSON.parse(decodeURIComponent(encodedPayload));
    return decodedPayload;
  }

  throw new Error("QR Code is not formatted to TradeTrust specifications");
};
export const getDocumentData = (document: OpenAttestationDocument | SignedVerifiableCredential): any => {
  if (isRawV3Document(document) || vc.isSignedDocument(document) || vc.isRawDocument(document)) {
    return document.credentialSubject;
  } else {
    return getOADocumentData(document as unknown as WrappedDocument<OpenAttestationDocument>);
  }
};
export const getQRCodeLink = (document: WrappedOrSignedOpenAttestationDocument | SignedVerifiableCredential): any => {
  const documentData = getDocumentData(document as OpenAttestationDocument);
  if (isRawV2Document(document)) {
    const { links } = document;
    return links?.self?.href;
  } else if (isRawV3Document(document)) {
    const { links } = documentData;
    return links?.self?.href;
  } else if (vc.isSignedDocument(document) || vc.isRawDocument(document)) {
    const { qrCode } = document as SignedVerifiableCredential;
    return qrCode?.uri;
  }
};
