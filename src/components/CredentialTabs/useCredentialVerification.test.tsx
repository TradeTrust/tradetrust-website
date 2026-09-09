import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useCredentialVerification } from "./useCredentialVerification";

// Must be `mock`-prefixed: jest.mock is hoisted above every other statement in the module.
const mockVerifyDocument = jest.fn();
jest.mock("../../services/verify", () => ({
  verifyDocument: (...args: unknown[]) => mockVerifyDocument(...args),
}));

const frags = (statuses: Record<string, string>) =>
  Object.entries(statuses).map(([type, status]) => ({ name: type, type, status }));

const ALL_VALID = frags({ DOCUMENT_STATUS: "VALID", ISSUER_IDENTITY: "VALID", DOCUMENT_INTEGRITY: "VALID" });

/** Renders the hook's output as inspectable DOM. */
const Probe: React.FC<{ credentials: any[] }> = ({ credentials }) => {
  const results = useCredentialVerification(credentials);
  return (
    <ul>
      {results.map((r, i) => (
        <li
          key={i}
          data-testid={`result-${i}`}
          data-loading={String(r.loading)}
          data-valid={String(r.isValid)}
          data-issuer={r.issuer ?? ""}
          data-status={JSON.stringify(r.status)}
        />
      ))}
    </ul>
  );
};

const credential = (id: string, issuer: unknown = "did:key:abc") => ({ id, issuer, claim: id });

describe("useCredentialVerification", () => {
  beforeEach(() => {
    mockVerifyDocument.mockReset();
    mockVerifyDocument.mockResolvedValue(ALL_VALID);
  });

  it("returns one result per credential", async () => {
    render(<Probe credentials={[credential("a"), credential("b")]} />);
    await waitFor(() => expect(screen.getByTestId("result-0")).toHaveAttribute("data-loading", "false"));
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("starts pending during render, so no red cross flashes before the verdict", () => {
    render(<Probe credentials={[credential("a")]} />);
    // Synchronous assertion — deliberately not awaited.
    expect(screen.getByTestId("result-0")).toHaveAttribute("data-loading", "true");
    expect(screen.getByTestId("result-0")).toHaveAttribute("data-valid", "false");
  });

  it("verifies each credential independently", async () => {
    render(<Probe credentials={[credential("a"), credential("b")]} />);
    await waitFor(() => expect(mockVerifyDocument).toHaveBeenCalledTimes(2));
    expect(mockVerifyDocument).toHaveBeenCalledWith(expect.objectContaining({ id: "a" }));
    expect(mockVerifyDocument).toHaveBeenCalledWith(expect.objectContaining({ id: "b" }));
  });

  it("reports the three check groups and an overall verdict", async () => {
    render(<Probe credentials={[credential("a")]} />);
    await waitFor(() => expect(screen.getByTestId("result-0")).toHaveAttribute("data-loading", "false"));
    expect(JSON.parse(screen.getByTestId("result-0").getAttribute("data-status")!)).toEqual({
      DOCUMENT_STATUS: "VALID",
      ISSUER_IDENTITY: "VALID",
      DOCUMENT_INTEGRITY: "VALID",
    });
    expect(screen.getByTestId("result-0")).toHaveAttribute("data-valid", "true");
  });

  it("treats a group with no fragments as invalid rather than silently passing", async () => {
    mockVerifyDocument.mockResolvedValue(frags({ DOCUMENT_STATUS: "VALID", ISSUER_IDENTITY: "VALID" }));
    render(<Probe credentials={[credential("a")]} />);
    await waitFor(() => expect(screen.getByTestId("result-0")).toHaveAttribute("data-loading", "false"));
    expect(JSON.parse(screen.getByTestId("result-0").getAttribute("data-status")!).DOCUMENT_INTEGRITY).toBe("INVALID");
    expect(screen.getByTestId("result-0")).toHaveAttribute("data-valid", "false");
  });

  it("ignores SKIPPED fragments when judging a group", async () => {
    mockVerifyDocument.mockResolvedValue([
      { name: "a", type: "DOCUMENT_INTEGRITY", status: "SKIPPED" },
      { name: "b", type: "DOCUMENT_INTEGRITY", status: "VALID" },
      ...frags({ DOCUMENT_STATUS: "VALID", ISSUER_IDENTITY: "VALID" }),
    ]);
    render(<Probe credentials={[credential("a")]} />);
    await waitFor(() => expect(screen.getByTestId("result-0")).toHaveAttribute("data-valid", "true"));
  });

  it("fails a group when any fragment is INVALID or ERROR", async () => {
    mockVerifyDocument.mockResolvedValue([
      { name: "a", type: "DOCUMENT_INTEGRITY", status: "VALID" },
      { name: "b", type: "DOCUMENT_INTEGRITY", status: "ERROR" },
      ...frags({ DOCUMENT_STATUS: "VALID", ISSUER_IDENTITY: "VALID" }),
    ]);
    render(<Probe credentials={[credential("a")]} />);
    await waitFor(() => expect(screen.getByTestId("result-0")).toHaveAttribute("data-valid", "false"));
  });

  it("marks a credential that cannot be verified as failing every check", async () => {
    mockVerifyDocument.mockRejectedValue(new Error("network down"));
    render(<Probe credentials={[credential("a")]} />);
    await waitFor(() => expect(screen.getByTestId("result-0")).toHaveAttribute("data-loading", "false"));
    expect(JSON.parse(screen.getByTestId("result-0").getAttribute("data-status")!)).toEqual({
      DOCUMENT_STATUS: "INVALID",
      ISSUER_IDENTITY: "INVALID",
      DOCUMENT_INTEGRITY: "INVALID",
    });
  });

  it("still reports the issuer of a credential that failed to verify", async () => {
    mockVerifyDocument.mockRejectedValue(new Error("network down"));
    render(<Probe credentials={[credential("a", "did:key:xyz")]} />);
    await waitFor(() => expect(screen.getByTestId("result-0")).toHaveAttribute("data-issuer", "DID:KEY:XYZ"));
  });

  it("upper-cases the issuer and reads the object form", async () => {
    render(<Probe credentials={[credential("a", { id: "did:web:example.com" })]} />);
    await waitFor(() => expect(screen.getByTestId("result-0")).toHaveAttribute("data-issuer", "DID:WEB:EXAMPLE.COM"));
  });

  it("handles a credential that declares no issuer", async () => {
    render(<Probe credentials={[{ id: "a" }]} />);
    await waitFor(() => expect(screen.getByTestId("result-0")).toHaveAttribute("data-loading", "false"));
    expect(screen.getByTestId("result-0")).toHaveAttribute("data-issuer", "");
  });

  it("returns nothing, and verifies nothing, for an empty credential list", async () => {
    render(<Probe credentials={[]} />);
    await waitFor(() => expect(screen.queryAllByRole("listitem")).toHaveLength(0));
    expect(mockVerifyDocument).not.toHaveBeenCalled();
  });

  it("does not re-verify when the caller passes a fresh array of the same credentials", async () => {
    // The ordinary thing to write is a new array each render. Keying the effect on the array
    // reference would re-verify, set state, re-render and loop until the heap gave out.
    const { rerender } = render(<Probe credentials={[credential("a")]} />);
    await waitFor(() => expect(mockVerifyDocument).toHaveBeenCalledTimes(1));
    rerender(<Probe credentials={[credential("a")]} />);
    rerender(<Probe credentials={[credential("a")]} />);
    await waitFor(() => expect(screen.getByTestId("result-0")).toHaveAttribute("data-loading", "false"));
    expect(mockVerifyDocument).toHaveBeenCalledTimes(1);
  });

  it("re-verifies tampered content that kept the same id", async () => {
    // Tampering edits the claims and leaves id and proof untouched, so keying on the id would
    // let a tampered credential reuse the untampered one's VALID verdict.
    const { rerender } = render(<Probe credentials={[{ id: "a", claim: "original" }]} />);
    await waitFor(() => expect(mockVerifyDocument).toHaveBeenCalledTimes(1));
    rerender(<Probe credentials={[{ id: "a", claim: "TAMPERED" }]} />);
    await waitFor(() => expect(mockVerifyDocument).toHaveBeenCalledTimes(2));
  });

  it("never shows a previous credential set's verdicts against a new one", async () => {
    const { rerender } = render(<Probe credentials={[credential("a"), credential("b")]} />);
    await waitFor(() => expect(screen.getByTestId("result-0")).toHaveAttribute("data-loading", "false"));

    mockVerifyDocument.mockReturnValue(new Promise(() => {})); // never settles
    rerender(<Probe credentials={[credential("c")]} />);

    // The shorter new set must not read the stale results — one entry, pending.
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByTestId("result-0")).toHaveAttribute("data-loading", "true");
  });
});
