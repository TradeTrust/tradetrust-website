describe("Surrender-Reject", () => {
  context("Surrender", () => {
    it("should go to verify page, upload a file, connect to wallet and surrender a document successfully", () => {
      cy.switchMetamaskAccount(1); // need to switch to or make sure it is at account 1 as sometimes it will fail when not in account 1
      cy.visit("/verify");
      cy.get("input[type=file]").attachFile("ebl-surrender.json");
      cy.get("[data-testid='asset-title-owner']").should("be.visible");
      cy.get("[data-testid='asset-title-holder']").should("be.visible");
      cy.clickConnectAndManageAssetButton();
      cy.get("[data-testid='surrenderDropdown']").click(); // Surrender Document
      cy.get("[data-testid='surrenderBtn']").click();
      cy.confirmMetamaskTransaction();
      cy.get("[data-testid='overlay-title']").should("have.text", "Surrender Document Success");
      cy.get("#surrender-sign").should("have.text", "Surrendered To Issuer");
    });
  });

  context("Reject Surrender", () => {
    it("should go to verify page, upload a file, connect to wallet and reject the surrendered document successfully", () => {
      cy.visit("/verify");
      cy.get("input[type=file]").attachFile("ebl-surrender.json");
      cy.get("[data-testid='surrenderToIssuer']").should("be.visible");
      cy.clickConnectAndManageAssetButton();
      cy.get("[data-testid='rejectSurrenderDropdown']").click(); // Reject Surrender
      cy.get("[data-testid='rejectSurrenderBtn']").click();
      cy.get("[data-testid='confirmActionBtn']").click();
      cy.confirmMetamaskTransaction();
      cy.get("[data-testid='overlay-title']").should("have.text", "Surrender Rejected");
    });
  });
});
