Feature: Verify create an account functionality for Automation Practice

Scenario: Verify success message for new user functionality with valid users
Given I have navigated to Home page
When I click SignIn in Home Page
Then 'Authentication' page is displayed
When I enter email
|email              |
|AT15@gmail.com   |
And I click Create Account
Then 'Create an account' page is displayed
When I enter below details in Create an account page
|Title  | First Name    |   Last Name   |email          | password  | Date Of Birth     | Newsletter|
| Mr    | Sam    |   John      | AT15@gmail.com | Pass@12345    | 11-11-1983    | Yes       |  
Then Entered details should match with below details
|Title  | First Name    |   Last Name   |email          | password  | Date Of Birth     | Newsletter|
| Mr    | Sam    |   John      | AT15@gmail.com | Pass@12345    | 11-11-1983    | Yes       |  
When I click Register 
Then Success message is displayed as below
| Success Message   |
| Your account has been created.|

Scenario: Verify error message for new user functionality with invalid users
Given I have navigated to Home page
When I click SignIn in Home Page
Then 'Authentication' page is displayed
When I enter email
|email              |
|AT2@gmail.com   |
And I click Create Account
Then 'Create an account' page is displayed
When I enter below details in Create an account page
|Title  | First Name    |   Last Name   |email          | password  | Date Of Birth     | Newsletter|
| Mr    | Automation    |   Tester     | AT2@gmail.com | Pass      | 2-5-1983    | Yes       |  
Then Entered details should match with below details
|Title  | First Name    |   Last Name   |email          | password  | Date Of Birth     | Newsletter|
| Mr    | Automation    |   Tester     | AT2@gmail.com | pass      | 2-5-1983    | Yes       |  
When I click Register 
Then Error message is displayed as below
|Error message      |
|passwd is invalid.  |
