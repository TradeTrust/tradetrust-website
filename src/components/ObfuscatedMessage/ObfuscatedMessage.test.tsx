import React from "react";
import { render } from "@testing-library/react";
import { ObfuscatedMessage } from "./ObfuscatedMessage";
import ObfuscatedDocument from "../../test/fixture/local/v2/invoice-obfuscated-document.json";
import UnobfuscatedDocument from "../../test/fixture/local/v2/invoice.json";
import { WrappedOrSignedOpenAttestationDocument } from "../../utils/shared";

describe("ObfuscatedMessage", () => {
  it("should display obfuscated message if the obfuscatedData is present", () => {
    const container = render(
      <ObfuscatedMessage document={ObfuscatedDocument as WrappedOrSignedOpenAttestationDocument} />
    );
    expect(container.queryByText("Note: There are fields/data obfuscated in this document.")).not.toBeNull();
  });

  it("should not display obfuscated message if the obfuscatedData is not present", () => {
    const container = render(
      <ObfuscatedMessage document={UnobfuscatedDocument as WrappedOrSignedOpenAttestationDocument} />
    );
    expect(container.queryByText("Note: There are fields/data obfuscated in this document.")).toBeNull();
  });
});
