import React from "react";
import { mount } from "enzyme";
import TokenSideBarNoMatch from "./TokenSideBarNoMatch";

describe("TokenSideBarNoMatch", () => {
  it("should show the correct no match message", () => {
    const wrapper = mount(<TokenSideBarNoMatch />);
    expect(wrapper.find("h4").text()).toStrictEqual("Oops!");
    expect(wrapper.find("p").text()).toStrictEqual("It seems that you do not have access to manage assets.");
  });
});
