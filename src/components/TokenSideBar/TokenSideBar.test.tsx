import React from "react";
import { shallow } from "enzyme";
import TokenSideBar from "./TokenSideBar";

describe("tokenSideBar", () => {
  it("should have a Manage Asset heading", () => {
    const wrapper = shallow(
      <TokenSideBar
        handleToggleSideBar={() => {}}
        isSideBarExpand={false}
        adminAddress="0xA"
        holderAddress="0xA"
        beneficiaryAddress=""
        approvedBeneficiaryAddress=""
      />
    );
    expect(wrapper.find("h2").text()).toStrictEqual("Manage Asset");
  });
});
