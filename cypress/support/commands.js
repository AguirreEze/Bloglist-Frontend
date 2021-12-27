Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3000/api/login', { username, password })
    .then(res => {
      window.localStorage.setItem('BloglistUser', JSON.stringify(res.body))
    })
  cy.visit('http://localhost:3000/')
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes = 0 }) => {
  const user = JSON.parse(window.localStorage.getItem('BloglistUser'))
  const headers = {
    Authorization: `Bearer ${user.token}`
  }
  const body = {
    title,
    author,
    url,
    likes
  }
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    headers,
    body
  })
  cy.visit('http://localhost:3000/')
})
