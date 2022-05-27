import { ACCOUNT_1, ACCOUNT_2 } from "../utils";

describe(
  "Nominate Owner",
  {
    retries: {
      runMode: 5,
      openMode: 0,
    },
  },
  () => {
    before(() => {
      cy.getMetamaskWalletAddress().then((address) => {
        if (address !== ACCOUNT_1) {
          cy.switchMetamaskAccount(1);
        }
      });
    });

    context("Nominate Owner", () => {
      it("should go to verify page, upload a file, connect to wallet and nominate owner successfully", () => {
        cy.visit("/verify");
        cy.get("input[type=file]").attachFile("ebl-nominate-owner.json");
        cy.get("[data-testid='asset-title-owner']").should("be.visible");
        cy.get("[data-testid='asset-title-holder']").should("be.visible");
        cy.clickConnectAndManageAssetButton();
        cy.get("[data-testid='nominateBeneficiaryHolderDropdown']").click();
        cy.get("[data-testid='editable-input-owner']").type(ACCOUNT_2);
        cy.get("[data-testid='nominationBtn']").click();
        cy.confirmMetamaskTransaction();
        cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_1);
        cy.get("[data-testid='overlay-title']").should("have.text", "Nomination Success");
      });
    });

    context("Accept Nominated Owner", () => {
      it("should go to verify page, upload a file, connect a wallet and endorse nominated owner successfully", () => {
        cy.switchMetamaskAccount(2).should("be.true");
        cy.visit("/verify");
        cy.get("input[type=file]").attachFile("ebl-nominate-owner.json");
        cy.get("[data-testid='asset-title-owner']").should("be.visible");
        cy.get("[data-testid='asset-title-holder']").should("be.visible");
        cy.clickConnectAndManageAssetButton();
        cy.get("[data-testid='endorseTransferDropdown']").click();
        cy.get("[data-testid='endorseTransferBtn']").click();
        cy.confirmMetamaskTransaction();
        cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_2);
        cy.get("[data-testid='non-editable-input-holder']").should("have.text", ACCOUNT_2);
        cy.get("[data-testid='overlay-title']").should("have.text", "Endorse Ownership/Holdership Success");
      });
    });
  }
);
