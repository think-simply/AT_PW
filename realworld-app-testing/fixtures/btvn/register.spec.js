const { test } = require('@playwright/test');
import { PageFactory } from "../../pages/pageFactory/pageFactory"
import {
  LOGINURL,
  registerUrl,
  userNameData,
  firstNameData,
  lastNameData,
  passWordData,
  passWordDataNo,

} from "../../object_repository/data";
import {
  FIRST_NAME_MESS,
  LAST_NAME_MESS,
  USER_NAME_MESS,
  PASSWORD_MESS,
  CONFIRM_PASSWORD_MESS,
  PASSWORD_NOT_MATCH
} from "../../application-content/registerMessage"

//HOMEWORK6+7
test.describe('Register feature', () => {
  // Testcase1: User create a new account successfully with all valid data
  test('User create a new account successfully', async ({ page }) => {
    const pageFactory = new PageFactory(page);
    await pageFactory.RegisterPage().goto(registerUrl)
    await pageFactory.RegisterPage().registAccount(firstNameData, lastNameData, userNameData, passWordData, passWordData);
    await pageFactory.RegisterPage().clickSignUp(page);
    await pageFactory.RegisterPage().goto(LOGINURL)
    await pageFactory.LoginPage().login(userNameData, passWordData);
  })

  // Testcase2: Leave first name null
  test('Check validate message when User leave First name field null', async ({ page }) => {
    const pageFactory = new PageFactory(page);
    await pageFactory.RegisterPage().goto(registerUrl);
    await pageFactory.RegisterPage().registAccount("", lastNameData, userNameData, passWordData, passWordData);
    await pageFactory.RegisterPage().validateMessage(FIRST_NAME_MESS)
  })

  // Testcase3: Leave last name null
  test('Check validate message when User leave last name field null', async ({ page }) => {
    const pageFactory = new PageFactory(page);
    await pageFactory.RegisterPage().goto(registerUrl);
    await pageFactory.RegisterPage().registAccount(firstNameData, "", userNameData, passWordData, passWordData);
    await pageFactory.RegisterPage().validateMessage(LAST_NAME_MESS)
  })

  // Testcase4: Leave user name null
  test('Check validate message when User leave user name field null', async ({ page }) => {
    const pageFactory = new PageFactory(page);
    await pageFactory.RegisterPage().goto(registerUrl);
    await pageFactory.RegisterPage().registAccount(firstNameData, lastNameData, "", passWordData, passWordData);
    await pageFactory.RegisterPage().validateMessage(USER_NAME_MESS)
  })

  // Testcase5: Leave password null
  test('Check validate message when User leave password field null', async ({ page }) => {
    const pageFactory = new PageFactory(page);
    await pageFactory.RegisterPage().goto(registerUrl);
    await pageFactory.RegisterPage().registAccount(firstNameData, lastNameData, userNameData, "", passWordData);
    await pageFactory.RegisterPage().validateMessage(PASSWORD_MESS)
  })

  // Testcase6: Leave confirm password null
  test('Check validate message when User leave confirm password field null', async ({ page }) => {
    const pageFactory = new PageFactory(page);
    await pageFactory.RegisterPage().goto(registerUrl);
    await pageFactory.RegisterPage().registAccount(firstNameData, lastNameData, userNameData, passWordData, "");
    await pageFactory.RegisterPage().validateMessage(CONFIRM_PASSWORD_MESS)
  })

  // Testcase7: password and confirm password are not match
  test('Check message when password and confirm password are not match', async ({ page }) => {
    const pageFactory = new PageFactory(page);
    await pageFactory.RegisterPage().goto(registerUrl);
    await pageFactory.RegisterPage().registAccount(firstNameData, lastNameData, userNameData, passWordData, passWordDataNo);
    await pageFactory.RegisterPage().validateMessage(PASSWORD_NOT_MATCH)
  })

})
