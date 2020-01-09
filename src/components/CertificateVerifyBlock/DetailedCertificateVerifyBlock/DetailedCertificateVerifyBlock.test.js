import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import DetailedCertificateVerifyBlock from ".";
import ROPSTEN from "../../HomePageContent/Ropsten-Demo.json";
import TokenRegistry from "../../../test/fixture/tokenRegistry.json";
import { getTokenOwner } from "../../../services/token";

jest.mock("../../../services/token", () => ({
  ...jest.requireActual("../../../services/token"),
  getTokenOwner: jest.fn(),
  initializeToken: jest.fn()
}));

describe("detailedCertificateVerifyBlock", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should render when document is token", async () => {
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

  it("should throw  error if can not fetch owner", async () => {
    getTokenOwner.mockImplementation(() => {
      throw new Error("owner error");
    });
    let wrapper;
    await act(async () => {
      wrapper = mount(<DetailedCertificateVerifyBlock verificationStatus={{ valid: true }} document={TokenRegistry} />);
    });
    wrapper.setProps();
    expect(
      wrapper
        .find(".text-danger")
        .at(0)
        .text()
    ).toStrictEqual("owner error");
  });
});
