/// <reference = cypress>

describe('Teste de criação, registro e login', () => {
  it('Teste criação de usuário com sucesso', () => {
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type("Pedro")
    cy.get('#Text1').type("Pedro")
    cy.get('#username').type("Pedro")
    cy.get('#password').type("Pedro")
    cy.get('.btn-primary').click()

    cy.get('.ng-binding').should('contain.text', 'Registration successful')
  });
  
  it('Teste criação de usuário com falha', () => {
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type("Pedro")
    cy.get('#Text1').type("Pedro")
    cy.get('#username').type("Pedro")
    cy.get('.btn-primary').should('be.disabled')
  });

  it('Teste de login com sucesso', () => {
    const { password, userId } = registerUser()

    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('#username').type(userId)
    cy.get('#password').type(password)

    cy.get('.btn-primary').click()

    cy.get('h1.ng-binding').should('contain.text', userId)
  });

  it('Teste de login depois de deletar o usuário', () => {
    const { userId, password } = makeLogin()
    
    cy.get('.ng-binding > a').click()
    cy.get('.btn').should('be.visible').click()

    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('#username').type(userId)
    cy.get('#password').type(password)

    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('have.text', 'Username or password is incorrect')
  });
    
});

function registerUser() { 
  const now = Date.now()
  const userId = `${now}ID`
  const password = `${now}PASSWORD`

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('.btn-link').click()
  cy.get('#firstName').type(userId)
  cy.get('#Text1').type(userId)
  cy.get('#username').type(userId)
  cy.get('#password').type(password)
  cy.get('.btn-primary').click()

  return {
    userId,
    password
  }
}

function makeLogin() {
  const { password, userId } = registerUser()

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
  cy.get('#username').type(userId)
  cy.get('#password').type(password)

  cy.get('.btn-primary').click()

  return {
    userId,
    password
  }
}
