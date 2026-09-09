import React from "react";
import fs from "fs";
import path from "path";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import { CertificateViewer } from "./CertificateViewer";

// The presentation branch is what is under test; everything below it mounts iframes, wallets or
// chain calls that jsdom cannot provide.
jest.mock("./CredentialTabs", () => ({
  CredentialTabs: ({ presentation, fileName }: { presentation: any; fileName: string }) => (
    <div data-testid="credential-tabs" data-file-name={fileName} data-holder={presentation?.holder} />
  ),
}));
jest.mock("./DecentralisedTemplateRenderer/DecentralisedRenderer", () => ({
  DecentralisedRendererContainer: () => <div data-testid="single-renderer" />,
}));
jest.mock("./AssetManagementPanel/AssetManagementApplication", () => ({
  AssetManagementApplication: (props: any) => (
    <div data-testid="asset-management" data-transferable={String(props.isTransferableDocument)} />
  ),
}));
jest.mock("./EndorsementChain", () => ({ EndorsementChainContainer: () => <div /> }));

const mockInitialize = jest.fn();
jest.mock("../common/contexts/TokenInformationContext", () => ({
  useTokenInformationContext: () => ({ initialize: mockInitialize, resetStates: jest.fn() }),
}));
jest.mock("../common/contexts/provider", () => ({
  useProviderContext: () => ({ currentChainId: undefined }),
  getCurrentProvider: () => undefined,
}));

const fixture = (name: string) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "../test/fixture/w3c/presentations", name), "utf8"));

const presentation = fixture("valid/two_credentials.json");
const [credential] = presentation.verifiableCredential;

const renderViewer = (document: any, filename = "presentation.json") =>
  render(
    <Provider store={configureStore()}>
      <CertificateViewer document={document} filename={filename} />
    </Provider>
  );

describe("CertificateViewer — Verifiable Presentation", () => {
  beforeEach(() => mockInitialize.mockReset());

  afterEach(async () => {
    // ObfuscatedMessage starts an async isObfuscated check with no cancellation guard, so its
    // state update can land after the test unmounts. Let it settle rather than leaking a warning
    // into the next test.
    await act(async () => undefined);
  });

  it("renders credential tabs instead of the single-document renderer", () => {
    renderViewer(presentation);
    expect(screen.getByTestId("credential-tabs")).toBeInTheDocument();
    expect(screen.queryByTestId("single-renderer")).not.toBeInTheDocument();
  });

  it("passes the uploaded filename through, so each credential's download is distinct", () => {
    renderViewer(presentation, "my-presentation.json");
    expect(screen.getByTestId("credential-tabs")).toHaveAttribute("data-file-name", "my-presentation.json");
  });

  it("still shows the status panel, which reports on the envelope", () => {
    renderViewer(presentation);
    expect(screen.getByTestId("asset-management")).toHaveAttribute("data-transferable", "false");
  });

  it("never treats a presentation as a transferable record", () => {
    // The envelope holds no token; initialising the token context would probe a registry that
    // does not exist.
    renderViewer(presentation);
    expect(mockInitialize).not.toHaveBeenCalled();
  });

  it("does not throw on a presentation, whose document data would otherwise be unreadable", () => {
    // getOpenAttestationData feeds the expiry check; without its presentation guard it falls
    // through to getDocumentData, which throws.
    expect(() => renderViewer(presentation)).not.toThrow();
  });

  it("keeps rendering a plain credential through the single-document path", () => {
    renderViewer(credential);
    expect(screen.getByTestId("single-renderer")).toBeInTheDocument();
    expect(screen.queryByTestId("credential-tabs")).not.toBeInTheDocument();
  });
});
