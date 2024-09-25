const { test,expect } = require('@playwright/test');
const LOCATORS = require('../../selectors/hw4Selectors/loginSelector')
import { PageFactory } from "../pageFactory/pageFactory"
import {
  USERNAME,
  PASSWORD
} from "../../object_repository/data"
//HOMEWORK4
//Testcase 1: Filter results = Ruthie Prosacco
test('Filter result with user name Ruthie Prosacco', async ({ page }) => {
  const pageFactory = new PageFactory(page);

  await pageFactory.LoginPage().login(USERNAME, PASSWORD);
  await pageFactory.DashBoardPage().filterNotifications("Ruthie Prosacco");
  await pageFactory.DashBoardPage().openNotifications();

  await page.pause();
});


//Testcase 2: Push more results
test('Push additional item to API response', async ({ page }) => {
  const pageFactory = new PageFactory(page);

  await pageFactory.DashBoardPage().pushAdditionalResults();
  await pageFactory.LoginPage().login(USERNAME, PASSWORD);
  await pageFactory.DashBoardPage().openNotifications();
  await pageFactory.DashBoardPage().checkAddResultsSuccess();

  await page.pause();
});

