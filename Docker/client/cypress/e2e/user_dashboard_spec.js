describe('User Dashboard', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input#phone').type('1234567890');
      cy.get('input#password').type('qwerty123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/user/');
    });
  
    it('should navigate to the policies page', () => {
      cy.get('a[href="/user/policies"]').click();
      cy.url().should('include', '/user/policies');
      cy.contains('Your Policies');
    });
  
    it('should navigate to the claims page', () => {
      cy.get('a[href="/user/claims"]').click();
      cy.url().should('include', '/user/claims');
      cy.contains('Your Claims');
    });
  
    it('should navigate to the profile page', () => {
      cy.get('a[href="/user/profile"]').click();
      cy.url().should('include', '/user/profile');
      cy.contains('Your Profile');
    });
  });
  