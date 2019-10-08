import { mount } from "enzyme";
import DetailedCertificateVerifyBlock from "./DetailedCertificateVerifyBlock";
import { MESSAGES } from "../../constants/VerificationErrorMessages";

const VALID_VERIFICATION_STATUS = {
  hash: {
    checksumMatch: true
  },
  issued: {
    issuedOnAll: true,
    details: [
      {
        address: "0x48399Fb88bcD031C556F53e93F690EEC07963Af3",
        issued: true
      }
    ]
  },
  revoked: {
    revokedOnAny: false,
    details: [
      {
        address: "0x48399Fb88bcD031C556F53e93F690EEC07963Af3",
        revoked: false
      }
    ]
  },
  valid: true,
  identity: {
    identifiedOnAll: true,
    details: [
      {
        identified: true,
        dns: "tradetrust.io",
        smartContract: "0x48399Fb88bcD031C556F53e93F690EEC07963Af3"
      }
    ]
  }
};

const STATUS = ["HASH", "ISSUED", "REVOKED", "IDENTITY"];

describe("DetailedCertificateVerifyBlock", () => {
  it("displays hash error if the hash is invalid", () => {
    const wrapper = mount(
      <DetailedCertificateVerifyBlock
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          hash: { checksumMatch: false }
        }}
      />
    );
    wrapper
      .find("#detailed-error")
      .children()
      .forEach((child, index) => {
        const title =
          STATUS[index] === "HASH" ? "failureTitle" : "successTitle";
        expect(child.text()).toContain(MESSAGES[STATUS[index]][title]);
      });
  });

  it("displays issuing error if the document is not issued", () => {
    const wrapper = mount(
      <DetailedCertificateVerifyBlock
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          issued: { issuedOnAll: false }
        }}
      />
    );
    wrapper
      .find("#detailed-error")
      .children()
      .forEach((child, index) => {
        const title =
          STATUS[index] === "ISSUED" ? "failureTitle" : "successTitle";
        expect(child.text()).toContain(MESSAGES[STATUS[index]][title]);
      });
  });

  it("displays revocation error if the document is revoked", () => {
    const wrapper = mount(
      <DetailedCertificateVerifyBlock
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          revoked: { revokedOnAny: true }
        }}
      />
    );
    wrapper
      .find("#detailed-error")
      .children()
      .forEach((child, index) => {
        const title =
          STATUS[index] === "REVOKED" ? "failureTitle" : "successTitle";
        expect(child.text()).toContain(MESSAGES[STATUS[index]][title]);
      });
  });

  it("displays identity error if the identity is not verified", () => {
    const wrapper = mount(
      <DetailedCertificateVerifyBlock
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          identity: { identifiedOnAll: false }
        }}
      />
    );
    wrapper
      .find("#detailed-error")
      .children()
      .forEach((child, index) => {
        const title =
          STATUS[index] === "IDENTITY" ? "failureTitle" : "successTitle";
        expect(child.text()).toContain(MESSAGES[STATUS[index]][title]);
      });
  });

  it("displays error in all fields when all verification fail", () => {
    const wrapper = mount(
      <DetailedCertificateVerifyBlock
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          hash: { checksumMatch: false },
          issued: { issuedOnAll: false },
          revoked: { revokedOnAny: true },
          identity: { identifiedOnAll: false }
        }}
      />
    );
    wrapper
      .find("#detailed-error")
      .children()
      .forEach((child, index) => {
        expect(child.text()).toContain(MESSAGES[STATUS[index]].failureTitle);
      });
  });
});
