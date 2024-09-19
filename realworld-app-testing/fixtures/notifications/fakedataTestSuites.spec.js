const { test, expect } = require('@playwright/test');
import {
    notificationButton
} from "../realworld-app-testing/selectors/hw4Selectors"

//HOMEWORK4
//Testcase 1: Filter results = Ruthie Prosacco
test('Filter result with user name Ruthie Prosacco ', async ({ page }) => {
    await page.route('http://localhost:3001/notifications', async route => {
        const response = await route.fetch();
        const json = await response.json();
        // Filter username = Ruthie Prosacco
        json.results = json.results.filter(item => item.userFullName === "Ruthie Prosacco");
        //json.results.filter(item => (item.userFullName === "Ruthie Prosacco"))
        console.log(json)
        await route.fulfill({ response, json })
    });
    await page.goto('http://localhost:3000');
    await page.getByLabel('Username').fill('Heath93');
    await page.getByLabel('Password').fill('s3cret');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Logout')).toBeVisible({ timeout: 10000 });

    await page.click(notificationButton)
    await page.pause()
});

//Testcase 2: Push more results
test('Push additional item to API response', async ({ page }) => {
    await page.route('http://localhost:3001/notifications', async route => {
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
    await page.goto('http://localhost:3000');
    await page.getByLabel('Username').fill('Heath93');
    await page.getByLabel('Password').fill('s3cret');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Logout')).toBeVisible({ timeout: 10000 });
  
    await page.click(notificationButton)
    await page.pause()
  });