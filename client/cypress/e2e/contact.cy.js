
describe("Contact Form E2E Test", () => {
  it("should submit the contact form and display the Thank You page", () => {
    cy.intercept("POST", "http://localhost:3000/api/contacts").as("submitContact");

    cy.visit("/contact");

    cy.get("#firstName").type("Test");
    cy.get("#lastName").type("Student");
    cy.get("#phone").type("1234567890");
    cy.get("#email").type("e2e.test@example.com");
    cy.get("#message").type("This is a test message for the Assignment 4 E2E test.");

    cy.contains("button", "Send Message").click();

    cy.wait("@submitContact").then((interception) => {
      expect(interception.response.statusCode).to.be.within(200, 299);
    });

    cy.url().should("include", "/thank-you");
    cy.contains("h1", "Thank You!").should("be.visible");
    cy.contains("Your message has been sent successfully.").should("be.visible");
  });
});
