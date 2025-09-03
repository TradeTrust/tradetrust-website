import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ObfuscatedMessage } from "./ObfuscatedMessage";
import ObfuscatedDocument from "../../test/fixture/local/v2/invoice-obfuscated-document.json";
import UnobfuscatedDocument from "../../test/fixture/local/v2/invoice.json";
import { WrappedOrSignedOpenAttestationDocument } from "../../utils/shared";
import certificateReducer from "../../reducers/certificate";

describe("ObfuscatedMessage", () => {
  const store = configureStore({
    reducer: {
      certificate: certificateReducer,
    },
  });

  it("should display obfuscated message if the obfuscatedData is present", async () => {
    const container = render(
      <Provider store={store}>
        <ObfuscatedMessage document={ObfuscatedDocument as WrappedOrSignedOpenAttestationDocument} />
      </Provider>
    );

    // Wait for the async isObfuscated call to complete and component to update
    await waitFor(() => {
      expect(container.queryByText("Note: There are fields/data obfuscated in this document.")).not.toBeNull();
    });
  });

  it("should not display obfuscated message if the obfuscatedData is not present", async () => {
    const container = render(
      <Provider store={store}>
        <ObfuscatedMessage document={UnobfuscatedDocument as WrappedOrSignedOpenAttestationDocument} />
      </Provider>
    );

    // Wait a bit to ensure async call completes, then verify message is still not present
    await waitFor(
      () => {
        expect(container.queryByText("Note: There are fields/data obfuscated in this document.")).toBeNull();
      },
      { timeout: 1000 }
    );
  });
});
