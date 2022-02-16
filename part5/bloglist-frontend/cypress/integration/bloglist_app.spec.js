const { frontendURL } = require('../constants');

describe('Blog app', () => {
  beforeEach(() => {
    cy.emptydb();
    cy.visit(frontendURL);
  });

  it('should display login form', () => {
    cy.contains('Log in to application');
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('Login');
  });
});
