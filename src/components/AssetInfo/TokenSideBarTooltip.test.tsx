import React from "react";
import { mount } from "enzyme";
import TokenSideBarTooltip from "./TokenSideBarTooltip";

describe("tokenSideBarTooltip", () => {
  it("should show correct tooltip text for Transfer Holdership", () => {
    const wrapper = mount(<TokenSideBarTooltip id="transferholdership" />);
    expect(wrapper.find("#tooltip-transferholdership p").text()).toStrictEqual(
      "Holdership in TradeTrust is similar to physical possession of a Bill of Lading."
    );
  });

  it("should show correct tooltip text for Change Beneficiary without awaiting endorsement", () => {
    const wrapper = mount(<TokenSideBarTooltip id="changebeneficiary" />);
    expect(wrapper.find("#tooltip-changebeneficiary p").text()).toStrictEqual(
      "Giving up legal ownserhip of the goods to the endorsed beneficiary indicated in Bill of Lading."
    );
  });

  it("should show correct tooltip text for Surrender Document", () => {
    const wrapper = mount(<TokenSideBarTooltip id="surrenderdocument" />);
    expect(wrapper.find("p").text()).toStrictEqual("Return this Bill of Lading to the Shipping Line.");
  });

  it("should show correct tooltip text for Endorse Change of Beneficiary", () => {
    const wrapper = mount(<TokenSideBarTooltip id="approvechangebeneficiary" />);
    expect(wrapper.find("p").text()).toStrictEqual(
      "Allow holder to execute change of beneficiary to the input specified address."
    );
  });
});
