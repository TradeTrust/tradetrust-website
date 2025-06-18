const { ACCOUNT_1 } = require("../utils");

before(() => {
  cy.window().then((window) => {
    window.localStorage.setItem("hasSeenPopup", "true");
  });
  cy.switchMetamaskAccount(3); // ensure switch to account 1 (owner)
});

describe("Reject Transfer Owner", () => {
  it("should go to verify page, upload a file, connect to wallet and reject transfer owner successfully", () => {
    cy.visit("/");
    cy.waitAndUploadFile("ebl-nominate-owner.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.connectToWalletAndApproveAllAccounts();
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='rejectTransferOwnerDropdown']").click({ force: true }); // Reject Transfer Ownership
    cy.get("[data-testid='editable-remarks-input']").clear().type("Remark: Its most likely be a mistake");
    cy.get("[data-testid='confirmRejectOwnershipBtn']").click();
    cy.waitAndConfirmMetamaskTransaction();
    cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_1);
    cy.get("[data-testid='overlay-title']").should("have.text", "Ownership Rejection Success");
  });
});
