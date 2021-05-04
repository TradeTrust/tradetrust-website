import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UnverifiedView } from "./UnverifiedView";
import { TYPES, MESSAGES } from "../../../constants/VerificationErrorMessages";
import {
  whenDocumentHashInvalid,
  whenDocumentNotIssued,
  whenDocumentIssuerIdentityInvalidDnsTxt,
} from "../../../test/fixture/verifier-responses";

describe("unverifiedView", () => {
  it("displays hash error if the hash is invalid", () => {
    render(
      <MemoryRouter>
        <UnverifiedView
          handleRenderOverwrite={() => {}}
          verificationStatus={whenDocumentHashInvalid}
          resetData={() => {}}
        />
      </MemoryRouter>
    );
    const errorContainerElm = screen.getByTestId("error-tab");
    expect(errorContainerElm.textContent).toContain(MESSAGES[TYPES.HASH].failureTitle);
    expect(errorContainerElm.textContent).toContain(MESSAGES[TYPES.HASH].failureMessage);
  });

  it("displays issuing error if the document is not issued", () => {
    render(
      <MemoryRouter>
        <UnverifiedView
          handleRenderOverwrite={() => {}}
          verificationStatus={whenDocumentNotIssued}
          resetData={() => {}}
        />
      </MemoryRouter>
    );
    const errorContainerElm = screen.getByTestId("error-tab");
    expect(errorContainerElm.textContent).toContain(MESSAGES[TYPES.ISSUED].failureTitle);
    expect(errorContainerElm.textContent).toContain(MESSAGES[TYPES.ISSUED].failureMessage);
  });

  it("displays identity error if the identity is not verified", () => {
    render(
      <MemoryRouter>
        <UnverifiedView
          handleRenderOverwrite={() => {}}
          verificationStatus={whenDocumentIssuerIdentityInvalidDnsTxt}
          resetData={() => {}}
        />
      </MemoryRouter>
    );
    const errorContainerElm = screen.getByTestId("error-tab");
    expect(errorContainerElm.textContent).toContain(MESSAGES[TYPES.IDENTITY].failureTitle);
    expect(errorContainerElm.textContent).toContain(MESSAGES[TYPES.IDENTITY].failureMessage);
  });
});
