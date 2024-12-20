const { expect } = require('@playwright/test');
class AccountsPage {

    constructor(page) {
        this.page = page;
        this.welcomeMessage = page.locator(".info-account")
        this.alertSuccess = page.locator(".alert-success")
    }

    async verifySuccessMessage(dataTable) {
        const header = dataTable.rows()[0][0] === 'Your account has been created.' ?
        this.alertSuccess : this.welcomeMessage;
        await expect(header).toHaveText(dataTable.rows()[0][0])
    }
}

module.exports = { AccountsPage };