// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const isCI = !!process.env.CI;

module.exports = defineConfig({
  testDir: './tests',

  timeout: 40 * 1000,

  retries: isCI ? 2 : 0,

  expect: {
    timeout: 5000,
  },

  reporter: isCI
    ? [['allure-playwright']]
    : [['html', { open: 'on-failure' }]],

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
     launchOptions: {
      slowMo: 2000, // milliseconds
    },
  },
});
