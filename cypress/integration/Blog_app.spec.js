const user = {
  username: 'Tydro',
  password: 'eg3',
  name: 'Ezequiel'
}

describe('Blog App', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000/')
    cy.request('POST', 'http://localhost:3003/api/users', user)
  })

  it('fronpage can be opened', () => {
    cy.contains('Login to the application')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('input').first().type(user.username)
      cy.get('[placeholder="Password"]').type(user.password)
      cy.contains('login').click()
      cy.contains('Welcome Tydro')
    })
    it('fails with wrong credentials', () => {
      cy.get('input').first().type(`fail${user.username}`)
      cy.get('[placeholder="Password"]').type(user.password)
      cy.contains('login').click()
      cy.contains('user or password incorrect')
      cy.get('[data-test-id="notifications"]').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})
