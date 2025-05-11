import { test, expect, APIRequestContext } from '@playwright/test';

const baseUrl = "https://automationexercise.com/api/";
const validEmail = "ayshanoman92@gmail.com"; 
const validPassword = "Pakistan@123";

test.describe("Verify Login API Tests", () => {
  let apiContext: APIRequestContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: baseUrl,
      extraHTTPHeaders: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  });

  test('API 7: Verify Login with valid details', async () => {
    const response = await apiContext.post('verifyLogin', {
      form: {
        email: validEmail,
        password: validPassword,
      },
    });
    const body = await response.json();
    console.log('API 7 Response:', body);

    expect(body.responseCode).toBe(200);
    expect(body.message).toContain('User exists!');
  });

  test('API 8: Verify Login without email parameter', async () => {
    const response = await apiContext.post('verifyLogin', {
      form: {
        password: validPassword,
      },
    });
    const body = await response.json();
    console.log('API 8 Response:', body);

    expect(body.responseCode).toBe(400);
    expect(body.message).toContain('Bad request, email or password parameter is missing in POST request.');
  });

  test('API 9: Verify Login using DELETE method', async () => {
    const response = await apiContext.delete('verifyLogin');
    const body = await response.json();
    console.log('API 9 Response:', body);

    expect(body.responseCode).toBe(405);
    expect(body.message).toContain('This request method is not supported.');
  });

  test('API 10: Verify Login with invalid details', async () => {
    const response = await apiContext.post('verifyLogin', {
      form: {
        email: 'invalidemail@example.com',
        password: 'invalidpassword',
      },
    });
    const body = await response.json();
    console.log('API 10 Response:', body);

    expect(body.responseCode).toBe(404);
    expect(body.message).toContain('User not found!');
  });
});
