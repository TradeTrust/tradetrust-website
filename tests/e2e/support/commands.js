import "cypress-file-upload";

Cypress.Commands.add("clickConnectAndManageAssetButton", (acceptMetamask = false) => {
  cy.get("#title-transfer-panel").then(($transferPanel) => {
    cy.wait(2000);
    if ($transferPanel.find("[data-testid='connectToWallet']").length) {
      cy.get("[data-testid='connectToWallet']").click();
      if (acceptMetamask) {
        cy.acceptMetamaskAccess({ allAccounts: true }).then((connected) => {
          expect(connected).to.be.true;
        });
        cy.wait(2000);
      }
    }
  });
  cy.get("[data-testid='manageAssetDropdown']").click();
});
