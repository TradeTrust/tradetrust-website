import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import DetailedCertificateVerifyBlock from "./";
import ROPSTEN from "../../HomePageContent/Ropsten-Demo.json";
import TokenRegistry from "../../../test/fixture/tokenRegistry.json";

describe("detailedCertificateVerifyBlock", () => {
  it("render document is token", async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<DetailedCertificateVerifyBlock verificationStatus={{ valid: true }} document={TokenRegistry} />);
    });
    wrapper.setProps();
    expect(wrapper.find("h5").text()).toStrictEqual("Details");
    expect(wrapper.find("TokenVerifyBlock")).toHaveLength(1);
    expect(wrapper.find("CertificateVerifyCheck")).toHaveLength(1);
  });

  it("doesnt render TokenVerifyBlock if document is not token", async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<DetailedCertificateVerifyBlock verificationStatus={{ valid: true }} document={ROPSTEN} />);
    });
    wrapper.setProps();
    expect(wrapper.find("TokenVerifyBlock")).toHaveLength(0);
    expect(wrapper.find("CertificateVerifyCheck")).toHaveLength(1);
  });
});
