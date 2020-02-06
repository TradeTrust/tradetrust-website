import React from "react";
import { mount } from "enzyme";
import { TokenErrorMessage } from "./TokenErrorMessage";

describe("tokenErrorMessage", () => {
  it("should show the correct text color", () => {
    const wrapper = mount(<TokenErrorMessage errorMessage="" />);
    expect(wrapper.find(".message").hasClass("message-error")).toBe(true);
  });
});
