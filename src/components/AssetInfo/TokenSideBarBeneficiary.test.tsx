import React from "react";
import { mount } from "enzyme";
import TokenSideBarBeneficiary from "./TokenSideBarBeneficiary";

describe("tokenSideBarBeneficiary", () => {
  it("should have 1 field for Beneficiary", () => {
    const wrapper = mount(
      <TokenSideBarBeneficiary
        handleInputChange={() => {}}
        approvedHolder=""
        approvedBeneficiary=""
        approveChangeBeneficiary={() => {}}
        error={null}
      />
    );
    expect(wrapper.find("section")).toHaveLength(1);
  });
});
