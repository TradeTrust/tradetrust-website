import { uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";

fixture("Multiple DNS Verified for Certificate Rendering").page`http://localhost:3000`;

test("Sample document is rendered correctly when multiple dns is verfied", async () => {
  uploadDocument("./fixture/sample-multidns-verified.json");
  await validateIssuerTexts(["EXAMPLE.TRADETRUST.IO and EXAMPLE.OPENATTESTATION.COM"]);
  await validateIframeTexts([
    "This is to certify that",
    "Mr Blockchain",
    "certification through training administered by",
  ]);
});
