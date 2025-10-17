import { Selector } from "testcafe";
import {
  Iframe,
  location,
  navigateToVerify,
  SampleTemplate,
  uploadDocument,
  validateIframeTexts,
  validateIssuerTexts,
  validateTextContent,
} from "./helper";

fixture("W3C Document").page`${location}`;

const TabsItems = Selector(".multi-tab");
const TabDefault = Selector("[data-testid='default']");
const TabAttachment = Selector("[data-testid='tab-attachment']");
const TabWordDoc = Selector("[data-testid='attachment-0']");
const TabExcel = Selector("[data-testid='attachment-1']");
const TabJpeg = Selector("[data-testid='attachment-2']");
const TabPdf1 = Selector("[data-testid='attachment-3']");
const TabPdf2 = Selector("[data-testid='attachment-4']");
const AttachmentNumber = Selector("[data-testid='attachment-number']");
const AttachmentLink = Selector("[data-testid='attachment-download-link']");
const Pdf1Span = Selector("span").withText("UNCITRAL Model Law on");
const Pdf2Span = Selector("span").withText("Dumm");

// Test scenarios for W3C credential files without attachments
const basicTestScenarios = [
  {
    version: "v1",
    credentialFile: "./fixture/local/w3c/v1_tr_er.json",
    dateField: "issuanceDate",
    dateValue: "2021-12-03T12:19:52Z",
    description: "basic W3C VC document",
  },
  {
    version: "v2.0",
    credentialFile: "./fixture/local/w3c/v2_tr_er_ECDSA_Signed.json",
    dateField: "validFrom",
    dateValue: "2024-04-01T12:19:52Z",
    description: "ECDSA V2.0 Signed W3C VC document",
    cryptoSuite: "ECDSA",
  },
  {
    version: "v2.0",
    credentialFile: "./fixture/local/w3c/v2_tr_er_ECDSA_Derived.json",
    dateField: "validFrom",
    dateValue: "2024-04-01T12:19:52Z",
    description: "ECDSA V2.0 Derived W3C VC document",
    cryptoSuite: "ECDSA",
  },
  {
    version: "v2.0",
    credentialFile: "./fixture/local/w3c/v2_tr_er_bbs2023_Signed.json",
    dateField: "validFrom",
    dateValue: "2024-04-01T12:19:52Z",
    description: "BBS 2023 V2.0 Signed W3C VC document",
    cryptoSuite: "BBS2023",
  },
  {
    version: "v2.0",
    credentialFile: "./fixture/local/w3c/v2_tr_er_bbs2023_Derived.json",
    dateField: "validFrom",
    dateValue: "2024-04-01T12:19:52Z",
    description: "BBS 2023 V2.0 Derived W3C VC document",
    cryptoSuite: "BBS2023",
  },
];

// Test scenarios for W3C credential files with attachments
const attachmentTestScenarios = [
  {
    version: "v1",
    credentialFile: "./fixture/local/w3c/v1_tr_er_attachment.json",
    dateField: "issuanceDate",
    dateValue: "2021-12-03T12:19:52Z",
    description: "W3C VC document with attachments",
    cryptoSuite: "ECDSA",
  },
  {
    version: "v2.0",
    credentialFile: "./fixture/local/w3c/v2_tr_er_attachment_ECDSA_Signed.json",
    dateField: "validFrom",
    dateValue: "2024-04-01T12:19:52Z",
    description: "ECDSA V2.0 Signed W3C VC document with attachments",
    cryptoSuite: "ECDSA",
  },
  {
    version: "v2.0",
    credentialFile: "./fixture/local/w3c/v2_tr_er_attachment_ECDSA_Derived.json",
    dateField: "validFrom",
    dateValue: "2024-04-01T12:19:52Z",
    description: "ECDSA V2.0 Derived W3C VC document with attachments",
    cryptoSuite: "ECDSA",
  },
  {
    version: "v2.0",
    credentialFile: "./fixture/local/w3c/v2_tr_er_attachment_bbs2023_signed.json",
    dateField: "validFrom",
    dateValue: "2024-04-01T12:19:52Z",
    description: "BBS 2023 V2.0 Signed W3C VC document with attachments",
    cryptoSuite: "BBS2023",
  },
  {
    version: "v2.0",
    credentialFile: "./fixture/local/w3c/v2_tr_er_attachment_bbs2023_derived.json",
    dateField: "validFrom",
    dateValue: "2024-04-01T12:19:52Z",
    description: "BBS 2023 V2.0 Derived W3C VC document with attachments",
    cryptoSuite: "BBS2023",
  },
];

// Run basic tests for documents without attachments
basicTestScenarios.forEach((scenario) => {
  test(`should render correctly when ${scenario.description} contains credentialStatus TransferableRecords with renderMethod EMBEDDED_RENDERER`, async () => {
    await navigateToVerify();
    await uploadDocument(scenario.credentialFile);
    await validateIssuerTexts([
      scenario.version === "v2.0" && scenario.cryptoSuite === "ECDSA"
        ? "DID:WEB:DISAPPOINTED-BLUSH-MOUSE.PLAYGROUND.FYNTECH.IO"
        : "DID:WEB:TRUSTVC.GITHUB.IO:DID:1",
    ]);
    await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);
  });
});

// Run attachment tests for documents with attachments
attachmentTestScenarios.forEach((scenario) => {
  test(`should render correctly when ${scenario.description} contains credentialStatus TransferableRecords with renderMethod EMBEDDED_RENDERER and attachment`, async (t) => {
    await navigateToVerify();
    await uploadDocument(scenario.credentialFile);
    await validateIssuerTexts([
      scenario.version === "v2.0" && scenario.cryptoSuite === "ECDSA"
        ? "DID:WEB:DISAPPOINTED-BLUSH-MOUSE.PLAYGROUND.FYNTECH.IO"
        : "DID:WEB:TRUSTVC.GITHUB.IO:DID:1",
    ]);
    await validateIframeTexts(["BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT"]);

    // tabs number should tally
    await TabDefault.with({ visibilityCheck: true })();
    await t.expect(TabsItems.count).eql(4);
    await t.expect(TabAttachment.textContent).contains("Attachments");
    await t.expect(AttachmentNumber.textContent).contains("5");

    // non-pdf tabs should not render
    await t.expect(TabWordDoc.count).eql(0);
    await t.expect(TabExcel.count).eql(0);
    await t.expect(TabJpeg.count).eql(0);

    // pdf tabs content should render (pdf rendering is slow on ci causing flaky test, await specifically for pdf spans to render before text validation checks)
    await t.click(TabPdf1);
    await t.switchToIframe(Iframe);
    await Pdf1Span.with({ visibilityCheck: true })();
    await validateTextContent(t, SampleTemplate, ["UNCITRAL Model Law on Electronic Transferable Records"]);
    await t.switchToMainWindow();

    await t.click(TabPdf2);
    await t.switchToIframe(Iframe);
    await Pdf2Span.with({ visibilityCheck: true })();
    await validateTextContent(t, SampleTemplate, ["Dummy PDF file"]);
    await t.switchToMainWindow();

    // attachment tab should render with correct attachment files count
    await t.click(TabAttachment);
    await t.expect(AttachmentLink.count).eql(5);
  });
});
