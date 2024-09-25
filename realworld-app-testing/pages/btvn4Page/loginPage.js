// notificationPage.js
const { expect } = require('@playwright/test');
const LOCATORS = require('../../selectors/hw4Selectors/loginSelector');

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(username, password) {
    await this.page.goto('http://localhost:3000');
    await this.page.locator(LOCATORS.username).fill(username);
    await this.page.locator(LOCATORS.password).fill(password);
    await this.page.getByRole('button', { name: LOCATORS.signInButton }).click();
    await expect(this.page.getByText(LOCATORS.logoutLocator)).toBeVisible({ timeout: 10000 });
  }

}

export {LoginPage};
