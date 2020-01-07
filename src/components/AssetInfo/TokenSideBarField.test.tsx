import React from "react";
import { mount } from "enzyme";
import TokenSideBarField from "./TokenSideBarField";

describe("tokenSideBarField", () => {
  it("field(Transfer Ownership) to have 1 button", () => {
    const wrapper = mount(<TokenSideBarField title="Transfer Ownership" ctaText="Transfer" />);
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("field(Change Beneficiary) to have 1 button", () => {
    const wrapper = mount(<TokenSideBarField title="Change Beneficiary" ctaText="Change" ctaStatus="success" />);
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("field(Surrender Document) to have 1 button", () => {
    const wrapper = mount(<TokenSideBarField title="Surrender Document" ctaText="Surrender" ctaStatus="danger" />);
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("field(Allow Transfer) to have 1 button", () => {
    const wrapper = mount(<TokenSideBarField title="Allow Transfer" ctaText="Allow" ctaStatus="success" />);
    expect(wrapper.find("button")).toHaveLength(1);
  });
});
