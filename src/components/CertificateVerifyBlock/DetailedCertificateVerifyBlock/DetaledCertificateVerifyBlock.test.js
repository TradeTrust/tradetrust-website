import React from "react";
import { shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import DetailedCertificateVerifyBlock from ".";
import ROPSTEN from "../../HomePageContent/Ropsten-Demo.json";
import sampleToken from "../../../test/fixture/sample-token.json";

describe("detailedCertificateVerifyBlock", () => {
  it("renders if document is a token", async () => {
    let wrapper;
    await act(async () => {
      wrapper = shallow(<DetailedCertificateVerifyBlock verificationStatus={{ valid: true }} document={sampleToken} />);
    });
    wrapper.setProps();
    expect(wrapper.find("h5").text()).toStrictEqual("Details");
    expect(wrapper.find("TokenVerifyBlock")).toHaveLength(1);
    expect(wrapper.find("CertificateVerifyCheck")).toHaveLength(1);
  });

  it("doesnt render TokenVerifyBlock if document is not token", async () => {
    let wrapper;
    await act(async () => {
      wrapper = shallow(<DetailedCertificateVerifyBlock verificationStatus={{ valid: true }} document={ROPSTEN} />);
    });
    wrapper.setProps();
    expect(wrapper.find("TokenVerifyBlock")).toHaveLength(0);
    expect(wrapper.find("CertificateVerifyCheck")).toHaveLength(1);
  });
});
