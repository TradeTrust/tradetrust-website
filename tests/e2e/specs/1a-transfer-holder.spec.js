import { ACCOUNT_2 } from "../utils";

before(() => {
  cy.importMetamaskAccount("0xc58c1ff75001afdca8cecb61b47f36964febe4188b8f7b26252286ecae5a8879");
  cy.switchMetamaskAccount(1); // ensure switch to account 1 (owner)
});

describe("Transfer Holder", () => {
  it("should go to verify page, upload a file, connect to wallet and transfer holder successfully", () => {
    cy.visit("/verify");
    cy.waitAndUploadFile("ebl-transfer-holder.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.connectToMetamaskWalletAndApproveAllAccounts();
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='transferHolderDropdown']").click(); // Transfer Holdership
    cy.get("[data-testid='editable-input-holder']").type(ACCOUNT_2);
    cy.get("[data-testid='transferBtn']").click();
    cy.waitAndConfirmMetamaskTransaction();
    cy.get("[data-testid='non-editable-input-holder']").should("have.text", ACCOUNT_2);
    cy.get("[data-testid='overlay-title']").should("have.text", "Transfer Holder Success");
  });
});
