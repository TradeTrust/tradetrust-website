import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import TokenVerifyBlock from "./TokenVerifyBlock";
import ROPSTEN from "../../HomePageContent/Ropsten-Demo.json";
import { getTokenOwner } from "../../../services/token";
jest.mock("../../../services/token", () => ({
  getTokenOwner: jest.fn()
}));

describe("tokenVerifyBlock", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("displays error if document is not token", async () => {
    getTokenOwner.mockImplementation(() => {
      throw new Error("abc");
    });

    let wrapper;
    await act(async () => {
      wrapper = mount(<TokenVerifyBlock document={ROPSTEN} />);
    });
    wrapper.setProps();
    expect(wrapper.find(".text-danger")).toHaveLength(1);
    expect(wrapper.find(".text-danger").text()).toStrictEqual("abc");
  });

  it("displays text with owner", async () => {
    getTokenOwner.mockImplementation(() => "0xA");
    let wrapper;
    await act(async () => {
      wrapper = mount(<TokenVerifyBlock document={ROPSTEN} />);
    });
    wrapper.setProps();
    expect(
      wrapper
        .find("div")
        .at(0)
        .text()
    ).toStrictEqual("The document is a transferable record.");
    expect(
      wrapper
        .find("div")
        .at(1)
        .text()
    ).toStrictEqual("Owned by: 0xA");
  });
});
