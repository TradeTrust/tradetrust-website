import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
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

describe("unverifiedView", () => {
  it("displays hash error if the hash is invalid", () => {
    const wrapper = mount(
      <MemoryRouter>
        <UnverifiedView
          handleRenderOverwrite={() => {}}
          verificationStatus={{
            ...VALID_VERIFICATION_STATUS,
            hash: { checksumMatch: false }
          }}
          resetData={() => {}}
        />
      </MemoryRouter>
    );
    const errorContainerElm = wrapper.find("#error-tab");
    expect(errorContainerElm.text()).toContain(MESSAGES[TYPES.HASH].failureTitle);
    expect(errorContainerElm.text()).toContain(MESSAGES[TYPES.HASH].failureMessage);
  });

  it("displays issuing error if the document is not issued", () => {
    const wrapper = mount(
      <MemoryRouter>
        <UnverifiedView
          handleRenderOverwrite={() => {}}
          verificationStatus={{
            ...VALID_VERIFICATION_STATUS,
            issued: { issuedOnAll: false }
          }}
          resetData={() => {}}
        />
      </MemoryRouter>
    );
    const errorContainerElm = wrapper.find("#error-tab");
    expect(errorContainerElm.text()).toContain(MESSAGES[TYPES.ISSUED].failureTitle);
    expect(errorContainerElm.text()).toContain(MESSAGES[TYPES.ISSUED].failureMessage);
  });

  it("display revocation error if the document is revoked", () => {
    const wrapper = mount(
      <MemoryRouter>
        <UnverifiedView
          handleRenderOverwrite={() => {}}
          verificationStatus={{
            ...VALID_VERIFICATION_STATUS,
            revoked: { revokedOnAny: true }
          }}
          resetData={() => {}}
        />
      </MemoryRouter>
    );
    const errorContainerElm = wrapper.find("#error-tab");
    expect(errorContainerElm.text()).toContain(MESSAGES[TYPES.REVOKED].failureTitle);
    expect(errorContainerElm.text()).toContain(MESSAGES[TYPES.REVOKED].failureMessage);
  });

  it("displays identity error if the identity is not verified", () => {
    const wrapper = mount(
      <MemoryRouter>
        <UnverifiedView
          handleRenderOverwrite={() => {}}
          verificationStatus={{
            ...VALID_VERIFICATION_STATUS,
            identity: { identifiedOnAll: false }
          }}
          resetData={() => {}}
        />
      </MemoryRouter>
    );
    const errorContainerElm = wrapper.find("#error-tab");
    expect(errorContainerElm.text()).toContain(MESSAGES[TYPES.IDENTITY].failureTitle);
    expect(errorContainerElm.text()).toContain(MESSAGES[TYPES.IDENTITY].failureMessage);
  });

  it("displays revoked error if both issue and revoked fail", () => {
    const wrapper = mount(
      <MemoryRouter>
        <UnverifiedView
          handleRenderOverwrite={() => {}}
          verificationStatus={{
            ...VALID_VERIFICATION_STATUS,
            issued: { issuedOnAll: false },
            revoked: { revokedOnAny: true }
          }}
          resetData={() => {}}
        />
      </MemoryRouter>
    );
    const errorContainerElm = wrapper.find("#error-tab");
    expect(errorContainerElm.text()).toContain(MESSAGES[TYPES.REVOKED].failureTitle);
    expect(errorContainerElm.text()).toContain(MESSAGES[TYPES.REVOKED].failureMessage);
  });
});
