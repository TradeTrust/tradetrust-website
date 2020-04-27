import React from "react";
import { mount } from "enzyme";
import { ManageAssetToggle } from "./AssetInfo";

describe("ManageAssetToggleProps", () => {
  it("renders with correct etherscan url", async () => {
    const wrapper = mount(
      <ManageAssetToggle
        registryAddress="0x48399Fb88bcD031C556F53e93F690EEC07963Af3"
        tokenId="fc714dc7efa164cd0261d511c51903be392c74698daf331f6f5e4c6be0203939"
        toggleSidebar={async () => {}}
      />
    );
    expect(wrapper.find("#asset-info-etherscan-link").text()).toStrictEqual("Manage Asset");
    expect(wrapper.find("a").prop("href")).toStrictEqual(
      "https://ropsten.etherscan.io/token/0x48399Fb88bcD031C556F53e93F690EEC07963Af3?a=114183028386037208183595590748001008777078424164408283716893897085552431216953"
    );
  });
});
