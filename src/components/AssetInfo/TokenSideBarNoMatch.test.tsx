import React from "react";
import { mount } from "enzyme";
import TokenSideBarNoMatch from "./TokenSideBarNoMatch";

describe("TokenSideBarNoMatch", () => {
  const errorType = { accessDenied: false, networkMismatch: false, metamaskNotFound: false };
  it("should show the correct no match message", () => {
    const error = { ...errorType, ...{ accessDenied: true } };
    const wrapper = mount(
      <TokenSideBarNoMatch errorType={error}>
        <></>
      </TokenSideBarNoMatch>
    );
    expect(wrapper.find("h4").text()).toStrictEqual("Oops!");
    expect(wrapper.find("p").text()).toStrictEqual("It seems that you do not have access to manage assets.");
  });

  it("should show the correct no network match message", () => {
    const error = { ...errorType, ...{ networkMismatch: true } };
    const wrapper = mount(
      <TokenSideBarNoMatch errorType={error}>
        <></>
      </TokenSideBarNoMatch>
    );
    expect(wrapper.find("h4").text()).toStrictEqual("Oops!");
    expect(wrapper.find("p").text()).toStrictEqual(
      "Metamask network is different than website network. Please change the metamask network."
    );
  });

  it("should show the correct no match message", () => {
    const error = { ...errorType, ...{ metamaskNotFound: true } };
    const wrapper = mount(
      <TokenSideBarNoMatch errorType={error}>
        <></>
      </TokenSideBarNoMatch>
    );
    expect(wrapper.find("h4").text()).toStrictEqual("Oops!");
    expect(wrapper.find("p").text()).toStrictEqual("Metamask not found.");
  });
});
