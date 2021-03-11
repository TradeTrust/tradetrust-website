// Verification Responses for corda enterprise network
export const whenDocumentHashInvalidAndNotIssuedCorda = [
  {
    data: false,
    reason: {
      code: 2,
      codeString: "DOCUMENT_NOT_ISSUED",
      message: "Document is not issued or Document does not exist on the ledger",
    },
    status: "INVALID",
    name: "OpenAttestationDocumentConsumed",
    type: "DOCUMENT_STATUS",
  },
  {
    data: false,
    reason: {
      code: 0,
      codeString: "DOCUMENT_TAMPERED",
      message: "Certificate has been tampered with",
    },
    status: "INVALID",
    name: "OpenAttestationHash",
    type: "DOCUMENT_INTEGRITY",
  },
  {
    data: false,
    reason: {
      code: 2,
      codeString: "DOCUMENT_NOT_ISSUED",
      message: "Document is not issued or Document does not exist on the ledger",
    },
    status: "INVALID",
    name: "OpenAttestationDocumentIssued",
    type: "DOCUMENT_STATUS",
  },
  {
    data: false,
    reason: {
      code: 2,
      codeString: "SKIPPED",
      message: `Document is not issued or Document does not exist on the ledger`,
    },
    status: "SKIPPED",
    name: "OpenAttestationDnsTxtIdentityProof",
    type: "ISSUER_IDENTITY",
  },
  {
    data: true,
    reason: {
      code: 2,
      codeString: "DOCUMENT_NOT_ISSUED",
      message: "Document is not issued or Document does not exist on the ledger",
    },
    status: "SKIPPED",
    name: "OpenAttestationDocumentRevoked",
    type: "DOCUMENT_STATUS",
  },
  {
    reason: {
      code: 0,
      codeString: "SKIPPED",
      message: `Document was not issued using DNS-DID`,
    },
    status: "SKIPPED",
    name: "OpenAttestationDnsDidIdentityProof",
    type: "ISSUER_IDENTITY",
  },
  {
    reason: {
      code: 0,
      codeString: "SKIPPED",
      message: `Document is not using DID as top level identifier`,
    },
    status: "SKIPPED",
    name: "OpenAttestationDidIdentityProof",
    type: "ISSUER_IDENTITY",
  },
];
export const whenDocumentNotIssuedCorda = [
  {
    data: false,
    reason: {
      code: 2,
      codeString: "DOCUMENT_NOT_ISSUED",
      message: "Document is not issued or Document does not exist on the ledger",
    },
    status: "INVALID",
    name: "OpenAttestationDocumentIssued",
    type: "DOCUMENT_STATUS",
  },
  {
    data: true,
    status: "VALID",
    name: "OpenAttestationHash",
    type: "DOCUMENT_INTEGRITY",
  },
  {
    data: true,
    status: "SKIPPED",
    name: "OpenAttestationDocumentConsumed",
    type: "DOCUMENT_STATUS",
  },
  {
    data: true,
    status: "SKIPPED",
    name: "OpenAttestationDocumentRevoked",
    type: "DOCUMENT_STATUS",
  },
  {
    name: "OpenAttestationDnsTxtIdentityProof",
    type: "ISSUER_IDENTITY",
    data: [
      {
        status: "VALID",
        location: "tt-verify.blockchain.trames-engineering.com",
        value: "ae2907ddee069e56c7c867b7506a83c859e24050862c0d6e53072f111e54ebaa",
      },
    ],
    status: "VALID",
  },
];
export const whenDocumentValidAndIssuedByDnsCorda = [
  {
    data: true,
    status: "VALID",
    name: "OpenAttestationHash",
    type: "DOCUMENT_INTEGRITY",
  },
  {
    data: true,
    status: "VALID",
    name: "OpenAttestationDocumentIssued",
    type: "DOCUMENT_STATUS",
  },
  {
    data: true,
    status: "VALID",
    name: "OpenAttestationDocumentConsumed",
    type: "DOCUMENT_STATUS",
  },
  {
    data: true,
    status: "INVALID",
    name: "OpenAttestationDocumentRevoked",
    type: "DOCUMENT_STATUS",
  },
  {
    name: "OpenAttestationDnsTxtIdentityProof",
    type: "ISSUER_IDENTITY",
    data: [
      {
        status: "VALID",
        location: "tt-verify.blockchain.trames-engineering.com",
        value: "ae2907ddee069e56c7c867b7506a83c859e24050862c0d6e53072f111e54ebaa",
      },
    ],
    status: "VALID",
  },
];
export const whenDocumentValidAndIssuedByDidCorda = [
  {
    data: true,
    status: "VALID",
    name: "OpenAttestationHash",
    type: "DOCUMENT_INTEGRITY",
  },
  {
    data: true,
    status: "VALID",
    name: "OpenAttestationDocumentIssued",
    type: "DOCUMENT_STATUS",
  },
  {
    data: true,
    status: "VALID",
    name: "OpenAttestationDocumentConsumed",
    type: "DOCUMENT_STATUS",
  },
  {
    data: true,
    status: "INVALID",
    name: "OpenAttestationDocumentRevoked",
    type: "DOCUMENT_STATUS",
  },
  {
    reason: {
      code: 2,
      codeString: "SKIPPED",
      message: `Document is not using DID as top level identifier`,
    },
    status: "SKIPPED",
    name: "OpenAttestationDidIdentityProof",
    type: "ISSUER_IDENTITY",
  },
];
export const whenDocumentHashInvalidCorda = [
  ...whenDocumentValidAndIssuedByDnsCorda.filter((fragment) => fragment.type !== "DOCUMENT_INTEGRITY"),
  {
    data: false,
    reason: {
      code: 0,
      codeString: "DOCUMENT_TAMPERED",
      message: "Certificate has been tampered with",
    },
    status: "INVALID",
    name: "OpenAttestationHash",
    type: "DOCUMENT_INTEGRITY",
  },
];
export const whenDocumentRevokedCorda = [
  {
    type: "DOCUMENT_INTEGRITY",
    name: "OpenAttestationHash",
    data: true,
    status: "VALID",
  },
  {
    data: true,
    status: "VALID",
    name: "OpenAttestationDocumentIssued",
    type: "DOCUMENT_STATUS",
  },
  {
    reason: {
      code: 4,
      codeString: "SKIPPED",
      message: "Document has been revoked so cannot be consumed",
    },
    name: "OpenAttestationDocumentConsumed",
    status: "SKIPPED",
    type: "DOCUMENT_STATUS",
  },
  {
    data: false,
    status: "INVALID",
    name: "OpenAttestationDocumentRevoked",
    reason: {
      code: 1,
      codeString: "DOCUMENT_REVOKED",
      message: "Document has been revoked",
    },
    type: "DOCUMENT_STATUS",
  },
  {
    name: "OpenAttestationDnsTxtIdentityProof",
    type: "ISSUER_IDENTITY",
    data: [
      {
        status: "VALID",
        location: "tt-verify.blockchain.trames-engineering.com",
        value: "ae2907ddee069e56c7c867b7506a83c859e24050862c0d6e53072f111e54ebaa",
      },
    ],
    status: "VALID",
  },
];
export const whenDocumentIssuerIdentityInvalidDnsTxtCorda = [
  {
    data: true,
    status: "VALID",
    name: "OpenAttestationHash",
    type: "DOCUMENT_INTEGRITY",
  },
  {
    data: true,
    status: "VALID",
    name: "OpenAttestationDocumentIssued",
    type: "DOCUMENT_STATUS",
  },
  {
    data: true,
    status: "VALID",
    name: "OpenAttestationDocumentConsumed",
    type: "DOCUMENT_STATUS",
  },
  {
    data: true,
    status: "INVALID",
    name: "OpenAttestationDocumentRevoked",
    type: "DOCUMENT_STATUS",
  },
  {
    reason: {
      code: 2,
      codeString: "SKIPPED",
      message: `Document issuers doesn't use DNS-TXT type`,
    },
    status: "SKIPPED",
    name: "OpenAttestationDnsTxtIdentityProof",
    type: "ISSUER_IDENTITY",
  },
];
export const whenDocumentIssuerIdentityInvalidDidCorda = [
  {
    data: true,
    status: "VALID",
    name: "OpenAttestationHash",
    type: "DOCUMENT_INTEGRITY",
  },
  {
    data: true,
    status: "VALID",
    name: "OpenAttestationDocumentIssued",
    type: "DOCUMENT_STATUS",
  },
  {
    data: true,
    status: "VALID",
    name: "OpenAttestationDocumentConsumed",
    type: "DOCUMENT_STATUS",
  },
  {
    data: true,
    status: "INVALID",
    name: "OpenAttestationDocumentRevoked",
    type: "DOCUMENT_STATUS",
  },
  {
    reason: {
      code: 2,
      codeString: "SKIPPED",
      message: `Document is not using DID as top level identifier`,
    },
    status: "SKIPPED",
    name: "OpenAttestationDidIdentityProof",
    type: "ISSUER_IDENTITY",
  },
];
export const whenTransferableDocumentVerifiedCorda = [
  { type: "DOCUMENT_INTEGRITY", name: "OpenAttestationHash", data: true, status: "VALID" },
  {
    status: "SKIPPED",
    type: "DOCUMENT_STATUS",
    name: "OpenAttestationDocumentIssued",
    reason: {
      code: 4,
      codeString: "SKIPPED",
      message: 'Document issuers doesn\'t have "documentStore" or "certificateStore" property or DOCUMENT_STORE method',
    },
  },
  {
    status: "SKIPPED",
    type: "DOCUMENT_STATUS",
    name: "OpenAttestationDocumentConsumed",
    reason: {
      code: 4,
      codeString: "SKIPPED",
      message: 'Document issuers doesn\'t have "documentStore" or "certificateStore" property or DOCUMENT_STORE method',
    },
  },
  {
    status: "SKIPPED",
    type: "DOCUMENT_STATUS",
    name: "OpenAttestationDocumentRevoked",
    reason: {
      code: 4,
      codeString: "SKIPPED",
      message: 'Document issuers doesn\'t have "documentStore" or "certificateStore" property or DOCUMENT_STORE method',
    },
  },
  {
    name: "OpenAttestationDnsTxtIdentityProof",
    type: "ISSUER_IDENTITY",
    data: [
      {
        status: "VALID",
        location: "tt-verify.blockchain.trames-engineering.com",
        value: "ae2907ddee069e56c7c867b7506a83c859e24050862c0d6e53072f111e54ebaa",
      },
    ],
    status: "VALID",
  },
];
