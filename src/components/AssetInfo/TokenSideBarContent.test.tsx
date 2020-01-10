import React from "react";
import { mount } from "enzyme";
import TokenSideBarContent from "./TokenSideBarContent";

describe("tokenSideBarContent", () => {
  it("should have 2 correct fields for Holder with no endorsement awaiting", () => {
    const wrapper = mount(<TokenSideBarContent userRole="Holder" approvedBeneficiaryAddress="" />);
    expect(wrapper.text()).toMatch(/Transfer Ownership/);
    expect(wrapper.text()).toMatch(/Surrender Document/);
    expect(wrapper.find("section")).toHaveLength(2);
  });

  it("should have 3 correct fields for Holder with endorsement awaiting", () => {
    const wrapper = mount(<TokenSideBarContent userRole="Holder" approvedBeneficiaryAddress="0xC" />);
    expect(wrapper.text()).toMatch(/Transfer Ownership/);
    expect(wrapper.text()).toMatch(/Change Beneficiary/);
    expect(wrapper.text()).toMatch(/Surrender Document/);
    expect(wrapper.find("section")).toHaveLength(3);
  });

  it("should have 1 correct field for Beneficiary", () => {
    const wrapper = mount(<TokenSideBarContent userRole="Beneficiary" approvedBeneficiaryAddress="" />);
    expect(wrapper.text()).toMatch(/Allow Transfer/);
    expect(wrapper.find("section")).toHaveLength(1);
  });

  it("should have 3 correct fields for Holder and Beneficiary with no endorsement awaiting", () => {
    const wrapper = mount(<TokenSideBarContent userRole="Holder and Beneficiary" approvedBeneficiaryAddress="" />);
    expect(wrapper.text()).toMatch(/Transfer Ownership/);
    expect(wrapper.text()).toMatch(/Allow Transfer/);
    expect(wrapper.text()).toMatch(/Surrender Document/);
    expect(wrapper.find("section")).toHaveLength(3);
  });

  it("should have 4 correct fields for Holder and Beneficiary with endorsement awaiting", () => {
    const wrapper = mount(<TokenSideBarContent userRole="Holder and Beneficiary" approvedBeneficiaryAddress="0xC" />);
    expect(wrapper.text()).toMatch(/Transfer Ownership/);
    expect(wrapper.text()).toMatch(/Change Beneficiary/);
    expect(wrapper.text()).toMatch(/Allow Transfer/);
    expect(wrapper.text()).toMatch(/Surrender Document/);
    expect(wrapper.find("section")).toHaveLength(4);
  });
});
