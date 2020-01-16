import React from "react";
import { mount } from "enzyme";
import TokenSideBarRole from "./TokenSideBarRole";

describe("tokenSideBarRole", () => {
  it("should show the correct title", () => {
    let wrapper = mount(<TokenSideBarRole isHolder={true} />);
    expect(wrapper.find("h4").text()).toStrictEqual("Holder");

    wrapper = mount(<TokenSideBarRole isHolder={false} />);
    expect(wrapper.find("h4").text()).toStrictEqual("Beneficiary");
  });
});
