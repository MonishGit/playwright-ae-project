import { test as base } from '@playwright/test'
import { LoginPage }    from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { ApiClient }    from '../utils/apiClient'

type Fixtures = {
  loginPage:    LoginPage
  registerPage: RegisterPage
  apiClient:    ApiClient
}

export const test = base.extend<Fixtures>({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page))
  },

  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request))
  },
})

export { expect } from '@playwright/test'