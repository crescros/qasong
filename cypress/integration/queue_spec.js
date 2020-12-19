describe("billboard page", () => {
  beforeEach(() => {
    cy.viewport(550, 750);
    cy.visit("/queue");
  });

  it("show component skeleton when no queue", () => {
    cy.get(".MuiSkeleton-root");
  });

  xit("clicking 'add to queue' button on search result cards add items to queue section", () => {
    cy.visit("/search");

    cy.get("#qasong-search")
      .type("hello", { force: true })
      .type("{enter}", { force: true });

    cy.get(".qasong-addtoqueue").first().trigger("click", { force: true });

    cy.visit("/queue");

    cy.get(".qasong-queueitem");
  });
});
