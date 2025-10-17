import { location, navigateToVerify, uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";

fixture("DNS DID Certificate Rendering").page`${location}`;

test("sample document is rendered correctly when dns did is verified", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/did/dns-did-verified.json");
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO"]);

  await validateIframeTexts([
    "Name & Address of Shipping Agent/Freight Forwarder",
    "CERTIFICATE OF NON-MANIPULATION",
    "DEMO CUSTOMS",
    "Certification by Singapore Customs",
    "AQSIQ170923130",
  ]);
});

test("W3C DM 2.0 document is rendered correctly when dns did is verified", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/w3c/v2_tr_er_ECDSA_Derived.json");
  await validateIssuerTexts(["DISAPPOINTED-BLUSH-MOUSE.PLAYGROUND.FYNTECH.IO"]);

  await validateIframeTexts(["BILL OF LADING", "20250107"]);
});

test("W3C DM 2.0 BBS2023 document is rendered correctly when dns did is verified", async () => {
  await navigateToVerify();
  await uploadDocument("./fixture/local/w3c/v2_tr_er_bbs2023_Derived.json");
  await validateIssuerTexts(["DID:WEB:TRUSTVC.GITHUB.IO:DID:1"]);

  await validateIframeTexts(["BILL OF LADING", "20250107"]);
});
