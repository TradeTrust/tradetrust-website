import React from "react";
import { mount } from "enzyme";
import TokenSideBarRole from "./TokenSideBarRole";

describe("tokenSideBarRole", () => {
  it("should show the correct title", () => {
    let wrapper = mount(<TokenSideBarRole userWalletAddress="0xA" holderAddress="0xA" beneficiaryAddress="0xB" />);
    expect(wrapper.find("h4").text()).toStrictEqual("Holder");

    wrapper = mount(<TokenSideBarRole userWalletAddress="0xB" holderAddress="0xA" beneficiaryAddress="0xB" />);
    expect(wrapper.find("h4").text()).toStrictEqual("Beneficiary");

    wrapper = mount(<TokenSideBarRole userWalletAddress="0xA" holderAddress="0xA" beneficiaryAddress="0xA" />);
    expect(wrapper.find("h4").text()).toStrictEqual("Holder and Beneficiary");
  });
});
