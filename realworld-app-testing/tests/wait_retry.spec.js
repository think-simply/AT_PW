// @ts-check
const { test, expect } = require('@playwright/test');
const { chromium, firefox, webkit } = require('playwright');
import {retry} from '../utils/utils.spec.js'
//HOMEWORK
//First testcase: Leave all fields null
test('Verify warning message when leave all fields null', async ({ }) => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage();
  await page.goto('http://localhost:3000/signin');
  await page.getByLabel('Username').fill('');
  await page.getByLabel('Password').fill('');

  await expect(page.getByText('Username is required')).toBeVisible();

});
//Second testcase: Enter password less than 4 characters
test('Login with password less than 4 characters', async ({ }) => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage();
  await page.goto('http://localhost:3000/signin');
  await page.getByLabel('Username').fill('abd');
  await page.getByLabel('Password').fill('abd');
  await page.getByLabel('Password').blur();

  await expect(page.getByText('Password must contain at least 4 characters')).toBeVisible({ timeout: 10000 });

});
//Third testcase: Login with an invalid account
test('Login with incorrect account', async ({ }) => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage();
  await page.goto('http://localhost:3000/signin');
  await page.getByLabel('Username').fill('abd');
  await page.getByLabel('Password').fill('abd11');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByText('Username or password is invalid')).toBeVisible();

});
//Fourth testcase: Login with a valid account
test('Login with a valid account', async ({ }) => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage();
  await page.goto('http://localhost:3000/signin');
  await page.getByLabel('Username').fill('Heath93');
  await page.getByLabel('Password').fill('s3cret');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByText('Logout')).toBeVisible();


});


test('Click to sign up link', async ({ page }) => {
  await page.goto('http://localhost:3000/signin');
  const signUpLink = page.locator('[data-test] = "signup"')
  const text = page.getByText('This text will shown after8 seconds')
 await retry()
  // while (attempts < maxRetries) {
  //   try {
  //     await expect(text).toBeVisible()
  //     await signUpLink.click();
  //     break;
  //   } catch(e){
  //     attempts++;
  //     if (attempts > maxRetries){
  //       throw e
  //     }

  //     await page.waitForTimeout(1000)
  //   }
  // }


}) 