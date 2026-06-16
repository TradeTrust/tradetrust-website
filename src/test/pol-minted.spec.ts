import { Selector } from "testcafe";
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { location, navigateToVerify, uploadDocument, validateIssuerTexts, validateTextContent } from "./helper";

const FIXTURE_DIR = resolve(__dirname, "fixture");
const OA_POL_MINTED = `${FIXTURE_DIR}/pol/oa-pol-minted.json`;
const W3C_POL_MINTED = `${FIXTURE_DIR}/pol/w3c-pol-minted.json`;

function writeTempDoc(name: string, doc: object): string {
  const path = resolve(tmpdir(), name);
  writeFileSync(path, JSON.stringify(doc));
  return path;
}

const DropZone = Selector("[data-testid='certificate-dropzone']");
const TryAnotherButton = Selector("[data-testid='try-another']");

// ── Polygon mainnet (POL) – OA v2 ─────────────────────────────────────────

fixture("Polygon mainnet (POL) – OA v2 minted document").page`${location}`;

test("[POL OA] valid minted document verifies successfully", async () => {
  await navigateToVerify();
  await uploadDocument(OA_POL_MINTED);
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
});

test("[POL OA] tampered document shows hash error", async (t) => {
  const doc = JSON.parse(readFileSync(OA_POL_MINTED, "utf-8"));
  doc.data.recipient.name = doc.data.recipient.name.replace(/:.*$/, ":string:TAMPERED");
  const tempPath = writeTempDoc("oa-pol-tampered.json", doc);
  await navigateToVerify();
  await uploadDocument(tempPath);
  await TryAnotherButton.with({ visibilityCheck: true })();
  await validateTextContent(t, DropZone, ["Document has been tampered with"]);
});

test("[POL OA] unissued document shows not issued error", async (t) => {
  const doc = JSON.parse(readFileSync(OA_POL_MINTED, "utf-8"));
  doc.signature.merkleRoot = "0000000000000000000000000000000000000000000000000000000000000099";
  const tempPath = writeTempDoc("oa-pol-not-issued.json", doc);
  await navigateToVerify();
  await uploadDocument(tempPath);
  await TryAnotherButton.with({ visibilityCheck: true })();
  await validateTextContent(t, DropZone, ["Document not issued"]);
});

// ── Polygon mainnet (POL) – W3C VC ───────────────────────────────────────

fixture("Polygon mainnet (POL) – W3C VC minted document").page`${location}`;

test("[POL W3C] valid minted document verifies successfully", async () => {
  await navigateToVerify();
  await uploadDocument(W3C_POL_MINTED);
  await validateIssuerTexts(["DID:WEB:TRUSTVC.GITHUB.IO:DID:1"]);
});

test("[POL W3C] tampered document shows hash error", async (t) => {
  const doc = JSON.parse(readFileSync(W3C_POL_MINTED, "utf-8"));
  doc.credentialSubject.drawerCompanyName = "TAMPERED COMPANY NAME";
  const tempPath = writeTempDoc("w3c-pol-tampered.json", doc);
  await navigateToVerify();
  await uploadDocument(tempPath);
  await TryAnotherButton.with({ visibilityCheck: true })();
  await validateTextContent(t, DropZone, ["Document has been tampered with"]);
});

test("[POL W3C] document with invalid credential status shows error", async (t) => {
  const doc = JSON.parse(readFileSync(W3C_POL_MINTED, "utf-8"));
  doc.credentialStatus.tokenId = "0000000000000000000000000000000000000000000000000000000000000099";
  const tempPath = writeTempDoc("w3c-pol-not-issued.json", doc);
  await navigateToVerify();
  await uploadDocument(tempPath);
  await TryAnotherButton.with({ visibilityCheck: true })();
  await validateTextContent(t, DropZone, ["Document is invalid"]);
});
