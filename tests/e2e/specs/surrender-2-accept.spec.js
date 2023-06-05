describe("Surrender-Accept", () => {
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
      cy.get("#surrender-sign").should("have.text", "Surrendered To Issuer");
      cy.get("[data-testid='overlay-title']").should("have.text", "Surrender Document Success");
    });
  });

  context("Accept Surrender", () => {
    it("should go to verify page, upload a file, connect to wallet and accept the surrendered document successfully", () => {
      cy.visit("/verify");
      cy.get("input[type=file]").attachFile("ebl-surrender.json");
      cy.get("[data-testid='surrenderToIssuer']").should("be.visible");
      cy.clickConnectAndManageAssetButton();
      cy.get("[data-testid='acceptSurrenderDropdown']").click(); // Accept Surrender
      cy.get("[data-testid='acceptSurrenderBtn']").click();
      cy.confirmMetamaskTransaction();
      cy.get("[data-testid='overlay-title']").should("have.text", "Surrender Accepted");
    });
  });
});
