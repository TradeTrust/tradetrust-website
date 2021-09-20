import { put, select } from "redux-saga/effects";
import { getDemoMagicDocument } from "../reducers/demoMagicWallet";
import { verifyDemoMagicDocument } from "./demoMagicWallet";
import {
  whenDocumentValidAndIssuedByDns,
  whenDocumentHashInvalidAndNotIssued,
} from "../test/fixture/verifier-responses";
import { history } from "../history";

jest.mock("../services/verify", () => ({ verifyDocument: () => {} }));

describe("verifyDemoMagicDocument", () => {
  it("should verify the document and change the router to /demoViewer when verification passes", () => {
    jest.spyOn(history, "push");
    const generator = verifyDemoMagicDocument();

    // Should dispatch demoMagicWallet/verifyingDemoMagicDocument first
    const verifyingAction = generator.next().value;
    expect(verifyingAction).toStrictEqual(
      put({
        type: "demoMagicWallet/verifyingDemoMagicDocument",
      })
    );

    // Should get the document to be verified from the store next
    const selectDocument = generator.next().value;
    expect(selectDocument).toStrictEqual(select(getDemoMagicDocument));

    generator.next("DOCUMENT_OBJECT");

    // Should mark verification as completed and report the payload
    const verificationCompletionAction = generator.next(whenDocumentValidAndIssuedByDns).value;
    expect(verificationCompletionAction).toStrictEqual(
      put({
        type: "demoMagicWallet/verifyDemoMagicDocumentCompleted",
        payload: whenDocumentValidAndIssuedByDns,
      })
    );

    // If verification passes, update the router
    generator.next();
    //TODO: update the path once its ready
    // expect(history.push).toHaveBeenCalledWith("/demoViewer");
    expect(generator.next().done).toStrictEqual(true);
  });

  it("should verify the document and dont update the router when verification fails", () => {
    const generator = verifyDemoMagicDocument();

    // Should dispatch demoMagicWallet/verifyingDemoMagicDocument first
    const verifyingAction = generator.next().value;
    expect(verifyingAction).toStrictEqual(
      put({
        type: "demoMagicWallet/verifyingDemoMagicDocument",
      })
    );

    // Should get the document to be verified from the store next
    const selectDocument = generator.next().value;
    expect(selectDocument).toStrictEqual(select(getDemoMagicDocument));

    generator.next("DOCUMENT_OBJECT");

    // Should mark verification as completed and report the payload
    const verificationCompletionAction = generator.next(whenDocumentHashInvalidAndNotIssued).value;
    expect(verificationCompletionAction).toStrictEqual(
      put({
        type: "demoMagicWallet/verifyDemoMagicDocumentCompleted",
        payload: whenDocumentHashInvalidAndNotIssued,
      })
    );

    // Does not update router if the validation failed
    expect(generator.next().done).toStrictEqual(true);
  });
});
