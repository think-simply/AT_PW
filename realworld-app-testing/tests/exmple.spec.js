// @ts-check
const { test, expect } = require('@playwright/test');
const { chromium, firefox, webkit } = require('@playwright/test');


test('has title', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage();
  const page2 = await context.newPage();
  await page.goto('https://playwright.dev/');

  await page2.goto('https://www.google.com/');
  await expect(page).toHaveTitle(/Playwright/);

})

// test('has title', async ({ }) => {
//   const browser = await chromium.launch()
//   const context = await browser.newContext()
//   const page = await context.newPage();
//   const page2 = await context.newPage();
//   await page.goto('https://playwright.dev/');
//   await page2.goto('https://www.google.com/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
//   await browser.close();
// });

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// test("mocks a fruit and doesn't call api", async ({ page }) => {
//   //mock API call before navigating
//   await page.route('*/**/api/v1/fruits', async route => {
//     const json = [
//       {name:'Strawberry',id:21},
//       {name:'Banana',id:22},
//       {name:'Apple',id:23},
//     ];
//     await route.fulfill ({json}); // gán API sẽ nhận các giá trị trong file json
//   });

//   //go to page
//   await page.goto('https://demo.playwright.dev/api-mocking');

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByText('Strawberry')).toBeVisible();
// });
const mockResponse = {
  results: [
    {
      userFullName: "Kristian Bradtke",
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
      userFullName: "Ruthie Prosacco",
      id: "YcLyZdwuGZAe",
      uuid: "c1723c97-1f1d-4313-993f-e128ba8dfab1",
      userId: "uBmeaz5pX",
      transactionId: "5XZ9RwhG4qW9",
      status: "requested",
      isRead: false,
      createdAt: "2023-10-18T08:33:08.846Z",
      modifiedAt: "2024-03-07T19:37:59.120Z"

    }
  ]
};
test('Simulating getting a response from an API', async ({ page }) => {
  await page.route('http://localhost:3001/notifications', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockResponse)
    })

  })
  await page.goto('http://localhost:3000');
  await page.getByLabel('Username').fill('Heath93');
  await page.getByLabel('Password').fill('s3cret');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Logout')).toBeVisible({ timeout: 10000 });

  await page.click('[data-test="sidenav-notifications"]')
  await page.pause()
});

test('Modify API response', async ({ page }) => {
  await page.route('http://localhost:3001/notifications', async route => {
    const response = await route.fetch();
    const json = await response.json();

    json.results.push({

      userFullName: "Theu kate",
      id: "8NnQy36xaMtB",
      uuid: "f65dc9a6-de3b-4454-8fa7-b43f9270291c",
      userId: "uBmeaz5pX",
      likeId: "uMrgeJ4MvkFl",
      transactionId: "tHql3-JH3OSd",
      isRead: false,
      createdAt: "2023-10-18T08:33:08.846Z",
      modifiedAt: "2024-03-07T19:37:59.120Z"

    })
    route.fulfill({ response, json })
  });
  await page.goto('http://localhost:3000');
  await page.getByLabel('Username').fill('Heath93');
  await page.getByLabel('Password').fill('s3cret');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByText('Logout')).toBeVisible({ timeout: 10000 });

  await page.click('[data-test="sidenav-notifications"]')
  await page.pause()
});

test('Filter API ', async ({ page }) => {
  await page.route('http://localhost:3001/notifications', async route => {
    const response = await route.fetch();
    const json = await response.json();
// Lọc kết quả chỉ cho Ruthie Prosacco
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

await page.click('[data-test="sidenav-notifications"]')
await page.pause()
});