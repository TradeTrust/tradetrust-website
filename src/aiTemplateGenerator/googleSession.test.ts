import { AI_TOKEN_RENEW_WITHIN_MS } from "./types";
import {
  decodeIdToken,
  needsRenewal,
  resetGoogleSessionForTests,
  setIdToken,
  signOutSession,
  tokenForAiCall,
} from "./googleSession";

function jwt(payload: Record<string, unknown>): string {
  const encode = (value: Record<string, unknown>) =>
    btoa(JSON.stringify(value)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return `${encode({ alg: "none", typ: "JWT" })}.${encode(payload)}.sig`;
}

describe("googleSession", () => {
  beforeEach(() => {
    resetGoogleSessionForTests();
    localStorage.clear();
    sessionStorage.clear();
  });

  it("keeps the token in memory and does not write cookies or web storage", () => {
    const setItem = jest.spyOn(Storage.prototype, "setItem");
    const token = jwt({ exp: Math.floor(Date.now() / 1000) + 3600, email: "lead@example.com" });

    expect(setIdToken(token)).toBe(true);
    expect(decodeIdToken(token)?.email).toBe("lead@example.com");
    expect(setItem).not.toHaveBeenCalled();
    expect(localStorage.getItem("idToken")).toBeNull();
    expect(sessionStorage.length).toBe(0);
    expect(document.cookie).not.toContain(token);

    setItem.mockRestore();
  });

  it("starts signed out, which is what a refresh does to an in-memory token", () => {
    setIdToken(jwt({ exp: Math.floor(Date.now() / 1000) + 3600 }));
    resetGoogleSessionForTests();
    expect(needsRenewal()).toBe(true);
  });

  it("renews before an AI call when under 5 minutes remain", async () => {
    const soon = Math.floor((Date.now() + AI_TOKEN_RENEW_WITHIN_MS - 1000) / 1000);
    setIdToken(jwt({ exp: soon }));
    expect(needsRenewal()).toBe(true);

    const renewed = jwt({ exp: Math.floor(Date.now() / 1000) + 3600 });
    const requestSignIn = jest.fn().mockResolvedValue(renewed);
    await expect(tokenForAiCall(requestSignIn)).resolves.toBe(renewed);
    expect(requestSignIn).toHaveBeenCalledTimes(1);
  });

  it("reuses the token when 5 minutes or more remain", async () => {
    const token = jwt({ exp: Math.floor((Date.now() + AI_TOKEN_RENEW_WITHIN_MS + 1000) / 1000) });
    setIdToken(token);
    expect(needsRenewal()).toBe(false);
    const requestSignIn = jest.fn();
    await expect(tokenForAiCall(requestSignIn)).resolves.toBe(token);
    expect(requestSignIn).not.toHaveBeenCalled();
  });

  it("sign-out clears the token and disables auto sign-in", () => {
    setIdToken(jwt({ exp: Math.floor(Date.now() / 1000) + 3600, email: "lead@example.com" }));
    signOutSession();
    expect(needsRenewal()).toBe(true);
    const { getSnapshot } = require("./googleSession");
    expect(getSnapshot().idToken).toBeNull();
    expect(getSnapshot().autoSignInDisabled).toBe(true);
  });
});
