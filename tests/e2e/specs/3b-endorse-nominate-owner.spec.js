import { ACCOUNT_1, ACCOUNT_3 } from "../utils";

before(() => {
  cy.window().then((window) => {
    window.localStorage.setItem("hasSeenPopup", "true");
  });
  cy.switchMetamaskAccount(1); // ensure switch to account 1 (owner)
});

describe("Endorse Transfer of Ownership by nominating Owner", () => {
  it("should go to verify page, upload a file, connect to wallet and nominate owner successfully", () => {
    cy.visit("/");
    cy.waitAndUploadFile("w3c-2.0-bl-nominate-owner.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='nominateBeneficiaryHolderDropdown']").click({ force: true }); // Nominate Change of Ownership
    cy.get("[data-testid='editable-input-owner']").clear().type(ACCOUNT_3);
    cy.get("[data-testid='editable-input-remark']").clear().type("Remark: Nominate Change");
    cy.get("[data-testid='nominationBtn']").click();
    cy.waitAndConfirmMetamaskTransaction();
    cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_1);
    cy.get("[data-testid='overlay-title']").should("have.text", "Nomination Success");
  });
});
