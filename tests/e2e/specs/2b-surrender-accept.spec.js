before(() => {
  cy.window().then((window) => {
    window.localStorage.setItem("hasSeenPopup", "true");
  });
  cy.switchMetamaskAccount(1); // ensure switch to account 1 (owner)
});

describe("Surrender Accept", () => {
  it("should go to verify page, upload a file, connect to wallet and surrender a document successfully", () => {
    cy.visit("/");
    cy.waitAndUploadFile("w3c-2.0-bl-surrender.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='surrenderDropdown']").click({ force: true }); // Surrender Document
    cy.get("[data-testid='editable-input-remark']").clear().type("Remark: Surrender Document");
    cy.get("[data-testid='surrenderBtn']").click();
    cy.waitAndConfirmMetamaskTransaction();
    cy.get("[data-testid='overlay-title']").should("have.text", "Return of ETR successful");
    cy.get("#surrender-sign").should("have.text", "ETR returned to Issuer");
  });

  it("should go to verify page, upload a file, connect to wallet and accept the surrendered document successfully", () => {
    cy.visit("/");
    cy.waitAndUploadFile("w3c-2.0-bl-surrender.json");
    cy.get("[data-testid='surrenderToIssuer']").should("be.visible");
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='acceptSurrenderDropdown']").click({ force: true }); // Accept Surrender
    cy.get("[data-testid='editable-input-remark']").clear().type("Remark: Accept Surrender");
    cy.get("[data-testid='acceptSurrenderBtn']").click();
    cy.waitAndConfirmMetamaskTransaction();
    cy.get("[data-testid='overlay-title']").should("have.text", "Return of ETR accepted");
  });
});
