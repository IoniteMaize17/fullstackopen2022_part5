/* eslint-disable no-undef */
describe('Blog app', function() {
  const userExample = {
    'name': 'Arto Hellas',
    'username': 'hellas',
    'password': 'hellas@2022'
  }
  const blogExample1 = {
    'title': 'Go To Statement Considered Harmful',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
  }
  const blogExample2 = {
    'title': 'React patterns',
    'author': 'Michael Chan',
    'url': 'https://reactpatterns.com/'
  }
  const blogExample3 = {
    'title': 'Canonical string reduction',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
  }
  beforeEach(function () {
    // reset
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create user
    cy.request('POST', 'http://localhost:3003/api/users', userExample)
    // visit and login user
    cy.visit('http://localhost:3000')
    cy.get('input[name="Username"]').type(userExample.username)
    cy.get('input[name="Password"]').type(userExample.password)
    cy.contains('login').click()
    cy.contains('create new blog').click()
    cy.get('input[name="Title"]').type(blogExample1.title)
    cy.get('input[name="Author"]').type(blogExample1.author)
    cy.get('input[name="Url"]').type(blogExample1.url)
    cy.get('.saveBlog').click()
    cy.contains('create new blog').click()
    cy.get('input[name="Title"]').type(blogExample2.title)
    cy.get('input[name="Author"]').type(blogExample2.author)
    cy.get('input[name="Url"]').type(blogExample2.url)
    cy.get('.saveBlog').click()
    cy.contains('create new blog').click()
    cy.get('input[name="Title"]').type(blogExample3.title)
    cy.get('input[name="Author"]').type(blogExample3.author)
    cy.get('input[name="Url"]').type(blogExample3.url)
    cy.get('.saveBlog').click()
    cy.wait(2000)
  })

  describe('Blog in like-order',function() {
    it('Blog in like-order', function() {
      cy.get('.btnDetailInfo').eq(0).click()
      cy.contains('like').click()
      cy.wait(1000)
      cy.contains('hide').click()
      cy.get('.btnDetailInfo').eq(1).click()
      cy.contains('like').click()
      cy.wait(1000)
      cy.contains('like').click()
      cy.wait(1000)
      cy.contains('hide').click()
      cy.get('.btnDetailInfo').eq(2).click()
      cy.contains('like').click()
      cy.wait(1000)
      cy.contains('like').click()
      cy.wait(1000)
      cy.contains('like').click()
      cy.wait(1000)
      cy.contains('hide').click()

      cy.get('.titleAndAuthor').eq(0).should('contain', `${blogExample3.title} ${blogExample3.author}`)
      cy.get('.titleAndAuthor').eq(1).should('contain', `${blogExample2.title} ${blogExample2.author}`)
    })
  })
})