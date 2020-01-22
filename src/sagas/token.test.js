import { put, select, call, all } from "redux-saga/effects";
import { getCertificate } from "../reducers/certificate";
import { types } from "../reducers/token";
import { getTokenUsers, transferOwnership, checkIfTitleEscrow } from "./token";
import { getBeneficiaryAddress, getApprovedBeneficiaryAddress, getHolderAddress } from "../services/token";

jest.mock("../services/token", () => ({
  transferTokenOwnership: () => {},
  getHolderAddress: () => {},
  getBeneficiaryAddress: () => {},
  getApprovedBeneficiaryAddress: () => {},
  isEscrowContract: () => true
}));

describe("sagas/token", () => {
  describe("getTokenUsers", () => {
    it("should get token user addresses", () => {
      const mockTransferStatus = {
        beneficiaryAddress: "0xA",
        holderAddress: "0xB",
        approvedBeneficiaryAddress: "0xC"
      };

      const generator = getTokenUsers();

      // Should get the token to be transferred from the store next
      const selectDocument = generator.next().value;
      expect(selectDocument).toStrictEqual(select(getCertificate));

      const checkTitleEscrow = generator.next("document").value;
      expect(checkTitleEscrow).toStrictEqual(call(checkIfTitleEscrow, "document"));

      const transferCompletionAction = generator.next(["0xA", "0xB", "0xC"]).value;
      expect(transferCompletionAction).toStrictEqual(
        all([
          call(getBeneficiaryAddress, "document"),
          call(getHolderAddress, "document"),
          call(getApprovedBeneficiaryAddress, "document")
        ])
      );
      expect(generator.next(["0xA", "0xB", "0xC"]).value).toStrictEqual(
        put({
          type: types.GET_TOKEN_USER_ADDRESS_SUCCESS,
          payload: mockTransferStatus
        })
      );
      expect(generator.next().done).toStrictEqual(true);
    });

    it("should get token user addresses failure", () => {
      const mockTransferStatusFailure = "retrieve token user addresses failed";
      const generator = getTokenUsers();

      // Should get the token to be transferred from the store next
      const selectDocument = generator.next().value;
      expect(selectDocument).toStrictEqual(select(getCertificate));

      generator.next(); // yield all step

      expect(generator.throw(new Error(mockTransferStatusFailure)).value).toStrictEqual(
        put({
          type: types.GET_TOKEN_USER_ADDRESS_ERROR,
          payload: mockTransferStatusFailure
        })
      );
      expect(generator.next().done).toStrictEqual(true);
    });
  });

  describe("transferTokenOwnership", () => {
    it("should transfer the token owner to the passed new address", () => {
      const newTokenOwner = "0xA";
      const mockTransferStatus = {
        owner: newTokenOwner,
        message: "success"
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
