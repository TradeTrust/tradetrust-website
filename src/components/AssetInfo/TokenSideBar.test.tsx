import React from "react";
import { mount } from "enzyme";
import TokenSideBar from "./TokenSideBar";

describe("tokenSideBar", () => {
  it("should have a Manage Asset heading", () => {
    const wrapper = mount(
      <TokenSideBar
        isSideBarExpand={true}
        holderAddress=""
        beneficiaryAddress=""
        approvedBeneficiaryAddress=""
        handler={() => {}}
      />
    );
    expect(wrapper.find("h2").text()).toStrictEqual("Manage Asset");
  });

  // holder === bene, approved bene not exists
  it("should show holder and beneficiary role, holder view, only 2 correct fields", () => {
    const wrapper = mount(
      <TokenSideBar
        isSideBarExpand={true}
        holderAddress="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        beneficiaryAddress="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        approvedBeneficiaryAddress=""
        handler={() => {}}
      />
    );

    expect(wrapper.find("TokenSideBarRole h4").text()).toStrictEqual("Holder and Beneficiary");
    expect(wrapper.find("TokenSideBarHolder")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarHolder section")).toHaveLength(2);
    wrapper.find("TokenSideBarHolder section").forEach((node, index) => {
      switch (true) {
        case index === 0:
          expect(node.find("h4").text()).toStrictEqual("Transfer Ownership");
          break;
        case index === 2:
          expect(node.find("h4").text()).toStrictEqual("Surrender Document");
          break;
        default:
      }
    });
  });

  // holder === bene, approved bene exists
  it("should show holder and beneficiary role, holder view, only 3 correct fields", () => {
    const wrapper = mount(
      <TokenSideBar
        isSideBarExpand={true}
        holderAddress="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        beneficiaryAddress="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        approvedBeneficiaryAddress="0xC"
        handler={() => {}}
      />
    );

    expect(wrapper.find("TokenSideBarRole h4").text()).toStrictEqual("Holder and Beneficiary");
    expect(wrapper.find("TokenSideBarHolder")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarHolder section")).toHaveLength(3);
    wrapper.find("TokenSideBarHolder section").forEach((node, index) => {
      switch (true) {
        case index === 0:
          expect(node.find("h4").text()).toStrictEqual("Transfer Ownership");
          break;
        case index === 1:
          expect(node.find("h4").text()).toStrictEqual("Approve Change Beneficiary");
          break;
        case index === 2:
          expect(node.find("h4").text()).toStrictEqual("Surrender Document");
          break;
        default:
      }
    });
  });

  // admin address === holder
  it("should show holder role, holder view, only 1 correct field", () => {
    const wrapper = mount(
      <TokenSideBar
        isSideBarExpand={true}
        holderAddress="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        beneficiaryAddress=""
        approvedBeneficiaryAddress=""
        handler={() => {}}
      />
    );
    expect(wrapper.find("TokenSideBarRole h4").text()).toStrictEqual("Holder");
    expect(wrapper.find("TokenSideBarHolder")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarHolder section")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarField section h4").text()).toStrictEqual("Transfer Ownership");
  });

  // admin address === holder, approved bene exists
  it("should show holder role, holder view, only 2 correct fields", () => {
    const wrapper = mount(
      <TokenSideBar
        isSideBarExpand={true}
        holderAddress="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        beneficiaryAddress=""
        approvedBeneficiaryAddress="0xC"
        handler={() => {}}
      />
    );

    expect(wrapper.find("TokenSideBarRole h4").text()).toStrictEqual("Holder");
    expect(wrapper.find("TokenSideBarHolder")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarHolder section")).toHaveLength(2);
    wrapper.find("TokenSideBarHolder section").forEach((node, index) => {
      switch (true) {
        case index === 0:
          expect(node.find("h4").text()).toStrictEqual("Transfer Ownership");
          break;
        case index === 1:
          expect(node.find("h4").text()).toStrictEqual("Approve Change Beneficiary");
          break;
        default:
      }
    });
  });

  // admin address === bene
  it("should show bene role, bene view, only 1 correct field", () => {
    const wrapper = mount(
      <TokenSideBar
        isSideBarExpand={true}
        holderAddress=""
        beneficiaryAddress="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        approvedBeneficiaryAddress=""
        handler={() => {}}
      />
    );
    expect(wrapper.find("TokenSideBarRole h4").text()).toStrictEqual("Beneficiary");
    expect(wrapper.find("TokenSideBarBeneficiary")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarBeneficiary section")).toHaveLength(1);
    expect(wrapper.find("TokenSideBarField section h4").text()).toStrictEqual("Allow Transfer");
  });

  // // admin !== bene and admin !== holder
  // it("should show default no access text", () => {
  //   const wrapper = mount(
  //     <TokenSideBar
  //       isSideBarExpand={true}
  //       holderAddress=""
  //       beneficiaryAddress=""
  //       approvedBeneficiaryAddress=""
  //       handler={() => {}}
  //     />
  //   );
  //   console.log(wrapper.debug());
  // });
});
