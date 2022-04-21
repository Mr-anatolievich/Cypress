/// <reference types="cypress" />

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');

    cy.get('#minimum-rating-visibility').as('rating-filter');
    cy.get('#restaurant-visibility-filter').as('restaurant-filter');
  });

  it.only('should set the range and verify it', () => {
    cy.get('#minimum-rating-visibility').invoke('val', 7).trigger('input')
    cy.get('#minimum-rating-visibility').should('have.value', '7')
  });

  it('should check the checkbox and verify it', () => {
    cy.get('input[type="checkbox"]').should('be.checked')
  });

  it('should select an option from the select and verify it', () => {
    cy.get('select[id="restaurant-visibility-filter"]').select('Taco Bell')
    cy.get('select[id="restaurant-visibility-filter"]').should('have.value', 'Taco Bell')
  });
});
