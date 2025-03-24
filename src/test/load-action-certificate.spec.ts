import { Selector } from "testcafe";
import { location, validateTextContent } from "./helper";

fixture("Load action from plain certificate").page`${location}`;

const DocumentStatus = Selector("#document-status");
const CertificateDropzone = Selector("[data-testid='certificate-dropzone']");

test("Load document from action should work when url is valid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gallery.openattestation.com/static/documents/tradetrust/v2/ebl-stability.json`,
      permittedActions: ["VIEW"],
      redirect: "https://tradetrust.io",
      chainId: 101010,
    },
  };
  await t.navigateTo(`${location}/?q=${encodeURI(JSON.stringify(action))}`);

  const button = Selector("button").withText("Dismiss");
  if (await button.exists) {
    await t.click(button);
  }

  await validateTextContent(t, CertificateDropzone, [
    "Document cannot be read.",
    "Please check that you have a valid .tt or .json file",
  ]);
});

test("Load document from action should fail when url is invalid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://raw.githubusercontent.com/Open-Attestation/gallery/master/static/documents/tradetrust/v2/ebl-stability-invalid.json`,
      redirect: "https://tradetrust.io",
      chainId: 101010,
    },
  };

  await t.navigateTo(`${location}/?q=${encodeURI(JSON.stringify(action))}`);

  await DocumentStatus.with({ visibilityCheck: false })();
  await validateTextContent(t, CertificateDropzone, [
    "Unable to load certificate with the provided parameters",
    "Unable to load the certificate from https://raw.githubusercontent.com/Open-Attestation/gallery/master/static/documents/tradetrust/v2/ebl-stability-invalid.json",
  ]);
});

test("Load document from action should fail when chainId not exists", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://raw.githubusercontent.com/TradeTrust/tradetrust-website/d24442baf8033d553824965ad8611f1558fe102f/src/test/fixture/amoy/ebl-amoy-v2.json`,
      redirect: "https://dev.tradetrust.io",
    },
  };

  await t.navigateTo(`${location}/?q=${encodeURI(JSON.stringify(action))}`);

  await DocumentStatus.with({ visibilityCheck: false })();
  await validateTextContent(t, CertificateDropzone, [
    "Unable to load certificate with the provided parameters",
    "This document has an invalid network field. Please contact your issuing authority for help or re-issue the document with a valid network field before trying again.",
  ]);
});
