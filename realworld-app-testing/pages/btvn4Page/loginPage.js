import { BasePage } from "../btvn4Page/basePage"
const { expect } = require('@playwright/test');
//const LOCATORS = require('../../selectors/hw4Selectors/loginSelector');
import {
  usernameloc,
  passwordloc,
  signInButtonloc,
} from "../../selectors/hw4Selectors/loginSelector"

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }
  /**
   * @param {String} url 
   * @param {String} username 
   * @param {String} password 
   */
  async login(username, password) {
    await this.page.locator(usernameloc).fill(username);
    await this.page.locator(passwordloc).fill(password);
    await this.page.locator(signInButtonloc).click();
  }

  /**
     * navigate to sign up page
     */
  async goToSignUpPage() {
    await this.signUpLink.click()

  }
  /**
   * 
   * @param {string} message 
   */
  async verifyAlertMessageContent(message) {
    await expect(this.signUpLink).toHaveText(message)

  }

}

export { LoginPage };
