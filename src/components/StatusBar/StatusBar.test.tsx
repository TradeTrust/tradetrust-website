import React from "react";
import { mount } from "enzyme";
import { hexToNumberString } from "web3-utils";
import StatusBar from "./StatusBar";
import ROPSTEN from "./../HomePageContent/Ropsten-Demo.json";
import sampleToken from "./../../test/fixture/sample-token.json";

describe("StatusBar", () => {
  it("should display error if document is not token", async () => {
    const wrapper = mount(<StatusBar document={ROPSTEN} tokenOwner="0xA" tokenError="Can not find token owner" />);
    expect(wrapper.find(".statusbar-title")).toHaveLength(1);
    expect(wrapper.find(".statusbar-title").text()).toStrictEqual("Can not find token owner");
  });

  it("should render correct etherscan link with owner address text", async () => {
    const tokenRegistry = "0x48399Fb88bcD031C556F53e93F690EEC07963Af3";
    const tokenIdDecimal = hexToNumberString("fc714dc7efa164cd0261d511c51903be392c74698daf331f6f5e4c6be0203939");
    const wrapper = mount(<StatusBar document={sampleToken} tokenOwner="0xA" tokenError={null} />);
    expect(wrapper.find(".statusbar-title").text()).toStrictEqual("The document is a transferable record.");
    expect(wrapper.find("a").text()).toStrictEqual("0xA");
    expect(wrapper.find("a").prop("href")).toStrictEqual(
      `https://ropsten.etherscan.io/token/${tokenRegistry}?a=${tokenIdDecimal}`
    );
  });
});
