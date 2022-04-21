/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item, click on "Add Item", check it in the "Unpacked Items" list', () => {
      const item = 'Buy milk'; // you can write whatever you want

      //1
      cy.get('[data-test="new-item-input"]').type(item)
      cy.get('[data-test="add-item"]').click();

      //2
      cy.get('[data-test="new-item-input"]').type('Buy milk {enter}')

      cy.contains(item)
      cy.get('[data-test="items-unpacked"]').first().contains(item) // check if it the first element in current li
      cy.get('[data-test="items-unpacked"] li').last().contains(item) // check if it the last element in current li
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth')

      // 1
      cy.get('[data-test="items-unpacked"]').each(($item) => {
        expect($item.text()).to.include('Tooth')
      }) 

      // 2
      cy.contains('Tooth Brush')
      cy.contains('Tooth Paste')

      cy.contains('Hoodie').should('not.exist')
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click()
        cy.get('[data-test="items"] li').should('not.exist')
        cy.get('[data-test="items"] li').should('not.be.true') 
      });
    });

    describe('Remove individual items', () => {
      it('should remove an item from the page', () => {
        cy.get('[data-test="items"] li').each( $li => {
          cy.wrap($li).find('[data-test="remove"]').click()
            .should('not.exist')
        })
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="items-packed"]').each( $li => {
        cy.wrap($li).find('input[type="checkbox"]').click()
      })

        // the same
      // cy.get('[data-test="items-packed"]').then( li => {
      //   cy.wrap(li).find('input[type="checkbox"]').click()
      // })
    });

    it('should empty have all of the items in the "Unpacked" list', () => {
      cy.get('[data-test="items-unpacked"]').then( check => {
        cy.wrap(check).find('input[type="checkbox"]').click({ multiple: true })
      })
      cy.get('[data-test="items-unpacked"]').contains('No items to show.')
    });

    it.only('should move an individual item from "Unpacked" to "Packed" (better)', () => {
      cy.get('[data-test="items-unpacked"] li label').first().within(() => {
          cy.get('input[type="checkbox"]').click();
        }).then(($item) => {
          const text = $item.text();
          cy.get('[data-test="items-packed"] li label').first().should('have.text', text);
        });
    });
  });

});
