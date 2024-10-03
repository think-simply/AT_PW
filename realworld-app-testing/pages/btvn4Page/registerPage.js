import { BasePage } from "../btvn4Page/basePage"
const { test, expect } = require('@playwright/test');

import {
    firstNamelo,
    lastNamelo,
    userNamelo,
    passwordlo,
    confirmPasswordlo,
    signupButtonlo,
} from "../../selectors/hw4Selectors/registerSelector"


class RegisterPage extends BasePage {
    constructor(page) {
        super(page);
    }
    /**
     * @param {String} url 
     * @param {String} firstName 
     * @param {String} lastName 
     * @param {String} userName 
     * @param {String} password 
     * @param {String} confirmPassword 
     */
    async registAccount(firstName, lastName, userName, password, confirmPassword) {
        await this.page.locator(firstNamelo).fill(firstName);
        await this.page.locator(lastNamelo).fill(lastName);
        await this.page.locator(userNamelo).fill(userName);
        await this.page.locator(passwordlo).fill(password);
        await this.page.locator(confirmPasswordlo).fill(confirmPassword);
        await this.page.locator(confirmPasswordlo).blur();

    }

    async clickSignUp() {
        await this.page.locator(signupButtonlo).click();
    }
    async validateMessage(message) {
        await expect(this.page.getByText(message)).toBeVisible();

    }
}
export { RegisterPage }
