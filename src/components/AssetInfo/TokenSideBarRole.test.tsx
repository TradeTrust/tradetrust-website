import React from "react";
import { mount } from "enzyme";
import TokenSideBarRole from "./TokenSideBarRole";

describe("tokenSideBarRole", () => {
  it("should show the correct title", () => {
    let wrapper = mount(<TokenSideBarRole userRole="Holder" />);
    expect(wrapper.find("h4").text()).toStrictEqual("Holder");

    wrapper = mount(<TokenSideBarRole userRole="Beneficiary" />);
    expect(wrapper.find("h4").text()).toStrictEqual("Beneficiary");

    wrapper = mount(<TokenSideBarRole userRole="Holder and Beneficiary" />);
    expect(wrapper.find("h4").text()).toStrictEqual("Holder and Beneficiary");
  });
});
