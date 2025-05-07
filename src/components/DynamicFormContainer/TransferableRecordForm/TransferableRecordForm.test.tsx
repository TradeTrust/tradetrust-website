import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { TransferableRecordForm } from "./TransferableRecordForm";

describe("transferableRecordForm", () => {
  it("should display the UI accordingly when bene and holder were passed in", () => {
    render(
      <TransferableRecordForm
        beneficiaryAddress=""
        holderAddress=""
        setBeneficiaryAddress={() => {}}
        setHolderAddress={() => {}}
        remarks=""
        setRemarks={() => {}}
      />
    );

    expect(screen.queryAllByText("Owner Wallet Address")).toHaveLength(1);
    expect(screen.queryAllByTestId("transferable-record-beneficiary-input")).not.toBeNull();
    expect(screen.queryAllByText("Holder Wallet Address")).toHaveLength(1);
    expect(screen.queryAllByTestId("transferable-record-holder-input")).not.toBeNull();
    expect(screen.queryAllByText("Remarks")).toHaveLength(1);
    expect(screen.queryAllByTestId("transferable-record-remarks-input")).not.toBeNull();
  });

  it("should fire 'setBeneAddress' onChange", () => {
    const mockSetBeneficiaryAddress = jest.fn();
    render(
      <TransferableRecordForm
        beneficiaryAddress=""
        holderAddress=""
        setBeneficiaryAddress={mockSetBeneficiaryAddress}
        setHolderAddress={() => {}}
        remarks=""
        setRemarks={() => {}}
      />
    );

    fireEvent.change(screen.getByTestId("transferable-record-beneficiary-input"), {
      target: { value: "foo" },
    });
    expect(mockSetBeneficiaryAddress).toHaveBeenCalledTimes(1);
  });

  it("should fire 'setHolderAddress' onChange", () => {
    const mockSetHolderAddress = jest.fn();
    render(
      <TransferableRecordForm
        beneficiaryAddress=""
        holderAddress=""
        setBeneficiaryAddress={() => {}}
        setHolderAddress={mockSetHolderAddress}
        remarks=""
        setRemarks={() => {}}
      />
    );

    fireEvent.change(screen.getByTestId("transferable-record-holder-input"), {
      target: { value: "foo" },
    });
    expect(mockSetHolderAddress).toHaveBeenCalledTimes(1);
  });

  it("should fire 'setRemarks' onChange", () => {
    const mockSetRemarks = jest.fn();
    render(
      <TransferableRecordForm
        beneficiaryAddress=""
        holderAddress=""
        setBeneficiaryAddress={() => {}}
        setHolderAddress={() => {}}
        remarks=""
        setRemarks={mockSetRemarks}
      />
    );

    fireEvent.change(screen.getByTestId("transferable-record-remarks-input"), {
      target: { value: "foo" },
    });
    expect(mockSetRemarks).toHaveBeenCalledTimes(1);
  });
});
