/* eslint-disable no-undef */
describe('Blog app', function() {
  const userExample = {
    'name': 'Arto Hellas',
    'username': 'hellas',
    'password': 'hellas@2022'
  }
  const userExampleOther = {
    'name': 'David Beckham',
    'username': 'david',
    'password': 'david@2022'
  }
  const blogExample = {
    'title': 'Go To Statement Considered Harmful',
    'author': 'Edsger W. Dijkstra',
    'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
  }
  beforeEach(function () {
    // reset
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // create user
    cy.request('POST', 'http://localhost:3003/api/users', userExample)
    cy.request('POST', 'http://localhost:3003/api/users', userExampleOther)
    // visit and login user
    cy.visit('http://localhost:3000')
    cy.get('input[name="Username"]').type(userExample.username)
    cy.get('input[name="Password"]').type(userExample.password)
    cy.contains('login').click()
    cy.contains('create new blog').click()
    cy.get('input[name="Title"]').type(blogExample.title)
    cy.get('input[name="Author"]').type(blogExample.author)
    cy.get('input[name="Url"]').type(blogExample.url)
    cy.get('.saveBlog').click()
    cy.contains('logout').click()
  })

  describe('Delete',function() {
    it('User can not delete a non-self-created blog', function() {
      cy.get('input[name="Username"]').type(userExampleOther.username)
      cy.get('input[name="Password"]').type(userExampleOther.password)
      cy.contains('login').click()
      cy.contains('view').click()
      cy.get('.btnRemove').should('not.exist')
    })
    it('User can delete a self-created blog', function() {
      cy.get('input[name="Username"]').type(userExample.username)
      cy.get('input[name="Password"]').type(userExample.password)
      cy.contains('login').click()
      cy.contains('view').click()
      cy.get('.btnRemove').click()
      cy.on('window:confirm', () => true)
      cy.get('.titleAndAuthor').should('not.exist')
    })
  })
})