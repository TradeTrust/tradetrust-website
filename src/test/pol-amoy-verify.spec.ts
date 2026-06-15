/**
 * End-to-end verification tests for Polygon Amoy (testnet, chainId 80002)
 * and Polygon POL mainnet (chainId 137).
 *
 * Covers OA v2 and W3C VC documents. All failure scenarios (tampered,
 * not-minted) are generated at runtime by mutating a copy of the
 * corresponding minted fixture — no separate "bad" fixture files needed.
 *
 *  Runtime mutations applied
 *  ─────────────────────────────────────────────────────────────────────────
 *  TAMPERED  OA  : signature.targetHash  → garbage hex string
 *  TAMPERED  W3C : proof.proofValue      → last char flipped
 *  NOT MINTED OA : signature.targetHash + signature.merkleRoot → unknown hash
 *  NOT MINTED W3C: credentialStatus.tokenId → unknown hash (never minted)
 *
 * Prerequisites: the app must be running on http://localhost:3000
 *   npm run serve-static
 */

import { Selector } from "testcafe";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, resolve } from "path";
import { tmpdir } from "os";
import { location, navigateToVerify, uploadDocument, validateIssuerTexts } from "./helper";

// ── paths ──────────────────────────────────────────────────────────────────
const FIXTURE_DIR = resolve(__dirname, "fixture");

const OA_AMOY_MINTED = join(FIXTURE_DIR, "amoy/oa-amoy-minted.json");
const OA_POL_MINTED = join(FIXTURE_DIR, "pol/oa-pol-minted.json");
const W3C_AMOY_MINTED = join(FIXTURE_DIR, "amoy/w3c-amoy-minted.json");
const W3C_POL_MINTED = join(FIXTURE_DIR, "pol/w3c-pol-minted.json");

// ── temp helpers ───────────────────────────────────────────────────────────
const TEMP_DIR = join(tmpdir(), "tt-pol-amoy-tests");
mkdirSync(TEMP_DIR, { recursive: true });

const UNUSED_HASH = "deadbeef" + "0".repeat(56); // 64-char hex, never minted

function writeTamperedOa(src: string, name: string): string {
  const doc = JSON.parse(readFileSync(src, "utf8"));
  doc.signature = { ...doc.signature, targetHash: UNUSED_HASH };
  const dest = join(TEMP_DIR, name);
  writeFileSync(dest, JSON.stringify(doc));
  return dest;
}

function writeNotMintedOa(src: string, name: string): string {
  const doc = JSON.parse(readFileSync(src, "utf8"));
  doc.signature = { ...doc.signature, targetHash: UNUSED_HASH, merkleRoot: UNUSED_HASH };
  const dest = join(TEMP_DIR, name);
  writeFileSync(dest, JSON.stringify(doc));
  return dest;
}

function writeTamperedW3c(src: string, name: string): string {
  const doc = JSON.parse(readFileSync(src, "utf8"));
  const pv: string = doc.proof.proofValue;
  doc.proof = { ...doc.proof, proofValue: pv.slice(0, -1) + (pv.endsWith("A") ? "B" : "A") };
  const dest = join(TEMP_DIR, name);
  writeFileSync(dest, JSON.stringify(doc));
  return dest;
}

function writeNotMintedW3c(src: string, name: string): string {
  const doc = JSON.parse(readFileSync(src, "utf8"));
  doc.credentialStatus = { ...doc.credentialStatus, tokenId: UNUSED_HASH };
  const dest = join(TEMP_DIR, name);
  writeFileSync(dest, JSON.stringify(doc));
  return dest;
}

// Generate all runtime-modified fixtures once before the suite
const OA_AMOY_TAMPERED = writeTamperedOa(OA_AMOY_MINTED, "oa-amoy-tampered.json");
const OA_AMOY_NOT_MINTED = writeNotMintedOa(OA_AMOY_MINTED, "oa-amoy-not-minted.json");
const OA_POL_TAMPERED = writeTamperedOa(OA_POL_MINTED, "oa-pol-tampered.json");
const OA_POL_NOT_MINTED = writeNotMintedOa(OA_POL_MINTED, "oa-pol-not-minted.json");
const W3C_AMOY_TAMPERED = writeTamperedW3c(W3C_AMOY_MINTED, "w3c-amoy-tampered.json");
const W3C_AMOY_NOT_MINTED = writeNotMintedW3c(W3C_AMOY_MINTED, "w3c-amoy-not-minted.json");
const W3C_POL_TAMPERED = writeTamperedW3c(W3C_POL_MINTED, "w3c-pol-tampered.json");
const W3C_POL_NOT_MINTED = writeNotMintedW3c(W3C_POL_MINTED, "w3c-pol-not-minted.json");

// ── selectors ─────────────────────────────────────────────────────────────
const InvalidBanner = Selector(".invalid");

// ══════════════════════════════════════════════════════════════════════════
// Polygon Amoy testnet (chainId 80002)  –  OA v2
// ══════════════════════════════════════════════════════════════════════════

fixture("POL/Amoy – OA v2 document verification").page`${location}`;

test("[Amoy OA] valid minted document – all checks pass", async () => {
  await navigateToVerify();
  await uploadDocument(OA_AMOY_MINTED);
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
});

test("[Amoy OA] tampered (targetHash mutated) – integrity INVALID", async () => {
  await navigateToVerify();
  await uploadDocument(OA_AMOY_TAMPERED);
  await InvalidBanner.with({ visibilityCheck: true })();
});

test("[Amoy OA] not-minted (merkleRoot replaced) – document status INVALID", async () => {
  await navigateToVerify();
  await uploadDocument(OA_AMOY_NOT_MINTED);
  await InvalidBanner.with({ visibilityCheck: true })();
});

// ──────────────────────────────────────────────────────────────────────────
// Polygon Amoy testnet  –  W3C VC
// ──────────────────────────────────────────────────────────────────────────

fixture("POL/Amoy – W3C VC document verification").page`${location}`;

test("[Amoy W3C] valid minted document – all checks pass", async () => {
  await navigateToVerify();
  await uploadDocument(W3C_AMOY_MINTED);
  await validateIssuerTexts(["DID:WEB:TRUSTVC.GITHUB.IO:DID:1"]);
});

test("[Amoy W3C] tampered (proofValue mutated) – integrity INVALID", async () => {
  await navigateToVerify();
  await uploadDocument(W3C_AMOY_TAMPERED);
  await InvalidBanner.with({ visibilityCheck: true })();
});

test("[Amoy W3C] not-minted (tokenId replaced) – document status INVALID", async () => {
  await navigateToVerify();
  await uploadDocument(W3C_AMOY_NOT_MINTED);
  await InvalidBanner.with({ visibilityCheck: true })();
});

// ══════════════════════════════════════════════════════════════════════════
// Polygon POL mainnet (chainId 137)  –  OA v2
// ══════════════════════════════════════════════════════════════════════════

fixture("POL mainnet – OA v2 document verification").page`${location}`;

test("[POL OA] tampered (targetHash mutated) – integrity INVALID", async () => {
  await navigateToVerify();
  await uploadDocument(OA_POL_TAMPERED);
  await InvalidBanner.with({ visibilityCheck: true })();
});

test("[POL OA] not-minted (merkleRoot replaced) – document status INVALID", async () => {
  await navigateToVerify();
  await uploadDocument(OA_POL_NOT_MINTED);
  await InvalidBanner.with({ visibilityCheck: true })();
});

// ──────────────────────────────────────────────────────────────────────────
// Polygon POL mainnet  –  W3C VC
// ──────────────────────────────────────────────────────────────────────────

fixture("POL mainnet – W3C VC document verification").page`${location}`;

test("[POL W3C] tampered (proofValue mutated) – integrity INVALID", async () => {
  await navigateToVerify();
  await uploadDocument(W3C_POL_TAMPERED);
  await InvalidBanner.with({ visibilityCheck: true })();
});

test("[POL W3C] not-minted (tokenId replaced) – document status INVALID", async () => {
  await navigateToVerify();
  await uploadDocument(W3C_POL_NOT_MINTED);
  await InvalidBanner.with({ visibilityCheck: true })();
});
