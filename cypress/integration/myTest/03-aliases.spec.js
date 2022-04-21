/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');

    cy.get('[data-test="items"]').as('allItems');
    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');
    cy.get('[data-test="filter-items"]').as('filterInput');
  });

  it('should filter items', () => {
    cy.get('@filterInput').type('iPhone');
    cy.get('@allItems').should('not.contain.text', 'Hoodie')
  })

  it('should move on from one list to another', () => {
    //1
    cy.get('@unpackedItems').find('li > label').first().as('itemLabel').click()

    //2 cy.get('@unpackedItems').find('li > label').eq(0).click()
    //3 cy.get('@unpackedItems').find('li > label').last().click()

    cy.get('@itemLabel').invoke('text').as('itemName')
    cy.get('@itemLabel').click()

    cy.get('@itemName').then( text => {
      cy.get('@packedItems').contains(text)
    })
  })

  it.only('should filter the items shown on the page', () => {
    cy.get('@filterInput').type('iPhone');

    cy.get('@allItems').should('contain.text', 'iPhone');
    cy.get('@allItems').should('not.contain.text', 'Hoodie');
    //cy.get('@allItems').should('not.contain.value', 'Hoodie');
  });

  

});
