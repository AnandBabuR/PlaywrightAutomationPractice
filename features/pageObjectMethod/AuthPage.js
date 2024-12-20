const { expect } = require('@playwright/test');
class AuthPage {

    constructor(page) {
        this.page = page;
        this.headerText = page.locator(".page-heading");
        this.email = page.locator("#email");
        this.password = page.locator("#passwd");
        this.signInButton = page.getByRole("button", { name: 'Sign In' });
        this.errorMessage = page.locator(".alert li");
        this.emailCreate = page.locator("#email_create");
        this.submitCreate = page.locator("#SubmitCreate");
        // user account details
        this.titleMr = page.locator("#uniform-id_gender1")
        this.titleMrs = page.locator("#uniform-id_gender2")
        this.firstName = page.locator("#customer_firstname")
        this.lastName = page.locator("#customer_lastname");
        this.days = page.locator("#days")
        this.months = page.locator("#months")
        this.years = page.locator("#years")
        this.signupNewsletter = page.locator("#newsletter")
        this.register = page.locator("#submitAccount")
    }

    async vefifyTextPresent(verifyText) {
        await expect(this.headerText).toHaveText(verifyText)
    }
    async enterEmailAndPassword(dataTable) {
        await this.email.fill(dataTable.rows()[0][0]);
        await this.password.fill(dataTable.rows()[0][1]);
    }
    async clickSignIn(){
        await this.signInButton.click();
    }

    async verifyErrorMessage(dataTable){
        await this.errorMessage.waitFor();
        await expect(this.errorMessage).toHaveText(dataTable.rows()[0][0])
    }

    async enterEmail(dataTable){
        await this.emailCreate.fill(dataTable.rows()[0][0])
    }
    async clickCreateAccount(){
        await this.submitCreate.click();
        await this.register.waitFor()
    }

    async enterUserAccountDetails(dataTable){
        const titleLocator = dataTable.rows()[0][0] === "Mr" ? this.titleMr : this.titleMrs;
        await titleLocator.click()
        await this.firstName.fill(dataTable.rows()[0][1]);
        await this.lastName.fill(dataTable.rows()[0][2]);
        await this.email.fill(dataTable.rows()[0][3]);
        await this.password.fill(dataTable.rows()[0][4]);
        const DOB = dataTable.rows()[0][5].split('-');
        await this.days.selectOption(DOB[0]);
        await this.months.selectOption(DOB[1])
        await this.years.selectOption(DOB[2])
        dataTable.rows()[0][6] === 'Yes' ? await this.signupNewsletter.click(): console.log('No signup for newsletter')
        }

    async verifyUserAccountDetails(dataTable){
        await expect(this.firstName).toHaveValue(dataTable.rows()[0][1]);
        await expect(this.lastName).toHaveValue(dataTable.rows()[0][2]);
        await expect(this.email).toHaveValue(dataTable.rows()[0][3]);
        const DOB = dataTable.rows()[0][5].split('-');
        await expect(this.days).toHaveValue(DOB[0]);
        await expect(this.months).toHaveValue(DOB[1])
        await expect(this.years).toHaveValue(DOB[2])
        const titleLocator = dataTable.rows()[0][0] === "Mr" ? this.titleMr : this.titleMrs;
        await expect(titleLocator).toBeChecked();
        await expect(this.signupNewsletter).toBeChecked();
    }

    async clickRegister(){
        const email = await this.email.inputValue();
        await this.register.click();
        console.log('Clicked Register button for Email - '+ email)
    }
}

module.exports = { AuthPage };