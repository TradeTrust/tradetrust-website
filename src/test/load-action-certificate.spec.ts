import { Selector } from "testcafe";
import { location, validateIframeTexts, validateIssuerTexts, validateTextContent } from "./helper";

fixture("Load action from plain certificate").page`${location}`;

const DocumentStatus = Selector("#document-status");
const CertificateDropzone = Selector("[data-testid='certificate-dropzone']");

test("Load document from action should work when url is valid", async (t) => {
  // const action = {
  //   type: "DOCUMENT",
  //   payload: {
  //     uri: `https://raw.githubusercontent.com/TradeTrust/tradetrust-website/refs/heads/master/src/test/fixture/amoy/ebl-amoy-trv5.json`,
  //     permittedActions: ["VIEW"],
  //     redirect: "https://tradetrust.io",
  //     chainId: 80002,
  //   },
  // };
  // await t.navigateTo(`${location}/?q=${encodeURI(JSON.stringify(action))}`);
  await t.navigateTo(
    `${location}/?q=%7B%22type%22%3A%22DOCUMENT%22%2C%22payload%22%3A%7B%22uri%22%3A%22https%3A%2F%2Fraw.githubusercontent.com%2FTradeTrust%2Ftradetrust-website%2Frefs%2Fheads%2Fmaster%2Fsrc%2Ftest%2Ffixture%2Famoy%2Febl-amoy-trv5.json%22%2C%22permittedActions%22%3A%5B%22VIEW%22%5D%2C%22redirect%22%3A%22https%3A%2F%2Ftradetrust.io%22%2C%22chainId%22%3A80002%7D%7D`
  );

  const button = Selector("button").withText("Dismiss");
  if (await button.exists) {
    await t.click(button);
  }

  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);
  await validateIframeTexts(["BILL OF LADING CARRIER"]);
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
