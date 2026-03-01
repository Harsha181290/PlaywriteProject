const { test, expect, request } = require('@playwright/test');
const { OrdersPage } = require('./PageObjects/OrdersPage');

const dataset = JSON.parse(JSON.stringify(require('./Utils/PlaceOrderTestData.json')));

for(const data of dataset)
{
test(`HTTPS GET Request Example - ${data.product}`, async ({ page }) => {
    const ordersPage = new OrdersPage(page);
    const apiContext = await request.newContext();
    
    // Make a GET request
    const response = await apiContext.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Verify response status
    expect(response.status()).toBe(200);
    
    // Parse response JSON
    const responseBody = await response.json();
    
    // Validate response data
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('title');
    expect(responseBody.id).toBe(1);
    
    console.log('Response:', responseBody);
    
    await apiContext.dispose();
});

test(`HTTPS GET Request with Headers - ${data.product}`, async () => {
    const apiContext = await request.newContext();
    
    // GET request with custom headers
    const response = await apiContext.get('https://jsonplaceholder.typicode.com/users/1', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    
    expect(response.status()).toBe(200);
    const user = await response.json();
    console.log('User:', user);
    
    await apiContext.dispose();
});

test(`HTTPS GET Request with Query Parameters - ${data.product}`, async () => {
    const apiContext = await request.newContext();
    
    // GET request with query parameters
    const response = await apiContext.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
            userId: 1,
            _limit: 5
        }
    });
    
    expect(response.status()).toBe(200);
    const posts = await response.json();
    expect(posts.length).toBeLessThanOrEqual(5);
    console.log('Posts:', posts);
    
    await apiContext.dispose();
});
}