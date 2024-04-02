import { ACCOUNT_3 } from "../utils";

before(() => {
  cy.switchMetamaskAccount(1); // ensure switch to account 1 (owner)
});

describe("Endorse Transfer of Ownership/Holdership", () => {
  it("should endorse transfer of both owner and holder successfully", () => {
    cy.visit("/verify");
    cy.waitAndUploadFile("ebl-endorse-owner.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='endorseTransferDropdown']").click(); // Endorse Transfer of Ownership/Holdership
    cy.get("[data-testid='editable-input-owner']").clear();
    cy.get("[data-testid='editable-input-holder']").clear();
    cy.get("[data-testid='editable-input-owner']").type(ACCOUNT_3);
    cy.get("[data-testid='editable-input-holder']").type(ACCOUNT_3);
    cy.get("[data-testid='endorseTransferBtn']").click();
    cy.waitAndConfirmMetamaskTransaction();
    cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_3);
    cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_3);
    cy.get("[data-testid='overlay-title']").should("have.text", "Endorse Ownership/Holdership Success");
  });
});
