import React from "react";
import { mount } from "enzyme";
import TokenSideBarHolder from "./TokenSideBarHolder";

describe("tokenSideBarHolder", () => {
  it("should have 3 fields for Holder and Beneficiary", () => {
    const wrapper = mount(
      <TokenSideBarHolder
        isEqualBeneficiaryAndHolder={true}
        approvedHolderAddress=""
        approvedBeneficiaryAddress=""
        newHolder={"0xB"}
        handleInputChange={() => {}}
        transferHoldership={() => {}}
        changeBeneficiary={() => {}}
        surrenderDocument={() => {}}
        error={null}
      />
    );
    const holderInstance = wrapper.find("#sec-changebeneficiary input[name='approvedHolder']").instance() as any;
    expect(holderInstance.value).toEqual("");
    const beneficiaryInstance = wrapper
      .find("#sec-changebeneficiary input[name='approvedBeneficiary']")
      .instance() as any;
    expect(beneficiaryInstance.value).toEqual("");
    expect(wrapper.find("section")).toHaveLength(3);
  });

  it("should have 2 fields for Holder with endorsement awaiting", () => {
    const wrapper = mount(
      <TokenSideBarHolder
        isEqualBeneficiaryAndHolder={false}
        approvedHolderAddress="0xC"
        approvedBeneficiaryAddress="0xD"
        newHolder={"0xB"}
        handleInputChange={() => {}}
        transferHoldership={() => {}}
        changeBeneficiary={() => {}}
        surrenderDocument={() => {}}
        error={null}
      />
    );

    const holderInstance = wrapper.find("#sec-changebeneficiary input[name='approvedHolder']").instance() as any;
    expect(holderInstance.value).toEqual("0xC");
    const beneficiaryInstance = wrapper
      .find("#sec-changebeneficiary input[name='approvedBeneficiary']")
      .instance() as any;
    expect(beneficiaryInstance.value).toEqual("0xD");
    expect(wrapper.find("section")).toHaveLength(2);
  });

  it("should have 1 field for Holder without endorsement awaiting", () => {
    const wrapper = mount(
      <TokenSideBarHolder
        isEqualBeneficiaryAndHolder={false}
        approvedHolderAddress=""
        approvedBeneficiaryAddress=""
        newHolder={"0xB"}
        handleInputChange={() => {}}
        transferHoldership={() => {}}
        changeBeneficiary={() => {}}
        surrenderDocument={() => {}}
        error={null}
      />
    );
    expect(wrapper.find("section")).toHaveLength(1);
  });
});
