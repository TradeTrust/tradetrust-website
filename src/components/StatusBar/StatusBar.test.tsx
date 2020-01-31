import React from "react";
import { shallow } from "enzyme";
import { hexToNumberString } from "web3-utils";
import StatusBar from "./StatusBar";
import sampleToken from "./../../test/fixture/sample-token.json";

describe("StatusBar", () => {
  it("should render correct etherscan link with owner address text", async () => {
    const tokenRegistry = "0x48399Fb88bcD031C556F53e93F690EEC07963Af3";
    const tokenIdDecimal = hexToNumberString("0xfc714dc7efa164cd0261d511c51903be392c74698daf331f6f5e4c6be0203939");
    const wrapper = shallow(<StatusBar document={sampleToken} />);
    expect(wrapper.find(".statusbar-title").text()).toStrictEqual("The document is a transferable record.");
    expect(wrapper.find("a").prop("href")).toStrictEqual(
      `https://ropsten.etherscan.io/token/${tokenRegistry}?a=${tokenIdDecimal}`
    );
  });
});
