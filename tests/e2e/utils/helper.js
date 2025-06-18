export const fillFormField = (label, value) => {
  cy.contains("label", label)
    .invoke("attr", "for")
    .then((id) => {
      cy.get(`#${id}`).type(value);
    });
  cy.wait(1000);
};

export const validateText = (dataTestId, text) => {
  cy.get(`[data-testid="${dataTestId}"]`).should("be.visible").and("contain", text);
};
