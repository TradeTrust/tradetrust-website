import { render, screen } from "@testing-library/react";
import { v2, wrapOADocument } from "@trustvc/trustvc";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import { WrappedOrSignedOpenAttestationDocument } from "../../utils/shared";
import { DocumentStatus } from "./DocumentStatus";
import { ProviderContextProvider } from "../../common/contexts/provider";
import { getSupportedChainInfo } from "../../common/utils/chain-utils";

describe("DocumentStatus", () => {
  let document: WrappedOrSignedOpenAttestationDocument;
  const mockSetShowEndorsementChain = jest.fn();

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
      name: "bah bah black sheep",
      links: {
        self: {
          href: "https://openattestation.com",
        },
      },
    });
  });

  const verificationFragments = [
    {
      name: "OpenAttestationDnsTxtIdentityProof",
      type: "ISSUER_IDENTITY",
      status: "VALID",
      data: [
        {
          status: "VALID",
          location: "example.com",
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

  const renderWithStore = (
    props: any = {},
    state: any = { certificate: { rawModified: document, verificationStatus: verificationFragments } }
  ) => {
    const store = configureStore(state);
    const defaultProps = {
      setShowEndorsementChain: mockSetShowEndorsementChain,
      ...props,
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

  it("should render IssuedBy and StatusChecks components when document is valid", () => {
    renderWithStore();

    expect(screen.getByText("Issued by:")).toBeInTheDocument();
    expect(screen.getByText("EXAMPLE.COM")).toBeInTheDocument();
    expect(screen.getByText("Document has been issued")).toBeInTheDocument();
    expect(screen.getByText("Document issuer has been identified")).toBeInTheDocument();
    expect(screen.getByText("Document has not been tampered with")).toBeInTheDocument();
  });

  it("should render with magic demo content when isMagicDemo is true", () => {
    renderWithStore(
      { isMagicDemo: true },
      { demoVerify: { rawModifiedDocument: document, verificationStatus: verificationFragments } }
    );

    expect(screen.getByText("Demo issued by:")).toBeInTheDocument();
    expect(screen.getByText("EXAMPLE.COM")).toBeInTheDocument();
    expect(screen.getByText("Document has been issued")).toBeInTheDocument();
    expect(screen.getByText("Document issuer has been identified")).toBeInTheDocument();
    expect(screen.getByText("Document has not been tampered with")).toBeInTheDocument();
  });

  it("should render AssetManagementTags when isTransferableDocument is true", () => {
    renderWithStore({ isTransferableDocument: true });

    expect(screen.getByText("Issued by:")).toBeInTheDocument();
    expect(screen.getByText("EXAMPLE.COM")).toBeInTheDocument();
    expect(screen.getByText("Document has been issued")).toBeInTheDocument();
    expect(screen.getByText("Document issuer has been identified")).toBeInTheDocument();
    expect(screen.getByText("Document has not been tampered with")).toBeInTheDocument();
    expect(screen.getByText("View NFT Registry")).toBeInTheDocument();
    expect(screen.getByText("View Endorsement Chain")).toBeInTheDocument();
  });

  it("should render AssetInformationPanel with token registry address when provided", () => {
    const tokenAddress = "0x1234567890";
    renderWithStore({ isTransferableDocument: true, tokenRegistryAddress: tokenAddress });

    expect(screen.getByText("Issued by:")).toBeInTheDocument();
    expect(screen.getByText("EXAMPLE.COM")).toBeInTheDocument();
    expect(screen.getByText("Document has been issued")).toBeInTheDocument();
    expect(screen.getByText("Document issuer has been identified")).toBeInTheDocument();
    expect(screen.getByText("Document has not been tampered with")).toBeInTheDocument();
    expect(screen.getByText("View NFT Registry")).toBeInTheDocument();
    expect(screen.getByText("View NFT Registry").parentElement?.getAttribute("href")).toBe(
      "https://localhost/address/0x1234567890"
    );
  });

  it("should not render when document is null", () => {
    const { container } = renderWithStore(
      {},
      { certificate: { rawModified: null, verificationStatus: verificationFragments } }
    );

    expect(container.firstChild).toBeNull();
  });

  it("should not render when verificationStatus is null", () => {
    const { container } = renderWithStore({}, { certificate: { rawModified: document, verificationStatus: null } });

    expect(container.firstChild).toBeNull();
  });
});
