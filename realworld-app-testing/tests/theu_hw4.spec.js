const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/btvn4Page/loginPage');
const DashBoardPage = require('../pages/btvn4Page/dashboardPage'); 
const LOCATORS = require('../selectors/hw4Selectors/loginSelector');
import {
 USERNAME,
 PASSWORD 
 } from "../object_repository/data"
 //HOMEWORK4
//Testcase 1: Filter results = Ruthie Prosacco
test('Filter result with user name Ruthie Prosacco', async ({ page }) => {
  const loginPage = new LoginPage(page);
 
  await loginPage.filterNotifications("Ruthie Prosacco");
  
  await loginPage.login(USERNAME, PASSWORD);
  
  await loginPage.openNotifications();
  
  await page.pause();
});


//Testcase 2: Push more results
test('Push additional item to API response', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.pushAdditionalResults();

  await loginPage.login(USERNAME, PASSWORD);
  
  await loginPage.openNotifications();
  
  await page.pause();
});