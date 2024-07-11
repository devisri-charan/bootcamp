describe('Navigation', () => {
  it('should navigate to the home page', () => {
    cy.visit('/');
    cy.contains('SecureLife Insurance');
  });

  it('should navigate to the login page', () => {
    cy.visit('/');
    cy.get('a[href="/login"]').click();
    cy.url().should('include', '/login');
    cy.contains('Log In');
  });

  it('should navigate to the signup page', () => {
    cy.visit('/');
    cy.get('a[href="/register"]').click();
    cy.url().should('include', '/register');
    cy.contains('Signup');
  });
});
