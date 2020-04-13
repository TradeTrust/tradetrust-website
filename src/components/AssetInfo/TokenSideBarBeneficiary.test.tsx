import React from "react";
import { mount } from "enzyme";
import { EndorseChangeBeneficiary } from "./EndorseChangeBeneficiary";

describe("tokenSideBarBeneficiary", () => {
  it("should have 1 field for Beneficiary", () => {
    const wrapper = mount(
      <EndorseChangeBeneficiary
        setApprovedHolder={() => {}}
        setApprovedBeneficiary={() => {}}
        approvedHolder=""
        approvedBeneficiary=""
        approveChangeBeneficiary={() => {}}
        error={null}
      />
    );
    expect(wrapper.find("section")).toHaveLength(1);
  });
});
