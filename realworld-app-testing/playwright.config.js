// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './fixtures',
  /* Run tests in files in parallel */
  fullyParallel: true, // không có quyền override workers
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI, // check tất cả file testcase, có file nào có test.only ko, nếu ko thì CI/CD sẽ báo lỗi- chỉ dùng khi bộ testsuite tích hợp vs CICD
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers:  3, //process.env.CI ? 4 : 2 , - nếu mà vế trước mà đúng thì chạy 4 workers, còn nếu sai thì chạy 2 workers
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
// hoặc dùng thế này:
    // {
    //   name: 'dev',
    //   use: { 
    //     baseURL: 'https://dev.realworld.io'
    //    },
    // },

    // {
    //   name: 'staging',
    //   use: { 
    //     baseURL: 'https://staging.realworld.io'
    //    },
    // },
    // // sau đó gọi test trên môi trường chỉ định như này: npx playwright test --projects=staging


    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Iphone 15',
      use: { 
        ...devices['iPhone 15 Pro Max'] 
      },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

