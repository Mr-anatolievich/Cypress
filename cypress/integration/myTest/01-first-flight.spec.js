/// <reference types="cypress" />


describe('Create a New Item', () => {
    beforeEach(() => {
        cy.visit('/jetsetter');
    })

    it('should exist a form', () => {
        cy.get('form').should('not.exist')
    })

    it('should contains words "Add item"', ()=> {
        cy.contains('Add Item')
    })

    it('should stuff in an input field', ()=> {
        cy.get('[data-test="new-item-input"]').type('Good job');
        cy.get('[data-test="add-item"]').click();
    })
});