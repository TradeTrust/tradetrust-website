before(() => {
  cy.window().then((window) => {
    window.localStorage.setItem("hasSeenPopup", "true");
  });
  cy.switchMetamaskAccount(1); // ensure switch to account 1 (owner)
});

describe("Surrender Reject", () => {
  it("should go to verify page, upload a file, connect to wallet and surrender a document successfully", () => {
    cy.visit("/");
    cy.waitAndUploadFile("ebl-surrender.json");
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

  it("should go to verify page, upload a file, connect to wallet and reject the surrendered document successfully", () => {
    cy.visit("/");
    cy.waitAndUploadFile("ebl-surrender.json");
    cy.get("[data-testid='surrenderToIssuer']").should("be.visible");
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='rejectSurrenderDropdown']").click({ force: true }); // Reject Surrender
    cy.get("[data-testid='editable-input-remark']").clear().type("Remark: Reject Surrender");
    cy.get("[data-testid='rejectSurrenderBtn']").click();
    cy.get("[data-testid='confirmActionBtn']").click();
    cy.waitAndConfirmMetamaskTransaction();
    cy.get("[data-testid='overlay-title']").should("have.text", "Return of this ETR has been rejected by the Issuer");
  });
});
