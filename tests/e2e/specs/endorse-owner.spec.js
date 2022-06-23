import { ACCOUNT_3, ACCOUNT_2 } from "../utils";

describe(
  "Endorse Owner",
  {
    retries: {
      runMode: 5,
      openMode: 0,
    },
  },
  () => {
    it("should endorse owner successfully", () => {
      cy.visit("/verify");
      cy.get("input[type=file]").attachFile("ebl-endorse-owner.json");
      cy.get("[data-testid='asset-title-owner']").should("be.visible");
      cy.get("[data-testid='asset-title-holder']").should("be.visible");

      // START - approve application once after connect to wallet, subsequent tests no longer need
      cy.checkAcceptMetamaskAccess();
      // END - approve application once after connect to wallet, subsequent tests no longer need

      cy.get("[data-testid='endorseBeneficiaryDropdown']").click();
      cy.get("[data-testid='editable-input-owner']").type(ACCOUNT_3);
      cy.get("[data-testid='editable-input-holder']").type(ACCOUNT_2);
      cy.get("[data-testid='endorseBtn']").click();
      cy.confirmMetamaskTransaction();
      cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_3);
      cy.get("[data-testid='overlay-title']").should("have.text", "Change Owner Success");
    });
  }
);
