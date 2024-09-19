// @ts-check
const { test, expect } = require('@playwright/test');
const { chromium , firefox, webkit} = require('@playwright/test');


test('has title',async ({page})=>{
  await page.goto('http://localhost:3000/signin');
  const iframe = page.frameLocator('iframe[title= "Login Form Iframe"]')
  await iframe.locator('#username').fill('testing');
  await expect(iframe.locator('#username')).toBeVisible();
  await iframe.locator('#password').fill('testing');// đi vào trong iframe
  await expect(iframe.locator('#password')).toBeVisible();

  await page.locator('#username').fill('test')// đi ra khỏi iframe thì gọi page như bthg là dk
  
  })
  
  // test('has title', async ({ }) => {
  //   const browser = await chromium.launch()
  //   const context = await browser.newContext()
  //   const page = await context.newPage();
  //   const page2 = await context.newPage();
  //   await page.goto('https://playwright.dev/');
  //   await page2.goto('https://www.google.com/');
  
  //   // Expect a title "to contain" a substring.
  //   await expect(page).toHaveTitle(/Playwright/);
  //   await browser.close();
  // });
  
  test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
  
    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();
  
    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });