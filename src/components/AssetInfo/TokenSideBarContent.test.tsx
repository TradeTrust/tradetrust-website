import React from "react";
import { mount } from "enzyme";
import TokenSideBarContent from "./TokenSideBarContent";

jest.mock("react-redux", () => ({
  useSelector: () => ({
    metamaskNotFound: false,
    networkIdVerbose: "ropsten"
  })
}));

describe("tokenSideBarContent", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  it("should render TokenSideBarHolder view", () => {
    const wrapper = mount(
      <TokenSideBarContent adminAddress="0xA" holderAddress="0xA" beneficiaryAddress="" registryAddress="" />
    );
    expect(wrapper.find("TokenSideBarHolder")).toHaveLength(1);
  });

  it("should render TokenSideBarBeneficiary view", () => {
    const wrapper = mount(
      <TokenSideBarContent adminAddress="0xA" holderAddress="" beneficiaryAddress="0xA" registryAddress="" />
    );
    expect(wrapper.find("TokenSideBarBeneficiary")).toHaveLength(1);
  });

  it("should render TokenSideBarBeneficiary view", () => {
    const wrapper = mount(
      <TokenSideBarContent adminAddress="0xA" holderAddress="" beneficiaryAddress="0xC" registryAddress="" />
    );
    expect(wrapper.find("TokenSideBarNoMatch")).toHaveLength(1);
  });
});
