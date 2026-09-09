import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { StatusChecks } from "./StatusChecks";
import { errorMessages, interpretFragments } from "@trustvc/trustvc";
import {
  whenDocumentHashInvalid,
  whenDocumentNotIssued,
  whenDocumentIssuerIdentityInvalidDnsTxt,
  whenDocumentValidAndIssuedByDid,
  whenDocumentRevoked,
  whenDocumentHashInvalidAndNotIssued,
} from "../../test/fixture/verifier-responses";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import { v2, wrapOADocument } from "@trustvc/trustvc";
import { WrappedOrSignedOpenAttestationDocument } from "../../utils/shared";

const { MESSAGES, TYPES } = errorMessages;

// Mock the interpretFragments function
jest.mock("@trustvc/trustvc", () => {
  const original = jest.requireActual("@trustvc/trustvc");
  return {
    ...original,
    interpretFragments: jest.fn(),
  };
});

describe("StatusChecks", () => {
  let document: WrappedOrSignedOpenAttestationDocument;

  beforeAll(async () => {
    document = await wrapOADocument({
      issuers: [
        {
          name: "John",
          documentStore: "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
          identityProof: {
            type: v2.IdentityProofType.DNSTxt,
            location: "example.com",
          },
        },
      ],
      name: "test document",
      links: {
        self: {
          href: "https://openattestation.com",
        },
      },
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (interpretFragments as jest.Mock).mockReturnValue({
      hashValid: true,
      issuedValid: true,
      identityValid: true,
    });
  });

  const renderWithStore = (verificationStatus: any) => {
    const store = configureStore({ certificate: { rawModified: document, verificationStatus } });
    return render(
      <Provider store={store}>
        <StatusChecks verificationStatus={verificationStatus} />
      </Provider>
    );
  };

  it("should not render anything when verification status is empty", () => {
    const { container } = renderWithStore([]);
    expect(container.firstChild).toBeNull();
  });

  it("should not render anything when verification status is undefined", () => {
    const { container } = renderWithStore(undefined);
    expect(container.firstChild).toBeNull();
  });

  it("should display all checks as valid when all verifications pass", () => {
    const mockInterpretValue = {
      hashValid: true,
      issuedValid: true,
      identityValid: true,
    };
    (interpretFragments as jest.Mock).mockReturnValue(mockInterpretValue);

    renderWithStore(whenDocumentValidAndIssuedByDid);

    expect(interpretFragments).toHaveBeenCalledWith(whenDocumentValidAndIssuedByDid);
    expect(screen.queryByText(MESSAGES["HASH"]["successTitle"])).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES["ISSUED"]["successTitle"])).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES["IDENTITY"]["successTitle"])).toBeInTheDocument();
  });

  it("should display hash as invalid when document hash is invalid", () => {
    const mockInterpretValue = {
      hashValid: false,
      issuedValid: true,
      identityValid: true,
    };
    (interpretFragments as jest.Mock).mockReturnValue(mockInterpretValue);

    renderWithStore(whenDocumentHashInvalid);

    expect(interpretFragments).toHaveBeenCalledWith(whenDocumentHashInvalid);
    expect(screen.queryByText(MESSAGES["HASH"]["failureTitle"])).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES["ISSUED"]["successTitle"])).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES["IDENTITY"]["successTitle"])).toBeInTheDocument();
  });

  it("should display issued as invalid when document is not issued", () => {
    const mockInterpretValue = {
      hashValid: true,
      issuedValid: false,
      identityValid: true,
    };
    (interpretFragments as jest.Mock).mockReturnValue(mockInterpretValue);

    renderWithStore(whenDocumentNotIssued);

    expect(interpretFragments).toHaveBeenCalledWith(whenDocumentNotIssued);
    expect(screen.queryByText(MESSAGES["HASH"]["successTitle"])).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES["ISSUED"]["failureTitle"])).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES["IDENTITY"]["successTitle"])).toBeInTheDocument();
  });

  it("should display identity as invalid when document issuer identity is invalid", () => {
    const mockInterpretValue = {
      hashValid: true,
      issuedValid: true,
      identityValid: false,
    };
    (interpretFragments as jest.Mock).mockReturnValue(mockInterpretValue);

    renderWithStore(whenDocumentIssuerIdentityInvalidDnsTxt);

    expect(interpretFragments).toHaveBeenCalledWith(whenDocumentIssuerIdentityInvalidDnsTxt);
    expect(screen.queryByText(MESSAGES["HASH"]["successTitle"])).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES["ISSUED"]["successTitle"])).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES["IDENTITY"]["failureTitle"])).toBeInTheDocument();
  });

  it("should display issued as invalid when document is revoked", () => {
    const mockInterpretValue = {
      hashValid: true,
      issuedValid: false,
      identityValid: true,
    };
    (interpretFragments as jest.Mock).mockReturnValue(mockInterpretValue);

    renderWithStore(whenDocumentRevoked);

    expect(interpretFragments).toHaveBeenCalledWith(whenDocumentRevoked);
    expect(screen.queryByText(MESSAGES["HASH"]["successTitle"])).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES["ISSUED"]["failureTitle"])).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES["IDENTITY"]["successTitle"])).toBeInTheDocument();
  });

  it("should display all checks as invalid when all verifications fail", () => {
    const mockInterpretValue = {
      hashValid: false,
      issuedValid: false,
      identityValid: false,
    };
    (interpretFragments as jest.Mock).mockReturnValue(mockInterpretValue);

    renderWithStore(whenDocumentHashInvalidAndNotIssued);

    expect(screen.queryByText(MESSAGES["HASH"]["failureTitle"])).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES["ISSUED"]["failureTitle"])).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES["IDENTITY"]["failureTitle"])).toBeInTheDocument();
  });
});

describe("StatusChecks — Verifiable Presentation", () => {
  const mockInterpretFragments = interpretFragments as jest.MockedFunction<typeof interpretFragments>;
  const fragments = [{ name: "W3CVpIssuerIdentity", type: "ISSUER_IDENTITY", status: "VALID" }] as any;

  const renderChecks = (verdicts: { hashValid: boolean; issuedValid: boolean; identityValid: boolean }) => {
    mockInterpretFragments.mockReturnValue(verdicts as any);
    return render(<StatusChecks verificationStatus={fragments} isPresentation />);
  };

  const ALL_VALID = { hashValid: true, issuedValid: true, identityValid: true };

  it("shows only two checks — issuance belongs to each credential, not to the envelope", () => {
    renderChecks(ALL_VALID);
    expect(screen.getByText("Presenter's identity has been identified")).toBeInTheDocument();
    expect(screen.getByText("Presentation has not been tampered with")).toBeInTheDocument();
    expect(screen.queryByText(MESSAGES[TYPES.ISSUED].successTitle)).not.toBeInTheDocument();
  });

  it("does not describe the envelope as a document", () => {
    renderChecks(ALL_VALID);
    expect(screen.queryByText(/^Document/)).not.toBeInTheDocument();
  });

  it("reports a failing presenter identity", () => {
    renderChecks({ ...ALL_VALID, identityValid: false });
    expect(screen.getByText("Presenter's identity has not been identified")).toBeInTheDocument();
  });

  it("reports a tampered presentation", () => {
    renderChecks({ ...ALL_VALID, hashValid: false });
    expect(screen.getByText("Presentation has been tampered with")).toBeInTheDocument();
  });

  it("ignores issuedValid entirely — the envelope makes no issuance claim", () => {
    // A presentation's DOCUMENT_STATUS fragment reports on embedded credentials, so letting it
    // drive an envelope-level "has been issued" row would misattribute the failure.
    const { container: withIssued } = renderChecks(ALL_VALID);
    const validMarkup = withIssued.innerHTML;
    cleanup();
    const { container: withoutIssued } = renderChecks({ ...ALL_VALID, issuedValid: false });
    expect(withoutIssued.innerHTML).toBe(validMarkup);
  });

  it("still shows all three checks for a plain credential", () => {
    mockInterpretFragments.mockReturnValue(ALL_VALID as any);
    render(<StatusChecks verificationStatus={fragments} />);
    expect(screen.getByText(MESSAGES[TYPES.ISSUED].successTitle)).toBeInTheDocument();
  });
});
