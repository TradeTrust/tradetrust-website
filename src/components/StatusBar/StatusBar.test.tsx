import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import StatusBar from "./StatusBar";
import { hexToNumberString } from "web3-utils";
import sampleToken from "./../../test/fixture/sample-token.json";
import { getTokenOwner } from "../../services/token";

jest.mock("../../services/token", () => ({
  ...jest.requireActual("../../services/token"),
  getTokenOwner: jest.fn()
}));

const mockedGetTokenOwner = getTokenOwner as jest.Mock;

describe("StatusBar", () => {
  it("should render correct etherscan link with owner address text", async () => {
    const tokenRegistry = "0x48399Fb88bcD031C556F53e93F690EEC07963Af3";
    const tokenIdDecimal = hexToNumberString("0xfc714dc7efa164cd0261d511c51903be392c74698daf331f6f5e4c6be0203939");

    let wrapper = mount(<></>);
    await act(async () => {
      wrapper = mount(<StatusBar document={sampleToken} />);
    });
    wrapper.setProps({});
    expect(wrapper.find(".statusbar-title").text()).toStrictEqual("The document is a transferable record.");
    expect(wrapper.find("a").prop("href")).toStrictEqual(
      `https://ropsten.etherscan.io/token/${tokenRegistry}?a=${tokenIdDecimal}`
    );
  });

  it("should throw error if can not fetch owner", async () => {
    mockedGetTokenOwner.mockImplementation(() => {
      throw new Error("Cannot find token owner");
    });
    let wrapper = mount(<></>);
    await act(async () => {
      wrapper = mount(<StatusBar document={sampleToken} />);
    });
    wrapper.setProps({});
    expect(wrapper.find(".statusbar-title").text()).toStrictEqual("Cannot find token owner");
  });
});
