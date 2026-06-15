/**
 * End-to-end verification tests for minted documents on:
 *   - Polygon Amoy testnet (chainId 80002)
 *   - Polygon mainnet / POL (chainId 137)
 *
 * Covers OA v2 and W3C VC document formats.
 *
 * Prerequisites: the app must be running on http://localhost:3000
 *   npm run serve-static
 */

import { resolve } from "path";
import { location, navigateToVerify, uploadDocument, validateIssuerTexts } from "./helper";

const FIXTURE_DIR = resolve(__dirname, "fixture");

const OA_AMOY_MINTED = `${FIXTURE_DIR}/amoy/oa-amoy-minted.json`;
const W3C_AMOY_MINTED = `${FIXTURE_DIR}/amoy/w3c-amoy-minted.json`;
const OA_POL_MINTED = `${FIXTURE_DIR}/pol/oa-pol-minted.json`;
const W3C_POL_MINTED = `${FIXTURE_DIR}/pol/w3c-pol-minted.json`;

// ── Polygon Amoy testnet – OA v2 ──────────────────────────────────────────

fixture("Polygon Amoy – OA v2 minted document").page`${location}`;

test("[Amoy OA] valid minted document verifies successfully", async () => {
  await navigateToVerify();
  await uploadDocument(OA_AMOY_MINTED);
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
});

// ── Polygon Amoy testnet – W3C VC ─────────────────────────────────────────

fixture("Polygon Amoy – W3C VC minted document").page`${location}`;

test("[Amoy W3C] valid minted document verifies successfully", async () => {
  await navigateToVerify();
  await uploadDocument(W3C_AMOY_MINTED);
  await validateIssuerTexts(["DID:WEB:TRUSTVC.GITHUB.IO:DID:1"]);
});

// ── Polygon mainnet (POL) – OA v2 ─────────────────────────────────────────

fixture("Polygon mainnet (POL) – OA v2 minted document").page`${location}`;

test("[POL OA] valid minted document verifies successfully", async () => {
  await navigateToVerify();
  await uploadDocument(OA_POL_MINTED);
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
});

// ── Polygon mainnet (POL) – W3C VC ───────────────────────────────────────

fixture("Polygon mainnet (POL) – W3C VC minted document").page`${location}`;

test("[POL W3C] valid minted document verifies successfully", async () => {
  await navigateToVerify();
  await uploadDocument(W3C_POL_MINTED);
  await validateIssuerTexts(["DID:WEB:TRUSTVC.GITHUB.IO:DID:1"]);
});
