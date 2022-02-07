const { backendURL } = require('../constants');

Cypress.Commands.add('emptydb', () => {
  cy.request('POST', `${backendURL}/api/testing/reset`);
});

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    method: 'POST',
    url: `${backendURL}/api/login`,
    body: {
      username, password,
    },
    failOnStatusCode: false,
  }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body));
  });
});

Cypress.Commands.add('signin', ({ name, username, password }) => {
  cy.request({
    method: 'POST',
    url: `${backendURL}/api/users`,
    body: {
      name, username, password,
    },
  });
});

// a user must be already logged in
// and have correct 'user' item in localStorage
Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    method: 'POST',
    url: `${backendURL}/api/blogs`,
    body: {
      title, author, url,
    },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
});
