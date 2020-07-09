export const TYPES = {
  REVOKED: "REVOKED",
  ISSUED: "ISSUED",
  HASH: "HASH",
  IDENTITY: "IDENTITY",
};

export const MESSAGES = {
  [TYPES.ISSUED]: {
    failureTitle: "Document issuance status is invalid",
    successTitle: "Document has been issued",
    failureMessage:
      "This document's issuance status is invalid. Please contact your issuing authority for help or issue the document before trying again.",
  },
  [TYPES.HASH]: {
    failureTitle: "Document has been tampered with",
    successTitle: "Document has not been tampered with",
    failureMessage: "The contents of this document are inaccurate and have been tampered with.",
  },
  [TYPES.IDENTITY]: {
    failureTitle: "Document issuer identity is invalid",
    successTitle: "Document issuer has been identified",
    failureMessage: "This document was issued by an invalid issuer.",
  },
};
