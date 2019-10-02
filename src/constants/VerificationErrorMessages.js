export const TYPES = {
  REVOKED: "REVOKED",
  NOT_ISSUED: "NOT_ISSUED",
  TAMPERED: "TAMPERED",
  INVALID_ISSUER_IDENTITY: "INVALID_ISSUER_IDENTITY"
};

export const MESSAGES = {
  [TYPES.REVOKED]: {
    title: "Certificate revoked",
    message:
      "This certificate has been revoked by your issuing institution. Please contact your issuing institution for more details."
  },
  [TYPES.NOT_ISSUED]: {
    title: "Certificate not issued",
    message:
      "This certificate cannot be found. Please contact your issuing institution for help or issue the certificate before trying again."
  },
  [TYPES.TAMPERED]: {
    title: "Certificate has been tampered with",
    message:
      "The contents of this certificate are inaccurate and have been tampered with."
  },
  [TYPES.INVALID_ISSUER_IDENTITY]: {
    title: "Certificate issuer identity invalid",
    message: "This certificate was issued by an invalid issuer."
  }
};
