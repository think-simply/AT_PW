const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');

//cách get số random
const getUniqueNumber = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1);
  const day = now.getDate()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  const uniqueNumber = Number(`$(year)$(month)$(day)$(hours)$(minutes)$(seconds)`)
  return uniqueNumber;
}
const id = getUniqueNumber();

const username = `group3_${id}`;
const email = `group3_${id}@gmail.com`
const password = `123456`
//Testcase: regist a new account
test('Test Case 1: Register User', async ({ page }) => {
  // const browser = await chromium.launch();
  // const context = await browser.newContext()
  // const page = await context.newPage();

  await register(page);
  await expect(page.locator(`//a[contains(.,"Logged in as ${username}")]`)).toBeVisible();

  await page.getByText('Delete Account').click();
  await expect(page.getByText('Account Deleted!')).toBeVisible();
  await page.getByText("Continue").click();
});

test('Test Case 2: Login User with correct email and password', async ({ page }) => {
  await register(page);
  await page.getByText("Logout").click();

  // await page.goto('https://automationexercise.com/');
  await expect(page.getByAltText("Website for automation practice")).toBeVisible();

  await page.getByText("Signup / Login").click();
  await expect(page.getByText('Login to your account')).toBeVisible();

  await page.locator("input[data-qa='login-email']").fill(email);
  await page.locator("input[data-qa='login-password']").fill(password);
  await page.getByRole('button', { name: "Login" }).click();
  await expect(page.locator(`//a[contains(.,"Logged in as ${username}")]`)).toBeVisible();

  await page.getByText('Delete Account').click();
  await expect(page.getByText('Account Deleted!')).toBeVisible();
});

async function register(page) {
  await page.goto('https://automationexercise.com/');
  await expect(page.getByAltText("Website for automation practice")).toBeVisible();

  await page.getByText("Signup / Login").click();
  await expect(page.getByText('New User Signup!')).toBeVisible();

  await page.locator(".signup-form input[name='name']").fill(username);
  await page.locator(".signup-form input[name='email']").fill(email);
  await page.getByRole('button', { name: "Signup" }).click();
  await expect(page.getByText('Enter Account Information')).toBeVisible();

  await page.locator("#id_gender2").click();
  await page.locator("#password").fill(password);
  await page.locator("#days").selectOption({ label: '1' });
  await page.locator("#months").selectOption({ label: 'January' });
  await page.locator("#years").selectOption({ label: '2005' });

  await page.getByLabel("Sign up for our newsletter!").click();
  await page.getByLabel("Receive special offers from our partners!").click();

  await page.locator("#first_name").fill("Group");
  await page.locator("#last_name").fill("Fineee");
  await page.locator("#address1").fill("HQV");
  await page.locator("#state").fill("VN");
  await page.locator("#city").fill("HN");
  await page.locator("#zipcode").fill("100000");
  await page.locator("#mobile_number").fill("0345556789");
  await page.getByRole('button', { name: "Create Account" }).click();

  await expect(page.getByText("Account Created")).toBeVisible();
  await page.locator("a[data-qa='continue-button']").click();
}

//  test.afterEach() => {
//   // call API, delete random user or là viết query truy cập vào database và xóa user
// }