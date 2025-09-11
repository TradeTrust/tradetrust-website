import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ObfuscatedMessage } from "./ObfuscatedMessage";
import ObfuscatedDocument from "../../test/fixture/local/v2/invoice-obfuscated-document.json";
import UnobfuscatedDocument from "../../test/fixture/local/v2/invoice.json";
import W3CV2ObfuscatedDerivedDocument from "../../test/fixture/local/w3c/v2_tr_er_ECDSA_Derived.json";
import W3CV2ObfuscatedSignedDocument from "../../test/fixture/local/w3c/v2_tr_er_ECDSA_Signed.json";
import { WrappedOrSignedOpenAttestationDocument } from "../../utils/shared";
import { SignedVerifiableCredential } from "@trustvc/trustvc";
import certificateReducer, { DOCUMENT_SCHEMA, DocumentSchemaType } from "../../reducers/certificate";

describe("ObfuscatedMessage", () => {
  const createStore = (documentSchema: DocumentSchemaType = null) =>
    configureStore({
      reducer: {
        certificate: certificateReducer,
      },
      preloadedState: {
        certificate: {
          raw: null,
          rawModified: null,
          filename: "",
          providerOrSigner: null,
          tokenRegistryVersion: null,
          documentSchema,
          verificationPending: false,
          verificationStatus: null,
          verificationError: null,
          retrieveCertificateByActionState: "INITIAL" as const,
          retrieveCertificateByActionError: null,
          keyId: null,
        },
      },
    });

  it("should display obfuscated message if the obfuscatedData is present", async () => {
    const store = createStore();
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
    const store = createStore();
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

  it("should not display obfuscated message for W3C v2.0 signed document (not obfuscated)", async () => {
    const store = createStore(DOCUMENT_SCHEMA.W3C_VC_2_0);
    const container = render(
      <Provider store={store}>
        <ObfuscatedMessage document={W3CV2ObfuscatedSignedDocument as SignedVerifiableCredential} />
      </Provider>
    );

    // Wait for the async isObfuscated call to complete and component to update
    // Signed documents are typically not obfuscated, so no message should appear
    await waitFor(
      () => {
        expect(container.queryByText("Note: Some fields/data might be obfuscated in this document.")).toBeNull();
      },
      { timeout: 2000 }
    );
  });

  it("should display obfuscated message for W3C v2.0 derived document with selective disclosure", async () => {
    const store = createStore(DOCUMENT_SCHEMA.W3C_VC_2_0);
    const container = render(
      <Provider store={store}>
        <ObfuscatedMessage document={W3CV2ObfuscatedDerivedDocument as SignedVerifiableCredential} />
      </Provider>
    );

    // Wait for the async isObfuscated call to complete and component to update
    await waitFor(
      () => {
        expect(container.queryByText("Note: Some fields/data might be obfuscated in this document.")).not.toBeNull();
      },
      { timeout: 2000 }
    );
  });
});
