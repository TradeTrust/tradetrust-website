import React from "react";
import { shallow } from "enzyme";
import TokenSidebarRole from "./TokenSidebarRole";

describe("tokenSideBarRole", () => {
  it("renders Holder as role title", () => {
    const wrapper = shallow(<TokenSidebarRole isHolder={true} />);

    expect(wrapper.find("h4").text()).toStrictEqual("Holder");
  });

  it("renders Beneficiary as role title", () => {
    const wrapper = shallow(<TokenSidebarRole isHolder={false} />);

    expect(wrapper.find("h4").text()).toStrictEqual("Beneficiary");
  });
});
