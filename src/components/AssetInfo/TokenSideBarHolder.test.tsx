import React from "react";
import { mount } from "enzyme";
import TokenSideBarHolder from "./TokenSideBarHolder";

describe("tokenSideBarHolder", () => {
  it("should have 3 correct fields for Holder and Beneficiary with endorsement awaiting", () => {
    const wrapper = mount(<TokenSideBarHolder isEqualBeneficiaryAndHolder={true} approvedBeneficiaryAddress="" />);
    expect(wrapper.text()).toMatch(/Transfer Ownership/);
    expect(wrapper.text()).toMatch(/Change Beneficiary/);
    expect(wrapper.text()).toMatch(/Surrender Document/);
    expect(wrapper.find("section")).toHaveLength(3);
  });

  it("should have 2 correct fields for Holder with endorsement awaiting", () => {
    const wrapper = mount(<TokenSideBarHolder isEqualBeneficiaryAndHolder={false} approvedBeneficiaryAddress="0xA" />);
    console.log(wrapper.debug());
    expect(wrapper.text()).toMatch(/Transfer Ownership/);
    expect(wrapper.text()).toMatch(/Change Beneficiary/);
    expect(wrapper.find("section")).toHaveLength(2);
  });

  it("should have 1 correct field for Holder", () => {
    const wrapper = mount(<TokenSideBarHolder isEqualBeneficiaryAndHolder={false} approvedBeneficiaryAddress="" />);
    expect(wrapper.text()).toMatch(/Transfer Ownership/);
    expect(wrapper.find("section")).toHaveLength(1);
  });
});
