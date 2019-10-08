import { shallow } from "enzyme";
import UnverifiedView from "./UnverifiedView";
import { TYPES, MESSAGES } from "../../../constants/VerificationErrorMessages";

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

describe("UnverifiedView", () => {
  it("displays hash error if the hash is invalid", () => {
    const wrapper = shallow(
      <UnverifiedView
        handleRenderOverwrite={() => {}}
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          hash: { checksumMatch: false }
        }}
        resetData={() => {}}
      />
    );
    const errorContainerElm = wrapper
      .find("DetailedErrors")
      .dive()
      .find("#error-tab0");
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.HASH].failureTitle
    );
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.HASH].failureMessage
    );
  });

  it("displays error if the document is not issued", () => {
    const wrapper = shallow(
      <UnverifiedView
        handleRenderOverwrite={() => {}}
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          issued: { issuedOnAll: false }
        }}
        resetData={() => {}}
      />
    );
    const errorContainerElm = wrapper
      .find("DetailedErrors")
      .dive()
      .find("#error-tab0");
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.ISSUED].failureTitle
    );
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.ISSUED].failureMessage
    );
  });

  it("displays error if the document is revoked", () => {
    const wrapper = shallow(
      <UnverifiedView
        handleRenderOverwrite={() => {}}
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          revoked: { revokedOnAny: true }
        }}
        resetData={() => {}}
      />
    );
    const errorContainerElm = wrapper
      .find("DetailedErrors")
      .dive()
      .find("#error-tab0");
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.REVOKED].failureTitle
    );
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.REVOKED].failureMessage
    );
  });

  it("displays error if the identity is not verified", () => {
    const wrapper = shallow(
      <UnverifiedView
        handleRenderOverwrite={() => {}}
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          identity: { identifiedOnAll: false }
        }}
        resetData={() => {}}
      />
    );
    const errorContainerElm = wrapper
      .find("DetailedErrors")
      .dive()
      .find("#error-tab0");
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.IDENTITY].failureTitle
    );
    expect(errorContainerElm.text()).toContain(
      MESSAGES[TYPES.IDENTITY].failureMessage
    );
  });
  it("displays all errors if multiple error are there", () => {
    const wrapper = shallow(
      <UnverifiedView
        handleRenderOverwrite={() => {}}
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          hash: { checksumMatch: false },
          issued: { issuedOnAll: false },
          revoked: { revokedOnAny: true },
          identity: { identifiedOnAll: false }
        }}
        resetData={() => {}}
      />
    );
    const errorContainerElm0 = wrapper
      .find("DetailedErrors")
      .dive()
      .find("#error-tab0");
    expect(errorContainerElm0.text()).toContain(
      MESSAGES[TYPES.HASH].failureTitle
    );
    expect(errorContainerElm0.text()).toContain(
      MESSAGES[TYPES.HASH].failureMessage
    );
    const errorContainerElm1 = wrapper
      .find("DetailedErrors")
      .dive()
      .find("#error-tab1");
    expect(errorContainerElm1.text()).toContain(
      MESSAGES[TYPES.ISSUED].failureTitle
    );
    expect(errorContainerElm1.text()).toContain(
      MESSAGES[TYPES.ISSUED].failureMessage
    );
    const errorContainerElm2 = wrapper
      .find("DetailedErrors")
      .dive()
      .find("#error-tab2");
    expect(errorContainerElm2.text()).toContain(
      MESSAGES[TYPES.REVOKED].failureTitle
    );
    expect(errorContainerElm2.text()).toContain(
      MESSAGES[TYPES.REVOKED].failureMessage
    );
    const errorContainerElm3 = wrapper
      .find("DetailedErrors")
      .dive()
      .find("#error-tab3");
    expect(errorContainerElm3.text()).toContain(
      MESSAGES[TYPES.IDENTITY].failureTitle
    );
    expect(errorContainerElm3.text()).toContain(
      MESSAGES[TYPES.IDENTITY].failureMessage
    );
  });
});
