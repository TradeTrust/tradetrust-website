import axios from "axios";
import { decryptString } from "@govtechsg/oa-encryption";
import { getLogger } from "../../utils/logger";

const { error } = getLogger("services:qrProcessor");

export const decodeQrCode = (qrCode) => {
  const openAttestationActionRegex = /https:\/\/action.openattestation.com\/\?q=(.*)/;
  if (!openAttestationActionRegex.test(qrCode))
    throw new Error("QR Code is not formatted to TradeTrust specifications");
  const [, encodedPayload] = openAttestationActionRegex.exec(qrCode);
  const decodedPayload = JSON.parse(decodeURIComponent(encodedPayload));
  return decodedPayload;
};

export const encodeQrCode = (payload) =>
  `https://action.openattestation.com/?q=${encodeURIComponent(JSON.stringify(payload))}`;

export const getDocumentFromUri = async (uri) => {
  try {
    const response = await axios.get(uri);
    let certificate = response.data;
    certificate = certificate.document || certificate; // opencerts-function returns the document in a nested document object
    return certificate;
  } catch (e) {
    throw new Error(`Unable to load the certificate from ${uri}`);
  }
};

const decryptDocument = async (certificate, key) => {
  // if there is a key and the type is "OPEN-ATTESTATION-TYPE-1", let's use oa-encryption
  if (key && certificate.type === "OPEN-ATTESTATION-TYPE-1") {
    certificate = JSON.parse(
      decryptString({
        tag: certificate.tag,
        cipherText: certificate.cipherText,
        iv: certificate.iv,
        key,
        type: certificate.type,
      })
    );
    return certificate;
  } else if (key || certificate.type) {
    throw new Error(`Unable to decrypt certificate with key=${key} and type=${certificate.type}`);
  }
};

export const processQrCode = async (qrCode) => {
  try {
    const action = decodeQrCode(qrCode);
    if (action.type !== "DOCUMENT")
      throw new Error(`The type ${action.type} provided from the action is not supported`);
    const certificate = await getDocumentFromUri(action.payload.uri);
    if (!certificate) {
      throw new Error(`Certificate at address ${uri} is empty`);
    }
    const data = await decryptDocument(certificate, action.payload.key);
    return data;
  } catch (e) {
    error(e.message);
    throw new Error(e.message);
  }
};
