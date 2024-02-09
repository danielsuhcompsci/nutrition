describe("Test Search Page", () => {
  it("Can Search for an Item", () => {
    cy.visit("https://localhost:5173");

    // Make sure search bar is empty
    cy.get("input").should("not.contain.text");

    // Type simple query
    cy.get("input").type("m&m").type("{enter}");

    // Check if loading element is there
    cy.get("svg").should("not.be.hidden");

    // Wait for results
    cy.wait(5000);

    cy.get("div.absolute").should("be.visible");

    // Nonsense query
    cy.get("input").type("m&mzzzzzz").type("{enter}");

    // Check if loading element is there
    cy.get("svg").should("not.be.hidden");

    cy.wait(5000);

    // cy.contains("No results found");
  });
});
