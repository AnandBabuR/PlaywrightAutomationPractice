Feature: Verify login into an account functionality for Automation Practice

Scenario:  Verify success message for login user functionality with valid users
Given I have navigated to Home page
When I click SignIn 
Then 'Authentication' page is displayed
When I enter email and password as below
|email          | password      |
|AT1@gmail.com  | Pass@12345    |
Then Success message is displayed as below
| Success Message       |
| Welcome to your account. Here you can manage all of your personal information and orders.|

Scenario:  Verify error message for login user functionality with invalid users
Given I have navigated to Home page
When I click SignIn 
Then 'Authentication' page is displayed
When I enter email and password as below
|email          | password      |
|AT1@gmail.com  | pass          |
Then Error message is displayed as below
| Error Message       |
| Invalid password.   |
