const { frontendURL } = require('../constants');

describe('Login', () => {
  beforeEach(() => {
    cy.emptydb();
    cy.visit(frontendURL);
  });

  it('should fail with incorrect credentials', () => {
    // log in with wrong credentials
    cy.get('#username').type('fail');
    cy.get('#password').type('login');
    cy.contains('Login').click();

    // assert text 'wrong username or password'
    cy.contains('wrong username or password').as('notification');

    // check notification color is red
    cy.get('@notification')
      .should('have.class', 'notification')
      .and('have.class', 'error')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('should login with correct credentials', () => {
    // create the user
    cy.signin({
      name: 'name',
      username: 'username',
      password: 'password',
    });

    // login with correct credentials
    cy.get('#username').type('username');
    cy.get('#password').type('password');
    cy.contains('Login').click();

    cy.contains('logged in');
  });
});
