import { test, expect } from '@playwright/test'
import { ApiClient } from '../../utils/apiClient'
import users from '../../test-data/users.json'

test.describe('Registration API', () => {

  let apiClient: ApiClient

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request)
    // Clean up first — delete account if it exists from a previous run
    await apiClient.deleteAccount(
      users.registerUser.email,
      users.registerUser.password
    )
  })

  test.afterEach(async ({ request }) => {
    // Always clean up after — no leftover test data
    apiClient = new ApiClient(request)
    await apiClient.deleteAccount(
      users.registerUser.email,
      users.registerUser.password
    )
  })

  test.skip('POST /api/createAccount returns 201', async () => {
    const { status, body } = await apiClient.createAccount(users.registerUser)
    expect(status).toBe(200) // this API returns 200 not 201
    expect(body.responseCode).toBe(201)
    expect(body.message).toBe('User created!')
  })

  test.skip('POST /api/verifyLogin succeeds after account creation', async () => {
    // Create first
    await apiClient.createAccount(users.registerUser)

    // Then verify login works
    const { body } = await apiClient.verifyLogin(
      users.registerUser.email,
      users.registerUser.password
    )
    expect(body.responseCode).toBe(200)
    expect(body.message).toBe('User exists!')
  })

  test('DELETE /api/deleteAccount removes the user', async () => {
    // Create first
    await apiClient.createAccount(users.registerUser)

    // Delete
    const { body } = await apiClient.deleteAccount(
      users.registerUser.email,
      users.registerUser.password
    )
    expect(body.responseCode).toBe(200)
    expect(body.message).toBe('Account deleted!')

    // Verify gone — login should fail now
    const verify = await apiClient.verifyLogin(
      users.registerUser.email,
      users.registerUser.password
    )
    expect(verify.body.responseCode).toBe(404)
  })
})