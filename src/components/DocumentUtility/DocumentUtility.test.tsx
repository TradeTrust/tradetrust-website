import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import { DocumentUtility } from "./DocumentUtility";

describe("Nominate Beneficiary", () => {
  it("should show QR code when document has one", async () => {
    const document = {
      data: {
        name: "bah bah black sheep",
        links: {
          self: {
            href: "https://openattestation.com",
          },
        },
      },
    };
    await act(async () => {
      const container = render(<DocumentUtility document={document as any} handleSharingToggle={() => {}} />);

      const qrbuttonComponent = container.getByRole("button", { name: "document-utility-qr-button" });

      expect(qrbuttonComponent).toBeVisible();
    });
  });

  it("should not show QR code when document does not have one", async () => {
    const document = {
      data: {
        name: "bah bah black sheep",
      },
    };
    await act(async () => {
      const container = render(<DocumentUtility document={document as any} handleSharingToggle={() => {}} />);

      const qrbuttonComponent = container.queryByRole("button", { name: "document-utility-qr-button" });

      expect(qrbuttonComponent).toBeNull();
    });
  });
});
