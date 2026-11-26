import React from "react";
import fs from "fs";
import path from "path";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import { CredentialDocumentView } from "./CredentialDocumentView";

// The renderer mounts an iframe and talks to a remote template over postMessage — neither works
// in jsdom. Captured as props so the wiring can still be asserted.
const mockRenderer = jest.fn();
jest.mock("../DecentralisedTemplateRenderer/DecentralisedRenderer", () => ({
  DecentralisedRenderer: (props: any) => {
    mockRenderer(props);
    return <div data-testid="renderer" />;
  },
}));

const mockInlineRenderer = jest.fn();
jest.mock("../InlineTemplateRenderer/InlineTemplateRenderer", () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires -- jest.mock factories can't reference outer imports
  const ReactLib = require("react");
  const actual = jest.requireActual("../InlineTemplateRenderer/InlineTemplateRenderer");
  return {
    ...actual,
    InlineTemplateRenderer: ReactLib.forwardRef((props: any) => {
      mockInlineRenderer(props);
      return ReactLib.createElement("div", { "data-testid": "inline-renderer" });
    }),
  };
});

const fixture = (name: string) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "../../test/fixture/w3c/presentations", name), "utf8"));

const [plainCredential] = fixture("valid/two_credentials.json").verifiableCredential;
const [credentialWithAttachments] = fixture("valid/with_attachments.json").verifiableCredential;

const inlineTemplateCredential = {
  ...plainCredential,
  renderMethod: [
    ...plainCredential.renderMethod,
    { type: "INLINE_HTML_TEMPLATE", template: { templateName: "CHAFTA_COO", html: "<div>inline</div>", css: "" } },
  ],
};

const renderView = (credential: any, downloadName = "presentation-chafta-coo-1") =>
  render(
    <Provider store={configureStore()}>
      <CredentialDocumentView credential={credential} downloadName={downloadName} />
    </Provider>
  );

describe("CredentialDocumentView", () => {
  beforeEach(() => {
    mockRenderer.mockReset();
    mockInlineRenderer.mockReset();
  });

  it("renders via the inline template renderer when the credential has an INLINE_HTML_TEMPLATE entry", () => {
    renderView(inlineTemplateCredential);
    expect(screen.getByTestId("inline-renderer")).toBeInTheDocument();
    expect(screen.queryByTestId("renderer")).not.toBeInTheDocument();
    expect(mockInlineRenderer).toHaveBeenCalledWith(expect.objectContaining({ document: inlineTemplateCredential }));
  });

  it("falls back to the decentralised renderer when the inline template fails", () => {
    renderView(inlineTemplateCredential);
    const { onFailure } = mockInlineRenderer.mock.calls[0][0];
    act(() => onFailure());
    expect(screen.getByTestId("renderer")).toBeInTheDocument();
    expect(screen.queryByTestId("inline-renderer")).not.toBeInTheDocument();
  });

  it("renders the credential itself, not the presentation around it", () => {
    renderView(plainCredential);
    expect(screen.getByTestId("renderer")).toBeInTheDocument();
    expect(mockRenderer).toHaveBeenCalledWith(expect.objectContaining({ rawDocument: plainCredential }));
  });

  it("drops OBFUSCATE messages instead of dispatching them at the store", () => {
    // The connected container would dispatch applyPrivacyFilter, obfuscating the whole
    // presentation held in the store — and obfuscateDocument throws on a presentation anyway.
    renderView(plainCredential);
    const { setPrivacyFilter } = mockRenderer.mock.calls[0][0];
    expect(typeof setPrivacyFilter).toBe("function");
    expect(() => setPrivacyFilter({ some: "path" })).not.toThrow();
  });

  it("shows this credential's own attachments", () => {
    renderView(credentialWithAttachments);
    expect(screen.getByTestId("tab-attachment")).toBeInTheDocument();
  });

  it("shows no attachment tab for a credential without any", () => {
    renderView(plainCredential);
    expect(screen.queryByTestId("tab-attachment")).not.toBeInTheDocument();
  });

  it("passes the credential-qualified download name to the utility bar", () => {
    // Templates arrive from the renderer, so drive that to make DocumentUtility mount.
    renderView(plainCredential);
    const { updateTemplates } = mockRenderer.mock.calls[0][0];
    act(() => updateTemplates([{ id: "custom-template", label: "Custom", type: "custom-template" }]));
    expect(screen.getByLabelText("document-utility-download")).toHaveAttribute(
      "download",
      "presentation-chafta-coo-1.tt"
    );
  });

  it("selects the first renderable template once the renderer reports them", () => {
    renderView(plainCredential);
    const { updateTemplates } = mockRenderer.mock.calls[0][0];
    act(() =>
      updateTemplates([
        { id: "custom-template", label: "Custom", type: "custom-template" },
        { id: "second", label: "Second", type: "custom-template" },
      ])
    );
    expect(screen.getByTestId("custom-template")).toBeInTheDocument();
    expect(screen.getByTestId("second")).toBeInTheDocument();
  });
});
