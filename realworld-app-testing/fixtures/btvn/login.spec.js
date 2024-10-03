const { test } = require('@playwright/test');
import { PageFactory } from "../../pages/pageFactory/pageFactory"
import {
  LOGINURL,
  USERNAME,
  PASSWORD
} from "../../object_repository/data"

//HOMEWORK6+7
//Testcase 1: Filter results with user name = Ruthie Prosacco
test.describe('Login features', () => {
  test('Filter result with user name Ruthie Prosacco', async ({ page }) => {
    const pageFactory = new PageFactory(page);
    
    await pageFactory.LoginPage().goto(LOGINURL);
    await pageFactory.LoginPage().login(USERNAME, PASSWORD);
    await pageFactory.DashBoardPage().verifyLoginSuccess();
    await pageFactory.DashBoardPage().filterNotifications("Ruthie Prosacco");
    await pageFactory.DashBoardPage().openNotifications();

    await page.pause();
  });


  //Testcase 2: Push more results
  test('Push additional item to API response', async ({ page }) => {
    const pageFactory = new PageFactory(page);

    await pageFactory.DashBoardPage().pushAdditionalResults();
    await pageFactory.LoginPage().goto(LOGINURL);
    await pageFactory.LoginPage().login(USERNAME, PASSWORD);
    await pageFactory.DashBoardPage().openNotifications();
    await pageFactory.DashBoardPage().checkAddResultsSuccess();

    await page.pause();
  });
})
