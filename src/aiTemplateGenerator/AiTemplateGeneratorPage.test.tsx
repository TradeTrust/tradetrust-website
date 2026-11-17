import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "../components/Layout/Footer";
import { NavigationBar, useLayoutNavItems } from "../components/Layout/NavigationBar";
import { STEP1_ERROR_MESSAGES, STEP_TITLES } from "./copy";
import { resetGoogleIdentityForTests, signOut } from "./googleIdentity";
import { resetGoogleSessionForTests, setIdToken } from "./googleSession";
import { AiTemplateGeneratorPage } from "../pages/aiTemplateGenerator";

function jwt(expSecondsFromNow: number): string {
  const encode = (value: Record<string, unknown>) => btoa(JSON.stringify(value));
  const exp = Math.floor(Date.now() / 1000) + expSecondsFromNow;
  return `${encode({ alg: "none" })}.${encode({ exp, email: "lead@example.com" })}.sig`;
}

function installGoogle() {
  const prompt = jest.fn();
  const renderButton = jest.fn();
  const disableAutoSelect = jest.fn();
  const cancel = jest.fn();
  const initialize = jest.fn();
  window.google = { accounts: { id: { initialize, renderButton, prompt, disableAutoSelect, cancel } } };
  return { prompt, renderButton, disableAutoSelect, cancel, initialize };
}

const Shell = (): React.ReactElement => {
  const { leftItems, rightItems } = useLayoutNavItems();
  const [open, setOpen] = useState(false);
  return (
    <>
      <NavigationBar
        logo={<span>Logo</span>}
        menuLeft={leftItems}
        menuRight={rightItems}
        menuMobile={[...leftItems, ...rightItems]}
        toggleNavBar={open}
        setToggleNavBar={setOpen}
      />
      <AiTemplateGeneratorPage />
      <Footer />
    </>
  );
};

describe("AI Template Generator page", () => {
  const fetchMock = window.fetch as jest.Mock;

  beforeEach(() => {
    process.env.GOOGLE_CLIENT_ID = "test-client";
    resetGoogleSessionForTests();
    resetGoogleIdentityForTests();
    fetchMock.mockReset();
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ attemptsRemaining: 2 }),
    });
    installGoogle();
  });

  afterEach(() => {
    delete window.google;
  });

  function renderPage() {
    return render(
      <MemoryRouter initialEntries={["/ai-template-generator"]}>
        <Shell />
      </MemoryRouter>
    );
  }

  it("renders the route content, the nav item and the utilities footer link", () => {
    renderPage();
    expect(screen.getByTestId("page-title")).toHaveTextContent(
      "Get a starting template from a document you already use"
    );
    expect(screen.getByTestId("step-title")).toHaveTextContent(STEP_TITLES[0]);
    const links = screen.getAllByRole("link", { name: "AI Template Generator" });
    expect(links.length).toBeGreaterThanOrEqual(2);
    links.forEach((link) => expect(link).toHaveAttribute("href", "/ai-template-generator"));
  });

  it("shows the sign-in notice before the Google button can be used", async () => {
    const google = installGoogle();
    renderPage();
    const notice = screen.getByTestId("sign-in-notice");
    const buttonHost = screen.getByTestId("google-sign-in");
    expect(notice.compareDocumentPosition(buttonHost) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole("button", { name: "Sign in with Google" })).toBeDisabled();

    await waitFor(() => expect(google.renderButton).toHaveBeenCalled());
    expect(google.initialize.mock.calls[0][0].client_id).toBe("test-client");
    expect(google.prompt).toHaveBeenCalledTimes(1);
  });

  it("keeps Generate disabled until the user is signed in, a file is added and both boxes are ticked", async () => {
    renderPage();
    const generate = screen.getByTestId("generate-template");
    expect(generate).toBeDisabled();
    expect(screen.queryByTestId("template-file-input")).not.toBeInTheDocument();

    setIdToken(jwt(3600));
    await waitFor(() => expect(screen.getByTestId("attempts-remaining")).toHaveTextContent("2 AI attempts left today"));
    expect(generate).toBeDisabled();

    const file = new File([new Uint8Array([0x25, 0x50, 0x44, 0x46])], "certificate.pdf", { type: "application/pdf" });
    fireEvent.change(screen.getByTestId("template-file-input"), { target: { files: [file] } });
    await waitFor(() => expect(screen.getByTestId("upload-file-0")).toHaveTextContent("certificate.pdf"));
    expect(generate).toBeDisabled();

    fireEvent.click(screen.getByRole("checkbox", { name: /reference utility provided as-is/i }));
    fireEvent.click(screen.getByRole("checkbox", { name: /no personal data or confidential information/i }));
    expect(generate).toBeEnabled();
  });

  it("shows each step-1 error message and never the raw server text", async () => {
    const cases: Array<[string, Record<string, unknown>, number]> = [
      ["INVALID_FILE_TYPE", { code: "INVALID_FILE_TYPE", message: "raw invalid" }, 415],
      ["FILE_TOO_LARGE", { code: "FILE_TOO_LARGE", message: "raw large" }, 413],
      ["UNREADABLE_FILE", { code: "UNREADABLE_FILE", message: "raw unreadable" }, 422],
      ["RATE_LIMITED", { code: "RATE_LIMITED", message: "raw rate" }, 429],
      ["DAILY_LIMIT_REACHED", { code: "DAILY_LIMIT_REACHED", message: "raw daily" }, 429],
      ["CREDIT_EXHAUSTED", { code: "CREDIT_EXHAUSTED", message: "raw credit" }, 402],
      ["AUTH_REQUIRED", { code: "AUTH_REQUIRED", message: "raw auth" }, 401],
    ];

    for (const [code, body, status] of cases) {
      fetchMock.mockResolvedValue({
        ok: false,
        status,
        json: async () => body,
      });
      const view = renderPage();
      setIdToken(jwt(3600));
      await waitFor(() =>
        expect(screen.getByTestId("step1-error")).toHaveTextContent(
          STEP1_ERROR_MESSAGES[code as keyof typeof STEP1_ERROR_MESSAGES]
        )
      );
      expect(screen.getByTestId("step1-error")).not.toHaveTextContent("raw");
      expect(screen.getByTestId("step1-error")).not.toHaveTextContent(code);
      view.unmount();
      resetGoogleSessionForTests();
      resetGoogleIdentityForTests();
    }
  });

  it("prompts for sign-in and resends GET /template-generator/quota once on AUTH_REQUIRED", async () => {
    const google = installGoogle();
    fetchMock
      .mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ code: "AUTH_REQUIRED", message: "raw auth" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ attemptsRemaining: 1 }),
      });
    google.prompt.mockImplementation(() => {
      google.initialize.mock.calls[0][0].callback({ credential: jwt(3600) });
    });

    renderPage();
    await waitFor(() => expect(screen.getByTestId("attempts-remaining")).toHaveTextContent("1 AI attempt left today"));
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(screen.queryByText("raw auth")).not.toBeInTheDocument();
  });

  it("sign out clears the session and does not prompt again", async () => {
    const google = installGoogle();
    renderPage();
    await waitFor(() => expect(google.prompt).toHaveBeenCalledTimes(1));

    setIdToken(jwt(3600));
    await waitFor(() => expect(screen.getByTestId("sign-out")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("sign-out"));

    await waitFor(() => expect(screen.getByTestId("sign-in-notice")).toBeInTheDocument());
    expect(google.disableAutoSelect).toHaveBeenCalled();
    expect(google.prompt).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId("sign-out")).not.toBeInTheDocument();
    expect(signOut).toBeDefined();
  });
});
