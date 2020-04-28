import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AssetManagementActions } from "../AssetManagementContainer";
import { AssetManagementForm } from "./AssetManagementForm";

describe("None", () => {
  it("should display the non-editable beneficiary & holder when the app is in None state", () => {
    const container = render(
      <AssetManagementForm
        isConnectedToWallet={false}
        onConnectToWallet={() => alert("Login to Metamask")}
        formAction={AssetManagementActions.None}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        onSurrender={() => {}}
        surrenderingState="UNINITIALIZED"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F121111111111"
        holder="0xa61B056dA0084a5f391EC1375830732222222222"
      ></AssetManagementForm>
    );
    const beneficiaryComponent = container.getByTestId("Beneficiary");
    const beneficiaryText = container.getByText("0xE94E4f16ad40ADc90C29Dc85b42F121111111111");
    const holderComponent = container.getByTestId("Holder");
    const holderText = container.getByText("0xa61B056dA0084a5f391EC1375830732222222222");

    expect(beneficiaryComponent).not.toBeNull();
    expect(beneficiaryText).not.toBeNull();
    expect(holderComponent).not.toBeNull();
    expect(holderText).not.toBeNull();
  });

  xit("should fire login to browser wallet if user is not logged in", () => {});
  xit("should display the Manage Assets dropdown", () => {});
  xit("should change the state of the application to EndorseBeneficiary when we clicked on EndorseBeneficiary", () => {});
  xit("should change the state of the application to TransferHolder when we clicked on TransferHolder", () => {});
  xit("should change the state of the application to Surrender when we clicked on Surrender", () => {});
});

describe("Endorse Beneficiary", () => {
  xit("should change the state of the application to EndorseBeneficiary when we clicked on EndorseBeneficiary", () => {});
  xit("should display the editable beneficiary & holder when the app is in EndorseBeneficiary state", () => {});
  xit("should have the endorse button and cancel button", () => {});
  xit("should show error if either beneficiary or holder is empty or incomplete when we click endorse", () => {});
  xit("should fire endorse when the button is clicked with the right parameter", () => {});
  xit("should change the state of the application to None when we clicked on Cancel", () => {});
});

describe("Surrender", () => {
  xit("should display the non-editable beneficiary & holder when the app is in Surrender state", () => {});
  xit("should have the surrender button and cancel button", () => {});
  xit("should fire surrender when the button is clicked with the right parameter", () => {});
  xit("should change the state of the application to Surrender when we clicked on Surrender", () => {});
  xit("should change the state of the application to None when we clicked on Cancel", () => {});
});
