import { ACCOUNT_2, ACCOUNT_3 } from "../utils";

before(() => {
  cy.switchMetamaskAccount(2); // switch to account 2 (holder)
});

describe("Endorse Transfer of Ownership by accepting Nominated Owner", () => {
  it("should go to verify page, upload a file, connect a wallet and endorse nominated owner successfully", () => {
    cy.visit("/verify");
    cy.waitAndUploadFile("ebl-nominate-owner.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='endorseBeneficiaryDropdown']").click(); // Endorse Change of Ownership
    cy.get("[data-testid='non-editable-input-nominee']").should("have.text", ACCOUNT_3);
    cy.get("[data-testid='endorseBtn']").click();
    cy.waitAndConfirmMetamaskTransaction();
    cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_3);
    cy.get("[data-testid='non-editable-input-holder']").should("have.text", ACCOUNT_2);
    cy.get("[data-testid='overlay-title']").should("have.text", "Change Owner Success");
  });
});
