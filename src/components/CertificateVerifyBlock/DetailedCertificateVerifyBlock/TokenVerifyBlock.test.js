import React from "react";
import { mount } from "enzyme";
import { hexToNumberString } from "web3-utils";
import TokenVerifyBlock from "./TokenVerifyBlock";
import ROPSTEN from "../../HomePageContent/Ropsten-Demo.json";
import sampleToken from "../../../test/fixture/sample-token.json";

const tokenOnwer = "0xA";
const tokenError = "Can not find token owner";

describe("tokenVerifyBlock", () => {
  it("should display error if document is not token", async () => {
    const wrapper = mount(<TokenVerifyBlock document={ROPSTEN} tokenOwner={tokenOnwer} tokenError={tokenError} />);
    expect(wrapper.find(".text-danger")).toHaveLength(1);
    expect(wrapper.find(".text-danger").text()).toStrictEqual(tokenError);
  });

  it("should render correct etherscan link with owner address text", async () => {
    const tokenRegistry = "0x48399Fb88bcD031C556F53e93F690EEC07963Af3";
    const tokenIdDecimal = hexToNumberString("fc714dc7efa164cd0261d511c51903be392c74698daf331f6f5e4c6be0203939");
    const wrapper = mount(<TokenVerifyBlock document={sampleToken} tokenOwner={tokenOnwer} tokenError={null} />);
    expect(
      wrapper
        .find("div")
        .at(0)
        .text()
    ).toStrictEqual("The document is a transferable record.");
    expect(wrapper.find("a").text()).toStrictEqual("0xA");
    expect(wrapper.find("a").prop("href")).toStrictEqual(
      `https://ropsten.etherscan.io/token/${tokenRegistry}?a=${tokenIdDecimal}`
    );
  });
});
