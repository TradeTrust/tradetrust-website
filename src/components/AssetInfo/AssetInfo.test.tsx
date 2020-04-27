import React from "react";
import { mount } from "enzyme";
import { ManageAssetToggle } from "./AssetInfo";

describe("ManageAssetToggleProps", () => {
  it("renders with correct text-", async () => {
    const wrapper = mount(<ManageAssetToggle toggleSidebar={async () => {}} />);
    expect(wrapper.find("#asset-info-etherscan-link").text()).toStrictEqual("Manage Asset");
  });
});
