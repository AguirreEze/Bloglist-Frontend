const user = {
  username: 'Tydro',
  password: 'eg3',
  name: 'Ezequiel'
}
const blog = {
  title: 'Testing React',
  author: 'Ezequiel',
  url: 'https://www.google.com'
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

  describe('When logged in', () => {
    beforeEach(() => {
      cy.get('input').first().type(user.username)
      cy.get('[placeholder="Password"]').type(user.password)
      cy.contains('login').click()
    })

    it.only('A blog can be created', () => {
      cy.contains('Add a Blog').click()
      cy.get('[data-test-id="create-new-blog-form"]').get('input').eq(0).type(blog.title)
      cy.get('[data-test-id="create-new-blog-form"]').get('input').eq(1).type(blog.author)
      cy.get('[data-test-id="create-new-blog-form"]').get('input').eq(2).type(blog.url)
      cy.get('[data-test-id="create-new-blog-form"]').get('button').contains('Create').click()
      cy.contains(`New blog: "${blog.title}" added`)
      cy.get('[data-test-id="notifications"]').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.visit('http://localhost:3000/')
      cy.contains(`${blog.title}${blog.author}`)
    })
  })
})
