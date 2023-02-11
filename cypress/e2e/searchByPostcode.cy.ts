describe('Access Platform', () => {
  it('Shows welcome message when home route is accessed', () => {
    cy.visit('http://localhost:5173')
    cy.get('[data-cy="header-title"]').should('contain', 'Welcome')
  })
  it('Shows empty search input when home route is accessed', () => {
    cy.visit('http://localhost:5173')
    cy.get('[data-cy="search-input"]').should('have.value', '')
  })
})

describe('Search postcode and interact with pagination', () => {
  it('Search the postcode SE19 and finds more than 1 restaurant', () => {
    cy.visit('http://localhost:5173')
    cy.get('[data-cy="search-input"]').type("SE19")
    cy.get('[data-cy="search-button"]').click()
    cy.url().should('include', '/SE19/page/1')
    cy.get('[data-cy="restaurant-card"]').should('have.length.gte', 1)

  })

  it('Changes pages and URL changes too', () => {
    cy.visit('http://localhost:5173/SE19/page/1')
    cy.get('[data-cy="pagination"]').find("button").contains("2").click()
    cy.url().should('include', '/page/2')
    cy.get('[data-cy="restaurant-card"]').should('have.length.gte', 1) 
  })
})

describe('Search wrong postcode', () => {
  it('Search the postcode WRONG875 and do not find restaurants', () => {
    cy.visit('http://localhost:5173')
    cy.get('[data-cy="search-input"]').type("WRONG875")
    cy.get('[data-cy="search-button"]').click()
    cy.url().should('include', '/WRONG875/page/1')
    cy.get('[data-cy="restaurants-not-found-msg"]').should('be.visible')
  })
})

describe('Access not existent page', () => {
  it('Search the postcode SE19 and tries to acess the page 150', () => {
    cy.visit('http://localhost:5173/SE19/page/150')
    cy.url().should("be.equals", "http://localhost:5173/SE19/page/1")
  })
})