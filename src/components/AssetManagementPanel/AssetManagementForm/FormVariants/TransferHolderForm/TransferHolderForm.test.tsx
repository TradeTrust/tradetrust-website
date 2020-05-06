import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { TransferHolderForm } from "./TransferHolderForm";

describe("Transfer Holder", () => {
  it("should display the static beneficiary & editable holder when the app is in TransferHolder state", () => {
    const container = render(
      <TransferHolderForm
        formAction={AssetManagementActions.TransferHolder}
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        handleTransfer={() => {}}
        holderTransferringState=""
      />
    );

    const beneficiaryComponent = container.getByTestId("asset-title-beneficiary");
    const beneficiaryText = container.getByText("0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C");
    const holderComponent = container.getByTestId("editable-input-holder");

    expect(beneficiaryComponent).not.toBeNull();
    expect(beneficiaryText).not.toBeNull();
    expect(holderComponent).not.toBeNull();
  });

  it("should have the transfer holder button and cancel button", () => {
    const container = render(
      <TransferHolderForm
        formAction={AssetManagementActions.TransferHolder}
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        handleTransfer={() => {}}
        holderTransferringState=""
      />
    );

    expect(container.queryByTestId("cancelTransferBtn")).not.toBeNull();
    expect(container.queryByTestId("transferBtn")).not.toBeNull();
  });

  it("should change the state of the application to None when we clicked on Cancel", () => {
    const mockOnSetFormAction = jest.fn();

    const container = render(
      <TransferHolderForm
        formAction={AssetManagementActions.TransferHolder}
        onSetFormAction={mockOnSetFormAction}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        handleTransfer={() => {}}
        holderTransferringState=""
      />
    );

    fireEvent.click(container.getByTestId("cancelTransferBtn"));
    expect(mockOnSetFormAction).toHaveBeenCalled();
  });

  it("should disable transfer button when holder is empty", () => {
    const mockHandleTransfer = jest.fn();

    const container = render(
      <TransferHolderForm
        formAction={AssetManagementActions.TransferHolder}
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        handleTransfer={mockHandleTransfer}
        holderTransferringState=""
      />
    );

    fireEvent.click(container.getByTestId("transferBtn"));
    expect(mockHandleTransfer).not.toHaveBeenCalled();
  });

  it("should show error when changeHolder return error holderState", () => {
    const container = render(
      <TransferHolderForm
        formAction={AssetManagementActions.TransferHolder}
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        handleTransfer={() => {}}
        holderTransferringState="ERROR"
      />
    );

    const hasError = container.getByTestId("error-msg");
    expect(hasError).not.toBeNull();
  });
});
