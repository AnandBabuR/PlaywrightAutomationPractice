Feature: Verify create an account functionality for Automation Practice

Scenario: Verify success message for new user functionality with valid users
Given I have navigated to Home page
When I click SignIn 
Then 'Authentication' page is displayed
When I enter email
|email              |
|sample@gmail.com   |
And I click Create Account
Then 'Create an Account' page is displayed
When I enter below details in Create an account page
|Title  | First Name    |   Last Name   |email          | password  | Date Of Birth     | Newsletter|
| Mr    | Automation    |   Tester1     | AT1@gmail.com | Pass@12345    | 01-01-1983    | Yes       |  
Then Entered details should match with below details
|Title  | First Name    |   Last Name   |email          | password  | Date Of Birth     | Newsletter|
| Mr    | Automation    |   Tester1     | AT1@gmail.com | Pass@12345    | 01-01-1983    | Yes       |  
When I click Register 
Then Success Message is displayed as below
| Success Message   |
| Your account has been created.|

Scenario: Verify error message for new user functionality with invalid users
Given I have navigated to Home page
When I click SignIn 
Then 'Authentication' page is displayed
When I enter email
|email              |
|sample@gmail.com   |
And I click Create Account
Then 'Create an Account' page is displayed
When I enter below details in Create an account page
|Title  | First Name    |   Last Name   |email          | password  | Date Of Birth     | Newsletter|
| Mr    | Automation    |   Tester1     | AT1@gmail.com | Pass      | 01-01-1983    | Yes       |  
Then Entered details should match with below details
|Title  | First Name    |   Last Name   |email          | password  | Date Of Birth     | Newsletter|
| Mr    | Automation    |   Tester1     | AT1@gmail.com | pass      | 01-01-1983    | Yes       |  
When I click Register 
Then Error message is displayed as below
|Error message      |
|passwd is invalid  |
