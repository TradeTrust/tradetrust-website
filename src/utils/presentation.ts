import { vc } from "@trustvc/trustvc";

/**
 * Whether trustvc's verifier will treat this document as a Verifiable Presentation.
 *
 * `vc.isRawPresentation` and `vc.isSignedPresentation` are the library's own predicates and
 * do the work for every well-formed document — they are mutually exclusive (raw = unsigned,
 * signed = has a holder proof), so answering "is this a presentation at all?" needs both.
 *
 * The shape check after them is NOT redundant. trustvc routes documents into its VP verifier
 * fragments with an internal, unexported predicate that looks only at `type` +
 * `verifiableCredential`, so it accepts two shapes the strict predicates reject: a
 * presentation with no `@context`, and one with an empty credential list — the latter being a
 * case its own W3CVpIssuerIdentity fragment reports on explicitly. If this predicate
 * disagreed with that router, such a document would be sent down the credential path, where
 * getDocumentData throws and the UI shows a generic failure instead of the verifier's actual
 * finding.
 *
 * `proof` is deliberately not required, so an unsigned presentation is still recognised and
 * can be reported invalid rather than silently treated as a credential.
 */
export const isVerifiablePresentation = (rawDocument: unknown): boolean => {
  if (!rawDocument || typeof rawDocument !== "object") return false;
  if (vc.isRawPresentation(rawDocument) || vc.isSignedPresentation(rawDocument)) {
    return true;
  }
  const { type, verifiableCredential } = rawDocument as {
    type?: string | string[];
    verifiableCredential?: unknown;
  };
  const types = Array.isArray(type) ? type : [type];
  return types.includes("VerifiablePresentation") && verifiableCredential !== undefined;
};

/**
 * The credentials embedded in a presentation, always as an array — `verifiableCredential` may
 * be a single object or a list. Returns [] for anything that is not a presentation.
 */
export const getPresentationCredentials = (rawDocument: unknown): any[] => {
  if (!isVerifiablePresentation(rawDocument)) return [];
  const credentials = (rawDocument as { verifiableCredential?: unknown }).verifiableCredential;
  if (!credentials) return [];
  return Array.isArray(credentials) ? credentials : [credentials];
};

/**
 * A presentation has no issuer of its own: it is asserted by the HOLDER, and each embedded
 * credential carries its own issuer. Show the holder, since that is who is making the claim to
 * the verifier. (The embedded issuers are still checked — the W3CVpIssuerIdentity fragment
 * resolves every one of them.)
 */
export const getPresentationHolder = (rawDocument: any): string => {
  const holder = typeof rawDocument?.holder === "string" ? rawDocument.holder : rawDocument?.holder?.id;
  return holder?.toUpperCase() || "Unknown";
};

/**
 * What a credential calls itself: the renderer template name, else its `type` (minus the generic
 * `VerifiableCredential`). Undefined when it declares neither.
 *
 * Kept separate from getCredentialLabel because that function's positional fallback is only
 * appropriate for display. Callers that append their own position need the descriptive part
 * alone, or they end up repeating it — `credential-1-1`.
 */
const getCredentialDescriptor = (credential: any): string | undefined => {
  const templateName = [credential?.renderMethod].flat()?.[0]?.templateName;
  if (typeof templateName === "string" && templateName.trim()) {
    return templateName.replace(/_/g, " ");
  }
  // A presentation is user-supplied JSON, so `type` can hold anything. `filter(Boolean) as
  // string[]` merely told the compiler otherwise: a non-string entry survived, was returned as
  // the descriptor, and threw on the caller's .toLowerCase(). Narrow for real.
  const types = [credential?.type].flat().filter((type): type is string => typeof type === "string");
  return types.find((type) => type !== "VerifiableCredential");
};

/**
 * A short label for a credential's tab. Prefers the renderer template name, which is what
 * distinguishes one credential from another on screen; falls back to its `type` (minus the
 * generic `VerifiableCredential`), then to a 1-based position.
 */
export const getCredentialLabel = (credential: any, index: number): string =>
  getCredentialDescriptor(credential) ?? `Credential ${index + 1}`;

/** The VC Data Model 2.0 context URL — the first `@context` entry of a v2 document. */
const VC_V2_CONTEXT = "https://www.w3.org/ns/credentials/v2";

/**
 * The data-model version label for a credential or presentation: 'V2.0' or 'V1.1'.
 *
 * `vc.isSignedDocumentV2_0` only answers this for signed CREDENTIALS, so it cannot classify a
 * presentation envelope; both are decided the same way, by the first `@context` entry.
 */
export const getW3CVersionLabel = (document: any): "V2.0" | "V1.1" => {
  const first = [document?.["@context"]].flat()[0];
  return first === VC_V2_CONTEXT ? "V2.0" : "V1.1";
};

/**
 * The version tag shown against a credential embedded in a presentation, matching the tag the
 * document status panel shows for a standalone credential.
 */
export const getCredentialVersionTag = (credential: any): string => `W3C VC ${getW3CVersionLabel(credential)}`;

/**
 * The download name for one credential inside a presentation, without an extension — the
 * utility bar appends its own.
 *
 * Left alone, DocumentUtility names the download after the document's own `name` field and
 * falls back to "Untitled". Inside a presentation that collides: every credential without a
 * `name` saves as `Untitled.tt`, and each tab holds DIFFERENT content, so one silently
 * overwrites another. Qualify the presentation's filename with the credential instead:
 * `presentation-chafta-coo-1`.
 *
 * The POSITION is always appended, never only as a fallback for a missing label. Labels are not
 * unique — two bills of lading in one presentation produce the same slug, and naming on the slug
 * alone reintroduced exactly the collision this function exists to prevent. The position is the
 * only thing guaranteed distinct, and it matches the tab order on screen.
 */
export const getCredentialDownloadName = (presentationFileName: string, credential: any, index: number): string => {
  const base = (presentationFileName || "presentation").replace(/\.(json|tt)$/i, "");
  const slug = (getCredentialDescriptor(credential) ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base}-${slug || "credential"}-${index + 1}`;
};
