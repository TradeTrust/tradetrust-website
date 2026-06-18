import { resolve } from "path";
import { location, navigateToVerify, uploadDocument, validateIssuerTexts } from "./helper";

const FIXTURE_DIR = resolve(__dirname, "fixture");

const OA_AMOY_MINTED = `${FIXTURE_DIR}/amoy/oa-amoy-minted.json`;
const W3C_AMOY_MINTED = `${FIXTURE_DIR}/amoy/w3c-amoy-minted.json`;

fixture("Polygon Amoy – OA v2 minted document").page`${location}`;

test("[Amoy OA] valid minted document verifies successfully", async () => {
  await navigateToVerify();
  await uploadDocument(OA_AMOY_MINTED);
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
});

fixture("Polygon Amoy – W3C VC minted document").page`${location}`;

test("[Amoy W3C] valid minted document verifies successfully", async () => {
  await navigateToVerify();
  await uploadDocument(W3C_AMOY_MINTED);
  await validateIssuerTexts(["DID:WEB:TRUSTVC.GITHUB.IO:DID:1"]);
});
