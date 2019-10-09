import { getIdentityVerificationText } from "./CertificateVerifyBlock";

describe("certificate verify block getIdentityVerificationText", () => {
  describe("should return appropriate display text when dns is verified", () => {
    it("when registry is unverified but dns is verified", () => {
      const testValue = [{ registry: false, dns: "abc.com" }];
      expect(getIdentityVerificationText(testValue)).toStrictEqual(
        "Issued by ABC.COM"
      );
    });

    it("should return appropriate display text when multiple dns is verified", () => {
      const testValue = [
        { registry: false, dns: "xyz.com" },
        { registry: false, dns: "demo.com" }
      ];
      expect(getIdentityVerificationText(testValue)).toStrictEqual(
        "Issued by XYZ.COM"
      );
    });
  });
});
