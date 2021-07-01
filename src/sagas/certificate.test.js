import { put, select } from "redux-saga/effects";
import { types, getCertificate } from "../reducers/certificate";
import { verifyCertificate } from "./certificate";
import {
  whenDocumentValidAndIssuedByDns,
  whenDocumentHashInvalidAndNotIssued,
} from "../test/fixture/verifier-responses";

jest.mock("../services/verify", () => ({ verifyDocument: () => {} }));

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
    const verificationCompletionAction = generator.next(whenDocumentValidAndIssuedByDns).value;
    expect(verificationCompletionAction).toStrictEqual(
      put({
        type: types.VERIFYING_CERTIFICATE_COMPLETED,
        payload: whenDocumentValidAndIssuedByDns,
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
