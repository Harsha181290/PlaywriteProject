const { test, expect } = require('@playwright/test');


test('First Playwright test', async ({ browser }) => {


    const context = await browser.newContext();
    const page = await context.newPage();
    //page.route('**/*.css', route => route.abort());
    //page.route('**/*.{jpg,png,jpeg}', route => route.abort());
    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const sigin = page.locator("#signInBtn");
    const cardtitles = page.locator(".card-body  a");
    //page.on('request', request=> console.log(request.url()));
    //page.on('response', response=> console.log(response.url(),response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await username.fill("rahulshetty");
    await password.fill("learning");
    await sigin.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await password.fill("learning");
    await sigin.click();
    //console.log(await cardtitles.first().textContent());
    //console.log(await cardtitles.nth(1).textContent());
    await expect(cardtitles.first()).not.toHaveText("");
    const alltitles = await cardtitles.allTextContents();
    console.log(alltitles);
});
test('Page Playwright test', async ({ page }) => {


    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google")
});
