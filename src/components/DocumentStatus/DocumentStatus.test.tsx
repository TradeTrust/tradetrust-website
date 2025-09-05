import { render, screen } from "@testing-library/react";
import { SignedVerifiableCredential, v2, wrapOADocument } from "@trustvc/trustvc";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import { WrappedOrSignedOpenAttestationDocument } from "../../utils/shared";
import { DocumentStatus } from "./DocumentStatus";
import { ProviderContextProvider } from "../../common/contexts/provider";
import { getSupportedChainInfo } from "../../common/utils/chain-utils";
import w3cDoc from "../../test/fixture/local/w3c/v2_tr_er_ECDSA_Derived.json";

describe("DocumentStatus", () => {
  let wrappedDoc: WrappedOrSignedOpenAttestationDocument;
  const mockSetShowEndorsementChain = jest.fn();

  beforeAll(async () => {
    // Create wrapped OA document
    wrappedDoc = await wrapOADocument({
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
      name: "bah bah black sheep",
      links: {
        self: {
          href: "https://openattestation.com",
        },
      },
    });
  });

  const getOpenAttestationVerificationFragments = (issuerLocation: string) => [
    {
      name: "OpenAttestationDnsTxtIdentityProof",
      type: "ISSUER_IDENTITY",
      status: "VALID",
      data: [
        {
          status: "VALID",
          location: issuerLocation,
        },
      ],
    },
    {
      name: "OpenAttestationHash",
      type: "DOCUMENT_INTEGRITY",
      status: "VALID",
    },
    {
      name: "OpenAttestationDocumentStatus",
      type: "DOCUMENT_STATUS",
      status: "VALID",
      data: {
        issuedOnAll: true,
        revokedOnAny: false,
      },
    },
  ];

  const getW3CVerificationFragments = () => [
    {
      type: "DOCUMENT_INTEGRITY",
      name: "W3CSignatureIntegrity",
      reason: {
        code: 0,
        codeString: "SKIPPED",
        message: "Document either has no proof or proof.type is not 'BbsBlsSignature2020'.",
      },
      status: "SKIPPED",
    },
    {
      type: "DOCUMENT_INTEGRITY",
      name: "EcdsaW3CSignatureIntegrity",
      data: true,
      reason: {
        message: "Document verified after derivation",
      },
      status: "VALID",
    },
    {
      type: "DOCUMENT_STATUS",
      name: "W3CCredentialStatus",
      reason: {
        code: 0,
        codeString: "SKIPPED",
        message: "Document does not have a valid credentialStatus or type.",
      },
      status: "SKIPPED",
    },
    {
      name: "TransferableRecords",
      type: "DOCUMENT_STATUS",
      status: "VALID",
      data: {
        tokenRegistry: "0xa97265cB8C7104552d19846BF28d752112C3854A",
      },
    },
    {
      type: "DOCUMENT_STATUS",
      name: "W3CEmptyCredentialStatus",
      reason: {
        code: 0,
        codeString: "SKIPPED",
        message: "Document contains a credentialStatus.",
      },
      status: "SKIPPED",
    },
    {
      type: "ISSUER_IDENTITY",
      name: "W3CIssuerIdentity",
      data: true,
      status: "VALID",
    },
  ];

  const renderWithStore = (
    document: WrappedOrSignedOpenAttestationDocument | SignedVerifiableCredential,
    verificationFragments: any[],
    props: any = {}
  ) => {
    const { isMagicDemo, ...otherProps } = props;
    const state = isMagicDemo
      ? {
          demoVerify: {
            rawModifiedDocument: document,
            verificationStatus: verificationFragments,
          },
        }
      : {
          certificate: {
            rawModified: document,
            verificationStatus: verificationFragments,
          },
        };

    const store = configureStore(state);
    const defaultProps = {
      setShowEndorsementChain: mockSetShowEndorsementChain,
      isMagicDemo,
      ...otherProps,
    };
    return render(
      <ProviderContextProvider defaultChainId={1337} networks={getSupportedChainInfo()}>
        <Provider store={store}>
          <DocumentStatus {...defaultProps} />
        </Provider>
      </ProviderContextProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testScenarios = [
    {
      name: "OpenAttestation Document",
      getDocument: () => wrappedDoc,
      issuerText: "EXAMPLE.COM",
      issuerLocation: "example.com",
      getVerificationFragments: () => getOpenAttestationVerificationFragments("example.com"),
    },
    {
      name: "W3C Document",
      getDocument: () => w3cDoc as SignedVerifiableCredential,
      issuerText: "DID:WEB:DISAPPOINTED-BLUSH-MOUSE.PLAYGROUND.FYNTECH.IO",
      issuerLocation: "disappointed-blush-mouse.playground.fyntech.io",
      getVerificationFragments: () => getW3CVerificationFragments(),
    },
  ];

  testScenarios.forEach(({ name, getDocument, issuerText, getVerificationFragments }) => {
    describe(`${name}`, () => {
      it("should render IssuedBy and StatusChecks components when document is valid", () => {
        renderWithStore(getDocument(), getVerificationFragments());

        expect(screen.getByText("Issued by:")).toBeInTheDocument();
        expect(screen.getByText(issuerText)).toBeInTheDocument();
        expect(screen.getByText("Document has been issued")).toBeInTheDocument();
        expect(screen.getByText("Document issuer has been identified")).toBeInTheDocument();
        expect(screen.getByText("Document has not been tampered with")).toBeInTheDocument();
      });

      it("should render with magic demo content when isMagicDemo is true", () => {
        renderWithStore(getDocument(), getVerificationFragments(), { isMagicDemo: true });

        expect(screen.getByText("Demo issued by:")).toBeInTheDocument();
        expect(screen.getByText(issuerText)).toBeInTheDocument();
        expect(screen.getByText("Document has been issued")).toBeInTheDocument();
        expect(screen.getByText("Document issuer has been identified")).toBeInTheDocument();
        expect(screen.getByText("Document has not been tampered with")).toBeInTheDocument();
      });

      it("should render AssetManagementTags when isTransferableDocument is true", () => {
        renderWithStore(getDocument(), getVerificationFragments(), { isTransferableDocument: true });

        expect(screen.getByText("Issued by:")).toBeInTheDocument();
        expect(screen.getByText(issuerText)).toBeInTheDocument();
        expect(screen.getByText("Document has been issued")).toBeInTheDocument();
        expect(screen.getByText("Document issuer has been identified")).toBeInTheDocument();
        expect(screen.getByText("Document has not been tampered with")).toBeInTheDocument();
        expect(screen.getByText("View NFT Registry")).toBeInTheDocument();
        expect(screen.getByText("View Endorsement Chain")).toBeInTheDocument();
      });

      it("should render AssetInformationPanel with token registry address when provided", () => {
        const tokenAddress = "0x1234567890";
        renderWithStore(getDocument(), getVerificationFragments(), {
          isTransferableDocument: true,
          tokenRegistryAddress: tokenAddress,
        });

        expect(screen.getByText("Issued by:")).toBeInTheDocument();
        expect(screen.getByText(issuerText)).toBeInTheDocument();
        expect(screen.getByText("Document has been issued")).toBeInTheDocument();
        expect(screen.getByText("Document issuer has been identified")).toBeInTheDocument();
        expect(screen.getByText("Document has not been tampered with")).toBeInTheDocument();
        expect(screen.getByText("View NFT Registry")).toBeInTheDocument();
        expect(screen.getByText("View NFT Registry").parentElement?.getAttribute("href")).toBe(
          "https://localhost/address/0x1234567890"
        );
      });

      it("should not render when document is null", () => {
        renderWithStore(null as any, getVerificationFragments());

        expect(screen.queryByText("Issued by:")).not.toBeInTheDocument();
      });

      it("should not render when verificationStatus is null", () => {
        const store = configureStore({
          certificate: {
            rawModified: getDocument(),
            verificationStatus: null,
          },
        });
        render(
          <ProviderContextProvider defaultChainId={1337} networks={getSupportedChainInfo()}>
            <Provider store={store}>
              <DocumentStatus setShowEndorsementChain={mockSetShowEndorsementChain} />
            </Provider>
          </ProviderContextProvider>
        );

        expect(screen.queryByText("Issued by:")).not.toBeInTheDocument();
      });
    });
  });
});
