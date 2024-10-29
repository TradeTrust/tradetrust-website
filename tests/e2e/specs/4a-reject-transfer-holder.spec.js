import { ACCOUNT_2 } from "../utils";

before(() => {
  cy.switchMetamaskAccount(1); // ensure switch to account 1 (owner)
});

describe("Reject Transfer Holder", () => {
  it("should go to verify page, upload a file, connect to wallet and reject transfer holder successfully", () => {
    cy.visit("/verify");
    cy.waitAndUploadFile("ebl-transfer-holder.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.connectToMetamaskWalletAndApproveAllAccounts();
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='rejectTransferHolderDropdown']").click(); // Reject Transfer Holdership
    cy.get("[data-testid='editable-remarks-input']").type("Remark: Its most likely be a mistake");
    cy.get("[data-testid='confirmRejectHoldershipBtn']").click();
    cy.waitAndConfirmMetamaskTransaction();
    cy.get("[data-testid='waiting-overlay-title']").should("have.text", "Holdership Rejection in Progress");
  });
});
