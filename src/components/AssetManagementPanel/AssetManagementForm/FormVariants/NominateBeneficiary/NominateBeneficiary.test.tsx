import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { FormState } from "../../../../../constants/FormState";
import { AssetManagementActions } from "../../../AssetManagementActions";
import { NominateBeneficiaryForm } from "./NominateBeneficiary";

describe("Nominate Owner", () => {
  it("should display the editable nominee & static holder when the app is in NominateBeneficiary state", async () => {
    await act(async () => {
      const container = render(
        <NominateBeneficiaryForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.NominateBeneficiary}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          handleNomination={() => {}}
          nominationState={FormState.UNINITIALIZED}
        />
      );

      const beneficiaryComponent = container.getByTestId("editable-input-owner");
      const holderComponent = container.getByTestId("non-editable-input-holder");

      expect(beneficiaryComponent).not.toBeNull();
      expect(holderComponent).not.toBeNull();
    });
  });

  it("should have the nominate button and cancel button", async () => {
    await act(async () => {
      const container = render(
        <NominateBeneficiaryForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.NominateBeneficiary}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          handleNomination={() => {}}
          nominationState={FormState.UNINITIALIZED}
        />
      );

      expect(container.queryByTestId("cancelNominationBtn")).not.toBeNull();
      expect(container.queryByTestId("nominationBtn")).not.toBeNull();
    });
  });

  it("should change the state of the application to None when we clicked on Cancel", async () => {
    await act(async () => {
      const mockOnSetFormAction = jest.fn();

      const container = render(
        <NominateBeneficiaryForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.NominateBeneficiary}
          setFormActionNone={mockOnSetFormAction}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          handleNomination={() => {}}
          nominationState={FormState.UNINITIALIZED}
        />
      );

      fireEvent.click(container.getByTestId("cancelNominationBtn"));
      expect(mockOnSetFormAction).toHaveBeenCalled();
    });
  });

  it("should show error when nominateBeneficiary return error nominationState", async () => {
    await act(async () => {
      const { getAllByText } = render(
        <NominateBeneficiaryForm
          setShowEndorsementChain={() => {}}
          formAction={AssetManagementActions.NominateBeneficiary}
          setFormActionNone={() => {}}
          tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
          beneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
          holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
          handleNomination={() => {}}
          nominationState={FormState.ERROR}
        />
      );

      expect(getAllByText("Unidentified address. Please check and input again.", { exact: false })).not.toBeNull();
    });
  });
});
