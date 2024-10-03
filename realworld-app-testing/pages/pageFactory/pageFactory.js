
import { LoginPage } from '../btvn4Page/loginPage';
import { DashBoardPage } from '../btvn4Page/dashboardPage';
import { RegisterPage } from '../btvn4Page/registerPage'

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
    RegisterPage() {
        return new RegisterPage(this.page);
    }
}

module.exports = { PageFactory };