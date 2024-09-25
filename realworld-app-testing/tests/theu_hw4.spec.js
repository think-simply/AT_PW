const { test } = require('@playwright/test');
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
  const dashBoardPage = new DashBoardPage(page);

  await loginPage.login(USERNAME, PASSWORD);
  await dashBoardPage.filterNotifications("Ruthie Prosacco");
  await dashBoardPage.openNotifications();

  await page.pause();
});


//Testcase 2: Push more results
test('Push additional item to API response', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashBoardPage = new DashBoardPage(page);

  await dashBoardPage.pushAdditionalResults();
  await loginPage.login(USERNAME, PASSWORD);
  await dashBoardPage.openNotifications();

  await page.pause();
});