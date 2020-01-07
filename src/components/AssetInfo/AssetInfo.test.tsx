import React from "react";
import { mount } from "enzyme";
import { AssetInfo } from "./AssetInfo";

describe("assetInfo", () => {
  it("renders with correct etherscan url", () => {
    const wrapper = mount(<AssetInfo registryAddress="0xa" tokenId="0xff" />);
    expect(wrapper.find("#asset-info-etherscan-link").text()).toStrictEqual("Manage Asset");
    expect(wrapper.find("a").prop("href")).toStrictEqual("https://ropsten.etherscan.io/token/0xa?a=255");
  });
});
