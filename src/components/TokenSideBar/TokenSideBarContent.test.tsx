import React from "react";
import { mount } from "enzyme";
import TokenSideBarContent from "./TokenSideBarContent";

describe("tokenSideBarContent", () => {
  // adminAddress === holder
  it("should show holder role, holder view, only 1 correct field", () => {
    const wrapper = mount(
      <TokenSideBarContent adminAddress="0xA" holderAddress="0xA" beneficiaryAddress="" approvedBeneficiaryAddress="" />
    );

    expect(wrapper.find("TokenSideBarHolder section")).toHaveLength(1);
    expect(wrapper.find("#sec-transferholdership h4").text()).toStrictEqual("Transfer Holdership");
    expect(wrapper.find("#sec-transferholdership button").text()).toStrictEqual("Transfer");
  });

  // holderAddress === beneficiaryAddress
  it("should show holder and beneficiary role, holder view, only 3 correct fields", () => {
    const wrapper = mount(
      <TokenSideBarContent
        adminAddress="0xA"
        holderAddress="0xA"
        beneficiaryAddress="0xA"
        approvedBeneficiaryAddress=""
      />
    );

    expect(wrapper.find("TokenSideBarHolder section")).toHaveLength(3);

    expect(wrapper.find("#sec-transferholdership h4").text()).toStrictEqual("Transfer Holdership");
    expect(wrapper.find("#sec-transferholdership button").text()).toStrictEqual("Transfer");

    expect(wrapper.find("#sec-changebeneficiary h4").text()).toStrictEqual("Change Beneficiary");
    expect(wrapper.find("#sec-changebeneficiary button").text()).toStrictEqual("Change");

    expect(wrapper.find("#sec-surrenderdocument h4").text()).toStrictEqual("Surrender Document");
    expect(wrapper.find("#sec-surrenderdocument button").text()).toStrictEqual("Surrender");
  });

  // adminAddress === holderAddress, endorse change of bene exists
  it("should show holder role, holder view, only 2 correct fields", () => {
    const wrapper = mount(
      <TokenSideBarContent
        adminAddress="0xA"
        holderAddress="0xA"
        beneficiaryAddress=""
        approvedBeneficiaryAddress="0xB"
      />
    );

    expect(wrapper.find("TokenSideBarHolder section")).toHaveLength(2);

    expect(wrapper.find("#sec-transferholdership h4").text()).toStrictEqual("Transfer Holdership");
    expect(wrapper.find("#sec-transferholdership button").text()).toStrictEqual("Transfer");

    expect(wrapper.find("#sec-changebeneficiary h4").text()).toStrictEqual("Change Beneficiary");
    expect(wrapper.find("#sec-changebeneficiary button").text()).toStrictEqual("Change");
  });

  // adminAddress === beneficiaryAddress
  it("should show bene role, bene view, only 1 correct field", () => {
    const wrapper = mount(
      <TokenSideBarContent adminAddress="0xA" holderAddress="" beneficiaryAddress="0xA" approvedBeneficiaryAddress="" />
    );

    expect(wrapper.find("TokenSideBarBeneficiary section")).toHaveLength(1);

    expect(wrapper.find("#sec-approvechangebeneficiary h4").text()).toStrictEqual("Endorse Change of Beneficiary");
    expect(wrapper.find("#sec-approvechangebeneficiary button").text()).toStrictEqual("Endorse");
  });

  // adminAddress !== beneficiaryAddress and adminAddress !== holderAddress
  it("should show no match view, no access text", () => {
    const wrapper = mount(
      <TokenSideBarContent adminAddress="0xA" holderAddress="" beneficiaryAddress="" approvedBeneficiaryAddress="" />
    );
    expect(wrapper.find("TokenSideBarNoMatch")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarNoMatch h4").text()).toStrictEqual("Oops!");
    expect(wrapper.find("TokenSideBarNoMatch p").text()).toStrictEqual(
      "It seems that you do not have access to manage assets."
    );
  });
});
