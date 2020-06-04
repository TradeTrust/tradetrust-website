import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { FormState } from "../../../../../constants/FormState";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { EndorseTransferForm } from "./EndorseTransferForm";

describe("Endorse Transfer to nominated beneficiary and holder", () => {
  it("should display the approvedBeneficiary and approvedHolder address as non editable fields", async () => {
    await act(async () => {
      const mockHandleEndorseTransfer = jest.fn();

      const container = render(
        <EndorseTransferForm
          formAction={AssetManagementActions.EndorseTransfer}
          tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          approvedBeneficiary="0xc0F28621Ca5454B66E51786003c798154FeBc6EB"
          approvedHolder="0xFC6e365B926166d0D69bF336d03164FB301D6C41"
          handleEndorseTransfer={mockHandleEndorseTransfer}
          transferToNewEscrowState={FormState.UNINITIALIZED}
          onBack={() => {}}
        />
      );

      const beneficiaryField = container.getByTestId("non-editable-input-beneficiary");
      const holderField = container.getByTestId("non-editable-input-holder");
      expect(beneficiaryField.innerHTML).toEqual("0xc0F28621Ca5454B66E51786003c798154FeBc6EB");
      expect(holderField.innerHTML).toEqual("0xFC6e365B926166d0D69bF336d03164FB301D6C41");
    });
  });
  it("should fire the function to handle endorse transfer when 'endorse' button is clicked", async () => {
    await act(async () => {
      const mockHandleEndorseTransfer = jest.fn();

      const container = render(
        <EndorseTransferForm
          formAction={AssetManagementActions.EndorseTransfer}
          tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          approvedBeneficiary="0xc0F28621Ca5454B66E51786003c798154FeBc6EB"
          approvedHolder="0xFC6e365B926166d0D69bF336d03164FB301D6C41"
          handleEndorseTransfer={mockHandleEndorseTransfer}
          transferToNewEscrowState={FormState.UNINITIALIZED}
          onBack={() => {}}
        />
      );
      fireEvent.click(container.getByTestId("endorseTransferBtn"));
      expect(mockHandleEndorseTransfer).toBeCalled();
    });
  });
});
