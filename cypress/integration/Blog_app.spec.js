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
      cy.login({ username: user.username, password: user.password })
    })

    it('A blog can be created', () => {
      cy.contains('Add a Blog').click()
      cy.get('[data-test-id="create-new-blog-form"]').within(() => {
        cy.get('input').eq(0).type(blog.title)
        cy.get('input').eq(1).type(blog.author)
        cy.get('input').eq(2).type(blog.url)
        cy.get('button').contains('Create').click()
      })
      cy.contains(`New blog: "${blog.title}" added`)
      cy.get('[data-test-id="notifications"]').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.visit('http://localhost:3000/')
      cy.contains(`${blog.title}${blog.author}`)
    })

    describe('When you have blogs on the list', () => {
      beforeEach(() => {
        cy.createBlog({ title: blog.title, author: blog.author, url: blog.url })
      })
      it('A blog can be liked', () => {
        cy.contains(`${blog.title}${blog.author}`)
        cy.contains('view').click()
        cy.get('button').contains('like').click()
        cy.contains(`Liked ${blog.title}, from ${blog.author}`).should('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it('A blog can be deleted by its owner', () => {
        cy.contains(`${blog.title}${blog.author}`)
        cy.contains('view').click()
        cy.get('button').contains('delete').click()
        cy.contains(`Deleted ${blog.title}, by ${blog.author}`).should('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it.only('When list have many blogs, they are ordered by likes', () => {
        cy.createBlog({ title: blog.title, author: blog.author, url: blog.url, likes: 3 })
        cy.createBlog({ title: blog.title, author: blog.author, url: blog.url, likes: 7 })
        cy.contains(blog.title)
        cy.get('[data-test-id="blog-list-display"]').within(() => {
          cy.get('button').click({ multiple: true })
        })
        cy.get('.likes').eq(0).should('include.text', '7')
      })
    })
  })
})
