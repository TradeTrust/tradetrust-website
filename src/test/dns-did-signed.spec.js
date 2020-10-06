import { Selector } from "testcafe";
import { uploadDocument, validateIframeTexts, validateIssuerTexts } from "./helper";

fixture("DNS Certificate Rendering").page`http://localhost:3000`;

const ButtonUploadAddressBook = Selector("[data-testid='multi-button'] button").withText("Address Book");

test("sample document is rendered correctly when dns is verified", async (t) => {
  await uploadDocument("./fixture/sample-dns-did-signed.json");
  await validateIssuerTexts(["DONOTVERIFY.TESTING.OPENATTESTATION.COM"]);

  await t.expect(ButtonUploadAddressBook.count).eql(0);

  await validateIframeTexts([
    "Name & Address of Shipping Agent/Freight Forwarder",
    "CERTIFICATE OF NON-MANIPULATION",
    "PETER LEE",
    "Certification by Singapore Customs",
    "AQSIQ170923130",
  ]);
});
