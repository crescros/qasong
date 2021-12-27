xdescribe("search page", () => {
  beforeEach(() => {
    cy.viewport(550, 750);
    cy.visit("/search");
  });

  it("has a search bar", () => {
    cy.get("#qasong-search");
  });

  it("entering 'hello' into search bar and hitting 'enter' will cause search results to appear which includes the word 'Adele'", () => {
    cy.get(".MuiDialog-container").click(4, 4); // click out of dialog

    cy.get("#qasong-search")
      .type("hello", { force: true })
      .type("{enter}", { force: true });

    cy.get("#qasong-search-results", { timeout: 30000 });

    cy.contains("Adele");
  });

  it("clicking a search result causes the playbar to appear", () => {
    cy.get(".MuiDialog-container").click(4, 4); // click out of dialog

    cy.get("#qasong-search")
      .type("hello", { force: true })
      .type("{enter}", { force: true });

    cy.get("#qasong-search-results", { timeout: 30000 });

    cy.get(".MuiCard-root").first().click();

    cy.get("#qasong-playbar");
  });
});
