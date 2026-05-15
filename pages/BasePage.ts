import { type Page, type Locator, expect } from '@playwright/test'

export class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Navigate relative to baseURL in config
  async goto(path: string) {
    await this.page.goto(path)
    await this.page.waitForLoadState('load')
    await this.handleConsentPopup()
  }

  async waitForNavigationAndConsent() {
    await this.page.waitForLoadState('load')
    await this.handleConsentPopup()
  }

    // ── Consent popup handler ────────────────────────────
  // Called automatically after every goto()
  // Uses locator.isVisible() — does NOT throw if popup absent
  // Safe to call on every page whether popup appears or not

   async handleConsentPopup() {
    try {
        const consentRoot = this.page.locator('.fc-consent-root')

        // Wait up to 6 seconds for banner to appear
        // Longer than networkidle because banner loads asynchronously
        await consentRoot.waitFor({ state: 'visible', timeout: 6000 })
        console.log('✓ Consent banner detected')

        // force:true bypasses the overlay interception check
        // Safe because we know exactly which button we are targeting
        await this.page.locator('button.fc-cta-consent')
        .click({ force: true })

        // Wait for the ENTIRE consent root to disappear
        // Not just the overlay — the whole banner structure
        await consentRoot.waitFor({ state: 'hidden', timeout: 5000 })
        console.log('✓ Consent dismissed and banner gone')

    } catch {
        console.log('ℹ No consent popup — continuing')
    }
}


  // Wait for full page load
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle')
  }

  // Get current page URL
  async getCurrentUrl(): Promise<string> {
    return this.page.url()
  }

  // Assert page title
  async expectTitle(title: string | RegExp) {
    await expect(this.page).toHaveTitle(title)
  }
}