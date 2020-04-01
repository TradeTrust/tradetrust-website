import { put, select } from "redux-saga/effects";
import sinon from "sinon";
import { types, getCertificate } from "../reducers/certificate";
import { sendCertificate, verifyCertificate } from "./certificate";
import { MakeCertUtil } from "./testutils";
import * as emailService from "../services/email/sendEmail";
import { whenDocumentValidAndIssued, whenDocumentHashInvalidAndNotIssued } from "../test/fixture/verifier-responses";

jest.mock("../services/verify", () => ({ verifyDocument: () => {} }));

function whenThereIsOneEthereumAddressIssuer() {
  const ethereumAddresses = ["0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F"];
  const testCert = new MakeCertUtil().addIssuer(ethereumAddresses[0]).finish();
  return { testCert, ethereumAddresses };
}

describe("sagas/certificate", () => {
  describe("sendCertificate", () => {
    let sendEmailStub;
    beforeEach(() => {
      sendEmailStub = sinon.stub(emailService, "sendEmail");
    });
    afterEach(() => {
      sendEmailStub.restore();
    });
    it("should put SENDING_CERTIFICATE_SUCCESS on success", () => {
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const email = "admin@opencerts.io";
      const captcha = "ABCD";
      const saga = sendCertificate({ payload: { email, captcha } });

      expect(saga.next().value).toStrictEqual(select(getCertificate));
      expect(saga.next(testCert).value).toStrictEqual(
        sendEmailStub({
          certificate: testCert,
          email,
          captcha,
        })
      );
      expect(saga.next(true).value).toStrictEqual(
        put({
          type: "SENDING_CERTIFICATE_SUCCESS",
        })
      );
      expect(saga.next().done).toBe(true);
    });

    it("should put SENDING_CERTIFICATE_SUCCESS on failure", () => {
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const email = "admin@opencerts.io";
      const captcha = "ABCD";
      const saga = sendCertificate({ payload: { email, captcha } });

      expect(saga.next().value).toStrictEqual(select(getCertificate));
      expect(saga.next(testCert).value).toStrictEqual(
        sendEmailStub({
          certificate: testCert,
          email,
          captcha,
        })
      );
      expect(saga.next(false).value).toStrictEqual(
        put({
          type: "SENDING_CERTIFICATE_FAILURE",
          payload: "Fail to send certificate",
        })
      );
      expect(saga.next().done).toBe(true);
    });

    it("should put SENDING_CERTIFICATE_SUCCESS on error", () => {
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const email = "admin@opencerts.io";
      const captcha = "ABCD";
      const errorMsg = "Some unknown error has occured";
      const saga = sendCertificate({ payload: { email, captcha } });

      expect(saga.next().value).toStrictEqual(select(getCertificate));
      expect(saga.next(testCert).value).toStrictEqual(
        sendEmailStub({
          certificate: testCert,
          email,
          captcha,
        })
      );
      expect(saga.throw(new Error(errorMsg)).value).toStrictEqual(
        put({
          type: "SENDING_CERTIFICATE_FAILURE",
          payload: errorMsg,
        })
      );
      expect(saga.next().done).toBe(true);
    });
  });
});

describe("verifyCertificate", () => {
  it("verifies the document and change the router to /viewer when verification passes", () => {
    const generator = verifyCertificate();

    // Should dispatch VERIFYING_CERTIFICATE first
    const verifyingAction = generator.next().value;
    expect(verifyingAction).toStrictEqual(
      put({
        type: types.VERIFYING_CERTIFICATE,
      })
    );

    // Should get the document to be verified from the store next
    const selectCertificate = generator.next().value;
    expect(selectCertificate).toStrictEqual(select(getCertificate));

    generator.next("CERTIFICATE_OBJECT");

    // Should mark verification as completed and report the payload
    const verificationCompletionAction = generator.next(whenDocumentValidAndIssued).value;
    expect(verificationCompletionAction).toStrictEqual(
      put({
        type: types.VERIFYING_CERTIFICATE_COMPLETED,
        payload: whenDocumentValidAndIssued,
      })
    );

    // If verification passes, update the router
    const router = generator.next({ valid: true }).value;
    expect(router).toStrictEqual(
      put({
        type: "@@router/CALL_HISTORY_METHOD",
        payload: {
          args: ["/viewer"],
          method: "push",
        },
      })
    );
    expect(generator.next().done).toStrictEqual(true);
  });

  it("verifies the document and dont change the router to /viewer when verification fails", () => {
    const generator = verifyCertificate();

    // Should dispatch VERIFYING_CERTIFICATE first
    const verifyingAction = generator.next().value;
    expect(verifyingAction).toStrictEqual(
      put({
        type: types.VERIFYING_CERTIFICATE,
      })
    );

    // Should get the document to be verified from the store next
    const selectCertificate = generator.next().value;
    expect(selectCertificate).toStrictEqual(select(getCertificate));

    generator.next("CERTIFICATE_OBJECT");

    // Should mark verification as completed and report the payload
    const verificationCompletionAction = generator.next(whenDocumentHashInvalidAndNotIssued).value;
    expect(verificationCompletionAction).toStrictEqual(
      put({
        type: types.VERIFYING_CERTIFICATE_COMPLETED,
        payload: whenDocumentHashInvalidAndNotIssued,
      })
    );

    // Does not update router if the validation failed
    expect(generator.next().done).toStrictEqual(true);
  });
});
