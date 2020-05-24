/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
context('Window', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
  })

  it('div containing the app should exist', () => {
    cy.get('#app').should('exist')
  })

  it('Import CSV image should exist', () => {
    cy.get('.import-csv').should('be.visible')
  })

  it('Table does not have any rows when app first loaded', () => {
    cy.get('.csv-table').find('tr').should('have.length', 0)
  })

  it('File input box exists', () => {
    cy.get('.form-control').should('exist')
  })

  it('Export button exists', () => {
    cy.get('.export-json').find('button').should('exist')
  })

  it('Error span is hidden when page loads', () => {
    cy.get('.no-data-error').should('not.be.visible')
  })

  it('Error span is visible when export button clicked without data', () => {
    cy.get('.export-json button').click()
    cy.get('.no-data-error').should('be.visible')
  })
})
