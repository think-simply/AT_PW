
const LOCATORS = require('./locators');

class DashBoardPage {
    constructor(page) {
      this.page = page;
  }
async  openNotifications() {
    await this.page.click(LOCATORS.notificationButton);
}

async filterNotifications( username) {
    await this.page.route('http://localhost:3001/notifications', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.results = json.results.filter(item => item.userFullName === username);
        console.log(json);
        await route.fulfill({ response, json });
    });
}
}

module.exports = DashBoardPage;