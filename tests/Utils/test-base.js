const base = require('@playwright/test');
exports.CustomTest=base.test.extend(
    {

        testdataforplaceorder:
        {
        url: "https://rahulshettyacademy.com/client",
        username: "harsha935383@gmail.com",
        password: "Harsha@2025",
        product: "ZARA COAT 3",
        country: " India",
        cvv: "123",
        name: "harsha",
        countrycode: "ind",
        validationmessage: " Thankyou for the order. "
        }

}
)