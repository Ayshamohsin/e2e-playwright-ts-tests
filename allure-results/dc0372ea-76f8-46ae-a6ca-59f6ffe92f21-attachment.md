# Test info

- Name: Place Order: Register while Checkout
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:21:5

# Error details

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for locator('#submit')
    - locator resolved to <button id="submit" type="submit" data-qa="pay-button" class="form-control btn btn-primary submit-button">Pay and Confirm Order</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable

    at Payment.clickPayAndConfirm (C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\pages\payment.ts:49:41)
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:89:3
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
      - link " Logout":
        - /url: /logout
    - listitem:
      - link " Delete Account":
        - /url: /delete_account
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
    - listitem:  Logged in as Miss Colleen Langworth
- list:
  - listitem:
    - link "Home":
      - /url: /
  - listitem: Payment
- heading "Payment Online payment solutions" [level=2]:
  - text: Payment
  - link "Online payment solutions":
    - img
    - text: Online payment solutions
- text: Name on Card
- textbox: Marjorie Denesik
- text: Card Number
- textbox: "4469817901880"
- text: CVC
- textbox "ex. 311": "148"
- text: Expiration
- textbox "MM": "07"
- textbox "YYYY": "2025"
- button "Pay and Confirm Order"
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
   1 | // src/pages/Payment.ts
   2 |
   3 | import { Page, Locator } from '@playwright/test';
   4 | import { PaymentData } from '../utils/testData';
   5 |
   6 | export class Payment {
   7 |   Page: Page;
   8 |   nameOnCard: Locator;
   9 |   cardNumber: Locator;
  10 |   cvc: Locator;
  11 |   expirationMonth: Locator;
  12 |   expirationYear: Locator;
  13 |   payAndConfirmOrderButton: Locator;
  14 |   successMessage: Locator;
  15 |
  16 |   constructor(page: Page) {
  17 |     this.Page = page;
  18 |     this.nameOnCard = this.Page.locator('input[name="name_on_card"]');
  19 |     this.cardNumber = this.Page.locator('input[name="card_number"]');
  20 |     this.cvc = this.Page.locator('input[name="cvc"]');
  21 |     this.expirationMonth = this.Page.locator('input[name="expiry_month"]');
  22 |     this.expirationYear = this.Page.locator('input[name="expiry_year"]');
  23 |     this.payAndConfirmOrderButton = this.Page.locator('#submit');
  24 |     this.successMessage = this.Page.locator('div.col-sm-9.col-sm-offset-1 p');
  25 |   }
  26 |
  27 |   async enterPaymentDetail(paymentData: PaymentData) {
  28 |     await this.Page.waitForLoadState('domcontentloaded');
  29 |
  30 |     await this.nameOnCard.waitFor({ state: 'visible' });
  31 |     await this.nameOnCard.fill(paymentData.cardHolderName);
  32 |
  33 |     await this.cardNumber.waitFor({ state: 'visible' });
  34 |     await this.cardNumber.fill(paymentData.cardNumber);
  35 |
  36 |     await this.cvc.waitFor({ state: 'visible' });
  37 |     await this.cvc.fill(paymentData.cvc);
  38 |
  39 |     await this.expirationMonth.waitFor({ state: 'visible' });
  40 |     await this.expirationMonth.fill(paymentData.expiryMonth);
  41 |
  42 |     await this.expirationYear.waitFor({ state: 'visible' });
  43 |     await this.expirationYear.fill(paymentData.expiryYear);
  44 |   }
  45 |
  46 |   async clickPayAndConfirm() {
  47 |     await this.payAndConfirmOrderButton.scrollIntoViewIfNeeded();
  48 |     await this.payAndConfirmOrderButton.waitFor({ state: 'visible', timeout: 5000 });
> 49 |     await this.payAndConfirmOrderButton.click();
     |                                         ^ Error: locator.click: Test timeout of 90000ms exceeded.
  50 |   }
  51 |
  52 |   async capturePermanentSuccessMessage(){
  53 |     await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
  54 |     const message = await this.successMessage.textContent();
  55 |     return message?.trim() || '';
  56 |   }
  57 | }
  58 |
```