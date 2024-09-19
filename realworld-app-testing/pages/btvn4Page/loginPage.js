// notificationPage.js
const { expect } = require('@playwright/test');
const LOCATORS = require('../../selectors/hw4Selectors/loginSelector');

class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async login(username, password) {
      await this.page.goto('http://localhost:3000');
        await this.page.getByLabel(LOCATORS.userNameLocator).fill(username);
        await this.page.getByLabel(LOCATORS.passwordLocator).fill(password);
        await this.page.getByRole('button', { name: LOCATORS.signInButton }).click();
        await expect(this.page.getByText(LOCATORS.logoutLocator)).toBeVisible({ timeout: 10000 });
    }

    async openNotifications() {
        await this.page.click(LOCATORS.notificationButton);
    }

    async filterNotifications(username) {
        await this.page.route('http://localhost:3001/notifications', async route => {
            const response = await route.fetch();
            const json = await response.json();
            json.results = json.results.filter(item => item.userFullName === username);
            //console.log(json);
            await route.fulfill({ response, json });
        });
    }
    async pushAdditionalResults () {
      await this.page.route('http://localhost:3001/notifications', async route => {
        const response = await route.fetch();
        const json = await response.json();
    
        json.results.push(
          {
    
            userFullName: "Theu kate",
            id: "8NnQy36xaMtB",
            uuid: "f65dc9a6-de3b-4454-8fa7-b43f9270291c",
            userId: "uBmeaz5pX",
            likeId: "uMrgeJ4MvkFl",
            transactionId: "tHql3-JH3OSd",
            isRead: false,
            createdAt: "2023-10-18T08:33:08.846Z",
            modifiedAt: "2024-03-07T19:37:59.120Z"
    
          },
          {
    
            userFullName: "Phuong kate",
            id: "8NnQy36xaMtB",
            uuid: "f65dc9a6-de3b-4454-8fa7-b43f9270291c",
            userId: "uBmeaz5pX",
            likeId: "uMrgeJ4MvkFl",
            transactionId: "tHql3-JH3OSd",
            isRead: false,
            createdAt: "2023-10-18T08:33:08.846Z",
            modifiedAt: "2024-03-07T19:37:59.120Z"
    
          },
          {
    
            userFullName: "Hoa kate",
            id: "8NnQy36xaMtB",
            uuid: "f65dc9a6-de3b-4454-8fa7-b43f9270291c",
            userId: "uBmeaz5pX",
            likeId: "uMrgeJ4MvkFl",
            transactionId: "tHql3-JH3OSd",
            isRead: false,
            createdAt: "2023-10-18T08:33:08.846Z",
            modifiedAt: "2024-03-07T19:37:59.120Z"
    
          })
        await route.fulfill({ response, json })
      });
    }
}

module.exports = LoginPage;
