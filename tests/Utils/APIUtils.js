class APIUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        }); // 200, 201
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        return token;
    }

    async getProduct() {

        let response = {};
        response.token = await this.getToken();
        const productresponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/product/get-all-products",
            {
                headers: {
                    'Authorization': response.token,
                    'Content-Type': "application/json"
                }
            }
        );

        const ProductResponseJson = await productresponse.json();
        const productId = ProductResponseJson.data[0]._id;


        return productId;
    }
    async createOrder(orderPayLoad) {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });

        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
}
module.exports = { APIUtils };