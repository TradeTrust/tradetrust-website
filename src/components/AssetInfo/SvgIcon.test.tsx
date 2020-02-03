import React from "react";
import { mount } from "enzyme";
import { SvgIcon } from "./SvgIcon";

describe("svgIcon", () => {
  it("should has feather css class ", () => {
    const wrapper = mount(
      <SvgIcon className="">
        <></>
      </SvgIcon>
    );
    expect(wrapper.find("svg").hasClass("feather")).toBe(true);
  });
});
