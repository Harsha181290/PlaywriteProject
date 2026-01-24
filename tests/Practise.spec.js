const {test,expect} = require('@playwright/test');
test('Google', async({page})=>{

await page.goto("https://www.google.com");
await expect(page).toHaveTitle('Google');

});

test('Validate URL',async({page})=>{

await page.goto("https://www.google.com/");
await expect(page).toHaveURL(/https:\/\/www\.google\.com/);

});

test('heading is visible', async ({ page }) => {
  await page.goto('https://example.com');
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
});
test('click more information link', async ({ page }) => {
  await page.goto('https://example.com');
  await page.click('text=Learn more');
  await expect(page).toHaveURL(/iana/);
});

test('fill input field', async ({ page }) => {
  await page.goto('https://www.w3schools.com/html/html_forms.asp');
  await page.fill('#fname', 'Playwright');
  await expect(page.locator('#fname')).toHaveValue('Playwright');
});

test('check checkbox', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');
  const checkbox = page.locator('input[type="checkbox"]').first();
  await checkbox.check();
  await expect(checkbox).toBeChecked();
});
test('button is enabled', async ({ page }) => {
  await page.goto('https://example.com');
  const button = page.locator('a');
  await expect(button).toBeEnabled();
});
test('validate page text', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.locator('p').nth(0)).toContainText('This domain is for use in documentation examples without needing permission. Avoid use in operations.');
});
