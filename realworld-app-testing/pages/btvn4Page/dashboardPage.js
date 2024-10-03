const { expect } = require('@playwright/test');
import {
    logoutLocator,
    notificationButton,
} from "../../selectors/hw4Selectors/dashboardSelector"


class DashBoardPage {
    constructor(page) {
        this.page = page;
    }
    /**
     * navigate to notification page
     */
    async openNotifications() {
        await this.page.click(notificationButton);
    }
    /**
     * verify Login successfully
     */
    async verifyLoginSuccess() {
        await expect(this.page.getByText(logoutLocator)).toBeVisible({ timeout: 10000 });
    }
    /**
     * 
     * @param {String} username 
     */
    async filterNotifications(username) {
        await this.page.route('http://localhost:3002/notifications', async route => {
            const response = await route.fetch();
            const json = await response.json();
            json.results = json.results.filter(item => item.userFullName === username);
            console.log(json);
            await route.fulfill({ response, json });
        });
    }
    /**
     * push additional results to API
     */
    async pushAdditionalResults() {
        await this.page.route('http://localhost:3002/notifications', async route => {
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
    /**
     * verify add more result sucsessfully
     */
    async checkAddResultsSuccess() {
        expect(this.page.getByText('Theu kate liked a transaction.')).toBeVisible();
        expect(this.page.getByText('Phuong kate liked a transaction.')).toBeVisible();
        expect(this.page.getByText('Hoa kate liked a transaction.')).toBeVisible();
    }

}

module.exports = { DashBoardPage };