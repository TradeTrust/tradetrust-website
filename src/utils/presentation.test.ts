import fs from "fs";
import path from "path";
import {
  getCredentialDownloadName,
  getCredentialLabel,
  getCredentialVersionTag,
  getPresentationCredentials,
  getPresentationHolder,
  getW3CVersionLabel,
  isVerifiablePresentation,
} from "./presentation";
import { getAttachments, getOpenAttestationData } from "./shared";

const fixture = (name: string) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "../test/fixture/w3c/presentations", name), "utf8"));

const twoCredentials = fixture("valid/two_credentials.json");
const singleCredential = fixture("valid/single_credential.json");

describe("isVerifiablePresentation", () => {
  it("recognises a signed presentation", () => {
    expect(isVerifiablePresentation(twoCredentials)).toBe(true);
  });

  it("recognises an unsigned presentation, so it can be reported invalid rather than read as a credential", () => {
    expect(isVerifiablePresentation(fixture("invalid/unsigned.json"))).toBe(true);
  });

  it("recognises the loose shapes trustvc's own VP router accepts", () => {
    // No @context, and an empty credential list — both rejected by the strict predicates but
    // routed to the VP fragments, which report on them explicitly.
    expect(isVerifiablePresentation({ type: ["VerifiablePresentation"], verifiableCredential: [] })).toBe(true);
  });

  it("rejects a credential, and anything that is not an object", () => {
    expect(isVerifiablePresentation(twoCredentials.verifiableCredential[0])).toBe(false);
    expect(isVerifiablePresentation(null)).toBe(false);
    expect(isVerifiablePresentation("presentation")).toBe(false);
    expect(isVerifiablePresentation({ type: ["VerifiablePresentation"] })).toBe(false);
  });
});

describe("getPresentationCredentials", () => {
  it("returns every embedded credential", () => {
    expect(getPresentationCredentials(twoCredentials)).toHaveLength(2);
    expect(getPresentationCredentials(singleCredential)).toHaveLength(1);
  });

  it("normalises a single credential object into an array", () => {
    const vp = { ...singleCredential, verifiableCredential: singleCredential.verifiableCredential[0] };
    expect(getPresentationCredentials(vp)).toHaveLength(1);
  });

  it("returns [] for anything that is not a presentation", () => {
    expect(getPresentationCredentials(singleCredential.verifiableCredential[0])).toEqual([]);
    expect(getPresentationCredentials(undefined)).toEqual([]);
  });
});

describe("getPresentationHolder", () => {
  it("upper-cases the holder DID, matching every other identity in the verify UI", () => {
    expect(getPresentationHolder(twoCredentials)).toBe(twoCredentials.holder.toUpperCase());
  });

  it("reads an object-shaped holder", () => {
    expect(getPresentationHolder({ holder: { id: "did:key:abc" } })).toBe("DID:KEY:ABC");
  });

  it("falls back to Unknown when no holder is declared", () => {
    expect(getPresentationHolder({})).toBe("Unknown");
  });
});

describe("getCredentialLabel", () => {
  it("prefers the renderer template name, which is what tells credentials apart on screen", () => {
    const [first] = getPresentationCredentials(twoCredentials);
    expect(getCredentialLabel(first, 0)).toBe("CHAFTA COO");
  });

  it("falls back to the specific type, then to the position", () => {
    expect(getCredentialLabel({ type: ["VerifiableCredential", "BillOfLading"] }, 0)).toBe("BillOfLading");
    expect(getCredentialLabel({ type: ["VerifiableCredential"] }, 1)).toBe("Credential 2");
    expect(getCredentialLabel({}, 0)).toBe("Credential 1");
  });

  it("ignores non-string types rather than returning one", () => {
    // A presentation is user-supplied JSON, so `type` can hold anything. A non-string entry used
    // to survive the filter and be returned as the label, which then threw on the caller's
    // .toLowerCase() and put a non-renderable value into the tab.
    expect(getCredentialLabel({ type: [{ malformed: true }] }, 0)).toBe("Credential 1");
    expect(getCredentialLabel({ type: [42, null, "BillOfLading"] }, 0)).toBe("BillOfLading");
    expect(getCredentialLabel({ type: { not: "an array" } }, 2)).toBe("Credential 3");
  });

  it("does not throw building a download name from a malformed type", () => {
    expect(() => getCredentialDownloadName("presentation.json", { type: [{ malformed: true }] }, 0)).not.toThrow();
    expect(getCredentialDownloadName("presentation.json", { type: [{ malformed: true }] }, 0)).toBe(
      "presentation-credential-1"
    );
  });
});

describe("getW3CVersionLabel / getCredentialVersionTag", () => {
  it("reads the data model from the first @context entry", () => {
    expect(getW3CVersionLabel(twoCredentials)).toBe("V2.0");
    expect(getW3CVersionLabel({ "@context": ["https://www.w3.org/2018/credentials/v1"] })).toBe("V1.1");
    expect(getW3CVersionLabel({})).toBe("V1.1");
  });

  it("tags a credential the way a standalone credential is tagged", () => {
    expect(getCredentialVersionTag(getPresentationCredentials(twoCredentials)[0])).toBe("W3C VC V2.0");
  });
});

describe("getCredentialDownloadName", () => {
  it("qualifies the presentation filename with the credential, so tabs do not overwrite each other", () => {
    const [first, second] = getPresentationCredentials(twoCredentials);
    // No extension — the utility bar appends its own.
    expect(getCredentialDownloadName("presentation.json", first, 0)).toBe("presentation-chafta-coo-1");
    expect(getCredentialDownloadName("presentation.json", second, 1)).not.toBe(
      getCredentialDownloadName("presentation.json", first, 0)
    );
  });

  it("stays distinct for credentials that share a label", () => {
    // Labels are NOT unique — two bills of lading in one presentation slug identically. Naming
    // on the slug alone let one tab's download overwrite the other's, which is the collision
    // this function exists to prevent.
    const bol = { renderMethod: [{ templateName: "BILL_OF_LADING" }] };
    expect(getCredentialDownloadName("presentation.json", bol, 0)).toBe("presentation-bill-of-lading-1");
    expect(getCredentialDownloadName("presentation.json", bol, 1)).toBe("presentation-bill-of-lading-2");
  });

  it("copes with no filename and an unlabelled credential", () => {
    expect(getCredentialDownloadName("", {}, 0)).toBe("presentation-credential-1");
  });
});

describe("shared helpers on a presentation", () => {
  it("treats a presentation as its own document data, rather than throwing", () => {
    // getDocumentData throws on a presentation, which would take down every caller.
    expect(getOpenAttestationData(twoCredentials)).toBe(twoCredentials);
  });

  it("reports no attachments on the envelope — each credential is asked on its own tab", () => {
    expect(getAttachments(fixture("valid/with_attachments.json"))).toEqual([]);
  });
});
