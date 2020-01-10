import React from "react";
import { mount } from "enzyme";
import TokenSideBarContent from "./TokenSideBarContent";

describe("tokenSideBarContent", () => {
  it("should have 2 fields for Holder with no endorsement awaiting", () => {
    const wrapper = mount(<TokenSideBarContent isHolder={true} />);
    expect(wrapper.find("section")).toHaveLength(2);
  });

  it("should have 3 fields for Holder with endorsement awaiting", () => {
    const wrapper = mount(<TokenSideBarContent isHolder={true} isHolderChangeBeneficiary={true} />);
    expect(wrapper.find("section")).toHaveLength(3);
  });

  it("should have 1 field for Beneficiary", () => {
    const wrapper = mount(<TokenSideBarContent isHolder={false} />);
    expect(wrapper.find("section")).toHaveLength(1);
  });
});
