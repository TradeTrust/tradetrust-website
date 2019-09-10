import { get } from "axios";
var Dropbox = require('dropbox');

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
  })
}

async function loadDropboxFile(path) {
  console.log(path)
  var ACCESS_TOKEN = "HSoTbMxiWcAAAAAAAAAAKIR3Kxl2D5K_GclsAYwztvM6XX8ipOTmj5eGJcIhtlGN";
  var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });
  const data =  await dbx.filesDownload({path});

  var blob = data.fileBlob;
  console.log(blob)
  const res = await readFileAsync(blob);
  return res;
}

export const encodeQrCode = payload =>
  `tradetrust://${encodeURIComponent(JSON.stringify(payload))}`;

export const processQrCode = async qrCode => {
  //const { uri } = decodeQrCode(qrCode);
  const data = await loadDropboxFile(qrCode);
  console.log(data);
  return data;
};
