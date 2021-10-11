export const TYPES = {
  REVOKED: "REVOKED",
  ISSUED: "ISSUED",
  HASH: "HASH",
  IDENTITY: "IDENTITY",
};

export const MESSAGES = {
  [TYPES.REVOKED]: {
    failureTitle: "Document revoked",
    successTitle: "Document has not been revoked",
    failureMessage: "This document has been revoked by the issuing authority. Please contact them for more details.",
  },
  [TYPES.ISSUED]: {
    failureTitle: "Document not issued",
    successTitle: "Document has been issued",
    failureMessage:
      "This document cannot be found. Please contact your issuing authority for help or issue the document before trying again.",
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
