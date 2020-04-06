import React from "react";
import { mount } from "enzyme";
import { VerifyingView } from "./VerifyingView";

describe("defaultView", () => {
  it("should display correct text while verifying document", () => {
    const wrapper = mount(<VerifyingView />);
    expect(wrapper.find(".m-3").text()).toStrictEqual("Verifying Document...");
  });
});
