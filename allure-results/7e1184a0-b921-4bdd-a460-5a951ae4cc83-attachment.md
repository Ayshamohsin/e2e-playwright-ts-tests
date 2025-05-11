# Test info

- Name: Place Order : Register While Checkout
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:10:5

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByText('p : has_text("Congratulations! Your new account has been successfully created!")')
Expected: visible
Received: <element(s) not found>
Call log:
  - expect.toBeVisible with timeout 5000ms
  - waiting for getByText('p : has_text("Congratulations! Your new account has been successfully created!")')

    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:53:48
```

# Page snapshot

```yaml
- banner:
  - link "Automation Exercise website":
    - /url: /
    - img "Automation Exercise website"
  - list:
    - listitem:
      - link " Home":
        - /url: /
    - listitem:
      - link " Products":
        - /url: /products
    - listitem:
      - link " Cart":
        - /url: /view_cart
    - listitem:
      - link " Signup / Login":
        - /url: /login
    - listitem:
      - link " Test Cases":
        - /url: /test_cases
    - listitem:
      - link " API Testing":
        - /url: /api_list
    - listitem:
      - link " Video Tutorials":
        - /url: https://www.youtube.com/c/AutomationExercise
    - listitem:
      - link " Contact us":
        - /url: /contact_us
- heading "Account Created!" [level=2]
- paragraph: Congratulations! Your new account has been successfully created!
- paragraph: You can now take advantage of member privileges to enhance your online shopping experience with us.
- link "Continue":
  - /url: /
- contentinfo:
  - heading "Subscription" [level=2]
  - textbox "Your email address"
  - button ""
  - paragraph: Get the most recent updates from our site and be updated your self...
  - paragraph: Copyright © 2021 All rights reserved
- insertion:
  - iframe
```

# Test source

```ts
   1 | import {test,expect} from '@playwright/test'
   2 | import{HomePage} from '../pages/homePage'
   3 | import { CartPage } from '../pages/cartPage';
   4 | import { SignUp } from '../pages/signUP';
   5 |
   6 |
   7 |
   8 |
   9 |
  10 | test('Place Order : Register While Checkout' , async ({page}) =>{
  11 |       const homePageObject = new HomePage(page);
  12 |       const cartPageObject = new CartPage(page);
  13 |       const signUpObject = new SignUp(page);
  14 |
  15 |
  16 |
  17 |       await homePageObject.navigate();
  18 |       //Assertion logo is visible
  19 |       const isLogoVisible = await homePageObject.getLogoVisibility();
  20 |        expect(isLogoVisible).toBeTruthy();
  21 |        //Validating Home icon is visible
  22 |       const navLinks = await homePageObject.getNavBarLinksNames();
  23 |       expect (navLinks).toBeTruthy();
  24 |      //Footer is visible
  25 |      const footerIsVisible = await homePageObject.getFooterVisibility();
  26 |      expect (footerIsVisible).toBeTruthy();
  27 |
  28 |      //Add Products
  29 |      await page.pause();
  30 |      await homePageObject.addProducts();
  31 |      await homePageObject.goToCartPage();
  32 |
  33 |
  34 |      //Cart Page Visibility 
  35 |     // await cartPageObject.isCartPageVisible();
  36 |      await expect (cartPageObject.cartItems).toBeVisible();
  37 |
  38 |      //Checkout
  39 |      await cartPageObject.proceedToCheckout();
  40 |
  41 |      //Login/Register
  42 |      await cartPageObject.clickLoginRegister();
  43 |
  44 |      //Signup Page
  45 |      const day = '15';
  46 |      const month = '8';
  47 |      const year = '2010';
  48 |      const country = "New Zealand"
  49 |      await signUpObject.registerUser(day,month,year,country);
  50 |      const message = await signUpObject.verifyAccountCreatedandContinue();
  51 |      console.log("aysha's test file" , message);
  52 |      
> 53 |      await expect(signUpObject.successMessage).toBeVisible();
     |                                                ^ Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  54 |  
  55 |
  56 |
  57 |
  58 |
  59 | });
  60 |
```