import React from "react";
import { shallow } from "enzyme";
import TokenSideBarRole from "./TokenSideBarRole";

describe("tokenSideBarRole", () => {
  it("renders Holder as role title", () => {
    const wrapper = shallow(<TokenSideBarRole isHolder={true} />);

    expect(wrapper.find("h4").text()).toStrictEqual("Holder");
  });

  it("renders Beneficiary as role title", () => {
    const wrapper = shallow(<TokenSideBarRole isHolder={false} />);

    expect(wrapper.find("h4").text()).toStrictEqual("Beneficiary");
  });
});
