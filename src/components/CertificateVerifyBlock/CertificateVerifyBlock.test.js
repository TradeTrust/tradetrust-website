import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import CertificateVerifyBlock, { getIdentityVerificationText } from "./CertificateVerifyBlock";
import ROPSTEN from "../HomePageContent/Ropsten-Demo.json";

const identityVerificationStatus = {
  identity: {
    identifiedOnAll: true,
    details: [
      {
        identified: true,
        dns: "tradetrust.io",
        smartContract: "0x48399Fb88bcD031C556F53e93F690EEC07963Af3",
      },
    ],
  },
};

describe("certificate verify block getIdentityVerificationText", () => {
  describe("should return appropriate display text when dns is verified", () => {
    it("when registry is unverified but dns is verified", () => {
      const testValue = [{ registry: false, dns: "abc.com" }];
      expect(getIdentityVerificationText(testValue)).toStrictEqual("Issued by ABC.COM");
    });

    it("should return appropriate display text when multiple dns is verified", () => {
      const testValue = [
        { registry: false, dns: "xyz.com" },
        { registry: false, dns: "demo.com" },
      ];
      expect(getIdentityVerificationText(testValue)).toStrictEqual("Issued by XYZ.COM");
    });
  });
});

describe("certificateVerifyBlock", () => {
  it("should render verify block", async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<CertificateVerifyBlock document={ROPSTEN} verificationStatus={identityVerificationStatus} />);
    });
    wrapper.setProps();
    expect(wrapper.find("SimpleVerifyBlock")).toHaveLength(1);
  });
});
