import React from "react";
import { mount } from "enzyme";
import TokenSideBarField from "./TokenSideBarField";

describe("tokenSideBarField", () => {
  it("should show the correct title, button text and contain 1 button", () => {
    const wrapper = mount(
      <TokenSideBarField id="" title="Transfer Holdership" label="Transfer" handleClick={() => {}} />
    );
    expect(wrapper.find("h4").text()).toStrictEqual("Transfer Holdership");
    expect(wrapper.find("button").text()).toStrictEqual("Transfer");
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("should show the correct color button", () => {
    let wrapper = mount(<TokenSideBarField id="" title="" label="" status="danger" handleClick={() => {}} />);
    expect(wrapper.find("button").hasClass("button-danger")).toBe(true);

    wrapper = mount(<TokenSideBarField id="" title="" label="" status="success" handleClick={() => {}} />);
    expect(wrapper.find("button").hasClass("button-success")).toBe(true);
  });
});
