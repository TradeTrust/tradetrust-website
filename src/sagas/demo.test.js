import { put, select } from "redux-saga/effects";
import { getDemoDocument } from "../reducers/demo";
import { verifyDemoDocument } from "./demo";
import {
  whenDocumentValidAndIssuedByDns,
  whenDocumentHashInvalidAndNotIssued,
} from "../test/fixture/verifier-responses";
import { history } from "../history";

jest.mock("../services/verify", () => ({ verifyDocument: () => {} }));

describe("verifyDemoDocument", () => {
  it("should verify the document and change the router to /demoViewer when verification passes", () => {
    jest.spyOn(history, "push");
    const generator = verifyDemoDocument();

    // Should dispatch demo/verifyingDemoDocument first
    const verifyingAction = generator.next().value;
    expect(verifyingAction).toStrictEqual(
      put({
        type: "demo/verifyingDemoDocument",
      })
    );

    // Should get the document to be verified from the store next
    const selectDocument = generator.next().value;
    expect(selectDocument).toStrictEqual(select(getDemoDocument));

    generator.next("DOCUMENT_OBJECT");

    // Should mark verification as completed and report the payload
    const verificationCompletionAction = generator.next(whenDocumentValidAndIssuedByDns).value;
    expect(verificationCompletionAction).toStrictEqual(
      put({
        type: "demo/verifyDemoDocumentCompleted",
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
    const generator = verifyDemoDocument();

    // Should dispatch demo/verifyingDemoDocument first
    const verifyingAction = generator.next().value;
    expect(verifyingAction).toStrictEqual(
      put({
        type: "demo/verifyingDemoDocument",
      })
    );

    // Should get the document to be verified from the store next
    const selectDocument = generator.next().value;
    expect(selectDocument).toStrictEqual(select(getDemoDocument));

    generator.next("DOCUMENT_OBJECT");

    // Should mark verification as completed and report the payload
    const verificationCompletionAction = generator.next(whenDocumentHashInvalidAndNotIssued).value;
    expect(verificationCompletionAction).toStrictEqual(
      put({
        type: "demo/verifyDemoDocumentCompleted",
        payload: whenDocumentHashInvalidAndNotIssued,
      })
    );

    // Does not update router if the validation failed
    expect(generator.next().done).toStrictEqual(true);
  });
});
