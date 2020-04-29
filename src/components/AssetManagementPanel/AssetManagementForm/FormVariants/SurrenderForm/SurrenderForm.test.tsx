import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SurrenderForm } from "./SurrenderForm";
import { AssetManagementActions } from "../../../AssetManagementContainer";

describe("Surrender", () => {
  xit("should display the non-editable beneficiary & holder when the app is in Surrender state", () => {});
  it("should have the surrender button and cancel button", () => {
    const container = render(
      <SurrenderForm
        formAction={AssetManagementActions.Surrender}
        onSetFormAction={() => {}}
        tokenId="0x5d063d51d222c0f5f84fbe18f8e5102859a262f5e1b50148131282d0ebde0066"
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        surrenderingState="UNINITIALIZED"
        handleFormAction={() => {}}
      />
    );

    expect(container.queryByTestId("cancelSurrenderBtn")).not.toBeNull();
    expect(container.queryByTestId("surrenderBtn")).not.toBeNull();
  });
  xit("should fire surrender when the button is clicked with the right parameter", () => {});
  xit("should change the state of the application to Surrender when we clicked on Surrender", () => {});
  xit("should change the state of the application to None when we clicked on Cancel", () => {});
  xit("should show a info to confirm the transaction when the surrender state is in INITIALIZED", () => {});
  xit("should show a loader when the surrender state is in PENDING_CONFIRMATION", () => {});
  xit("should disable surrender button when the surrender state is in INITIALIZED or PENDING_CONFIRMATION", () => {});
});
