# Test info

- Name:  Place Order: Register while Checkout
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:23:5

# Error details

```
Error: apiRequestContext.get: getaddrinfo ENOTFOUND test.automationexercise.com
Call log:
  - → GET https://test.automationexercise.com/
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.25 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br

    at isEnvironmentReachable (C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\utils\environments.ts:28:34)
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:16:23
```

# Test source

```ts
   1 | // src/utils/environments.ts
   2 |
   3 | import { request } from '@playwright/test';
   4 |
   5 | // This object stores different environment settings for 'dev' and 'test'
   6 | export const environments = {
   7 |   dev: {
   8 |     baseUrl: 'https://automationexercise.com/',
   9 |     password: 'D3v3nv1r0m3nt',
  10 |   },
  11 |   test: {
  12 |     baseUrl: 'https://test.automationexercise.com/',
  13 |     password: 'T35t3nv1r0m3nt',
  14 |   },
  15 | };
  16 |
  17 | // This function returns environment settings based on TEST_ENV variable
  18 | export function getEnv() {
  19 |   // Read which environment to use (default is 'dev' if nothing is passed)
  20 |   const env = (process.env.TEST_ENV as 'dev' | 'test') || 'dev';
  21 |   return environments[env];
  22 | }
  23 |
  24 | // This function checks if the website (baseUrl) is online and reachable
  25 | export async function isEnvironmentReachable() {
  26 |   const env = getEnv(); // Get environment settings (baseUrl)
  27 |   const context = await request.newContext(); // Create a new network request context
> 28 |   const response = await context.get(env.baseUrl); // Send a GET request to the website
     |                                  ^ Error: apiRequestContext.get: getaddrinfo ENOTFOUND test.automationexercise.com
  29 |   await context.dispose(); // Close the request context to free resources
  30 |   return response.ok(); // Return true if website responds successfully (status 200-299)
  31 | }
  32 |
```