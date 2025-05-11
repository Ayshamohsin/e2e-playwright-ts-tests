# Test info

- Name: Place Order: Register before Checkout
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerBeforeCheckout.spec.ts:14:7

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a[href="/login"]').nth(1)

    at CartPage.clickLoginRegister (C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\pages\cartPage.ts:25:40)
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerBeforeCheckout.spec.ts:34:24
```

# Page snapshot

```yaml
- banner:
  - link "Website for automation practice":
    - /url: /
    - img "Website for automation practice"
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
- heading "Login to your account" [level=2]
- textbox "Email Address"
- textbox "Password"
- button "Login"
- heading "OR" [level=2]
- heading "New User Signup!" [level=2]
- textbox "Name"
- textbox "Email Address"
- button "Signup"
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
   1 | import { Page,Locator } from "playwright";
   2 | export class CartPage{
   3 |
   4 |     page:Page;
   5 |     cartItems : Locator;
   6 |   checkOutButton : Locator;
   7 |   loginRegisterButton : Locator;
   8 |
   9 |
  10 |     constructor(page:Page){
  11 |         this.page = page;
  12 |         this.cartItems = this.page.locator('#cart_info_table');
  13 |         this.checkOutButton = this.page.locator('.btn.btn-default.check_out');
  14 |         this.loginRegisterButton =this.page.locator('a[href="/login"]').nth(1);
  15 |
  16 |     }
  17 |
  18 |
  19 |     async proceedToCheckout(){
  20 |         await this.checkOutButton.click();
  21 |
  22 |     }
  23 |
  24 |     async clickLoginRegister(){
> 25 |         await this.loginRegisterButton.click();
     |                                        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  26 |     }
  27 |
  28 |
  29 | }
```