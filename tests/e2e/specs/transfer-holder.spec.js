describe("Transfer Holder", () => {
  before(() => {
    cy.switchMetamaskAccount(1);
  });

  it("should go to verify page and upload a file", () => {
    cy.visit("/verify");
    cy.get("input[type=file]").attachFile("ebl-transfer-holder.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
  });

  it("should transfer holder successfully", () => {
    cy.connectWallet();
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='transferHolderDropdown']").click();
    cy.get("[data-testid='editable-input-holder']").type("0xcDFAcbb428DD30ddf6d99875dcad04CbEFcd6E60");
    cy.get("[data-testid='transferBtn']").click();
    cy.confirmMetamaskTransaction();
    cy.get("[data-testid='non-editable-input-holder']").should(
      "have.text",
      "0xcDFAcbb428DD30ddf6d99875dcad04CbEFcd6E60"
    );
    cy.get("[data-testid='overlay-title']").should("have.text", "Transfer Holder Success");
  });
});
