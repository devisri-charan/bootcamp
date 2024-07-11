describe('Admin Dashboard', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input#phone').type('adminphone');
      cy.get('input#password').type('adminpassword');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/admin');
    });
  
    it('should navigate to the admin dashboard home', () => {
      cy.url().should('include', '/admin');
      cy.contains('Admin Dashboard');
    });

    it('should navigate to the approve claims page', () => {
        cy.get('a[href="/admin/approve-claims"]').click();
        cy.url().should('include', '/admin/approve-claims');
        cy.contains('Claims');
      });
    
      it('should navigate to the manage policyholders page', () => {
        cy.get('a[href="/admin/manage-policyholders"]').click();
        cy.url().should('include', '/admin/manage-policyholders');
        cy.contains('Policyholders');
      });
  });  