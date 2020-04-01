import { getIdentityVerificationText } from "./CertificateVerifyBlock";

describe("certificate verify block getIdentityVerificationText", () => {
  describe("should return appropriate display text when dns is verified", () => {
    it("when single dns is verified", () => {
      const fragments = [
        {
          name: "OpenAttestationDnsTxt",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              status: "VALID",
              location: "abc.com",
            },
          ],
        },
      ];
      expect(getIdentityVerificationText(fragments)).toStrictEqual("Document issued by ABC.COM");
    });

    it("should return appropriate display text when multiple dns is verified", () => {
      const fragments = [
        {
          name: "OpenAttestationDnsTxt",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              status: "VALID",
              location: "xyz.com",
            },
            {
              status: "VALID",
              location: "demo.com",
            },
          ],
        },
      ];
      expect(getIdentityVerificationText(fragments)).toStrictEqual("Document issued by XYZ.COM and DEMO.COM");
    });
  });
});
