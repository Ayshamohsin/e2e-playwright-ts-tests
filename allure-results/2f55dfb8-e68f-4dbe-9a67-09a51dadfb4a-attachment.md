# Test info

- Name: Verify Login API Tests >> API 9: Verify Login using DELETE method
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\api-tests\verifyLogInApis.spec.ts:45:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 405
Received: 200
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\api-tests\verifyLogInApis.spec.ts:48:31
```

# Test source

```ts
   1 | import { test, expect, APIRequestContext } from '@playwright/test';
   2 |
   3 | const baseUrl = "https://automationexercise.com/api/";
   4 | const validEmail = "ayshanoman92@gmail.com";
   5 | const validPassword = "Pakistan@123";
   6 |
   7 | test.describe("Verify Login API Tests", () => {
   8 |   let apiContext: APIRequestContext;
   9 |
  10 |   test.beforeAll(async ({ playwright }) => {
  11 |     apiContext = await playwright.request.newContext({
  12 |       baseURL: baseUrl,
  13 |       extraHTTPHeaders: {
  14 |         "Content-Type": "application/x-www-form-urlencoded",
  15 |       },
  16 |     });
  17 |   });
  18 |
  19 |   test('API 7: Verify Login with valid details', async () => {
  20 |     const response = await apiContext.post('verifyLogin', {
  21 |       form: {
  22 |         email: validEmail,
  23 |         password: validPassword,
  24 |       },
  25 |     });
  26 |     const body = await response.json();
  27 |     expect(response.status()).toBe(200);
  28 |     expect(body.responseCode).toBe(200);
  29 |     expect(body.message).toContain('User exists!');
  30 |   });
  31 |
  32 |   test('API 8: Verify Login without email parameter', async () => {
  33 |     const response = await apiContext.post('verifyLogin', {
  34 |       form: {
  35 |         password: validPassword,
  36 |       },
  37 |     });
  38 |     const body = await response.json();
  39 |     console.log('API 8 Response:', body);
  40 |     expect(response.status()).toBe(400);
  41 |     expect(body.responseCode).toBe(400);
  42 |     expect(body.message).toContain('Bad request, email or password parameter is missing in POST request.');
  43 |   });
  44 |
  45 |   test('API 9: Verify Login using DELETE method', async () => {
  46 |     const response = await apiContext.delete('verifyLogin');
  47 |     const body = await response.json();
> 48 |     expect(response.status()).toBe(405);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  49 |     expect(body.responseCode).toBe(405);
  50 |     expect(body.message).toContain('This request method is not supported.');
  51 |   });
  52 |
  53 |   test('API 10: Verify Login with invalid details', async () => {
  54 |     const response = await apiContext.post('verifyLogin', {
  55 |       form: {
  56 |         email: 'invalidemail@example.com',
  57 |         password: 'invalidpassword',
  58 |       },
  59 |     });
  60 |     const body = await response.json();
  61 |     expect(response.status()).toBe(404);
  62 |     expect(body.responseCode).toBe(404);
  63 |     expect(body.message).toContain('User not found!');
  64 |   });
  65 | });
  66 |
```