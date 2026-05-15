import { type Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'

export class LoginPage extends BasePage {

  // ── Locators ──────────────────────────────────────────
  // Defined as getters so they re-query the DOM every time
  // No stale element issue — remember our earlier discussion

  
  
  get signupLoginLink() {
    return this.page.getByRole('link', { name: 'Signup / Login' })
  }

  get emailInput() {
    return this.page.getByPlaceholder('Email Address').first()
  }

  get passwordInput() {
    return this.page.getByPlaceholder('Password').first()
  }

  get loginButton() {
    return this.page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByRole('button', { name: 'Login' })
  }

  get loginErrorMsg() {
    return this.page.getByText('Your email or password is incorrect!')
  }

  get signupNameInput() {
    return this.page.getByPlaceholder('Name')
  }

  get signupEmailInput() {
    return this.page.getByPlaceholder('Email Address').nth(1)
  }

  // ── Actions ───────────────────────────────────────────

  async navigate() {
    await this.goto('/login')
    await this.waitForPageLoad()
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
    await this.waitForNavigationAndConsent()
  }

   // Add this method alongside your other assertions
  // HTML5 validation makes the field invalid
  // Browser marks it with :invalid pseudo-class
  // We check the email input has the required attribute
  // and is currently invalid using validationMessage
  async submitEmptyEmail(password: string) {
    await this.passwordInput.fill(password)
    await this.loginButton.click({ force: true })
    }
  async submitEmptyPassword(email: string) {
    await this.emailInput.fill(email)
    await this.loginButton.click({ force: true })
    }

  // ── Assertions ────────────────────────────────────────

  async expectLoginPageVisible() {
    await expect(
      this.page.getByRole('heading', { name: 'Login to your account' })
    ).toBeVisible()
  }
  async expectLoginError() {
    await expect(this.loginErrorMsg).toBeVisible()
  }
  async expectLoggedIn() {
    // After login, URL changes away from /login
    await expect(this.page).toHaveURL('https://automationexercise.com/')
    // Logged in users see "Logout" in the nav
    await expect(
      this.page.getByRole('link', { name: ' Logout' })
    ).toBeVisible()
  }
  async expectedBrowserValidationBlocked() {
    // Still on login page — form never submitted
  await expect(this.page).toHaveURL(/login/)
  console.log('✓ Browser validation blocked submission')
  }

}