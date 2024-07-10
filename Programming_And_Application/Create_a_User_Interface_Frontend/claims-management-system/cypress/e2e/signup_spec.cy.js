describe('Signup', () => {
  it('should show an error message when passwords do not match', () => {
    cy.visit('/register');
    cy.get('input#name').type('Test User');
    cy.get('input#date_of_birth').type('2000-01-01');
    cy.get('input#address').type('123 Test Street');
    cy.get('input#phone').type('8125561115');
    cy.get('input#password').type('password123');
    cy.get('input#retypePassword').type('password321');
    cy.get('button[type="submit"]').click();
    cy.contains('Passwords do not match');
  });

  it('should navigate to user dashboard on successful signup', () => {
    cy.visit('/register');
    cy.get('input#name').type('Test User');
    cy.get('input#date_of_birth').type('2000-01-01');
    cy.get('input#address').type('123 Test Street');
    cy.get('input#phone').type('8125561115');
    cy.get('input#password').type('password123');
    cy.get('input#retypePassword').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/user/');
    cy.contains('Welcome');
  });
});
