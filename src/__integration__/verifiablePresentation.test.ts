/**
 * Real verification of Verifiable Presentations — nothing here is mocked.
 *
 * Every other VP test in this repo hands hand-built fragments to the code under test, which
 * proves the mapping but not that a presentation actually verifies. This suite runs the real
 * trustvc verifier over the real fixtures, so a change in the verifier's wording or verdicts
 * breaks these tests instead of silently changing what users are told.
 *
 * Runs under the node environment (jest.integration.config.js) because ECDSA verification needs
 * genuine WebCrypto. Under jsdom `node:crypto` is shimmed by crypto-browserify, which has no
 * `webcrypto`, and every signature check fails with "reading 'subtle'" — a valid presentation
 * would then look invalid and these assertions would pass for the wrong reason.
 *
 * A few cases reach the network (resolving a hosted did:web document, fetching a revocation
 * status list), hence the generous timeout in the config.
 */
import fs from "fs";
import path from "path";
import { verifyDocument, isValid, errorMessages, VerificationFragment } from "@trustvc/trustvc";
import {
  getCredentialDownloadName,
  getCredentialLabel,
  getPresentationCredentials,
  getPresentationHolder,
  getW3CVersionLabel,
  isVerifiablePresentation,
} from "../utils/presentation";
import { getPresentationError } from "../utils/presentationErrors";
import { getAttachments, getOpenAttestationData } from "../utils/shared";

const DIR = path.join(__dirname, "../test/fixture/w3c/presentations");
const load = (name: string) => JSON.parse(fs.readFileSync(path.join(DIR, name), "utf8"));

const twoCredentials = load("valid/two_credentials.json");
const singleCredential = load("valid/single_credential.json");
const withAttachments = load("valid/with_attachments.json");

/** Verified once per fixture and shared — each run is several round trips. */
const fragmentCache = new Map<string, VerificationFragment[]>();
const verify = async (name: string): Promise<VerificationFragment[]> => {
  if (!fragmentCache.has(name)) {
    fragmentCache.set(name, (await verifyDocument(load(name) as never)) as VerificationFragment[]);
  }
  return fragmentCache.get(name)!;
};

const groupStatus = (frags: VerificationFragment[], type: string) => {
  const group = frags.filter((f) => f.type === type && f.status !== "SKIPPED");
  if (group.length === 0) return "MISSING";
  return group.some((f) => f.status === "INVALID" || f.status === "ERROR") ? "INVALID" : "VALID";
};

/**
 * Fixtures that reach the internet: didweb_issuer resolves a hosted did:web document, and
 * credential_revoked fetches a revocation status list. Everything else is did:key and offline.
 *
 * They run by DEFAULT — they are the cases most worth having, and quietly skipping them would
 * drop exactly the coverage this suite exists for. Set SKIP_NETWORK_TESTS=1 where there is no
 * egress (a sandboxed runner, an offline laptop) to leave them out without failing the run.
 */
const skipNetwork = process.env.SKIP_NETWORK_TESTS === "1";
const NETWORK_FIXTURES = ["valid/didweb_issuer.json", "invalid/credential_revoked.json"];
const needsNetwork = (fixture: string) => NETWORK_FIXTURES.includes(fixture);

const ALL_VALID_FIXTURES = [
  "valid/single_credential.json",
  "valid/two_credentials.json",
  "valid/with_attachments.json",
  "valid/mixed_suites.json",
  "valid/didweb_issuer.json",
];

/** Only VERIFICATION touches the network; detection is pure, so it is never gated. */
const VALID_FIXTURES = ALL_VALID_FIXTURES.filter((fixture) => !(skipNetwork && needsNetwork(fixture)));

describe("Verifiable Presentation — detection", () => {
  it.each(ALL_VALID_FIXTURES)("recognises %s as a presentation", (name) => {
    expect(isVerifiablePresentation(load(name))).toBe(true);
  });

  it("does not mistake an embedded credential for a presentation", () => {
    expect(isVerifiablePresentation(twoCredentials.verifiableCredential[0])).toBe(false);
  });

  it("ignores the proof, so an unsigned presentation is still routed in", () => {
    const unsigned = { ...twoCredentials };
    delete unsigned.proof;
    expect(isVerifiablePresentation(unsigned)).toBe(true);
  });
});

describe("Verifiable Presentation — a valid presentation", () => {
  it.each(VALID_FIXTURES)("%s passes every check", async (name) => {
    const frags = await verify(name);
    expect(groupStatus(frags, "DOCUMENT_INTEGRITY")).toBe("VALID");
    expect(groupStatus(frags, "DOCUMENT_STATUS")).toBe("VALID");
    expect(groupStatus(frags, "ISSUER_IDENTITY")).toBe("VALID");
    expect(isValid(frags)).toBe(true);
  });

  it("emits all three presentation fragments, so the envelope is genuinely checked", async () => {
    const frags = await verify("valid/two_credentials.json");
    const vpFragments = frags.filter((f) => f.name.startsWith("W3CVp"));
    expect(vpFragments.map((f) => f.name).sort()).toEqual([
      "W3CVpCredentialStatus",
      "W3CVpIssuerIdentity",
      "W3CVpSignatureIntegrity",
    ]);
    expect(vpFragments.every((f) => f.status === "VALID")).toBe(true);
  });

  it("reports no error at all", async () => {
    expect(getPresentationError(await verify("valid/two_credentials.json"), twoCredentials)).toBeUndefined();
  });
});

/**
 * One case per way a presentation can fail. `type` is the error the UI reports; `match` is
 * asserted against the copy the user actually sees.
 */
describe("Verifiable Presentation — how each failure is reported", () => {
  const CASES: Array<{
    fixture: string;
    failing: "DOCUMENT_INTEGRITY" | "DOCUMENT_STATUS" | "ISSUER_IDENTITY";
    type: string;
    match: RegExp;
  }> = [
    {
      fixture: "invalid/unsigned.json",
      failing: "DOCUMENT_INTEGRITY",
      type: "INVALID",
      match: /not signed, so the presenter cannot prove they hold these credentials/i,
    },
    {
      fixture: "invalid/holder_mismatch.json",
      failing: "DOCUMENT_INTEGRITY",
      type: "INVALID",
      match: /signed by someone other than the holder it names/i,
    },
    {
      fixture: "invalid/tampered_credential.json",
      failing: "DOCUMENT_INTEGRITY",
      type: "HASH",
      match: /tampered/i,
    },
    {
      fixture: "invalid/presentation_expired.json",
      failing: "DOCUMENT_STATUS",
      type: "INVALID",
      match: /Ask the holder to present the credentials again/i,
    },
    {
      fixture: "invalid/credential_expired.json",
      failing: "DOCUMENT_STATUS",
      type: "INVALID",
      match: /Ask the issuer to reissue/i,
    },
    {
      fixture: "invalid/credential_revoked.json",
      failing: "DOCUMENT_STATUS",
      type: "REVOKED",
      match: /revoked by its issuer/i,
    },
    {
      fixture: "invalid/unresolvable_issuer.json",
      failing: "ISSUER_IDENTITY",
      type: "IDENTITY",
      match: /names an issuer that cannot be identified/i,
    },
  ];

  const RUNNABLE = CASES.filter(({ fixture }) => !(skipNetwork && needsNetwork(fixture)));

  it.each(RUNNABLE)("$fixture fails $failing and is reported as $type", async ({ fixture, failing, type, match }) => {
    const frags = await verify(fixture);
    expect(groupStatus(frags, failing)).toBe("INVALID");
    expect(isValid(frags)).toBe(false);

    const error = getPresentationError(frags, load(fixture));
    expect(error?.type).toBe(type);
    // Where getPresentationError sets no override (HASH), the established copy already fits and
    // is what the UI renders. Resolve it from production rather than restating it here, so
    // changing that copy fails this test instead of silently passing against a stale literal.
    expect(error?.message ?? errorMessages.MESSAGES[error!.type].failureMessage).toMatch(match);
  });

  it("never leaks raw verifier wording to the user", async () => {
    for (const { fixture } of RUNNABLE) {
      const error = getPresentationError(await verify(fixture), load(fixture));
      // These are the verifier's own strings; none should reach the UI verbatim.
      expect(error?.message ?? "").not.toMatch(/Invalid signature\.|validUntil|status purpose|did:web:/);
    }
  });

  it("never calls an expired or unsigned presentation tampered", async () => {
    for (const fixture of ["invalid/presentation_expired.json", "invalid/unsigned.json"]) {
      const error = getPresentationError(await verify(fixture), load(fixture));
      expect(error?.type).not.toBe("HASH");
    }
  });

  it("blames the unresolvable issuer rather than the signature failure it causes", async () => {
    // This fixture fails BOTH integrity and identity: the signature cannot be checked without
    // the issuer's key. Reported the other way round, an unpublished did:web reads as tampering.
    const frags = await verify("invalid/unresolvable_issuer.json");
    expect(groupStatus(frags, "DOCUMENT_INTEGRITY")).toBe("INVALID");
    expect(groupStatus(frags, "ISSUER_IDENTITY")).toBe("INVALID");
    expect(getPresentationError(frags, load("invalid/unresolvable_issuer.json"))?.type).toBe("IDENTITY");
  });

  it("names the credential at fault by the position and label its tab shows", async () => {
    // Deliberately an OFFLINE fixture: this assertion is about the copy, not about revocation,
    // and naming a network fixture here would fail under SKIP_NETWORK_TESTS.
    const fixture = "invalid/credential_expired.json";
    const [first] = getPresentationCredentials(load(fixture));
    const label = getCredentialLabel(first, 0);
    const error = getPresentationError(await verify(fixture), load(fixture));

    expect(error?.message).toContain("Credential 1");

    // This fixture's credential declares neither a renderer template nor a specific type, so its
    // label IS the positional fallback. The copy must not then stutter as
    // `Credential 1 ("Credential 1")` — the parenthetical is only worth adding when it says
    // something the position does not. (The labelled path is covered in presentationErrors.test.)
    expect(label).toBe("Credential 1");
    expect(error?.message).not.toContain('("Credential 1")');
  });
});

describe("Verifiable Presentation — document helpers against real fixtures", () => {
  it("treats the presentation as its own document data instead of throwing", () => {
    // getDocumentData throws on a presentation, taking every caller down with it.
    expect(() => getOpenAttestationData(twoCredentials)).not.toThrow();
    expect(getOpenAttestationData(twoCredentials)).toBe(twoCredentials);
  });

  it("reads the presentation expiry without throwing", () => {
    const expired = load("invalid/presentation_expired.json");
    const data = getOpenAttestationData(expired) as { validUntil?: string };
    expect(new Date(data.validUntil!).getTime()).toBeLessThan(Date.now());
  });

  it("reports no attachments on the envelope even when a credential has them", () => {
    expect(getAttachments(withAttachments)).toEqual([]);
    const [credential] = getPresentationCredentials(withAttachments);
    expect(getAttachments(credential)?.length).toBeGreaterThan(0);
  });

  it("extracts every embedded credential", () => {
    expect(getPresentationCredentials(twoCredentials)).toHaveLength(2);
    expect(getPresentationCredentials(singleCredential)).toHaveLength(1);
  });

  it("reads the holder, which is who the UI names as presenter", () => {
    expect(getPresentationHolder(twoCredentials)).toBe(twoCredentials.holder.toUpperCase());
  });

  it("labels credentials distinctly, so the tabs can be told apart", () => {
    const labels = getPresentationCredentials(twoCredentials).map(getCredentialLabel);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it("gives every credential a distinct download name", () => {
    const names = getPresentationCredentials(twoCredentials).map((c, i) =>
      getCredentialDownloadName("presentation.json", c, i)
    );
    expect(new Set(names).size).toBe(names.length);
  });

  it("tags the envelope by its own data model", () => {
    expect(getW3CVersionLabel(twoCredentials)).toBe("V2.0");
  });
});
