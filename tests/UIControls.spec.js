//Author : Harsha
const { test, expect } = require('@playwright/test');
test("UIControls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyacademy ");
  await page.locator("#password").fill("learning");
  await page.locator("select.form-control").selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(page.locator("[href*='documents-request']")).toHaveAttribute('class', 'blinkingText');
})

test("ChildWindows", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const [newpage] = await Promise.all([

    context.waitForEvent('page'),
    page.locator("[href*='documents-request']").click(),

  ])

  const text = await newpage.locator(".red").textContent();
  console.log(text);
  const arrystrng = text.split("@");
  const domain = arrystrng[1].split(" ")[0];
  console.log(domain);
  await page.locator("#username").fill(domain);

console.log(await page.locator("#username").inputValue());



})

test
  ('recorded test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'Get started' }).click();
    await page.getByRole('link', { name: 'How to install Playwright' }).click();
  });



