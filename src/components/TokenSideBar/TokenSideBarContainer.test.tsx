import React from "react";
import { shallow } from "enzyme";
import TokenSideBarContainer from "./TokenSideBarContainer";
import { SignedDocument } from "@govtechsg/open-attestation";
import sampleToken from "../../test/fixture/sample-token.json";

jest.mock("react-redux", () => ({
  useSelector: () => ({}),
  useDispatch: jest.fn()
}));

describe("tokenSideBarContainer", () => {
  it("should have a Manage Asset heading", () => {
    const wrapper = shallow(<TokenSideBarContainer document={sampleToken as SignedDocument} />);
    expect(wrapper.find("#asset-info-etherscan-link").text()).toStrictEqual("Manage Asset");
  });
});
