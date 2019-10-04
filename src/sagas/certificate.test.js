import { put, select } from "redux-saga/effects";
import sinon from "sinon";
import { types, getCertificate } from "../reducers/certificate";
import { sendCertificate, verifyCertificate } from "./certificate";
import { MakeCertUtil } from "./testutils";
import * as emailService from "../services/email/sendEmail";

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
    test("should put SENDING_CERTIFICATE_SUCCESS on success", () => {
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const email = "admin@opencerts.io";
      const captcha = "ABCD";
      const saga = sendCertificate({ payload: { email, captcha } });

      expect(saga.next().value).toEqual(select(getCertificate));
      expect(saga.next(testCert).value).toEqual(
        sendEmailStub({
          certificate: testCert,
          email,
          captcha
        })
      );
      expect(saga.next(true).value).toEqual(
        put({
          type: "SENDING_CERTIFICATE_SUCCESS"
        })
      );
      expect(saga.next().done).toBe(true);
    });

    test("should put SENDING_CERTIFICATE_SUCCESS on failure", () => {
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const email = "admin@opencerts.io";
      const captcha = "ABCD";
      const saga = sendCertificate({ payload: { email, captcha } });

      expect(saga.next().value).toEqual(select(getCertificate));
      expect(saga.next(testCert).value).toEqual(
        sendEmailStub({
          certificate: testCert,
          email,
          captcha
        })
      );
      expect(saga.next(false).value).toEqual(
        put({
          type: "SENDING_CERTIFICATE_FAILURE",
          payload: "Fail to send certificate"
        })
      );
      expect(saga.next().done).toBe(true);
    });

    test("should put SENDING_CERTIFICATE_SUCCESS on error", () => {
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const email = "admin@opencerts.io";
      const captcha = "ABCD";
      const errorMsg = "Some unknown error has occured";
      const saga = sendCertificate({ payload: { email, captcha } });

      expect(saga.next().value).toEqual(select(getCertificate));
      expect(saga.next(testCert).value).toEqual(
        sendEmailStub({
          certificate: testCert,
          email,
          captcha
        })
      );
      expect(saga.throw(new Error(errorMsg)).value).toEqual(
        put({
          type: "SENDING_CERTIFICATE_FAILURE",
          payload: errorMsg
        })
      );
      expect(saga.next().done).toBe(true);
    });
  });
});

describe("verifyCertificate", () => {
  it("verifies the document and change the router to /viewer when verification passes", () => {
    const mockVerificationStatus = {
      hash: {
        checksumMatch: true
      },
      issued: {
        issuedOnAll: true,
        details: [
          {
            address: "0xA",
            issued: true
          }
        ]
      },
      revoked: {
        revokedOnAny: false,
        details: [
          {
            address: "0xA",
            revoked: false
          }
        ]
      },
      identity: {
        identifiedOnAll: true,
        details: [
          {
            dns: "domain1.com",
            smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
          },
          {
            dns: "domain2.com",
            smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811"
          }
        ]
      },
      valid: true
    };
    const generator = verifyCertificate();

    // Should dispatch VERIFYING_CERTIFICATE first
    const verifyingAction = generator.next().value;
    expect(verifyingAction).toEqual(
      put({
        type: types.VERIFYING_CERTIFICATE
      })
    );

    // Should get the document to be verified from the store next
    const selectCertificate = generator.next().value;
    expect(selectCertificate).toEqual(select(getCertificate));

    generator.next("CERTIFICATE_OBJECT");

    // Should mark verification as completed and report the payload
    const verificationCompletionAction = generator.next(mockVerificationStatus)
      .value;
    expect(verificationCompletionAction).toEqual(
      put({
        type: types.VERIFYING_CERTIFICATE_SUCCESS,
        payload: mockVerificationStatus
      })
    );

    // If verification passes, update the router
    const router = generator.next({ valid: true }).value;
    expect(router).toEqual(
      put({
        type: "@@router/CALL_HISTORY_METHOD",
        payload: {
          args: ["/viewer"],
          method: "push"
        }
      })
    );
    expect(generator.next().done).toEqual(true);
  });

  it("verifies the document and change the router to /viewer when verification passes", () => {
    const mockVerificationStatus = {
      hash: {
        checksumMatch: true
      },
      issued: {
        issuedOnAll: true,
        details: [
          {
            address: "0xA",
            issued: true
          }
        ]
      },
      revoked: {
        revokedOnAny: true,
        details: [
          {
            address: "0xA",
            revoked: true
          }
        ]
      },
      identity: {
        identifiedOnAll: true,
        details: [
          {
            dns: "domain1.com",
            smartContract: "0x2f60375e8144e16Adf1979936301D8341D58C36C"
          },
          {
            dns: "domain2.com",
            smartContract: "0x53f3a47C129Ea30D80bC727556b015F02bE63811"
          }
        ]
      },
      valid: false
    };
    const generator = verifyCertificate();

    // Should dispatch VERIFYING_CERTIFICATE first
    const verifyingAction = generator.next().value;
    expect(verifyingAction).toEqual(
      put({
        type: types.VERIFYING_CERTIFICATE
      })
    );

    // Should get the document to be verified from the store next
    const selectCertificate = generator.next().value;
    expect(selectCertificate).toEqual(select(getCertificate));

    generator.next("CERTIFICATE_OBJECT");

    // Should mark verification as completed and report the payload
    const verificationCompletionAction = generator.next(mockVerificationStatus)
      .value;
    expect(verificationCompletionAction).toEqual(
      put({
        type: types.VERIFYING_CERTIFICATE_SUCCESS,
        payload: mockVerificationStatus
      })
    );

    // Does not update router if the validation failed
    expect(generator.next().done).toEqual(true);
  });
});
