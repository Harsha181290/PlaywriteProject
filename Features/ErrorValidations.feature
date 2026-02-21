Feature: Ecomerce Error Validation
@ErrorValidation
Scenario: Error message Validation
Given a user logins to eccomers2 application with invalid "rahulshetty" and "learning"
Then Verify Error message is displayed