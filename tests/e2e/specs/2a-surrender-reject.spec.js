before(() => {
  cy.switchMetamaskAccount(1); // ensure switch to account 1 (owner)
});

describe("Surrender Reject", () => {
  it("should go to verify page, upload a file, connect to wallet and surrender a document successfully", () => {
    cy.visit("/verify");
    cy.waitAndUploadFile("ebl-surrender.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='surrenderDropdown']").click(); // Surrender Document
    cy.get("[data-testid='surrenderBtn']").click();
    cy.waitAndConfirmMetamaskTransaction();
    cy.get("[data-testid='overlay-title']").should("have.text", "Surrender Document Success");
    cy.get("#surrender-sign").should("have.text", "Surrendered To Issuer");
  });

  it("should go to verify page, upload a file, connect to wallet and reject the surrendered document successfully", () => {
    cy.visit("/verify");
    cy.waitAndUploadFile("ebl-surrender.json");
    cy.get("[data-testid='surrenderToIssuer']").should("be.visible");
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='rejectSurrenderDropdown']").click(); // Reject Surrender
    cy.get("[data-testid='rejectSurrenderBtn']").click();
    cy.get("[data-testid='confirmActionBtn']").click();
    cy.waitAndConfirmMetamaskTransaction();
    cy.get("[data-testid='overlay-title']").should("have.text", "Surrender Rejected");
  });
});
