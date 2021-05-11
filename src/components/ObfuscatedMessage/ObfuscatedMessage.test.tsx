import React from "react";
import { render } from "@testing-library/react";
import { ObfuscatedMessage } from "./ObfuscatedMessage";
import OfuscatedDocument from "../../test/fixture/obfuscated-document.json";
import UnobfuscatedDocument from "../../test/fixture/unobfuscated-document.json";
import { WrappedDocument, v2 } from "@govtechsg/open-attestation";

describe("ObfuscatedMessage", () => {
  it("should display obfuscated message if the obfuscatedData is present", () => {
    const container = render(
      <ObfuscatedMessage document={OfuscatedDocument as WrappedDocument<v2.OpenAttestationDocument>} />
    );
    expect(container.queryByText("Note: There are fields/data obfuscated in this document.")).not.toBeNull();
  });

  it("should not display obfuscated message if the obfuscatedData is not present", () => {
    const container = render(
      <ObfuscatedMessage document={UnobfuscatedDocument as WrappedDocument<v2.OpenAttestationDocument>} />
    );
    expect(container.queryByText("Note: There are fields/data obfuscated in this document.")).toBeNull();
  });
});
