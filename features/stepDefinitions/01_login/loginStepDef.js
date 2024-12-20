const { Given, When, Then } = require('@cucumber/cucumber');

const { HomePage } = require('../../pageObjectMethod/HomePage')
const {AuthPage } = require('../../pageObjectMethod/AuthPage')
const {AccountsPage} = require('../../pageObjectMethod/AccountsPage')



Given('I have navigated to Home page', async function () {
  this.homePage = new HomePage(this.page);
  await this.homePage.gotoURL();
});

When('I click SignIn in Home Page', async function () {
  await this.homePage.clickSignIn()
});

Then('{string} page is displayed', async function (verifyText) {
  this.authPage = new AuthPage(this.page);
  this.accountsPage = new AccountsPage(this.page);
  await this.authPage.vefifyTextPresent(verifyText);
});

When('I enter email and password as below', async function (dataTable) {
  // console.log(dataTable.rows())
  await this.authPage.enterEmailAndPassword(dataTable)
});

When('I Click SignIn in Auth Page', async function () {
  await this.authPage.clickSignIn()
});

Then('Success message is displayed as below', async function (dataTable) {
  await this.accountsPage.verifySuccessMessage(dataTable)
});

Then('Error message is displayed as below', async function (dataTable) {
  await this.authPage.verifyErrorMessage(dataTable)
});

When('I enter email', async function (dataTable) {
  await this.authPage.enterEmail(dataTable)
});

When('I click Create Account', async function () {
  await this.authPage.clickCreateAccount()
});

When('I enter below details in Create an account page', async function (dataTable) {
  await this.authPage.enterUserAccountDetails(dataTable)
});

Then('Entered details should match with below details', async function (dataTable) {
  await this.authPage.verifyUserAccountDetails(dataTable);
});

When('I click Register', async function () {
  await this.authPage.clickRegister();
});



