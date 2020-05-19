import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { FormState } from "../../../../../constants/FormState";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { EndorseBeneficiaryForm } from "./EndorseBeneficiary";

describe("Endorse Beneficiary", () => {
  it("should display the editable beneficiary & static holder when the app is in EndorseBeneficiary state", () => {
    const container = render(
      <EndorseBeneficiaryForm
        formAction={AssetManagementActions.EndorseBeneficiary}
        onBack={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        handleTransfer={() => {}}
        beneficiaryEndorseState={FormState.UNINITIALIZED}
      />
    );

    const beneficiaryComponent = container.getByTestId("editable-input-beneficiary");
    const holderComponent = container.getByTestId("editable-input-holder");

    expect(beneficiaryComponent).not.toBeNull();
    expect(holderComponent).not.toBeNull();
  });

  it("should have the endorse button and cancel button", () => {
    const container = render(
      <EndorseBeneficiaryForm
        formAction={AssetManagementActions.EndorseBeneficiary}
        onBack={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        handleTransfer={() => {}}
        beneficiaryEndorseState={FormState.UNINITIALIZED}
      />
    );

    expect(container.queryByTestId("cancelEndorseBtn")).not.toBeNull();
    expect(container.queryByTestId("endorseBtn")).not.toBeNull();
  });

  it("should change the state of the application to None when we clicked on Cancel", () => {
    const mockOnSetFormAction = jest.fn();

    const container = render(
      <EndorseBeneficiaryForm
        formAction={AssetManagementActions.EndorseBeneficiary}
        onBack={mockOnSetFormAction}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        handleTransfer={() => {}}
        beneficiaryEndorseState={FormState.UNINITIALIZED}
      />
    );

    fireEvent.click(container.getByTestId("cancelEndorseBtn"));
    expect(mockOnSetFormAction).toHaveBeenCalled();
  });

  it("should disable endorse button when holder is empty", () => {
    const mockHandleEndorse = jest.fn();

    const container = render(
      <EndorseBeneficiaryForm
        formAction={AssetManagementActions.EndorseBeneficiary}
        onBack={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        handleTransfer={mockHandleEndorse}
        beneficiaryEndorseState={FormState.UNINITIALIZED}
      />
    );

    fireEvent.click(container.getByTestId("endorseBtn"));
    expect(mockHandleEndorse).not.toHaveBeenCalled();
  });

  it("should show error when changeBeneficiary return error endorseBeneficiaryState", () => {
    const { getAllByText } = render(
      <EndorseBeneficiaryForm
        formAction={AssetManagementActions.EndorseBeneficiary}
        onBack={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        handleTransfer={() => {}}
        beneficiaryEndorseState={FormState.ERROR}
      />
    );

    expect(getAllByText("Unidentified address. Please check and input again.", { exact: false })).not.toBeNull();
  });
});
