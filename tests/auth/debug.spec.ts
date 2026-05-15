import { test } from '@playwright/test'

test('debug signup form structure', async ({ page }) => {
  await page.goto('/login')
  await page.waitForLoadState('networkidle')

  // Handle consent
  try {
    const consentRoot = page.locator('.fc-consent-root')
    await consentRoot.waitFor({ state: 'visible', timeout: 5000 })
    await page.locator('button.fc-cta-consent').click({ force: true })
    await consentRoot.waitFor({ state: 'hidden', timeout: 5000 })
    console.log('✓ Consent dismissed')
  } catch {
    console.log('ℹ No consent')
  }

  // Print ALL forms on page and their text
  const forms = await page.locator('form').all()
  console.log(`\nTotal forms found: ${forms.length}`)
  for (let i = 0; i < forms.length; i++) {
    const text = await forms[i].textContent()
    console.log(`Form ${i}: "${text?.trim().substring(0, 80)}"`)
  }

  // Print ALL buttons on page
  const buttons = await page.getByRole('button').all()
  console.log(`\nTotal buttons found: ${buttons.length}`)
  for (const btn of buttons) {
    const text = await btn.textContent()
    const visible = await btn.isVisible()
    console.log(`  button: "${text?.trim()}" visible=${visible}`)
  }

  // Check specifically for signup button variations
  console.log('\nChecking signup button variations:')
  
  const v1 = page.getByRole('button', { name: 'Signup' })
  console.log('getByRole Signup:', await v1.count())

  const v2 = page.getByRole('button', { name: 'Signup!' })
  console.log('getByRole Signup!:', await v2.count())

  const v3 = page.locator('button[data-qa="signup-button"]')
  console.log('data-qa signup-button:', await v3.count())

  const v4 = page.locator('input[value="Signup"]')
  console.log('input value Signup:', await v4.count())

  await page.screenshot({ path: 'debug-signup.png' })
  console.log('\nScreenshot saved — check debug-signup.png')
})