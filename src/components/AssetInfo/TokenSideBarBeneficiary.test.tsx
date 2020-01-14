import React from "react";
import { mount } from "enzyme";
import TokenSideBarBeneficiary from "./TokenSideBarBeneficiary";

describe("tokenSideBarBeneficiary", () => {
  it("should have 1 correct field for Beneficiary", () => {
    const wrapper = mount(<TokenSideBarBeneficiary />);
    expect(wrapper.text()).toMatch(/Allow Transfer/);
    expect(wrapper.find("section")).toHaveLength(1);
  });
});
