import { type Page, expect } from '@playwright/test'
import { BasePage } from './BasePage'
import { link } from 'node:fs'

export class RegisterPage extends BasePage {

  // ── Step 1 locators — Name + Email form ───────────────
  get signupName() {
    return this.page.getByPlaceholder('Name')
  }

  get signupEmail() {
    return this.page.getByPlaceholder('Email Address').nth(1)
  }

  get signupButton() {
    return this.page.locator('[data-qa="signup-button"]')
    //   .locator('form')
    //   .filter({ hasText: 'Signup' })
    //   .getByRole('button', { name: 'Signup' })
    // .locator('form[action="/signup"]').getByRole('button', { name: 'Signup' })
  }

  // ── Step 2 locators — Account details form ────────────
  get titleMr() {
    return this.page.getByLabel('Mr.')
  }

  get passwordInput() {
    return this.page.getByLabel('Password *')
  }

  get birthDate() {
    return this.page.locator('#days')
  }

  get birthMonth() {
    return this.page.locator('#months')
  }

  get birthYear() {
    return this.page.locator('#years')
  }

  get firstnameInput() {
    return this.page.getByLabel('First name *')
  }

  get lastnameInput() {
    return this.page.getByLabel('Last name *')
  }

  get companyInput() {
    return this.page.getByLabel('Company', { exact: true })
  }

  get address1Input() {
    return this.page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)')
  }

  get address2Input() {
    return this.page.getByLabel('Address 2')
  }

  get countrySelect() {
    return this.page.locator('#country')
  }

  get stateInput() {
    return this.page.getByLabel('State *')
  }

  get cityInput() {
    return this.page.getByLabel('City *')
  }

  get zipcodeInput() {
    return this.page.locator('#zipcode')
  }

  get mobileInput() {
    return this.page.getByLabel('Mobile Number *')
  }

  get createAccountButton() {
    return this.page.getByRole('button',{name: 'Create Account'})
  }

// -------Assertions-------------------------------
  get accountCreatedHeading() {
    return this.page.getByRole('heading', {name: 'Account Created!'})
}
  get continueButton() {
    return this.page.getByRole('link',{name: 'Continue'})
  }

// ---------- Action------------------
async navigate() {
    await this.page.goto('/login')
}

async fillSignupForm(name: string, email: string) {
    await this.signupName.fill(name)
    await this.signupEmail.fill(email)
    await this.signupButton.click({ force: true })
    await this.waitForNavigationAndConsent()

}

async expectEmailAlreadyExists() {
  // The site shows this error as a paragraph tag
  // Let us be flexible with the exact text using regex
  await expect(
    this.page.getByText(/email address already exist/i)
  ).toBeVisible()
}

async fillAccountDetails(userData: {
    password: string
    birth_date: string
    birth_month: string
    birth_year: string
    firstname: string
    lastname: string
    company: string
    address1: string
    address2: string
    country: string
    state: string
    city: string
    zipcode: string
    mobile_number: string
 }) {
    await this.titleMr.check()
    await this.passwordInput.fill(userData.password)
     // Dropdowns — select by visible text
    await this.birthDate.selectOption(userData.birth_date)
    await this.birthMonth.selectOption({ label: userData.birth_month })
    await this.birthYear.selectOption(userData.birth_year)
    await this.firstnameInput.fill(userData.firstname)
    await this.lastnameInput.fill(userData.lastname)
    await this.companyInput.fill(userData.company)
    await this.address1Input.fill(userData.address1)
    await this.address2Input.fill(userData.address2)
    await this.countrySelect.selectOption(userData.country)
    await this.stateInput.fill(userData.state)
    await this.cityInput.fill(userData.city)
    await this.zipcodeInput.fill(userData.zipcode)
    await this.mobileInput.fill(userData.mobile_number)
    await this.createAccountButton.click()
 }
   async expectAccountCreated() {
    await expect(this.accountCreatedHeading).toBeVisible()
  }

  async clickContinue() {
    await this.continueButton.click()
  }
}