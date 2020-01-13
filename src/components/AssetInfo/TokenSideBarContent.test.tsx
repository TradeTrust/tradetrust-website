import React from "react";
import { mount } from "enzyme";
import TokenSideBarContent from "./TokenSideBarContent";
import TokenSideBarHolder from "./TokenSideBarHolder";
import TokenSideBarBeneficiary from "./TokenSideBarBeneficiary";

describe("tokenSideBarContent", () => {
  it("should render <TokenSideBarHolder /> view", () => {
    const wrapper = mount(
      <TokenSideBarContent adminAddress="0xA" holderAddress="0xA" beneficiaryAddress="" approvedBeneficiaryAddress="" />
    );
    expect(
      wrapper.containsMatchingElement(
        <TokenSideBarHolder isEqualBeneficiaryAndHolder={false} approvedBeneficiaryAddress="" />
      )
    ).toEqual(true);
  });

  it("should render <TokenSideBarBeneficiary /> view", () => {
    const wrapper = mount(
      <TokenSideBarContent adminAddress="0xA" holderAddress="" beneficiaryAddress="0xA" approvedBeneficiaryAddress="" />
    );
    expect(wrapper.containsMatchingElement(<TokenSideBarBeneficiary />)).toEqual(true);
  });
});
