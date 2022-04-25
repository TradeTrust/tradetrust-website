describe("Nominate Owner", () => {
  context("Nominate Owner", () => {
    it("should switch  and use account 1", () => {
      cy.switchMetamaskAccount(1).should("be.true");
    });

    it("should go to verify page and upload a file", () => {
      cy.visit("/verify");
      cy.get("input[type=file]").attachFile("ebl-nominate-owner.json");
      cy.get("[data-testid='asset-title-owner']").should("be.visible");
      cy.get("[data-testid='asset-title-holder']").should("be.visible");
    });

    it("should nominate owner successfully", () => {
      cy.get("[data-testid='connectToWallet']").should("be.visible");
      cy.get("[data-testid='connectToWallet']").click();
      cy.get("[data-testid='manageAssetDropdown']").click();
      cy.get("[data-testid='nominateBeneficiaryHolderDropdown']").click();
      cy.get("[data-testid='editable-input-owner']").type("0xcDFAcbb428DD30ddf6d99875dcad04CbEFcd6E60");
      cy.get("[data-testid='nominationBtn']").click();
      cy.confirmMetamaskTransaction();
      cy.get("[data-testid='non-editable-input-owner']").should(
        "have.text",
        "0xe0A71284EF59483795053266CB796B65E48B5124"
      );
      cy.get("[data-testid='overlay-title']").should("have.text", "Nomination Success");
    });
  });

  context("Accept Nominated Owner", () => {
    it("should go to verify page and upload a file", () => {
      cy.switchMetamaskAccount(2);

      cy.visit("/verify");
      cy.get("input[type=file]").attachFile("ebl-nominate-owner.json");
      cy.get("[data-testid='asset-title-owner']").should("be.visible");
      cy.get("[data-testid='asset-title-holder']").should("be.visible");
    });

    it("should endorse nominated owner successfully", () => {
      cy.get("[data-testid='connectToWallet']").should("be.visible");
      cy.get("[data-testid='connectToWallet']").click();
      cy.get("[data-testid='manageAssetDropdown']").click();
      cy.get("[data-testid='endorseTransferDropdown']").click();
      cy.get("[data-testid='endorseTransferBtn']").click();
      cy.confirmMetamaskTransaction();
      cy.get("[data-testid='non-editable-input-owner']").should(
        "have.text",
        "0xcDFAcbb428DD30ddf6d99875dcad04CbEFcd6E60"
      );
      cy.get("[data-testid='non-editable-input-holder']").should(
        "have.text",
        "0xcDFAcbb428DD30ddf6d99875dcad04CbEFcd6E60"
      );
      cy.get("[data-testid='overlay-title']").should("have.text", "Endorse Ownership/Holdership Success");
    });
  });
});
