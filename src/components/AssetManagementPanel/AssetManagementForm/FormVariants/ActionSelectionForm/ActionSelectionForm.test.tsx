import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ActionSelectionForm } from "./ActionSelectionForm";

describe("None", () => {
  it("should display the non-editable beneficiary & holder when the app is in None state", () => {
    const container = render(
      <ActionSelectionForm
        isConnectedToWallet={false}
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        canSurrender={false}
        onConnectToWallet={() => alert("Login to Metamask")}
      />
    );
    const beneficiaryComponent = container.getByTestId("Beneficiary");
    const beneficiaryText = container.getByText("0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C");
    const holderComponent = container.getByTestId("Holder");
    const holderText = container.getByText("0xa61B056dA0084a5f391EC137583073096880C2e3");

    expect(beneficiaryComponent).not.toBeNull();
    expect(beneficiaryText).not.toBeNull();
    expect(holderComponent).not.toBeNull();
    expect(holderText).not.toBeNull();
  });

  xit("should fire login to browser wallet if user is not logged in", () => {
    const mockFn = jest.fn();

    const container = render(
      <ActionSelectionForm
        isConnectedToWallet={false}
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        canSurrender={false}
        onConnectToWallet={mockFn}
      />
    );

    fireEvent.click(container.getByTestId("connectToWallet"));
    expect(mockFn).toHaveBeenCalled();
  });

  it("should display the Manage Assets dropdown if user is logged in", () => {
    const container = render(
      <ActionSelectionForm
        isConnectedToWallet={true}
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        canSurrender={false}
        onConnectToWallet={() => alert("Login to Metamask")}
      />
    );

    const manageAssetsDropdown = container.getByTestId("manageAssetsDropdown");
    expect(manageAssetsDropdown).not.toBeNull();
  });

  it("should allow the selection of Surrender if user can surrender", async () => {
    const mockFn = jest.fn();

    const container = render(
      <ActionSelectionForm
        isConnectedToWallet={true}
        onSetFormAction={mockFn}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        canSurrender={true}
        onConnectToWallet={() => alert("Login to Metamask")}
      />
    );
    
    // await act(async() => {
      fireEvent.click(container.getByTestId("clickDropdown"));
    // });
    
    expect(container.queryByTestId("surrenderDropdown")).not.toBeNull();
  });

  it("should not display the selection of Surrender if user cannot surrender", () => {
    const container = render(
      <ActionSelectionForm
        isConnectedToWallet={true}
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        canSurrender={false}
        onConnectToWallet={() => alert("Login to Metamask")}
      />
    );

    expect(container.queryByTestId("SurrenderDropdown")).toBeNull();
  });

  // xit("should change the state of the application to EndorseBeneficiary when we clicked on EndorseBeneficiary", () => {});
  // xit("should change the state of the application to TransferHolder when we clicked on TransferHolder", () => {});
  
  it("should change the state of the application to Surrender when we clicked on Surrender", () => {
    const mockFn = jest.fn();

    const container = render(
      <ActionSelectionForm
        isConnectedToWallet={true}
        onSetFormAction={mockFn}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        canSurrender={true}
        onConnectToWallet={() => alert("Login to Metamask")}
      />
    );

    fireEvent.click(container.getByTestId("clickDropdown"));
    fireEvent.click(container.getByText("Surrender"));
    expect(mockFn).toHaveBeenCalled();
  });
});
