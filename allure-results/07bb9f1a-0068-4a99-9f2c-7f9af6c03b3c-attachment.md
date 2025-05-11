# Test info

- Name: Place Order : Register While Checkout
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:9:5

# Error details

```
Error: locator.click: Error: strict mode violation: locator('a[href="/login"]') resolved to 2 elements:
    1) <a href="/login">…</a> aka getByRole('link', { name: ' Signup / Login' })
    2) <a href="/login">…</a> aka getByRole('link', { name: 'Register / Login' })

Call log:
  - waiting for locator('a[href="/login"]')

    at CartPage.clickLoginRegister (C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\pages\cartPage.ts:31:40)
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:37:27
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
- list:
  - listitem:
    - link "Home":
      - /url: /
  - listitem: Shopping Cart
- text: Proceed To Checkout 
- heading "Checkout" [level=4]
- paragraph: Register / Login account to proceed on checkout.
- paragraph:
  - link "Register / Login":
    - /url: /login
- button "Continue On Cart"
- table:
  - rowgroup:
    - row "Item Description Price Quantity Total":
      - cell "Item"
      - cell "Description"
      - cell "Price"
      - cell "Quantity"
      - cell "Total"
      - cell
  - rowgroup:
    - row "Product Image Stylish Dress Women > Dress Rs. 1500 1 Rs. 1500 ":
      - cell "Product Image":
        - link "Product Image":
          - /url: ""
          - img "Product Image"
      - cell "Stylish Dress Women > Dress":
        - heading "Stylish Dress" [level=4]:
          - link "Stylish Dress":
            - /url: /product_details/4
        - paragraph: Women > Dress
      - cell "Rs. 1500":
        - paragraph: Rs. 1500
      - cell "1":
        - button "1"
      - cell "Rs. 1500":
        - paragraph: Rs. 1500
      - cell ""
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
  14 |         this.loginRegisterButton =this.page.locator('a[href="/login"]');
  15 |
  16 |     }
  17 |
  18 |
  19 |     // async isCartPageVisible(){
  20 |     //     await this.cartItems.isVisible();
  21 |
  22 |     // }
  23 |
  24 |
  25 |     async proceedToCheckout(){
  26 |         await this.checkOutButton.click();
  27 |
  28 |     }
  29 |
  30 |     async clickLoginRegister(){
> 31 |         await this.loginRegisterButton.click();
     |                                        ^ Error: locator.click: Error: strict mode violation: locator('a[href="/login"]') resolved to 2 elements:
  32 |     }
  33 |
  34 |
  35 | }
```