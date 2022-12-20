/* eslint-disable no-undef */
describe('Blog app', function() {
  const userExample = {
    'name': 'Arto Hellas',
    'username': 'hellas',
    'password': 'hellas@2022'
  }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', userExample)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type(userExample.username)
      cy.get('input[name="Password"]').type(userExample.password)
      cy.contains('login').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type(userExample.username)
      cy.get('input[name="Password"]').type(userExample.password + '*')
      cy.contains('login').click()
      cy.get('.notificationRed').contains('wrong username or password')
    })
  })
})