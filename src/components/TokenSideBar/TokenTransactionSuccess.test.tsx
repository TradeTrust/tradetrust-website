import React from "react";
import { mount } from "enzyme";
import TokenTransactionSuccess from "./TokenTransactionSuccess";

describe("tokenTransactionSuccess", () => {
  it("should show the correct text color", () => {
    const wrapper = mount(<TokenTransactionSuccess hash="" message="" />);
    expect(wrapper.find(".message").hasClass("message-success")).toBe(true);
  });
});
