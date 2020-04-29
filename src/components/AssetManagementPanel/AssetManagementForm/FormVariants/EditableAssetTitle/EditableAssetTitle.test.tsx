import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EditableAssetTitle } from "./EditableAssetTitle";

it("should display both the role and the value when not in editable format", () => {
  const container = render(
    <EditableAssetTitle
      role="Beneficiary"
      value="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      isEditable={false}
      onSetNewValue={() => {}}
      newValue=""
    />
  );
  const beneficiaryLabel = container.getByText("Beneficiary:");
  const beneficiaryText = container.getByText("0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C");

  expect(beneficiaryLabel).not.toBeNull();
  expect(beneficiaryText).not.toBeNull();
});

it("should display both the role and the editable field when in editable format", async () => {
  const container = render(
    <EditableAssetTitle
      role="Beneficiary"
      value="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      isEditable={true}
      onSetNewValue={() => {}}
      newValue="0xE"
    />
  );

  const beneficiaryLabel = container.getByText("Beneficiary:");
  const inputField = container.getByTestId("editable-input-beneficiary");

  expect(inputField).not.toBeNull();
  expect(beneficiaryLabel).not.toBeNull();
});
