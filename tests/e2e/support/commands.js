import "cypress-file-upload";

Cypress.Commands.add("clickConnectAndManageAssetButton", () => {
  cy.get("#title-transfer-panel").then(($transferPanel) => {
    cy.wait(2000);
    if ($transferPanel.find("[data-testid='connectToWallet']").length) {
      cy.get("[data-testid='connectToWallet']").click();
      cy.acceptMetamaskAccess(true).should("be.true");
      cy.wait(2000);
    }
  });
  cy.get("[data-testid='manageAssetDropdown']").click();
});

Cypress.Commands.add("checkAcceptMetamaskAccess", () => {
  cy.importMetamaskAccount("0xc58c1ff75001afdca8cecb61b47f36964febe4188b8f7b26252286ecae5a8879");
  cy.switchMetamaskAccount(1)
    .should("be.true")
    .then(() => {
      cy.clickConnectAndManageAssetButton();
    });
});
