import { render } from "@testing-library/react";
import { v2, wrapOADocument } from "@trustvc/trustvc";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "../../store";
import { WrappedOrSignedOpenAttestationDocument } from "../../utils/shared";
import { IssuedBy } from "./DocumentStatus";

describe("Document", () => {
  let document: WrappedOrSignedOpenAttestationDocument;
  beforeAll(async () => {
    document = await wrapOADocument({
      issuers: [
        {
          name: "John",
          documentStore: "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
          identityProof: {
            type: v2.IdentityProofType.DNSTxt,
            location: "example.com",
          },
        },
      ],
      name: "bah bah black sheep",
      links: {
        self: {
          href: "https://openattestation.com",
        },
      },
    });
  });

  describe("IssuedBy", () => {
    const renderWithStore = (additionalProps: any) => {
      const store = configureStore({ certificate: { rawModified: document, verificationStatus: additionalProps } });
      return render(
        <Provider store={store}>
          <IssuedBy verificationStatus={additionalProps} document={document} />
        </Provider>
      );
    };
    it("should return appropriate display text when single dns is verified", () => {
      const fragments = [
        {
          name: "OpenAttestationDnsTxtIdentityProof",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              status: "VALID",
              location: "abc.com",
            },
          ],
        },
      ];
      const container = renderWithStore(fragments);
      expect(container.queryByText("ABC.COM")).not.toBeNull();
    });

    it("should return appropriate display text when multiple dns is verified", () => {
      const fragments = [
        {
          name: "OpenAttestationDnsTxtIdentityProof",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              status: "VALID",
              location: "abc.com",
            },
            {
              status: "VALID",
              location: "xyz.com",
            },
            {
              status: "VALID",
              location: "demo.com",
            },
          ],
        },
      ];
      const container = renderWithStore(fragments);
      expect(container.queryByText("ABC.COM, XYZ.COM and DEMO.COM")).not.toBeNull();
    });

    it("should return domain if is verified with DNS-DID", () => {
      const fragments = [
        {
          name: "OpenAttestationDnsDidIdentityProof",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              status: "VALID",
              location: "abc.com",
            },
          ],
        },
      ];
      const container = renderWithStore(fragments);
      expect(container.queryByText("ABC.COM")).not.toBeNull();
    });

    it("should return did if is verified with DID", () => {
      const sampleDidIdentity = "did:ethr:0xE712878f6E8d5d4F9e87E10DA604F9cB564C9a89";
      const fragments = [
        {
          name: "OpenAttestationDidIdentityProof",
          type: "ISSUER_IDENTITY",
          status: "VALID",
          data: [
            {
              status: "VALID",
              did: sampleDidIdentity,
            },
          ],
        },
      ];
      const container = renderWithStore(fragments);
      expect(container.queryByText(sampleDidIdentity.toUpperCase())).not.toBeNull();
    });
  });
});
