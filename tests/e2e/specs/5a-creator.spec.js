const { ACCOUNT_1 } = require("../utils");
const { fillFormField, validateText } = require("../utils/helper");

before(() => {
    cy.window().then((window) => {
      window.localStorage.setItem("hasSeenPopup", "true");
    });
    cy.switchMetamaskAccount(1);
    window.localStorage.removeItem("tokenRegistry");
});


describe("Create Document", () => {
    it("should create document successfully", () => {
        cy.visit('/')
        cy.get('button').contains('Create Doc').click();
        cy.get('[data-testid="forms-view-Transferable"] [data-testid="form-select-0"]').click();

        validateText("expand-preview", "Document Preview");
        cy.get('[data-testid="expandPreviewCreateDocument"]').click();
        
        
        cy.connectToWalletAndApproveAllAccounts("connectToMetamask");
        cy.get('[data-testid="connect-blockchain-continue"]').click();

        cy.get('[data-testid="documentSetupContinue"]')
            .if("disabled")
            .then(() => {
                cy.waitAndConfirmMetamaskTransaction();
            })
        cy.get('[data-testid="documentSetupContinue"]').click();

        cy.get("[data-testid='transferable-record-beneficiary-input']").clear().type(ACCOUNT_1);
        cy.get("[data-testid='transferable-record-holder-input']").clear().type(ACCOUNT_1);
        cy.get("[data-testid='transferable-record-remarks-input']").clear().type("E Bill of Lading");
        fillFormField("BL Number", "212123");
        fillFormField("Standard Carrier Alpha Code (SCAC)", "MAEU");

        // validate preview
        cy.get("[data-testid='form-next-button']").click();
        validateText("preview-form-title", "Preview Form");
        validateText("non-editable-input-owner", ACCOUNT_1);
        validateText("non-editable-input-holder", ACCOUNT_1);
        validateText("asset-title-remarks", "E Bill of Lading");

        cy.get("[data-testid='form-next-button']").click();
        cy.waitAndConfirmMetamaskTransaction();
        cy.get("[data-testid='process-title']").should("have.text", "Document issued successfully");
    })
})