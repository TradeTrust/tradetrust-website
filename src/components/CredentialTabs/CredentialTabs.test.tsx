import React from "react";
import fs from "fs";
import path from "path";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import { CredentialTabs } from "./CredentialTabs";

// The renderer mounts an iframe and talks to a remote template over postMessage; neither works
// in jsdom, and neither is what these tests are about.
jest.mock("./CredentialDocumentView", () => ({
  CredentialDocumentView: ({ credential, downloadName }: { credential: any; downloadName: string }) => (
    <div data-testid="credential-document" data-download-name={downloadName}>
      {credential?.id}
    </div>
  ),
}));

// Must be `mock`-prefixed: jest.mock is hoisted above every other statement in the module.
const mockVerifyDocument = jest.fn();
jest.mock("../../services/verify", () => ({
  verifyDocument: (...args: unknown[]) => mockVerifyDocument(...args),
}));

const fixture = (name: string) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "../../test/fixture/w3c/presentations", name), "utf8"));

const twoCredentials = fixture("valid/two_credentials.json");
const singleCredential = fixture("valid/single_credential.json");

const allValid = [
  { name: "W3CSignatureIntegrity", type: "DOCUMENT_INTEGRITY", status: "VALID" },
  { name: "W3CCredentialStatus", type: "DOCUMENT_STATUS", status: "VALID" },
  { name: "W3CIssuerIdentity", type: "ISSUER_IDENTITY", status: "VALID" },
];

const renderTabs = (presentation: unknown) =>
  render(
    <Provider store={configureStore()}>
      <CredentialTabs presentation={presentation} fileName="presentation.json" />
    </Provider>
  );

describe("CredentialTabs", () => {
  beforeEach(() => {
    mockVerifyDocument.mockReset();
    mockVerifyDocument.mockResolvedValue(allValid);
  });

  it("renders one tab per embedded credential, labelled by its renderer template", async () => {
    renderTabs(twoCredentials);
    const tabs = await screen.findAllByRole("tab");
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveTextContent("CHAFTA COO");
    expect(tabs[1]).toHaveTextContent("BILL OF LADING");
  });

  it("renders nothing for a presentation with no credentials", () => {
    const { container } = renderTabs({ type: ["VerifiablePresentation"], verifiableCredential: [] });
    expect(container).toBeEmptyDOMElement();
  });

  it("shows the selected credential's own issuer and version tag", async () => {
    renderTabs(twoCredentials);
    await waitFor(() => {
      expect(screen.getByText(twoCredentials.verifiableCredential[0].issuer.toUpperCase())).toBeInTheDocument();
    });
    expect(screen.getByText("W3C VC V2.0")).toBeInTheDocument();
  });

  it("verifies each credential independently and reports its own three checks", async () => {
    renderTabs(twoCredentials);
    await waitFor(() => {
      expect(screen.getByTestId("credential-check-document_status")).toHaveAttribute("data-status", "VALID");
    });
    expect(screen.getByTestId("credential-check-issuer_identity")).toHaveAttribute("data-status", "VALID");
    expect(screen.getByTestId("credential-check-document_integrity")).toHaveAttribute("data-status", "VALID");
    expect(mockVerifyDocument).toHaveBeenCalledTimes(2);
  });

  it("shows pending checks first, so no red cross flashes before the result arrives", () => {
    renderTabs(singleCredential);
    expect(screen.getByTestId("credential-check-document_status")).toHaveAttribute("data-status", "PENDING");
  });

  it("marks a credential that fails verification as invalid on every check", async () => {
    mockVerifyDocument.mockRejectedValue(new Error("network down"));
    renderTabs(singleCredential);
    await waitFor(() => {
      expect(screen.getByTestId("credential-check-issuer_identity")).toHaveAttribute("data-status", "INVALID");
    });
  });

  it("switches panel content when another tab is chosen", async () => {
    renderTabs(twoCredentials);
    const tabs = await screen.findAllByRole("tab");
    expect(screen.getByTestId("credential-document")).toHaveTextContent(twoCredentials.verifiableCredential[0].id);

    fireEvent.click(tabs[1]);

    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
    expect(tabs[0]).toHaveAttribute("aria-selected", "false");
    expect(screen.getByTestId("credential-document")).toHaveTextContent(twoCredentials.verifiableCredential[1].id);
  });

  it("moves between tabs with the arrow keys, per the ARIA tabs pattern", async () => {
    renderTabs(twoCredentials);
    const tabs = await screen.findAllByRole("tab");
    tabs[0].focus();

    fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");

    // Wraps around rather than stopping at the end.
    fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");

    fireEvent.keyDown(document.activeElement!, { key: "End" });
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");
  });

  it("keeps the strip to a single Tab stop with a roving tabIndex", async () => {
    renderTabs(twoCredentials);
    const tabs = await screen.findAllByRole("tab");
    expect(tabs[0]).toHaveAttribute("tabIndex", "0");
    expect(tabs[1]).toHaveAttribute("tabIndex", "-1");
  });

  it("points every tab at a panel that exists, including the unselected ones", async () => {
    const { container } = renderTabs(twoCredentials);
    const tabs = await screen.findAllByRole("tab");
    tabs.forEach((tab) => {
      const id = tab.getAttribute("aria-controls")!;
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    });
  });

  it("gives each credential its own download name, so one tab cannot overwrite another", async () => {
    renderTabs(twoCredentials);
    const tabs = await screen.findAllByRole("tab");
    const first = screen.getByTestId("credential-document").getAttribute("data-download-name");

    fireEvent.click(tabs[1]);
    const second = screen.getByTestId("credential-document").getAttribute("data-download-name");

    expect(first).toBe("presentation-chafta-coo");
    expect(second).not.toBe(first);
  });

  it("falls back to the first tab when a new presentation has fewer credentials", async () => {
    const { rerender } = renderTabs(twoCredentials);
    const tabs = await screen.findAllByRole("tab");
    fireEvent.click(tabs[1]);
    expect(tabs[1]).toHaveAttribute("aria-selected", "true");

    // The stale index 1 would point past the end of the new set and hand the panel an
    // undefined credential.
    rerender(
      <Provider store={configureStore()}>
        <CredentialTabs presentation={singleCredential} fileName="presentation.json" />
      </Provider>
    );

    const newTabs = screen.getAllByRole("tab");
    expect(newTabs).toHaveLength(1);
    expect(newTabs[0]).toHaveAttribute("aria-selected", "true");
  });
});
