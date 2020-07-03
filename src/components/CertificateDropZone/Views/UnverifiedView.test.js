import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { UnverifiedView } from "./UnverifiedView";
import { TYPES, MESSAGES } from "../../../constants/VerificationErrorMessages";
import {
  whenDocumentHashInvalid,
  whenDocumentNotIssued,
  whenDocumentIssuerIdentityInvalid,
} from "../../../test/fixture/verifier-responses";

describe("unverifiedView", () => {
  it("displays hash error if the hash is invalid", () => {
    const wrapper = mount(
      <MemoryRouter>
        <UnverifiedView
          handleRenderOverwrite={() => {}}
          verificationStatus={whenDocumentHashInvalid}
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
          verificationStatus={whenDocumentNotIssued}
          resetData={() => {}}
        />
      </MemoryRouter>
    );
    const errorContainerElm = wrapper.find("#error-tab");
    expect(errorContainerElm.text()).toContain(MESSAGES[TYPES.ISSUED].failureTitle);
    expect(errorContainerElm.text()).toContain(MESSAGES[TYPES.ISSUED].failureMessage);
  });

  it("displays identity error if the identity is not verified", () => {
    const wrapper = mount(
      <MemoryRouter>
        <UnverifiedView
          handleRenderOverwrite={() => {}}
          verificationStatus={whenDocumentIssuerIdentityInvalid}
          resetData={() => {}}
        />
      </MemoryRouter>
    );
    const errorContainerElm = wrapper.find("#error-tab");
    expect(errorContainerElm.text()).toContain(MESSAGES[TYPES.IDENTITY].failureTitle);
    expect(errorContainerElm.text()).toContain(MESSAGES[TYPES.IDENTITY].failureMessage);
  });
});
