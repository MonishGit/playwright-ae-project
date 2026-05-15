import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'

// Load test data from JSON — not hardcoded in tests
import users from '../../test-data/users.json'

test.describe('Login page', () => {

  let loginPage: LoginPage

  // Runs before each test — fresh page, fresh LoginPage object
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await loginPage.navigate()
  })

  // ── Happy path ──────────────────────────────────────

  test('login page loads with correct heading', async ({ page }) => {
    await loginPage.expectLoginPageVisible()
  })

  test('valid credentials log user in successfully', async ({ page }) => {
    await loginPage.login(
      users.validUser.email,
      users.validUser.password
    )
    await loginPage.expectLoggedIn()
  })

  // ── Negative tests ──────────────────────────────────

  test('invalid password shows error message', async ({ page }) => {
    await loginPage.login(
      users.validUser.email,
      users.invalidUser.password
    )
    await loginPage.expectLoginError()
  })

  test('invalid email shows error message', async ({ page }) => {
    await loginPage.login(
      users.invalidUser.email,
      users.invalidUser.password
    )
    await loginPage.expectLoginError()
  })

  test('empty email — login button submits and shows error',async ({ page }) => {
     await loginPage.submitEmptyEmail('somePassword')
     await loginPage.expectedBrowserValidationBlocked()
   
  })

  test('empty Password — login button submits and shows error',async ({ page }) => {
     await loginPage.submitEmptyPassword('gmail@gmail.com')
     await loginPage.expectedBrowserValidationBlocked()
})
})