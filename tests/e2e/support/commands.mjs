import "cypress-file-upload";

const METAMASK_WAIT = 5000;
const RENDERER_WAIT = 5000;

Cypress.Commands.add("waitAndUploadFile", (file) => {
  cy.get("input[type=file]").attachFile(file);
  cy.wait(RENDERER_WAIT);
});

Cypress.Commands.add("connectToMetamaskWalletAndApproveAllAccounts", () => {
  cy.get("[data-testid='connectToWallet']")
    // use cypress-if package functions
    .if("visible")
    .then(() => {
      cy.contains("button", "Connect to Metamask").click();
      cy.wait(METAMASK_WAIT);
      cy.get("[data-testid='activeWallet']")
        .if("visible")
        .log("Metamask accounts already connected")
        .else(() => {
          cy.acceptMetamaskAccess({
            allAccounts: true,
            confirmSignatureRequest: true,
            confirmDataSignatureRequest: true,
            switchNetwork: true,
          }).then((connected) => {
            expect(connected).to.be.true;
          });
        });
    })
    .else()
    .log("Metamask wallet already connected");
});

Cypress.Commands.add("waitAndConfirmMetamaskTransaction", () => {
  cy.confirmMetamaskTransaction();
  cy.wait(METAMASK_WAIT);
});
