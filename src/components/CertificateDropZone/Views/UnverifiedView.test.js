import React from "react";
import renderer from "react-test-renderer";

import UnverifiedView from "./UnverifiedView";

const VALID_VERIFICATION_STATUS = {
  hash: {
    checksumMatch: true
  },
  issued: {
    issuedOnAll: true,
    details: [
      {
        address: "0x48399Fb88bcD031C556F53e93F690EEC07963Af3",
        issued: true
      }
    ]
  },
  revoked: {
    revokedOnAny: false,
    details: [
      {
        address: "0x48399Fb88bcD031C556F53e93F690EEC07963Af3",
        revoked: false
      }
    ]
  },
  valid: true,
  identity: {
    identifiedOnAll: true,
    details: [
      {
        identified: true,
        dns: "tradetrust.io",
        smartContract: "0x48399Fb88bcD031C556F53e93F690EEC07963Af3"
      }
    ]
  }
};

it("renders correctly when the hash mismatch", () => {
  const tree = renderer
    .create(
      <UnverifiedView
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          hash: { checksumMatch: false }
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly when the certificate is not issued", () => {
  const tree = renderer
    .create(
      <UnverifiedView
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          issued: { issuedOnAll: false }
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly when the certificate is revoked", () => {
  const tree = renderer
    .create(
      <UnverifiedView
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          revoked: { revokedOnAny: true }
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly when the issuers are not identified", () => {
  const tree = renderer
    .create(
      <UnverifiedView
        verificationStatus={{
          ...VALID_VERIFICATION_STATUS,
          identity: { identifiedOnAll: false }
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
