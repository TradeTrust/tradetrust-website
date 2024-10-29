import { ACCOUNT_2 } from "../utils";

before(() => {
  cy.importMetamaskAccount("0xc58c1ff75001afdca8cecb61b47f36964febe4188b8f7b26252286ecae5a8879");
  cy.switchMetamaskAccount(1); // ensure switch to account 1 (owner)
});

describe("Reject Transfer Owner", () => {
  it("should go to verify page, upload a file, connect to wallet and reject transfer owner successfully", () => {
    cy.visit("/verify");
    cy.waitAndUploadFile("ebl-transfer-holder.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.connectToMetamaskWalletAndApproveAllAccounts();
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='rejectTransferOwnerDropdown']").click(); // Reject Transfer Ownership
    cy.get("[data-testid='editable-remarks-input']").type(ACCOUNT_2);
    cy.get("[data-testid='confirmRejectOwnershipBtn']").click();
    cy.waitAndConfirmMetamaskTransaction();
    cy.get("[data-testid='waiting-overlay-title']").should("have.text", "Ownership Rejection in Progress");
  });
});
