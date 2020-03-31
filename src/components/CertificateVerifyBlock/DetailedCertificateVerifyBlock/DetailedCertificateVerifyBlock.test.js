import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import DetailedCertificateVerifyBlock from ".";

describe("detailedCertificateVerifyBlock", () => {
  it("should render when document is token", async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<DetailedCertificateVerifyBlock verificationStatus={{ valid: true }} />);
    });
    wrapper.setProps();
    expect(wrapper.find("h5").text()).toStrictEqual("Details");
    expect(wrapper.find("CertificateVerifyCheck")).toHaveLength(1);
  });
});
