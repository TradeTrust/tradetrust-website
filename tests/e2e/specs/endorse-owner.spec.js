describe("Endorse Owner", () => {
  it("should go to verify page and upload a file", () => {
    cy.visit("/verify");
    cy.get("input[type=file]").attachFile("ebl-endorse-owner.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
  });

  // START - approve application once after connect to wallet, subsequent tests no longer need
  it("should import account 2 and connect all metamask wallets to dapp", () => {
    cy.importMetamaskAccount("0xc58c1ff75001afdca8cecb61b47f36964febe4188b8f7b26252286ecae5a8879").should("be.true");
    cy.switchMetamaskAccount(1).should("be.true");

    cy.get("[data-testid='connectToWallet']").should("be.visible");
    cy.get("[data-testid='connectToWallet']").click();
    cy.acceptMetamaskAccess(true).should("be.true");
  });
  // END - approve application once after connect to wallet, subsequent tests no longer need

  it("should endorse owner successfully", () => {
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='endorseBeneficiaryDropdown']").click();
    cy.get("[data-testid='editable-input-owner']").type("0x391aFf3942857a10958425FebF1fC1938D9F5AE7");
    cy.get("[data-testid='editable-input-holder']").type("0xcDFAcbb428DD30ddf6d99875dcad04CbEFcd6E60");
    cy.get("[data-testid='endorseBtn']").click();
    cy.confirmMetamaskTransaction();
    cy.get("[data-testid='non-editable-input-owner']").should(
      "have.text",
      "0x391aFf3942857a10958425FebF1fC1938D9F5AE7"
    );
    cy.get("[data-testid='overlay-title']").should("have.text", "Change Owner Success");
  });
});
