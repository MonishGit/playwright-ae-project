import { test, expect } from '../../fixtures'
import users from '../../test-data/users.json'
import { ApiClient } from '../../utils/apiClient'

// tests/auth/registration.spec.ts

test.describe('Registration', () => {

  // beforeEach only cleans up the registerUser
  test.beforeEach(async ({ request }) => {
    const api = new ApiClient(request)
    try {
      await api.deleteAccount(
        users.registerUser.email,
        users.registerUser.password
      )
    } catch {
      console.log('ℹ User did not exist — clean state')
    }
  })

  test.afterEach(async ({ request }) => {
    const api = new ApiClient(request)
    try {
      await api.deleteAccount(
        users.registerUser.email,
        users.registerUser.password
      )
    } catch {}
  })

  // ── Pure UI test ────────────────────────────────────────
  test.skip('new user can register via UI form', async ({ registerPage }) => {
    await registerPage.navigate()
    await registerPage.fillSignupForm(
      users.registerUser.name,
      users.registerUser.email
    )
    await registerPage.fillAccountDetails(users.registerUser)
    await registerPage.expectAccountCreated()
  })

  // ── Hybrid test ─────────────────────────────────────────
  test('API created user can log in via UI', async ({ loginPage, request }) => {
    const api = new ApiClient(request)
    await api.createAccount(users.registerUser)

    await loginPage.navigate()
    await loginPage.login(
      users.registerUser.email,
      users.registerUser.password
    )
    await loginPage.expectLoggedIn()
  })

  // ── Negative test — use validUser which always exists ───
  test.skip('existing email shows error on signup', async ({ registerPage }) => {
    await registerPage.navigate()

    // Use validUser — this account always exists, no API setup needed
    await registerPage.fillSignupForm(
      users.validUser.name,
      users.validUser.email
    )

    // Check what error the site actually shows
    await registerPage.expectEmailAlreadyExists()
  })
})