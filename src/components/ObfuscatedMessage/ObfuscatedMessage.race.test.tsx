import React from "react";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import certificateReducer from "../../reducers/certificate";
import { ObfuscatedMessage } from "./ObfuscatedMessage";
import ObfuscatedDocument from "../../test/fixture/local/v2/invoice-obfuscated-document.json";
import UnobfuscatedDocument from "../../test/fixture/local/v2/invoice.json";
import { WrappedOrSignedOpenAttestationDocument } from "../../utils/shared";

// The compiled @trustvc/trustvc exports are non-configurable getters — jest.spyOn on them throws.
// Use a jest.mock factory instead (precedented in StatusChecks.test.tsx / sagas/certificate.test.js).
// Kept in its own file so the sibling suite keeps exercising the real isObfuscated.
const mockIsObfuscated = jest.fn();
jest.mock("@trustvc/trustvc", () => {
  const original = jest.requireActual("@trustvc/trustvc");
  return { ...original, isObfuscated: (...args: unknown[]) => mockIsObfuscated(...args) };
});

const createStore = () =>
  configureStore({
    reducer: { certificate: certificateReducer },
    preloadedState: {
      certificate: {
        raw: null,
        rawModified: null,
        filename: "",
        providerOrSigner: null,
        tokenRegistryVersion: null,
        documentSchema: null,
        verificationPending: false,
        verificationStatus: null,
        verificationError: null,
        retrieveCertificateByActionState: "INITIAL" as const,
        retrieveCertificateByActionError: null,
        keyId: null,
      },
    },
  });

/** A promise that settles only when told to, so a check can be left deliberately in flight. */
const deferred = () => {
  let resolve!: (value: boolean) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<boolean>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

const message = (document: unknown) => (
  <Provider store={createStore()}>
    <ObfuscatedMessage document={document as WrappedOrSignedOpenAttestationDocument} />
  </Provider>
);

describe("ObfuscatedMessage — a result arriving for a document no longer shown", () => {
  let consoleError: jest.SpyInstance;
  let consoleWarn: jest.SpyInstance;

  beforeEach(() => {
    mockIsObfuscated.mockReset();
    consoleError = jest.spyOn(console, "error").mockImplementation(() => undefined);
    consoleWarn = jest.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleError.mockRestore();
    consoleWarn.mockRestore();
  });

  const unmountWarnings = () =>
    consoleError.mock.calls.filter((args) => String(args[0]).includes("unmounted component"));

  it("does not set state after unmount", async () => {
    const pending = deferred();
    mockIsObfuscated.mockReturnValue(pending.promise);

    const { unmount } = render(message(ObfuscatedDocument));
    unmount();
    await act(async () => {
      pending.resolve(true);
    });

    expect(unmountWarnings()).toHaveLength(0);
  });

  it("does not set state after unmount when the check rejects", async () => {
    const pending = deferred();
    mockIsObfuscated.mockReturnValue(pending.promise);

    const { unmount } = render(message(ObfuscatedDocument));
    unmount();
    await act(async () => {
      pending.reject(new Error("unsupported document type"));
    });

    expect(unmountWarnings()).toHaveLength(0);
  });

  it("ignores a stale result that settles after the document changed", async () => {
    // The first check is still in flight when the document changes. Whichever settled LAST used
    // to win, so the OLD document's verdict could overwrite the new one's.
    const first = deferred();
    const second = deferred();
    mockIsObfuscated.mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);

    const { rerender } = render(message(ObfuscatedDocument));
    rerender(message(UnobfuscatedDocument));

    // The NEW document is not obfuscated; the OLD one then resolves saying it was.
    await act(async () => {
      second.resolve(false);
      first.resolve(true);
    });

    expect(mockIsObfuscated).toHaveBeenCalledTimes(2);
    expect(screen.queryByTestId("obfuscation-info")).not.toBeInTheDocument();
  });

  it("ignores a stale rejection that settles after the document changed", async () => {
    const first = deferred();
    const second = deferred();
    mockIsObfuscated.mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);

    const { rerender } = render(message(UnobfuscatedDocument));
    rerender(message(ObfuscatedDocument));

    await act(async () => {
      second.resolve(true);
      first.reject(new Error("boom"));
    });

    // The late failure must not clear the current document's notice.
    expect(screen.getByTestId("obfuscation-info")).toBeInTheDocument();
  });

  it("clears the previous notice while the new document is being checked", async () => {
    // The cancellation guard stops a stale result overwriting a fresh one, but the last verdict
    // stayed on screen while the new check ran — so switching documents briefly showed the
    // previous document's obfuscation notice against the new one.
    const first = deferred();
    const second = deferred();
    mockIsObfuscated.mockReturnValueOnce(first.promise).mockReturnValueOnce(second.promise);

    const { rerender } = render(message(ObfuscatedDocument));
    await act(async () => {
      first.resolve(true);
    });
    expect(screen.getByTestId("obfuscation-info")).toBeInTheDocument();

    // New document, check still in flight: the old notice must not describe it.
    rerender(message(UnobfuscatedDocument));
    expect(screen.queryByTestId("obfuscation-info")).not.toBeInTheDocument();

    await act(async () => {
      second.resolve(false);
    });
    expect(screen.queryByTestId("obfuscation-info")).not.toBeInTheDocument();
  });

  it("still reports the current document normally", async () => {
    mockIsObfuscated.mockResolvedValue(true);
    render(message(ObfuscatedDocument));
    await act(async () => undefined);
    expect(screen.getByTestId("obfuscation-info")).toBeInTheDocument();
  });
});
