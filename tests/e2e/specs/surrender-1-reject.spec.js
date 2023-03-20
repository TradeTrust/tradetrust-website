before(() => {
  cy.switchMetamaskAccount(1).should("be.true");
});

describe("Surrender-Reject", () => {
  context("Surrender", () => {
    it("should go to verify page, upload a file, connect to wallet and surrender a document successfully", () => {
      cy.visit("/verify");
      cy.get("input[type=file]").attachFile("ebl-surrender.json");
      cy.get("[data-testid='asset-title-owner']").should("be.visible");
      cy.get("[data-testid='asset-title-holder']").should("be.visible");
      cy.clickConnectAndManageAssetButton(true);
      cy.get("[data-testid='surrenderDropdown']").click();
      cy.get("[data-testid='surrenderBtn']").click();
      cy.confirmMetamaskTransaction();
      cy.get("#surrender-sign").should("have.text", "Surrendered To Issuer");
      cy.get("[data-testid='overlay-title']").should("have.text", "Surrender Document Success");
    });
  });

  context("Reject Surrender", () => {
    it("should go to verify page, upload a file, connect to wallet and reject the surrendered document successfully", () => {
      cy.visit("/verify");
      cy.get("input[type=file]").attachFile("ebl-surrender.json");
      cy.get("[data-testid='surrenderToIssuer']").should("be.visible");
      cy.clickConnectAndManageAssetButton(true);
      cy.get("[data-testid='rejectSurrenderDropdown']").click();
      cy.get("[data-testid='rejectSurrenderBtn']").click();
      cy.get("[data-testid='confirmActionBtn']").click();
      cy.confirmMetamaskTransaction();
      cy.get("[data-testid='overlay-title']").should("have.text", "Surrender Rejected");
    });
  });
});
