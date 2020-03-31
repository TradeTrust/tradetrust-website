import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { AssetInfo } from "./AssetInfo";
import sampleToken from "../../test/fixture/sample-token.json";

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => ({
    token: { beneficiaryAddress: "", holderAddress: "" },
  }),
}));

describe("assetInfo", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  it("renders with correct etherscan url", async () => {
    let wrapper: any;
    await act(async () => {
      wrapper = mount(<AssetInfo document={sampleToken as WrappedDocument} />);
    });
    expect(wrapper.find("#asset-info-etherscan-link").text()).toStrictEqual("Manage Asset");
    expect(wrapper.find("a").prop("href")).toStrictEqual(
      "https://ropsten.etherscan.io/token/0x48399Fb88bcD031C556F53e93F690EEC07963Af3?a=114183028386037208183595590748001008777078424164408283716893897085552431216953"
    );
  });
});
