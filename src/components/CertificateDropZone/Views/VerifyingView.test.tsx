import { mount } from "enzyme";
import React from "react";
import { VerifyingView } from "./VerifyingView";

describe("defaultView", () => {
  it("should display correct text while verifying document", () => {
    const wrapper = mount(<VerifyingView />);
    expect(wrapper.find("[data-testid='verifying-document']").text()).toStrictEqual("Verifying Document...");
  });
});
