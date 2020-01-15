import React from "react";
import { mount } from "enzyme";
import TokenSideBarHolder from "./TokenSideBarHolder";

describe("tokenSideBarHolder", () => {
  it("should have 3 fields for Holder and Beneficiary with endorsement awaiting", () => {
    const wrapper = mount(
      <TokenSideBarHolder
        isEqualBeneficiaryAndHolder={true}
        isEqualBeneficiaryAndHolderOrHolderOnly={true}
        approvedBeneficiaryAddress="0xC"
      />
    );
    expect(wrapper.find("section")).toHaveLength(3);
  });

  it("should have 2 fields for Holder and Beneficiary without endorsement awaiting", () => {
    const wrapper = mount(
      <TokenSideBarHolder
        isEqualBeneficiaryAndHolder={true}
        isEqualBeneficiaryAndHolderOrHolderOnly={true}
        approvedBeneficiaryAddress=""
      />
    );
    expect(wrapper.find("section")).toHaveLength(2);
  });

  it("should have 2 fields for Holder with endorsement awaiting", () => {
    const wrapper = mount(
      <TokenSideBarHolder
        isEqualBeneficiaryAndHolder={false}
        isEqualBeneficiaryAndHolderOrHolderOnly={true}
        approvedBeneficiaryAddress="0xC"
      />
    );
    expect(wrapper.find("section")).toHaveLength(2);
  });

  it("should have 1 field for Holder", () => {
    const wrapper = mount(
      <TokenSideBarHolder
        isEqualBeneficiaryAndHolder={false}
        isEqualBeneficiaryAndHolderOrHolderOnly={true}
        approvedBeneficiaryAddress=""
      />
    );
    expect(wrapper.find("section")).toHaveLength(1);
  });
});
