import { ACCOUNT_3 } from "../utils";

before(() => {
  cy.window().then((window) => {
    window.localStorage.setItem("hasSeenPopup", "true");
  });
  cy.switchMetamaskAccount(1); // ensure switch to account 1 (owner)
});

describe("Endorse Transfer of Ownership/Holdership", () => {
  it("should endorse transfer of both owner and holder successfully", () => {
    cy.visit("/");
    cy.waitAndUploadFile("w3c-2.0-bl-endorse-owner.json");
    cy.get("[data-testid='asset-title-owner']").should("be.visible");
    cy.get("[data-testid='asset-title-holder']").should("be.visible");
    cy.get("[data-testid='manageAssetDropdown']").click();
    cy.get("[data-testid='endorseTransferDropdown']").click({ force: true }); // Endorse Transfer of Ownership/Holdership
    cy.get("[data-testid='editable-input-owner']").clear();
    cy.get("[data-testid='editable-input-holder']").clear();
    cy.get("[data-testid='editable-input-owner']").clear().type(ACCOUNT_3);
    cy.get("[data-testid='editable-input-holder']").clear().type(ACCOUNT_3);
    cy.get("[data-testid='editable-input-remark']").clear().type("Remark: Endorse Transfer");
    cy.get("[data-testid='endorseTransferBtn']").click();
    cy.waitAndConfirmMetamaskTransaction();
    cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_3);
    cy.get("[data-testid='non-editable-input-owner']").should("have.text", ACCOUNT_3);
    cy.get("[data-testid='overlay-title']").should("have.text", "Endorse Ownership/Holdership Success");
  });
});
