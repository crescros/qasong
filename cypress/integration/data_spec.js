describe("users array", () => {
  const pathToUsersData = "./data/users.json";

  it("exists", () => {
    const users = cy.readFile(pathToUsersData, "utf8");
    expect(users).to.exist;
  });
});
