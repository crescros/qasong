describe("search page", () => {
  beforeEach(() => {
    cy.viewport(550, 750)
    cy.visit("/search");
  });

  it("has a search bar", () => {
    cy.get("#qasong-search");
  });

  it("entering 'hello' into search bar and hitting 'enter' will cause search results to appear", () => {
    
    cy.get(".MuiDialog-container").click(4, 4) // click out of dialog
    cy.get("#qasong-search").type("hello", { force: true }).type("{enter}", { force: true })
    cy.get("#qasong-search-results", { timeout: 30000 })
  })
});
