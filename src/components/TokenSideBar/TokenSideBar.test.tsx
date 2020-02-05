import React from "react";
import { shallow } from "enzyme";
import TokenSideBar from "./TokenSideBar";
import { SignedDocument } from "@govtechsg/open-attestation";
import sampleToken from "../../test/fixture/sample-token.json";

jest.mock("react-redux", () => ({
  useSelector: () => ({}),
  useDispatch: jest.fn()
}));

describe("tokenSideBar", () => {
  it("should have a Manage Asset heading", () => {
    const wrapper = shallow(<TokenSideBar document={sampleToken as SignedDocument} />);
    expect(wrapper.find("h2").text()).toStrictEqual("Manage Asset");
  });
});
