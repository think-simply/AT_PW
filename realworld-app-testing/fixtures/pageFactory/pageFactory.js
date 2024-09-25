
import{ LoginPage }from '../../pages/btvn4Page/loginPage';
import{ DashBoardPage } from '../../pages/btvn4Page/dashboardPage';

class PageFactory {
    constructor(page) {
        this.page = page;
    }
    LoginPage() {
        return new LoginPage(this.page);
    };
    DashBoardPage() {
        return new DashBoardPage(this.page);
    };
}

module.exports = { PageFactory };