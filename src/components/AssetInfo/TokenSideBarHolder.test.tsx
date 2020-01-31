import React from "react";
import { mount } from "enzyme";
import TokenSideBarHolder from "./TokenSideBarHolder";

describe("tokenSideBarHolder", () => {
  it("should have 3 fields for Holder and Beneficiary", () => {
    const wrapper = mount(
      <TokenSideBarHolder
        isEqualBeneficiaryAndHolder={true}
        approvedBeneficiaryAddress=""
        registryAddress={"0xA"}
        newHolder={"0xB"}
        handleInputChange={() => {}}
        transferHoldership={() => {}}
        changeBeneficiary={() => {}}
        surrenderDocument={() => {}}
        error={null}
      />
    );
    const inputInstance = wrapper.find("#sec-changebeneficiary input").instance() as any;
    expect(inputInstance.value).toEqual("");
    expect(wrapper.find("section")).toHaveLength(3);
  });

  it("should have 2 fields for Holder with endorsement awaiting", () => {
    const wrapper = mount(
      <TokenSideBarHolder
        isEqualBeneficiaryAndHolder={false}
        approvedBeneficiaryAddress="0xC"
        registryAddress={"0xA"}
        newHolder={"0xB"}
        handleInputChange={() => {}}
        transferHoldership={() => {}}
        changeBeneficiary={() => {}}
        surrenderDocument={() => {}}
        error={null}
      />
    );

    const inputInstance = wrapper.find("#sec-changebeneficiary input").instance() as any;
    expect(inputInstance.value).toEqual("0xC");
    expect(wrapper.find("section")).toHaveLength(2);
  });

  it("should have 1 field for Holder without endorsement awaiting", () => {
    const wrapper = mount(
      <TokenSideBarHolder
        isEqualBeneficiaryAndHolder={false}
        approvedBeneficiaryAddress=""
        registryAddress={"0xA"}
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
