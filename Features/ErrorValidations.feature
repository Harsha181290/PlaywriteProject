Feature: Ecomerce Error Validation
@ErrorValidation
Scenario Outline: Error message Validation
Given a user logins to eccomers2 application with invalid "<username>" and "<password>"
Then Verify Error message is displayed
Examples:
| username       | password  |  
| rahulshetty    | learning  |
| rahulshetty    | learning1 |
