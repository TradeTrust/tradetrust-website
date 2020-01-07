import { put, select } from "redux-saga/effects";
import { getCertificate } from "../reducers/certificate";
import { types } from "../reducers/token";
import { transferOwnership } from "./token";
jest.mock("../services/token", () => ({ transferTokenOwnership: () => {} }));

describe("sagas/token", () => {
  describe("transferTokenOwnership", () => {
    it("should transfer the token owner to the passed new address", () => {
      const newTokenOwner = "0xA";
      const mockTransferStatus = {
        owner: newTokenOwner,
        message: "succuss"
      };
      const generator = transferOwnership({ payload: { newTokenOwner } });

      // Should get the token to be transferred from the store next
      const selectDocument = generator.next().value;
      expect(selectDocument).toStrictEqual(select(getCertificate));

      generator.next("DOCUMENT_OBJECT", "0xA");

      // Should mark transfer as completed and report the payload
      const transferCompletionAction = generator.next(mockTransferStatus).value;
      expect(transferCompletionAction).toStrictEqual(
        put({
          type: types.TRANSFER_TOKEN_OWNERSHIP_SUCCESS,
          payload: mockTransferStatus
        })
      );
      expect(generator.next().done).toStrictEqual(true);
    });

    it("should handle failed transfer from the token owner to the new address", () => {
      const newTokenOwner = "0xA";
      const mockTransferStatusFailure = "transfer failed";
      const generator = transferOwnership({ payload: { newTokenOwner } });

      // Should get the token to be transferred from the store next
      const selectDocument = generator.next().value;
      expect(selectDocument).toStrictEqual(select(getCertificate));

      generator.next("DOCUMENT_OBJECT", "0xA");

      expect(generator.throw(new Error(mockTransferStatusFailure)).value).toStrictEqual(
        put({
          type: types.TRANSFER_TOKEN_OWNERSHIP_ERROR,
          payload: mockTransferStatusFailure
        })
      );
      expect(generator.next().done).toStrictEqual(true);
    });
  });
});
