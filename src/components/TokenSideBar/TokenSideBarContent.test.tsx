import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import TokenSideBarContent from "./TokenSideBarContent";

describe("tokenSideBarContent", () => {
  it("simulate click and on change events", async () => {
    // const mockCallBack = jest.fn();
    let wrapper = mount(<></>);

    await act(async () => {
      wrapper = mount(
        <TokenSideBarContent
          adminAddress="0xA"
          holderAddress="0xA"
          beneficiaryAddress=""
          approvedBeneficiaryAddress=""
        />
      );

      const button = wrapper.find("#sec-transferholdership button");
      button.simulate("click");

      const input = wrapper.find("#sec-transferholdership input");
      input.simulate("change", {
        target: {
          name: "newHolder",
          value: ""
        }
      });
      expect(input.prop("value")).toBe("");
      // expect(mockCallBack.mock.calls.length).toEqual(1);
    });
  });

  it("should render holder role with 1 correct field, when adminAddress === holder", () => {
    const wrapper = mount(
      <TokenSideBarContent adminAddress="0xA" holderAddress="0xA" beneficiaryAddress="" approvedBeneficiaryAddress="" />
    );

    expect(wrapper.find("TokenSideBarHolder")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarHolder section")).toHaveLength(1);
    expect(wrapper.find("#sec-transferholdership h4").text()).toStrictEqual("Transfer Holdership");
    expect(wrapper.find("#sec-transferholdership button").text()).toStrictEqual("Transfer");
  });

  it("should render holder and beneficiary role with 3 correct fields, when holderAddress === beneficiaryAddress", () => {
    const wrapper = mount(
      <TokenSideBarContent
        adminAddress="0xA"
        holderAddress="0xA"
        beneficiaryAddress="0xA"
        approvedBeneficiaryAddress=""
      />
    );

    expect(wrapper.find("TokenSideBarHolder")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarHolder section")).toHaveLength(3);

    expect(wrapper.find("#sec-transferholdership h4").text()).toStrictEqual("Transfer Holdership");
    expect(wrapper.find("#sec-transferholdership button").text()).toStrictEqual("Transfer");

    expect(wrapper.find("#sec-changebeneficiary h4").text()).toStrictEqual("Change Beneficiary");
    expect(wrapper.find("#sec-changebeneficiary button").text()).toStrictEqual("Change");

    expect(wrapper.find("#sec-surrenderdocument h4").text()).toStrictEqual("Surrender Document");
    expect(wrapper.find("#sec-surrenderdocument button").text()).toStrictEqual("Surrender");
  });

  it("should render holder role with 2 correct fields, when adminAddress === holderAddress && endorse change of bene exists", () => {
    const wrapper = mount(
      <TokenSideBarContent
        adminAddress="0xA"
        holderAddress="0xA"
        beneficiaryAddress=""
        approvedBeneficiaryAddress="0xB"
      />
    );

    expect(wrapper.find("TokenSideBarHolder")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarHolder section")).toHaveLength(2);

    expect(wrapper.find("#sec-transferholdership h4").text()).toStrictEqual("Transfer Holdership");
    expect(wrapper.find("#sec-transferholdership button").text()).toStrictEqual("Transfer");

    expect(wrapper.find("#sec-changebeneficiary h4").text()).toStrictEqual("Change Beneficiary");
    expect(wrapper.find("#sec-changebeneficiary button").text()).toStrictEqual("Change");
  });

  it("should render bene role with 1 correct field when adminAddress === beneficiaryAddress", () => {
    const wrapper = mount(
      <TokenSideBarContent adminAddress="0xA" holderAddress="" beneficiaryAddress="0xA" approvedBeneficiaryAddress="" />
    );

    expect(wrapper.find("TokenSideBarBeneficiary")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarBeneficiary section")).toHaveLength(1);

    expect(wrapper.find("#sec-approvechangebeneficiary h4").text()).toStrictEqual("Endorse Change of Beneficiary");
    expect(wrapper.find("#sec-approvechangebeneficiary button").text()).toStrictEqual("Endorse");
  });

  it("should render no match view, when adminAddress !== beneficiaryAddress and adminAddress !== holderAddress", () => {
    const wrapper = mount(
      <TokenSideBarContent adminAddress="0xA" holderAddress="" beneficiaryAddress="" approvedBeneficiaryAddress="" />
    );
    expect(wrapper.find("TokenSideBarNoMatch")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarNoMatch h4").text()).toStrictEqual("Oops!");
    expect(wrapper.find("TokenSideBarNoMatch p").text()).toStrictEqual(
      "It seems that you do not have access to manage assets."
    );
  });
});
