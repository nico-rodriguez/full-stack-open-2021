const { frontendURL } = require('../constants');

describe('Blogs', () => {
  beforeEach(() => {
    cy.emptydb();
    cy.signin({
      name: 'name',
      username: 'username',
      password: 'password',
    });
    cy.login({
      username: 'username',
      password: 'password',
    });
    cy.createBlog({
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
    });
    cy.visit(frontendURL);
  });

  it('should create a blog when logged in', () => {
    cy.contains('Create new blog').click();

    cy.contains('Title').type('On let vs const');
    cy.contains('Author').type('Dan Abramov');
    cy.contains('Url').type('https://overreacted.io/on-let-vs-const/');
    cy.get('form').contains('Create').click();

    cy.contains('Blog added successfully!');
    cy.contains('On let vs const');
  });

  it('should like a blog when logged in', () => {
    cy.contains('React patterns').parent().as('blog');
    cy.get('@blog').contains('view').click();
    cy.get('@blog').contains('Like').click();
  });

  it('should delete a blog when logged in', () => {
    cy.contains('React patterns').parent().as('blog');
    cy.get('@blog').contains('Remove').click();
  });

  it('should not delete a blog when logged in', () => {
    // log out current user
    cy.contains('Logout').click();
    // log in with another user
    cy.signin({
      name: 'name',
      username: 'username2',
      password: 'password',
    });
    cy.login({
      username: 'username2',
      password: 'password',
    });
    cy.reload();
    cy.contains('React patterns').parent().should('not.contain', 'Remove');
  });

  it('should display blogs ordered by likes number', () => {
    cy.createBlog({
      title: 'On let vs const',
      author: 'Dan Abramov',
      url: 'https://overreacted.io/on-let-vs-const/',
      likes: 10,
    });
    cy.reload();
    cy.contains('React patterns').parent().as('blog1');
    cy.contains('On let vs const').parent().as('blog2');
    cy.get('@blog2').contains('view').click();
    cy.get('@blog2').contains('Like').click();
    cy.get('.blog').each((blog, index) => {
      switch (index) {
        case 0:
          cy.wrap(blog).contains('On let vs const');
          break;
        case 1:
          cy.wrap(blog).contains('React patterns');
          break;
        default:
          break;
      }
    });
  });
});
