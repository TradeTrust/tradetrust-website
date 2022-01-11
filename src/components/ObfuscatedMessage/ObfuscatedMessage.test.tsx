import React from "react";
import { render } from "@testing-library/react";
import { ObfuscatedMessage } from "./ObfuscatedMessage";
import OfuscatedDocument from "../../test/fixture/obfuscated-document.json";
import UnobfuscatedDocument from "../../test/fixture/unobfuscated-document.json";
import { WrappedOrSignedTradeTrustDocument } from "../../types";

describe("ObfuscatedMessage", () => {
  it("should display obfuscated message if the obfuscatedData is present", () => {
    const container = render(<ObfuscatedMessage document={OfuscatedDocument as WrappedOrSignedTradeTrustDocument} />);
    expect(container.queryByText("Note: There are fields/data obfuscated in this document.")).not.toBeNull();
  });

  it("should not display obfuscated message if the obfuscatedData is not present", () => {
    const container = render(
      <ObfuscatedMessage document={UnobfuscatedDocument as WrappedOrSignedTradeTrustDocument} />
    );
    expect(container.queryByText("Note: There are fields/data obfuscated in this document.")).toBeNull();
  });
});
