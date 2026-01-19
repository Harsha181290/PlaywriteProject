const { test, expect } = require('@playwright/test')
//test.describe.configure({mode:'serial'});
test("@Web Popup Validation", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    /*await page.goto("https://www.google.com/");
    await page.goBack();
    await page.goForward();*/
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framespage = page.frameLocator("#courses-iframe");
    await framespage.locator("a.new-navbar-highlighter[href='lifetime-access']").waitFor({ state: "visible", timeout: 10000 });
    await framespage.locator("a.new-navbar-highlighter[href='lifetime-access']").click();
    const textcheck = await framespage.locator(".text h2").textContent();
    console.log(textcheck.split(" ")[1]);


})

test("Screenshot", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'partialscreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: 'screenshot.png' })
    await expect(page.locator("#displayed-text")).toBeHidden();
})
test("Visual Testing", async ({ page }) => {

    await page.goto("https://www.google.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
    
})