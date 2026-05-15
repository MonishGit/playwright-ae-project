import { test, expect } from '@playwright/test'

test('site is reachable and loads correctly', async ({ page }) => {
  // goto uses baseURL from config automatically
  await page.goto('/')

  // Assert the page title
  await expect(page).toHaveTitle(/Automation Exercise/)

  // Assert the navigation is visible
  await expect(
    page.getByRole('link', { name: 'Home' })
  ).toBeVisible()

  console.log('✓ Site reachable, title correct, nav visible')
})