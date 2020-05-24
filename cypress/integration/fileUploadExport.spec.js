import 'cypress-file-upload'

/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
context('Window', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
    const sampleFile = 'small-random.csv'
    cy.get('[data-cy=file-input]').attachFile(sampleFile)
  })

  it('form - uploads a csv file', () => {
    cy.get('.form-control').should('have.value', 'C:\\fakepath\\small-random.csv')
  })

  it('table - table is visible', () => {
    cy.get('.csv-table').should('be.visible')
  })

  it('table - table is populated with csv data', () => {
    cy.get('.csv-table').find('tr').should('have.length', 4)
  })

  it('table - table cells have correct values', () => {
    cy.get('.csv-table').find('tr > td > input').eq(0).should('have.value', 'sad')
    cy.get('.csv-table').find('tr > td > input').eq(2).should('have.value', 'worry')
    cy.get('.csv-table').find('tr').eq(1).find('td').eq(1).find('input').eq(0).should('have.value', 'satisfied')
  })

  it('export - file download link is created when export button clicked', () => {
    cy.get('.export-json button').click()
    cy.get('a').should('have.attr', 'download').and('contain', 'csv_data.json')
  })
})
