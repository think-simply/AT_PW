// @ts-check
const { test, expect } = require('@playwright/test');
//const { chromium, firefox, webkit } = require('playwright');
const { chromium, firefox, webkit } = require('@playwright/test');
// import { generateUniqueNumber } from "../realworld-app-testing/helpers/utils.spec";
import {
  passwordLocator,

} from "../selectors/hw4Selectors/loginSelector";



//HOMEWORK3

async function registAccount(page, firstName, lastName, userName, password, confirmPassword) {
  await page.goto('http://localhost:3000/signup');
  await page.getByLabel('First Name').fill(firstName);
  await page.getByLabel('Last Name').fill(lastName);
  await page.getByLabel('Username').fill(userName);
 // await page.locator('xpath=//input[contains(@id,"password")]').fill(password);
 await page.locator(passwordLocator).fill(password);
  await page.getByLabel('Confirm Password').fill(confirmPassword);
  await page.getByLabel('Confirm Password').blur();
}

async function clickSignUp(page) {
  await page.getByRole('button', { name: 'Sign Up' }).click();
}
async function validateMessage(page, message) {
  await expect(page.getByText(message)).toBeVisible();

}

async function login(page, userName, passWord) {
  await page.goto('http://localhost:3000/signin');
  await page.getByLabel('Username').fill(userName);
  await page.getByLabel('Password').fill(passWord);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Get Started with Real World App')).toBeVisible({ timeout: 10000 });

}
// get random number
const getUniqueNumber = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1)
  const day = now.getDate()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  const uniqueNumber = Number(`${year}${month}${day}${hours}${minutes}${seconds}`)

  return uniqueNumber;
}

const id = getUniqueNumber();

const userNameData = `group3_${id}`;
const firstNameData = `group3`
const lastNameData = `group3`
const passWordData = `123456`
const passWordDataNo = `1234567`

// Testcase1: User create a new account successfully with all valid data
test('User create a new account successfully', async ({ page }) => {
  await registAccount(page, firstNameData, lastNameData, userNameData, passWordData, passWordData);
  await clickSignUp(page);
  await login(page, userNameData, passWordData);
})

// Testcase2: Leave first name null
test('Check validate message when User leave First name field null', async ({ page }) => {
  await registAccount(page, "", lastNameData, userNameData, passWordData, passWordData);
  await validateMessage(page, 'First Name is required')
})

// Testcase3: Leave last name null
test('Check validate message when User leave last name field null', async ({ page }) => {
  await registAccount(page, firstNameData, "", userNameData, passWordData, passWordData);
  await validateMessage(page, 'Last Name is required')
})

// Testcase4: Leave user name null
test('Check validate message when User leave user name field null', async ({ page }) => {
  await registAccount(page, firstNameData, lastNameData, "", passWordData, passWordData);
  await validateMessage(page, 'Username is required')
})

// Testcase5: Leave password null
test('Check validate message when User leave password field null', async ({ page }) => {
  await registAccount(page, firstNameData, lastNameData, userNameData, "", passWordData);
  await validateMessage(page, 'Enter your password')
})

// Testcase6: Leave confirm password null
test('Check validate message when User leave confirm password field null', async ({ page }) => {
  await registAccount(page, firstNameData, lastNameData, userNameData, passWordData, "");
  await validateMessage(page, 'Confirm your password')
})

// Testcase7: password and confirm password are not match
test('Check message when password and confirm password are not match', async ({ page }) => {
  await registAccount(page, firstNameData, lastNameData, userNameData, passWordData, passWordDataNo);
  await validateMessage(page, 'Password does not match')
})
