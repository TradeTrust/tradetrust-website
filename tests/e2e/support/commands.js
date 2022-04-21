import "cypress-file-upload";
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("connectWallet", () => {
  cy.get("[data-testid='connectToWallet']").should("be.visible");
  cy.get("[data-testid='connectToWallet']").click();
});
