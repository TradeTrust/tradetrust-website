import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import DetailedCertificateVerifyBlock from ".";
import sampleToken from "../../../test/fixture/sample-token.json";

jest.mock("../../../services/token", () => ({
  ...jest.requireActual("../../../services/token")
}));

describe("detailedCertificateVerifyBlock", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should render when document is token", async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<DetailedCertificateVerifyBlock verificationStatus={{ valid: true }} document={sampleToken} />);
    });
    wrapper.setProps();
    expect(wrapper.find("h5").text()).toStrictEqual("Details");
    expect(wrapper.find("CertificateVerifyCheck")).toHaveLength(1);
  });
});
