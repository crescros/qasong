describe("billboard page", () => {
    beforeEach(() => {
        cy.viewport(550, 750);
        cy.visit("/billboard");
    });

    it("shows loading animation", () => {
        cy.get("#qasong-loading-animation");
    });
});
