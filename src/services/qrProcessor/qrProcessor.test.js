import { encryptString } from "@govtechsg/oa-encryption";
import axios from "axios";
import { decodeQrCode, encodeQrCode, encodeQrCodeFromStorage, processQrCode } from "./index";

jest.mock("axios");

describe("encodeQrCode", () => {
  it("encodes an action correctly", () => {
    const action = { uri: "https://sample.domain/document/id?q=abc#123" };
    const encodedQrCode = encodeQrCode(action);
    expect(encodedQrCode).toBe(
      "tradetrust://%7B%22uri%22%3A%22https%3A%2F%2Fsample.domain%2Fdocument%2Fid%3Fq%3Dabc%23123%22%7D"
    );
  });
});

describe("decodeQrCode", () => {
  it("decodes an action correctly", () => {
    const encodedQrCode =
      "tradetrust://%7B%22uri%22%3A%22https%3A%2F%2Fsample.domain%2Fdocument%2Fid%3Fq%3Dabc%23123%22%7D";

    const action = decodeQrCode(encodedQrCode);
    expect(action).toStrictEqual({
      uri: "https://sample.domain/document/id?q=abc#123",
    });
  });

  it("throws when qr code is malformed", () => {
    const encodedQrCode = "http://%7B%22uri%22%3A%22https%3A%2F%2Fsample.domain%2Fdocument%2Fid%3Fq%3Dabc%23123%22%7D";
    expect(() => decodeQrCode(encodedQrCode)).toThrow("not formatted");
  });
});

describe("processQrCode", () => {
  it("fetches calls get with the right parameter when a QR code is scanned", async () => {
    const document = { name: "foo" };
    const { cipherText, iv, tag, key } = await encryptString(JSON.stringify(document));
    const actionUri = { uri: `https://sample.domain/document#${key}` };
    axios.get.mockResolvedValue({
      data: { document: { cipherText, iv, tag } },
    });
    const results = await processQrCode(encodeQrCode(actionUri));
    expect(axios.get).toHaveBeenCalledWith("https://sample.domain/document");
    expect(results).toStrictEqual(document);
  });
});

describe("encodeQrCodeFromStorage", () => {
  it("should encode the qrcode object correctly", () => {
    const qrObj = { data: "test data" };
    const encodedQR = encodeQrCodeFromStorage(qrObj);
    expect(encodedQR).toStrictEqual("https://action.openattestation.com/?q=%7B%22data%22%3A%22test%20data%22%7D");
  });
});
