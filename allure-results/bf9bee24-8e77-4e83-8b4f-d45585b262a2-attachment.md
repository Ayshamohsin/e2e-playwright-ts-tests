# Test info

- Name: Verify Login API Tests >> API 7: Verify Login with valid details
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\api-tests\verifyLogInApis.spec.ts:19:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\api-tests\verifyLogInApis.spec.ts:29:31
```

# Test source

```ts
   1 | import { test, expect, APIRequestContext } from '@playwright/test';
   2 |
   3 | const baseUrl = "https://automationexercise.com/api/";
   4 | const validEmail = "your_created_email@example.com"; // <-- Replace with your real email
   5 | const validPassword = "your_password"; // <-- Replace with your real password
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
  27 |     console.log('API 7 Response:', body);
  28 |
> 29 |     expect(body.responseCode).toBe(200);
     |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  30 |     expect(body.message).toContain('User exists!');
  31 |   });
  32 |
  33 |   test('API 8: Verify Login without email parameter', async () => {
  34 |     const response = await apiContext.post('verifyLogin', {
  35 |       form: {
  36 |         password: validPassword,
  37 |       },
  38 |     });
  39 |     const body = await response.json();
  40 |     console.log('API 8 Response:', body);
  41 |
  42 |     expect(body.responseCode).toBe(400);
  43 |     expect(body.message).toContain('Bad request, email or password parameter is missing in POST request.');
  44 |   });
  45 |
  46 |   test('API 9: Verify Login using DELETE method', async () => {
  47 |     const response = await apiContext.delete('verifyLogin');
  48 |     const body = await response.json();
  49 |     console.log('API 9 Response:', body);
  50 |
  51 |     expect(body.responseCode).toBe(405);
  52 |     expect(body.message).toContain('This request method is not supported.');
  53 |   });
  54 |
  55 |   test('API 10: Verify Login with invalid details', async () => {
  56 |     const response = await apiContext.post('verifyLogin', {
  57 |       form: {
  58 |         email: 'invalidemail@example.com',
  59 |         password: 'invalidpassword',
  60 |       },
  61 |     });
  62 |     const body = await response.json();
  63 |     console.log('API 10 Response:', body);
  64 |
  65 |     expect(body.responseCode).toBe(404);
  66 |     expect(body.message).toContain('User not found!');
  67 |   });
  68 | });
  69 |
```