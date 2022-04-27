describe("Transfer Holder", () => {
  it("should switch and use account 1", () => {
    cy.switchMetamaskAccount(1).should("be.true");
  });

  it("should go to verify page, upload a file, conect to wallet and transfer holder successfully", () => {
    cy.visit("/verify");
    cy.get("input[type=file]").attachFile("ebl-transfer-holder.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.get("[data-testid='connectToWallet']").click();
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
