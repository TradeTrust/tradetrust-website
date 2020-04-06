import React from "react";
import { mount } from "enzyme";
import CertificateVerifyCheck from "./CertificateVerifyCheck";
import { MESSAGES } from "../../../constants/VerificationErrorMessages";

import {
  whenDocumentHashInvalid,
  whenDocumentRevoked,
  whenDocumentNotIssued,
  whenDocumentIssuerIdentityInvalid,
  whenDocumentHashInvalidAndNotIssued,
} from "../../../test/fixture/verifier-responses";

const STATUS = ["HASH", "ISSUED", "REVOKED", "IDENTITY"];

describe("detailedCertificateVerifyBlock", () => {
  it("displays hash error if the hash is invalid", () => {
    const wrapper = mount(<CertificateVerifyCheck verificationStatus={whenDocumentHashInvalid} />);
    wrapper
      .find("#detailed-error")
      .children()
      .forEach((child, index) => {
        const title = STATUS[index] === "HASH" ? "failureTitle" : "successTitle";
        expect(child.text()).toContain(MESSAGES[STATUS[index]][title]);
      });
  });

  it("displays issuing error if the document is not issued", () => {
    const wrapper = mount(<CertificateVerifyCheck verificationStatus={whenDocumentNotIssued} />);
    wrapper
      .find("#detailed-error")
      .children()
      .forEach((child, index) => {
        const title = STATUS[index] === "ISSUED" ? "failureTitle" : "successTitle";
        expect(child.text()).toContain(MESSAGES[STATUS[index]][title]);
      });
  });

  it("displays revocation error if the document is revoked", () => {
    const wrapper = mount(<CertificateVerifyCheck verificationStatus={whenDocumentRevoked} />);
    wrapper
      .find("#detailed-error")
      .children()
      .forEach((child, index) => {
        const title = STATUS[index] === "REVOKED" ? "failureTitle" : "successTitle";
        expect(child.text()).toContain(MESSAGES[STATUS[index]][title]);
      });
  });

  it("displays identity error if the identity is not verified", () => {
    const wrapper = mount(<CertificateVerifyCheck verificationStatus={whenDocumentIssuerIdentityInvalid} />);
    wrapper
      .find("#detailed-error")
      .children()
      .forEach((child, index) => {
        const title = STATUS[index] === "IDENTITY" ? "failureTitle" : "successTitle";
        expect(child.text()).toContain(MESSAGES[STATUS[index]][title]);
      });
  });

  it("displays error in all fields when all verification fail", () => {
    const wrapper = mount(<CertificateVerifyCheck verificationStatus={whenDocumentHashInvalidAndNotIssued} />);
    wrapper
      .find("#detailed-error")
      .children()
      .forEach((child, index) => {
        expect(child.text()).toContain(MESSAGES[STATUS[index]].failureTitle);
      });
  });
});
