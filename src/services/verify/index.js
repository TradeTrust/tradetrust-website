import { getDocumentStoreRecords } from "@govtechsg/dnsprove";
import { get, zipWith } from "lodash";
import { NETWORK_ID } from "../../config";
import { getData } from "@govtechsg/open-attestation";
import verify from "@govtechsg/oa-verify";
import { NETWORK_NAME } from "../../config";

const getSmartContractAddress = issuer =>
  issuer.certificateStore || issuer.documentStore || issuer.tokenRegistry;

// Resolve identity of an issuer, currently supporting only DNS-TXT
export const isIssuerIdentityVerified = async issuer => {
  const smartContractAddress = getSmartContractAddress(issuer);
  const type = get(issuer, "identityProof.type");
  const location = get(issuer, "identityProof.location");
  if (type !== "DNS-TXT" || !location) return false;
  const records = await getDocumentStoreRecords(location);
  const matchingRecord = records.find(
    record =>
      record.addr.toLowerCase() === smartContractAddress.toLowerCase() &&
      record.netId === NETWORK_ID &&
      record.type === "openatts" &&
      record.net === "ethereum"
  );
  return matchingRecord ? true : false;
};

export const getIssuersIdentities = async issuers => {
  const identitiesVerified = await Promise.all(
    issuers.map(isIssuerIdentityVerified)
  );
  return zipWith(issuers, identitiesVerified, (issuer, verified) => ({
    dns: verified ? get(issuer, "identityProof.location") : null,
    smartContract: getSmartContractAddress(issuer)
  }));
};

export const mutateIssued = issued => ({
  issuedOnAll: issued.valid,
  details: Object.keys(issued.issued).map(contractAddress => ({
    address: contractAddress,
    issued: issued.issued[contractAddress]
  }))
});

export const mutateRevoked = revoked => ({
  revokedOnAny: !revoked.valid,
  details: Object.keys(revoked.revoked).map(contractAddress => ({
    address: contractAddress,
    revoked: revoked.revoked[contractAddress]
  }))
});

export const issuersIdentitiesAllVerified = (identities = []) =>
  identities.reduce((prev, curr) => prev && !!curr.dns, true);

// Given a document, verify it and return a summary of the verification
export const verifyDocument = async document => {
  const documentData = getData(document);

  // Verification for hash, issue and revoke
  const verificationStatus = await verify(document, NETWORK_NAME);

  // Verification for identity
  const identities = await getIssuersIdentities(documentData.issuers);
  const allIdentitiesValid = issuersIdentitiesAllVerified(identities);

  // Combine verification
  const combinedVerificationResults = {
    hash: { checksumMatch: verificationStatus.hash.valid },
    issued: mutateIssued(verificationStatus.issued),
    revoked: mutateRevoked(verificationStatus.revoked),
    identity: {
      identifiedOnAll: allIdentitiesValid,
      details: identities
    },
    valid: verificationStatus.valid && allIdentitiesValid
  };
  return combinedVerificationResults;
};
