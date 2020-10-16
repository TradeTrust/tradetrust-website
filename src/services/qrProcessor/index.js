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

export const processQrCode = async (qrCode) => {
  try {
    const action = decodeQrCode(qrCode);
    if (action.type !== "DOCUMENT")
      throw new Error(`The type ${action.type} provided from the action is not supported`);
    return action.payload;
  } catch (e) {
    error(e.message);
    throw new Error(e.message);
  }
};
