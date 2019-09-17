import { get } from "axios";
var Dropbox = require('dropbox');

const isDropboxActive = true;

export const decodeQrCode = qrCode => {
  const ttRegex = /tradetrust:\/\/(.*)/;
  if (!ttRegex.test(qrCode))
    throw new Error("QR Code is not formatted to TradeTrust specifications");
  const [, encodedPayload] = ttRegex.exec(qrCode);
  const decodedPayload = JSON.parse(decodeURIComponent(encodedPayload));
  return decodedPayload;
};

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      resolve(JSON.parse(reader.result));
    };

    reader.onerror = reject;
    reader.readAsText(file);
  });
}

async function loadDropboxFile(path) {
  const ACCESS_TOKEN = "HSoTbMxiWcAAAAAAAAAAOrYJwmMJIodakpHeG0z-i0sZb-MHl2ePV5ErQ0McJyVt";
  const dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });
  const result =  await dbx.filesDownload({path});

  const data = await readFileAsync(result.fileBlob);
  return { data };
}

export const encodeQrCode = payload =>
  `tradetrust://${encodeURIComponent(JSON.stringify(payload))}`;

export const processQrCode = async qrCode => {
  const { uri } = isDropboxActive ? {uri: qrCode} : decodeQrCode(qrCode);
  const { data } = isDropboxActive ? await loadDropboxFile(qrCode) : await get(uri);
  return data;
};
