import { errorMessages, VerificationFragment } from "@trustvc/trustvc";
import { getCredentialLabel, getPresentationCredentials } from "./presentation";

const { TYPES } = errorMessages;

/** The presentation verifier fragments. */
const VP_FRAGMENTS = ["W3CVpSignatureIntegrity", "W3CVpCredentialStatus", "W3CVpIssuerIdentity"];

/**
 * Every reason across the failing presentation fragments. More than one can fail at once — an
 * empty presentation fails both the proof and the issuer check — so all of them are considered
 * rather than just the first, letting the specific explanation win over a generic one.
 */
const failingVpReasons = (frags: VerificationFragment[]): string[] =>
  frags
    .filter((f) => VP_FRAGMENTS.includes(f.name) && (f.status === "INVALID" || f.status === "ERROR"))
    .map((f) => (f as any)?.reason?.message ?? "");

/**
 * Names the embedded credential(s) a verifier reason blames — by POSITION and by the label the
 * credential tabs show, e.g. `Credential 2 ("BILL OF LADING")`.
 *
 * Both halves are needed, and each alone is wrong:
 *
 * - Position alone ("Credential 2", or the verifier's zero-based "index 1") names nothing the
 *   user can see: real documents label their tabs by template or type — "CHAFTA COO", "BILL OF
 *   LADING" — and only fall back to `Credential N` when a credential has neither.
 * - Label alone is ambiguous, because the credential tabs render the label with no
 *   disambiguation. Two bills of lading in one presentation produce two identical tabs.
 *
 * Together they are unambiguous and findable: tabs render in credential order, so the position
 * locates the tab and the label confirms it is the right one.
 *
 * Reasons name indices in several shapes, and more than one at a time:
 *   "Embedded credential at index 0 has expired (...)"
 *   "Embedded credential(s) at index 0, 2 have no issuer."
 *   "Could not resolve issuer(s): index 0 (did:web:a), index 1 (did:web:b)."
 * so every `index N` is collected, not just the first. Without a document, or with no index at
 * all, it degrades to a plainer phrase rather than naming the wrong credential.
 */
const credentialsAtFault = (reason: string, doc?: unknown): { phrase: string; plural: boolean } => {
  // `index` may introduce a COMMA-SEPARATED LIST ("index 0, 2 have no issuer"), not just one
  // number, so the list is captured whole and split. Matching a bare `index (\d+)` would read
  // only the first and silently drop every credential after it. The trailing group stops at the
  // first non-number, so "index 0 (did:web:a), index 1 (did:web:b)" still reads as two separate
  // matches rather than running them together.
  const indices = [
    ...new Set(
      [...reason.matchAll(/\bindex\s+(\d+(?:\s*,\s*\d+)*)/gi)].flatMap((m) =>
        m[1].split(",").map((n) => Number(n.trim()))
      )
    ),
  ].sort((a, b) => a - b);
  if (indices.length === 0) return { phrase: "A credential", plural: false };

  let credentials: unknown[] = [];
  try {
    credentials = doc ? getPresentationCredentials(doc) ?? [] : [];
  } catch {
    credentials = [];
  }

  const names = indices.map((index) => {
    const position = `Credential ${index + 1}`;
    const credential = credentials[index];
    if (!credential) return position;
    const label = getCredentialLabel(credential, index);
    // getCredentialLabel falls back to this exact string; do not repeat it.
    return label === position ? position : `${position} ("${label}")`;
  });

  return {
    phrase: names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`,
    plural: names.length > 1,
  };
};

/**
 * Maps a presentation failure onto the established error copy.
 *
 * trustvc's errorMessageHandling was written for OpenAttestation: it sees an invalid
 * DOCUMENT_INTEGRITY and returns HASH for every presentation failure, so an expired or unsigned
 * presentation is reported as "Document has been tampered with". Matching on the verifier's
 * reason instead gives the accurate existing message — a bad signature really is HASH, a
 * revoked credential really is REVOKED — and the raw verifier wording ("Invalid signature.")
 * never reaches the user.
 *
 * `message` is only set where no existing copy conveys the cause; there is no EXPIRED type, for
 * instance. Where it is absent the type's own failureMessage is used. A function receives the
 * verifier reason that matched, so copy can name the credential at fault.
 */
const PRESENTATION_FAILURES: Array<{
  match: RegExp;
  type: string;
  message?: string | ((reason: string, doc?: unknown) => string);
}> = [
  {
    match: /no verifiable credentials/i,
    type: TYPES.INVALID,
    message: "This presentation does not contain any credentials.",
  },
  // An EMBEDDED credential's problem, ahead of the presentation-level rules below. These must
  // name WHICH credential and point at the issuer: the presentation itself is fine, and the
  // default copy ("This document has been revoked", "Ask the holder to present again") reads as
  // though the presentation were at fault and sends the user to the wrong party.
  {
    match: /embedded credential.*(has|have) been (revoked|suspended)/i,
    type: TYPES.REVOKED,
    message: (reason, doc) => {
      const { phrase, plural } = credentialsAtFault(reason, doc);
      return `${phrase} in this presentation ${plural ? "have" : "has"} been revoked by ${
        plural ? "their issuers" : "its issuer"
      }. Contact them for more details.`;
    },
  },
  {
    match: /embedded credential.*(has|have) expired/i,
    type: TYPES.INVALID,
    message: (reason, doc) => {
      const { phrase, plural } = credentialsAtFault(reason, doc);
      return `${phrase} in this presentation ${plural ? "have" : "has"} expired. Ask the issuer to reissue ${
        plural ? "them" : "it"
      } — presenting ${plural ? "them" : "it"} again will not help.`;
    },
  },
  {
    match: /embedded credential.*(is|are) not yet valid/i,
    type: TYPES.INVALID,
    message: (reason, doc) => {
      const { phrase, plural } = credentialsAtFault(reason, doc);
      return `${phrase} in this presentation ${plural ? "are" : "is"} not valid yet. Check with the issuer when ${
        plural ? "they become" : "it becomes"
      } valid.`;
    },
  },
  // Revocation is reported ahead of tampering: it is the more actionable answer for the holder,
  // and the realistic case (revoked upstream after the presentation was signed) leaves the proof
  // intact anyway.
  { match: /revoked|suspended/i, type: TYPES.REVOKED },
  // Issuer resolution is reported ahead of tampering for the same reason — it is the ROOT CAUSE,
  // not a co-occurring failure. Verifying an embedded credential's signature needs the issuer's
  // public key, so a DID that will not resolve necessarily fails the signature check too ("has
  // an invalid signature: Cannot read properties of null (reading 'verificationMethod')" — a raw
  // TypeError from the failed lookup). Matched the other way round, an unpublished did:web is
  // reported to the user as a tampered document.
  {
    match: /could not resolve issuer|have no issuer/i,
    type: TYPES.IDENTITY,
    message: (reason, doc) => {
      const { phrase, plural } = credentialsAtFault(reason, doc);
      return `${phrase} in this presentation ${
        plural ? "name issuers" : "names an issuer"
      } that cannot be identified, so ${plural ? "they cannot" : "it cannot"} be verified. Contact the issuer.`;
    },
  },
  { match: /invalid signature|tampered/i, type: TYPES.HASH },
  // The PRESENTATION's own window. Reached only after the embedded-credential rules above,
  // because both read "... has expired (validUntil ...)" and a single /has expired/ rule would
  // otherwise catch the credential case and tell the user to ask the holder to present again —
  // advice that can never work, since only the issuer can reissue a credential.
  {
    match: /has expired/i,
    type: TYPES.INVALID,
    message:
      "This presentation has expired and can no longer be used. Ask the holder to present the credentials again.",
  },
  {
    match: /not signed|no holder/i,
    type: TYPES.INVALID,
    message: "This presentation is not signed, so the presenter cannot prove they hold these credentials.",
  },
  // Signed correctly, but by somebody other than the declared holder — the shape of presenting a
  // credential that is about someone else. Distinct from an unsigned presentation, and from
  // tampering: the signature is genuine, it just is not the holder's.
  {
    match: /does not match the declared holder/i,
    type: TYPES.INVALID,
    message:
      "This presentation was signed by someone other than the holder it names, so the presenter cannot prove these credentials are theirs.",
  },
];

const matchPresentationFailure = (frags: VerificationFragment[]) => {
  const reasons = failingVpReasons(frags);
  if (reasons.length === 0) return undefined;
  // Ordered most specific first, so it wins over a co-occurring generic failure. The reason that
  // matched is carried along so copy can name the credential it blames.
  for (const failure of PRESENTATION_FAILURES) {
    const reason = reasons.find((r) => failure.match.test(r));
    if (reason !== undefined) return { ...failure, reason };
  }
  // An unrecognised presentation failure is invalid, not tampered.
  return { match: /./, type: TYPES.INVALID, reason: reasons[0] };
};

export interface PresentationError {
  type: string;
  /** Overriding copy, where no existing failureMessage conveys the cause. */
  message?: string;
}

/**
 * The single error a failing presentation should be reported as, or undefined when the
 * fragments describe no presentation failure at all (a credential, or a valid presentation).
 *
 * `doc` is optional; without it, copy that names a credential falls back to the position alone
 * rather than the tab label.
 */
export const getPresentationError = (
  frags: VerificationFragment[] | null | undefined,
  doc?: unknown
): PresentationError | undefined => {
  if (!frags?.length) return undefined;
  const failure = matchPresentationFailure(frags);
  if (!failure) return undefined;
  const { message, reason, type } = failure;
  return { type, message: typeof message === "function" ? message(reason, doc) : message };
};
