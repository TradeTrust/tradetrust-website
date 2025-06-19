const { ACCOUNT_1 } = require("../utils");
const { fillFormField, validateText } = require("../utils/helper");

const verificationText = [
    "Document has been issued",
    "Document issuer has been identified",
    "Document has not been tampered with",
];

// This is the directory path used by playwright to download files
const tempDirectory = "/tmp"
const fileName = "EBOL.tt"

before(() => {
    cy.window().then((window) => {
      window.localStorage.setItem("hasSeenPopup", "true");
    });
    cy.switchMetamaskAccount(1);
    window.localStorage.removeItem("tokenRegistry");
    cy.task("clearDownloads", { tempDirectory });
});


describe("Create Document", () => {
    it("should create document successfully", () => {
        cy.visit('/')
        cy.get('button').contains('Create Doc').click();
        cy.get('[data-testid="forms-view-Transferable"] [data-testid="form-select-0"]').click();

        validateText("expand-preview", "Document Preview");
        cy.get('[data-testid="expandPreviewCreateDocument"]').click();
        cy.connectToMetamaskWalletAndApproveAllAccounts("connectToMetamask");
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

        // download file and wait for download
        cy.get("[data-testid='download-all-button']").click();
        cy.wait(5000);
                
        // copy file from temp directory to downloads directory
        cy.task("getFilePath", { tempDirectory, fileName }).then((filePath) => {
          cy.log("filepath", filePath);
          if (filePath) {
              cy.get('button').contains('Verify Doc').click();
              cy.get('[data-testid="certificate-dropzone"] input[type="file"]')
                .should('exist')
                .selectFile(`tests/e2e/downloads/${fileName}`, { force: true });
              cy.wait(1000);
              verificationText.forEach((text) => {
                  cy.get("#document-status").should("contain", text);
              });
          } else {
            cy.log('File path not found, skipping verification.');
          }
        });
    })
})