import React from "react";
import { mount } from "enzyme";
import { provider } from "@openzeppelin/test-environment";
import TokenSideBarContent from "./TokenSideBarContent";
import { ethers, providers } from "ethers";
import { useInjectedProvider } from "../../common/hooks/useInjectedProvider";

jest.mock("../../common/hooks/useInjectedProvider");

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

  let web3Provider: providers.Web3Provider;
  beforeAll(async () => {
    web3Provider = new ethers.providers.Web3Provider(provider as any);
    (useInjectedProvider as jest.Mock).mockReturnValue({ web3Provider });
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
