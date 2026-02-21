const Playwright = require('@playwright/test');
const { POManager } = require('../../tests/PageObjects/POManager');
const { Before, After, AfterStep } = require('@cucumber/cucumber');
Before(async function () {
    this.browser = await Playwright.chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page);
});
After(async function () {
    console.log('Closing the browser');
});
AfterStep(async function ({ result }) {
    if (result.status === 'FAILED') {

             await this.page.screenshot({ path: `./Screenshots/Scenario.png` });
    }
});