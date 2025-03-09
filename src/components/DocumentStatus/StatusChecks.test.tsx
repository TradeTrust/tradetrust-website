import React from "react";
import { render, screen } from "@testing-library/react";
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

const { MESSAGES } = errorMessages;

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
