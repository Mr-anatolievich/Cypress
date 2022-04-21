/// <reference types="cypress" />

const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread',
];

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder',
];

const ratings = [1, 2, 3, 4, 5, 6, 7];

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
  });

  it('should exist have the title on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items');
  });

  for (const property of properties){

    it(`should find ${property}`, () => {
      cy.get(`#${property}-column`)
    })

    it(`should hide ${property} if unpacked`, () => {
      cy.get(`#show-${property}`).click()
      cy.get(`#${property}-column`).should('be.hidden')
    })
  }

  describe('Restaurant Filter', () => {
    for (const restaurant of restaurants) {

      it(`should only display rows that match ${restaurant} when select`, () => {
        cy.get('#restaurant-visibility-filter').select(restaurant)
        cy.get('.whereToOrder')
          .should('contain', restaurant)
          .and('have.length.at.least', 1)
      })
    }
  })

  describe('Rating Filter', () => {

    for (const rating of ratings){
      it.only(`should display only items in ${rating} or higher`, () => {
        cy.get('#minimum-rating-visibility').invoke('val', rating).trigger('change')
        cy.get('.popularity').each( ($el) => {
          expect(+($el).text()).to.be.gte(rating)
        })
      })
    }
  })
});
