import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { FormState } from "../../../../../constants/FormState";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { EndorseTransferForm } from "./EndorseTransferForm";

describe("Endorse Transfer to nominated beneficiary and holder", () => {
  it("should display the editable owner and editable holder address when in EndorseTransfer State", async () => {
    await act(async () => {
      const mockHandleEndorseTransfer = jest.fn();

      const container = render(
        <EndorseTransferForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.EndorseTransfer}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          holder="0xFC6e365B926166d0D69bF336d03164FB301D6C41"
          handleEndorseTransfer={mockHandleEndorseTransfer}
          transferOwnersState={FormState.UNINITIALIZED}
          setFormActionNone={() => {}}
        />
      );

      const ownerField = container.getByTestId("editable-input-owner");
      const holderField = container.getByTestId("editable-input-holder");
      expect(ownerField).toHaveValue("0xFC6e365B926166d0D69bF336d03164FB301D6C41");
      expect(holderField).toHaveValue("0xFC6e365B926166d0D69bF336d03164FB301D6C41");
    });
  });

  it("should disable nominate button when holder/owner is empty", async () => {
    await act(async () => {
      const mockHandleEndorseTransfer = jest.fn();

      const container = render(
        <EndorseTransferForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.EndorseTransfer}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          holder=""
          handleEndorseTransfer={mockHandleEndorseTransfer}
          transferOwnersState={FormState.UNINITIALIZED}
          setFormActionNone={() => {}}
        />
      );

      fireEvent.click(container.getByTestId("endorseTransferBtn"));
      expect(mockHandleEndorseTransfer).not.toHaveBeenCalled();
    });
  });

  it("should fire the function to handle endorse transfer when 'endorse' button is clicked", async () => {
    await act(async () => {
      const mockHandleEndorseTransfer = jest.fn();

      const container = render(
        <EndorseTransferForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.EndorseTransfer}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          holder="0xFC6e365B926166d0D69bF336d03164FB301D6C41"
          handleEndorseTransfer={mockHandleEndorseTransfer}
          transferOwnersState={FormState.UNINITIALIZED}
          setFormActionNone={() => {}}
        />
      );

      const holderField = container.getByTestId("editable-input-holder");
      const ownerField = container.getByTestId("editable-input-owner");
      expect(holderField).toHaveValue("0xFC6e365B926166d0D69bF336d03164FB301D6C41");
      expect(ownerField).toHaveValue("0xFC6e365B926166d0D69bF336d03164FB301D6C41");
      await fireEvent.change(holderField, { target: { value: "0xc0F28621Ca5454B66E51786003c798154FeBc6EB" } });
      await fireEvent.change(ownerField, { target: { value: "0xc0F28621Ca5454B66E51786003c798154FeBc6EB" } });
      expect(holderField).toHaveValue("0xc0F28621Ca5454B66E51786003c798154FeBc6EB");
      expect(ownerField).toHaveValue("0xc0F28621Ca5454B66E51786003c798154FeBc6EB");
      fireEvent.click(container.getByTestId("endorseTransferBtn"));
      expect(mockHandleEndorseTransfer).toBeCalled();
      expect(mockHandleEndorseTransfer).toHaveBeenCalledWith(
        "0xc0F28621Ca5454B66E51786003c798154FeBc6EB",
        "0xc0F28621Ca5454B66E51786003c798154FeBc6EB"
      );
    });
  });
});
