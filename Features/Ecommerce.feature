
Feature: All Ecommerce Validations 
@Regression
Scenario: Placing the Order
    Given User navigates to "https://rahulshettyacademy.com/client" 
    Then User logins into ecomercesite with "harsha935383@gmail.com" and "Harsha@2025"
    When User adds "ZARA COAT 3" to cart
    Then User should be able to see "ZARA COAT 3" in Cart
    When a "harsha935383@gmail.com" enters the "123" and "Harsha" and "ind" and " India" Order is placed
    Then a " Thankyou for the order. " is displayed and order id is generated 
    Then Verify whether the order is placed in order history page
