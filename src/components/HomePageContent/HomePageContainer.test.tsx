import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { configureStore } from "../../store";
import { HomePageContainer } from "./HomePageContainer";

const encode = (value: unknown): string => Buffer.from(JSON.stringify(value), "utf8").toString("base64");

describe("HomePageContainer postMessage", () => {
  const originalOpener = window.opener;

  beforeEach(() => {
    Object.defineProperty(window, "opener", { configurable: true, writable: true, value: window });
  });

  afterEach(() => {
    Object.defineProperty(window, "opener", { configurable: true, writable: true, value: originalOpener });
  });

  const renderContainer = () => {
    const store = configureStore();
    const view = render(
      <MemoryRouter>
        <Provider store={store}>
          <HomePageContainer />
        </Provider>
      </MemoryRouter>
    );
    return { store, ...view };
  };

  const send = (origin: string, data: unknown, source: Window | null = window): void => {
    window.dispatchEvent(new MessageEvent("message", { origin, data, source }));
  };

  it("loads a document from an allowed opener origin", () => {
    const { store } = renderContainer();
    send("https://ref.tradetrust.io", { type: "NESTED_DOCUMENT_LOAD", payload: encode({ version: "2.0" }) });
    expect(store.getState().certificate.raw).toEqual({ version: "2.0" });
  });

  it("ignores shared-host origins, HTTP origins, and messages that are not from the opener", () => {
    const { store } = renderContainer();
    const payload = encode({ version: "2.0" });
    send("https://evil.netlify.app", { type: "NESTED_DOCUMENT_LOAD", payload });
    send("http://tradetrust.io", { type: "NESTED_DOCUMENT_LOAD", payload });
    send("https://ref.tradetrust.io", { type: "NESTED_DOCUMENT_LOAD", payload }, null);
    expect(store.getState().certificate.raw).toBeNull();
  });

  it("ignores a LOAD message whose payload is not a JSON object", () => {
    const { store } = renderContainer();
    send("https://dev.tradetrust.io", { type: "NESTED_DOCUMENT_LOAD", payload: encode([1, 2, 3]) });
    expect(store.getState().certificate.raw).toBeNull();
  });

  it("registers the listener once and removes it on unmount", () => {
    const addSpy = jest.spyOn(window, "addEventListener");
    const removeSpy = jest.spyOn(window, "removeEventListener");
    const { rerender, unmount, store } = renderContainer();

    rerender(
      <MemoryRouter>
        <Provider store={store}>
          <HomePageContainer />
        </Provider>
      </MemoryRouter>
    );

    const added = addSpy.mock.calls.filter(([type]) => type === "message");
    expect(added).toHaveLength(1);

    unmount();
    expect(removeSpy.mock.calls.some(([type]) => type === "message")).toBe(true);
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
