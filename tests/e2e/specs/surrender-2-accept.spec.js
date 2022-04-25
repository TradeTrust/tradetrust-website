describe("Surrender-Accept", () => {
  it("should switch  and use account 1", () => {
    cy.switchMetamaskAccount(1).should("be.true");
  });

  context("Surrender", () => {
    it("should go to verify page and upload a file", () => {
      cy.visit("/verify");
      cy.get("input[type=file]").attachFile("ebl-surrender.json");
      cy.get("[data-testid='asset-title-owner']").should("be.visible");
      cy.get("[data-testid='asset-title-holder']").should("be.visible");
    });

    it("should surrender document successfully", () => {
      cy.get("[data-testid='connectToWallet']").should("be.visible");
      cy.get("[data-testid='connectToWallet']").click();
      cy.get("[data-testid='manageAssetDropdown']").click();
      cy.get("[data-testid='surrenderDropdown']").click();
      cy.get("[data-testid='surrenderBtn']").click();
      cy.confirmMetamaskTransaction();
      cy.get("#surrender-sign").should("have.text", "Surrendered To Issuer");
      cy.get("[data-testid='overlay-title']").should("have.text", "Surrender Document Success");
    });
  });

  context("Accept Surender", () => {
    it("should go to verify page and upload a file", () => {
      cy.visit("/verify");
      cy.get("input[type=file]").attachFile("ebl-surrender.json");
      cy.get("[data-testid='surrenderToIssuer']").should("be.visible");
    });

    it("should accept surrenderred document successfully", () => {
      cy.get("[data-testid='connectToWallet']").should("be.visible");
      cy.get("[data-testid='connectToWallet']").click();
      cy.get("[data-testid='manageAssetDropdown']").click();
      cy.get("[data-testid='acceptSurrenderDropdown']").click();
      cy.get("[data-testid='acceptSurrenderBtn']").click();
      cy.confirmMetamaskTransaction();
      cy.get("[data-testid='overlay-title']").should("have.text", "Surrender Accepted");
    });
  });
});
