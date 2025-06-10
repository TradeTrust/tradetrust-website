import { BigNumber, ethers } from "ethers";
import { MailSlurp } from "mailslurp-client";
import { ClientFunction, Selector } from "testcafe";
import {
  clickMagicIframeButton,
  getFileDownloadPath,
  inputMagicIframeTexts,
  location,
  navigateToCreator,
  navigateToVerify,
  uploadDocument,
  validateIframeTexts,
  validateMagicIframeSelector,
  waitForFileDownload,
} from "../helper";

let mailslurp: MailSlurp;

fixture("mfa sign-up test").page`${location}`.before(async () => {
  const apiKey = "dcae8f5583c4d03349aa0814ed81909347c422b2c803baccf20bf405c46dd48d"; //process.env.MAILSLURP_API_KEY;
  if (!apiKey) {
    throw "No MailSlurp API KEY defined";
  }
  mailslurp = new MailSlurp({ apiKey });
});

const nonTransferableView = Selector('[data-testid="forms-view-Transferable"]');
const billOfLadingTitle = nonTransferableView.find('[data-testid="form-select-0"]');
const previewOverlay = Selector('[data-testid="expand-preview"]');
const createDocumentButton = Selector('[data-testid="expandPreviewCreateDocument"]');
const setupModal = Selector('[data-testid="documentSetup"]');
const connectBlockchainModal = Selector('[data-testid="connect-blockchain-model"]');
const connectToMagicLink = Selector('[data-testid="connectToMagicLink"]');

const magicSigninModel = Selector("p")
  .withText(/Sign in to/)
  .parent();
// placeholder text Email address
const emailInput = magicSigninModel.find('[placeholder="Email address"]');
const signInButton = magicSigninModel.find('[aria-label="login-submit-button"]');

// Code model
const codeModel = Selector("h4").withText("Please enter the code sent to").parent();
const codeInput = codeModel.find("#pin-code-input-0");

// Wallet address
const walletAddressDiv = Selector('[data-testid="wallet-address"]');

// const disconnectMagic = Selector('[data-testid="disconnect-magic"]');
const continueMagic = Selector('[data-testid="continue-magic"]');
const networkSelectorModel = Selector('[data-testid="network-section-model"]');
const networkSelectorContinueBtn = Selector('[data-testid="overlayContinueBtn"]');

const setupSuccessMessage = Selector("#setup-item-description");
const continueButton = Selector('[data-testid="documentSetupContinue"]');
const formNextButton = Selector('[data-testid="form-next-button"]');
const processTitle = Selector('[data-testid="process-title"]');
const downloadButton = Selector('[data-testid="process-another-document-button"]');
const downloadFormModal = Selector('[data-testid="download-form"]');
const downloadAllButton = Selector('[data-testid="confirm-modal-download-button"]');
const getLocation = ClientFunction(() => document.location.href);

test("Can sign-up and verify account", async (t) => {
  // create email address for a test user
  const inbox = await mailslurp.inboxController.createInboxWithDefaults();

  // Step 1: Navigate to creator page
  await navigateToCreator();

  // Step 2: Preview "Bill of Lading" form
  await t.click(billOfLadingTitle);
  await t.expect(previewOverlay.exists).ok("Preview overlay should be visible");

  // Step 3: Create document
  await t.click(createDocumentButton);

  // Step 4: Connect to Blockchain Wallet: Magiclink
  await t.expect(connectBlockchainModal.exists).ok("Connect to Blockchain Wallet modal should appear");
  await t.click(Selector('[data-testid="connect-magic-header"]'));
  await t.expect(connectToMagicLink.exists).ok("Connect to MagicLink should appear");
  await t.click(connectToMagicLink);

  // Step 5: Sign in to Magic
  await t.wait(1000);
  await validateMagicIframeSelector(Selector("p").withText("Sign in to"));
  await inputMagicIframeTexts(emailInput, inbox.emailAddress);
  await clickMagicIframeButton(signInButton);

  // wait for verification code to arrive to email then extract code
  const email = await mailslurp.waitForLatestEmail(inbox.id, 30000, true);
  // use regex to extract the confirmation code which is 6 digits
  const code = /[^#]([0-9]{6})/.exec(email!.body!)?.[1];

  // Step 6: Enter verification code
  await t.wait(1000);
  await validateMagicIframeSelector(Selector("h4").withText(/Please enter the code sent to/));
  await inputMagicIframeTexts(codeInput, code!);
  await t.wait(5000);

  // Step 7: Get wallet address
  await t.expect(walletAddressDiv.exists).ok("Wallet address should be visible");
  const walletAddress = await walletAddressDiv.innerText;

  // Step 8: Transfer funds to wallet
  const wallet = new ethers.Wallet("0xe82294532bcfcd8e0763ee5cef194f36f00396be59b94fb418f5f8d83140d9a7");
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const signer = wallet.connect(provider);
  const balance = await signer.getBalance();
  if (!balance.gt(BigNumber.from("10000000000000000000"))) {
    // 10 ethers
    throw new Error("Insufficient balance");
  }
  const tx = await signer.sendTransaction({
    to: walletAddress,
    value: BigNumber.from("10000000000000000000"), // 10 ethers
  });
  await tx.wait();

  // TODO: Might need to remove this.
  await t.click(continueMagic);

  // Step 9: Network Selector
  await t.expect(networkSelectorModel.exists).ok("Network selector should appear");
  await t.click(networkSelectorContinueBtn);

  // Step 10: Setup document
  await t.wait(3000);
  await t.expect(setupModal.exists).ok("Document setup modal should appear");
  await t.expect(setupSuccessMessage.innerText).contains("Record Generated:", "Should show success message");

  // Step 10: Continue to form editor
  await t.click(continueButton);
  await t.expect(getLocation()).contains("/creator/form", "Should navigate to form editor");

  // Step 11: Input form
  await t.typeText(Selector('[data-testid="transferable-record-beneficiary-input"]'), walletAddress);
  await t.typeText(Selector('[data-testid="transferable-record-holder-input"]'), walletAddress);
  await t.typeText(Selector('[data-testid="transferable-record-remarks-input"]'), "Remarks");
  await t.typeText(Selector("#root_blNumber"), "123456789");
  await t.typeText(Selector("#root_scac"), "123456789");

  // Step 12: Submit form
  await t.click(formNextButton);
  await t.expect(getLocation()).contains("/creator/form-preview", "Should navigate to form preview");

  // Step 13: Validate preview content
  await validateIframeTexts(["BILL OF LADING"]);

  // Step 14: Issue the document
  await t.click(formNextButton);
  await t.expect(getLocation()).contains("/creator/publish", "Should navigate to publish page");
  await t.expect(processTitle.exists).ok("Issuance success title should be visible");
  await t.expect(processTitle.innerText).eql("Document issued successfully");

  // Step 15: Download issued document
  await t.click(downloadButton);
  await t.expect(downloadFormModal.exists).ok("Download modal should appear");
  await t.click(downloadAllButton);
  const filePath = getFileDownloadPath("Electronic-Bill-of-Lading-(Carrier)-1.tt");
  await t.expect(await waitForFileDownload(t, filePath)).eql(true, "Bill of Lading file should be downloaded");

  // Step 16: Return to form selection
  await t.click(downloadButton);
  await t.expect(getLocation()).match(/\/creator$/, "Should return to form selection page");

  // Step 17: Navigate to verify page
  await navigateToVerify();

  // Step 18: Upload issued document
  await uploadDocument(filePath);

  // Step 19: Validate content in viewer
  await validateIframeTexts(["BILL OF LADING"]);
});
