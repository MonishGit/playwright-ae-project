import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    
    testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // No retries locally — 2 on CI
  retries: process.env.CI ? 2 : 0,

  // 4 parallel workers locally — 2 on CI
  workers: process.env.CI ? 2 : 4,

  use: {
    // Every test starts from this URL
    baseURL: 'https://automationexercise.com',

    // Capture trace, screenshot, video on failure only
    trace:      'retain-on-failure',
    screenshot: 'only-on-failure',
    video:      'retain-on-failure',

    // Timeouts
    actionTimeout: 10_000,   // 10s per action
    navigationTimeout: 30_000, // 30s for page loads
  },

  // Run on Chromium only for now
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // HTML report + JUnit (for CI)
  reporter: [
    ['html',  { open: 'never' }],
    ['junit', { outputFile: 'results.xml' }],
    ['list'],
  ],
})