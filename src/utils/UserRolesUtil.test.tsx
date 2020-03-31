import getUserRoles, { userRoleText } from "./UserRolesUtil";

describe("userRolesUtil", () => {
  it("should show the correct titles", () => {
    const userRole1 = getUserRoles({
      adminAddress: "0xA",
      holderAddress: "0xA",
      beneficiaryAddress: "",
    });
    expect(userRoleText(userRole1)).toStrictEqual("Holder");

    const userRole2 = getUserRoles({
      adminAddress: "0xA",
      holderAddress: "",
      beneficiaryAddress: "0xA",
    });
    expect(userRoleText(userRole2)).toStrictEqual("Beneficiary");

    const userRole3 = getUserRoles({
      adminAddress: "0xA",
      holderAddress: "0xA",
      beneficiaryAddress: "0xA",
    });
    expect(userRoleText(userRole3)).toStrictEqual("Holder and Beneficiary");

    const userRole4 = getUserRoles({
      adminAddress: "0xA",
      holderAddress: "",
      beneficiaryAddress: "",
    });
    expect(userRoleText(userRole4)).toStrictEqual("\u00A0");
  });
});
