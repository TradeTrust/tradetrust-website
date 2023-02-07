import { ACCOUNT_3, ACCOUNT_2 } from "../utils";

before(() => {
  cy.importMetamaskAccount("0xc58c1ff75001afdca8cecb61b47f36964febe4188b8f7b26252286ecae5a8879").should("be.true");
  cy.switchMetamaskAccount(1).should("be.true");
});

describe("Endorse Owner", () => {
  it("should endorse owner successfully", () => {
    cy.visit("/verify");
    cy.get("input[type=file]").attachFile("ebl-endorse-owner.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.clickConnectAndManageAssetButton(true);
    cy.get("[data-testid='endorseBeneficiaryDropdown']").click();
    cy.get("[data-testid='endorseBtn']").click();
    cy.confirmMetamaskTransaction();
    cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_3);
    cy.get("[data-testid='overlay-title']").should("have.text", "Change Owner Success");
  });
});
