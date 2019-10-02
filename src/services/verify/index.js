import { getDocumentStoreRecords } from "@govtechsg/dnsprove";
import { get } from "lodash";
import { getData } from "@govtechsg/open-attestation";
import verify from "@govtechsg/oa-verify";
import { NETWORK_ID, NETWORK_NAME } from "../../config";

const getSmartContractAddress = issuer =>
  issuer.certificateStore || issuer.documentStore || issuer.tokenRegistry;

// Resolve identity of an issuer, currently supporting only DNS-TXT
export const resolveIsssuerIdentity = async issuer => {
  try {
    const smartContractAddress = getSmartContractAddress(issuer);
    const type = get(issuer, "identityProof.type");
    const location = get(issuer, "identityProof.location");
    if (type !== "DNS-TXT") throw new Error("Identity type not supported");
    if (!location) throw new Error("Location is missing");
    const records = await getDocumentStoreRecords(location);
    const matchingRecord = records.find(
      record =>
        record.addr.toLowerCase() === smartContractAddress.toLowerCase() &&
        record.netId === NETWORK_ID &&
        record.type === "openatts" &&
        record.net === "ethereum"
    );
    return matchingRecord
      ? {
          identified: true,
          dns: get(issuer, "identityProof.location"),
          smartContract: smartContractAddress
        }
      : {
          identified: false,
          smartContract: smartContractAddress
        };
  } catch (e) {
    return {
      identified: false,
      smartContract: getSmartContractAddress(issuer),
      error: e.message || e
    };
  }
};

export const getIssuersIdentities = async issuers =>
  Promise.all(issuers.map(resolveIsssuerIdentity));

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
  identities.every(identity => identity.identified);

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
