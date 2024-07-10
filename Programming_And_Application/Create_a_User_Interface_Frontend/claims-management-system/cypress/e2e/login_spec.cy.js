describe('Login', () => {
  it('should show an error message with invalid credentials', () => {
    cy.visit('/login');
    cy.get('input#phone').type('1234567890');
    cy.get('input#password').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials');
  });

  it('should navigate to user dashboard on successful login', () => {
    cy.visit('/login');
    cy.get('input#phone').type('1234567890');
    cy.get('input#password').type('qwerty123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/user');
    cy.contains('Welcome');
  });
});
