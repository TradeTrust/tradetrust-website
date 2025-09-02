const { ACCOUNT_1 } = require("../utils");

before(() => {
  cy.window().then((window) => {
    window.localStorage.setItem("hasSeenPopup", "true");
  });
  cy.switchMetamaskAccount(2); // ensure switch to account 1 (owner)
});

describe("Reject Transfer Holder", () => {
  it("should go to verify page, upload a file, connect to wallet and reject transfer holder successfully", () => {
    cy.visit("/");
    cy.waitAndUploadFile("w3c-2.0-bl-transfer-holder.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.connectToWalletAndApproveAllAccounts();
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='rejectTransferHolderDropdown']").click({ force: true }); // Reject Transfer Holdership
    cy.get("[data-testid='editable-remarks-input']").clear().type("Remark: Its most likely be a mistake");
    cy.get("[data-testid='confirmRejectHoldershipBtn']").click();
    cy.waitAndConfirmMetamaskTransaction();
    cy.get("[data-testid='non-editable-input-holder']").should("have.text", ACCOUNT_1);
    cy.get("[data-testid='overlay-title']").should("have.text", "Holdership Rejection Success");
  });
});
