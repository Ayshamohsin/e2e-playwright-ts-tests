# Getting Started

## Purpose

This document guides new team members to quickly set up, run, and maintain the automation framework built with Playwright and TypeScript.  
It covers project setup, running tests, environment selection, troubleshooting, and following code quality standards.

---

## Getting the Latest Code

To get the latest code from the repository:


## Highly Recommended: If you want to run all tests in a specific dev or test environment and automatically generate a user-friendly Allure report at the end — without typing long commands — simply use one of the following:

## For Dev Environment
npm run test:dev:with:allure 
## For Test Environment
npm run test:test:with:allure



## Clone the project to your computer: 
   ```bash
   git clone https://github.com/Ayshamohsin/e2e-playwright-ts-tests.git
   cd e2e-playwright-ts-tests

   
## Install all project packages
npm install
npx playwright install

## Install development dependencies
npm install --save-dev playwright @playwright/test typescript ts-node @faker-js/faker @biomejs/biome

## Setting Up the Environment
Make sure you have the following installed:

Node.js (version 18 or higher)

npm (comes with Node.js) or yarn

Git installed on your computer

## After installing dependencies, install browsers using
npx playwright install


Allure Reporting
This project uses Allure to generate beautiful, user-friendly test execution reports automatically after running tests.

After running tests, an Allure report is generated inside the /allure-report folder.

The report will automatically open in your browser if you use the recommended commands.
## For Dev Environment
npm run test:dev:with:allure 
## For Test Environment
npm run test:test:with:allure


## Running the Tests
Basic Commands

## To run all tests in headed mode
##For Dev environment
npx cross-env TEST_ENV=dev npx playwright test --project=chromium --headed

##For Test environment
npx cross-env TEST_ENV=test npx playwright test --project=chromium --headed

## Running Specific Tests on DEV or TEST Environments

## Run API Tests
Verifies login functionality through APIs.
# Run specific test on DEV
npx cross-env TEST_ENV=dev npx playwright test src/tests/api-tests/verifyLogInApis.spec.ts --project=chromium
# Run specific test on TEST
npx cross-env TEST_ENV=test npx playwright test src/tests/api-tests/verifyLogInApis.spec.ts --project=chromium



## Run UI Test: Place Order - Register While Checkout
# Run specific test on DEV
npx cross-env TEST_ENV=dev npx playwright test src/tests/registerWhileCheckout.spec.ts --headed --project=chromium
# Run specific test on TEST
npx cross-env TEST_ENV=test npx playwright test src/tests/registerWhileCheckout.spec.ts --headed --project=chromium



## Run UI Test: Place Order - Register Before Checkout
# Run specific test on DEV
npx cross-env TEST_ENV=dev npx playwright test src/tests/registerBeforeCheckout.spec.ts --headed --project=chromium
# Run specific test on TEST
npx cross-env TEST_ENV=test npx playwright test src/tests/registerBeforeCheckout.spec.ts --headed --project=chromium



## Choosing the Environment
You can run tests on two different environments:

## Dev Environment (Working Site)

Base URL: https://automationexercise.com/

Password: D3v3nv1r0m3nt

## Test Environment (Non-Working Site)

Base URL: https://test.automationexercise.com/

Password: T35t3nv1r0m3nt

## Example Commands:
For Dev environment
npx cross-env TEST_ENV=dev npx playwright test --project=chromium

For Test environment
npx cross-env TEST_ENV=test npx playwright test --project=chromium


## Project Folder Structure
automationexercise-playwright-tests/
│
├── README.md
├── GETTING_STARTED.md
├── FEEDBACK.md
├── ISSUES.md
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
│
├── fixtures/
├── pages/
├── tests/
├── utils/
└── node_modules/

## Code Quality and Formatting
We use Biome to check and format our code.

## Commands
Check for issues:
npx biome check .

Format the code safely:
npx biome format .

Fix all issues (even risky ones):
npx biome check --fix --unsafe

Auto-fix only safe issues:
npx biome check . --apply

## Always run npm run lint and npm run format before committing your code to maintain code quality.

 ### Extra Features

 **Smart Skipping:** Tests automatically skip if the environment is unreachable.  
 **Dynamic Test Data:** Faker is used to generate fresh random data for every test run.  
 **Environment Management:** Easily switch between Dev and Test environments using environment variables (`TEST_ENV=dev` or `TEST_ENV=test`).  
 **Code Quality (Biome):** Code formatting and linting are handled using Biome instead of traditional ESLint.  
 **Page Object Model (POM):** Framework follows a clean Page Object Model structure for maintainability.  
 **Meaningful Folder Structure:** Project organized with clear, professional folder names.  
 **Retries on Flaky Tests:** Automatically retrying flaky tests using Playwright's built-in retry feature.  
 **Good Commit Practices:** Code committed properly with meaningful messages and clean history.

 ## Troubleshooting Tips
If you get a browser error:
Run: npx playwright install

If tests skip:
Ensure the environment URL is reachable.

For easier debugging:
Run in headed mode
npx playwright test --headed

## Important Configuration Files
playwright.config.ts — Manages settings like base URLs, timeouts, retries, and project setups.

package.json — Contains project scripts:

"lint": "biome check ."

"format": "biome format ."

## Important:
Please do not remove or modify these files unless necessary, as they are critical for test management.


Thanks for following along!
Happy Testing! 



---

## Links

[README](README.md) | [GET_STARTED](GET_STARTED.md) | [ISSUES](ISSUES.md) | [FEEDBACK](FEEDBACK.md)
