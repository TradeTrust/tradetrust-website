import React from "react";
import { mount } from "enzyme";
import TokenSideBarButton from "./TokenSideBarButton";

describe("tokenSideBarButton", () => {
  it("test click event", () => {
    const mockCallBack = jest.fn();
    const wrapper = mount(<TokenSideBarButton label="" status="" handleClick={mockCallBack} />);
    wrapper.find("button").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
