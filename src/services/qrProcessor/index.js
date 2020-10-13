import axios from "axios";
import { decryptString } from "@govtechsg/oa-encryption";

export const decodeQrCode = (qrCode) => {
  const ttRegex = /https:\/\/action.openattestation.com\/\?q=(.*)/;
  if (!ttRegex.test(qrCode)) throw new Error("QR Code is not formatted to TradeTrust specifications");
  const [, encodedPayload] = ttRegex.exec(qrCode);
  const decodedPayload = JSON.parse(decodeURIComponent(encodedPayload));
  return decodedPayload;
};

export const encodeQrCode = (payload) =>
  `https://action.openattestation.com/?q=${encodeURIComponent(JSON.stringify(payload))}`;

const decryptQuery = async (action) => {
  if (action.type !== "DOCUMENT") throw new Error(`The type ${action.type} provided from the action is not supported`);
  const { uri, key } = action.payload;
  const response = await axios.get(uri);
  if (response.status >= 400 && response.status < 600) throw new Error(`Unable to load the certificate from ${uri}`);
  let certificate = response.data;
  certificate = certificate.document || certificate; // opencerts-function returns the document in a nested document object

  if (!certificate) {
    throw new Error(`Certificate at address ${uri} is empty`);
  }
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
    const queryParam = decodeQrCode(qrCode);
    const data = await decryptQuery(queryParam);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};
