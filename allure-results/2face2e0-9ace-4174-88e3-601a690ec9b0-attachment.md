# Test info

- Name: Place Order : Register While Checkout
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:130:5

# Error details

```
Error: locator.scrollIntoViewIfNeeded: Target page, context or browser has been closed
Call log:
  - waiting for locator('#submit')

    at Payment.payAndConfirmAndCaptureMessage (C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\pages\payment.ts:68:39)
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:230:50
```

# Test source

```ts
   1 | // 
   2 | // src/pages/Payment.ts
   3 |
   4 | import { Page, Locator } from '@playwright/test';
   5 | import { PaymentData } from '../utils/testData'; // ✅ import correct type
   6 |
   7 | export class Payment {
   8 |   Page: Page;
   9 |   nameOnCard: Locator;
  10 |   cardNumber: Locator;
  11 |   cvc: Locator;
  12 |   expirationMonth: Locator;
  13 |   expirationYear: Locator;
  14 |   payAndConfirmOrderButton: Locator;
  15 |   successMessage: Locator;
  16 |
  17 |   constructor(page: Page) {
  18 |     this.Page = page;
  19 |     this.nameOnCard = this.Page.locator('input[name="name_on_card"]');
  20 |     this.cardNumber = this.Page.locator('input[name="card_number"]');
  21 |     this.cvc = this.Page.locator('input[name="cvc"]');
  22 |     this.expirationMonth = this.Page.locator('input[name="expiry_month"]');
  23 |     this.expirationYear = this.Page.locator('input[name="expiry_year"]');
  24 |     this.payAndConfirmOrderButton = this.Page.locator('#submit');
  25 |     this.successMessage = this.Page.locator('div.col-sm-9.col-sm-offset-1 p');
  26 |   }
  27 |
  28 |   async enterPaymentDetail(paymentData: PaymentData) {
  29 |     await this.Page.waitForLoadState('domcontentloaded');
  30 |
  31 |     await this.nameOnCard.waitFor({ state: 'visible' });
  32 |     await this.nameOnCard.click();
  33 |     await this.nameOnCard.fill(paymentData.cardHolderName);
  34 |
  35 |     await this.cardNumber.waitFor({ state: 'visible' });
  36 |     await this.cardNumber.click();
  37 |     await this.cardNumber.fill(paymentData.cardNumber);
  38 |
  39 |     await this.cvc.waitFor({ state: 'visible' });
  40 |     await this.cvc.click();
  41 |     await this.cvc.fill(paymentData.cvc);
  42 |
  43 |     await this.expirationMonth.waitFor({ state: 'visible' });
  44 |     await this.expirationMonth.click();
  45 |     await this.expirationMonth.fill(paymentData.expiryMonth);
  46 |
  47 |     await this.expirationYear.waitFor({ state: 'visible' });
  48 |     await this.expirationYear.click();
  49 |     await this.expirationYear.fill(paymentData.expiryYear);
  50 |   }
  51 |
  52 |   
  53 |
  54 | // async payAndConfirmAndCaptureMessage(): Promise<string> {
  55 | //   const [message] = await Promise.all([
  56 | //     this.successMessage.waitFor({ state: 'visible', timeout: 5000 }).then(async () => {
  57 | //       return await this.successMessage.textContent();
  58 | //     }),
  59 | //     this.Page.waitForNavigation({ waitUntil: 'networkidle' }),  // ✅ WAIT FOR navigation!
  60 | //     this.payAndConfirmOrderButton.click()  // ✅ TRIGGERS navigation!
  61 | //   ]);
  62 |
  63 | //   return message || '';
  64 | // }
  65 |
  66 | async payAndConfirmAndCaptureMessage(): Promise<string> {
  67 |   // Scroll to Pay button (optional but safer)
> 68 |   await this.payAndConfirmOrderButton.scrollIntoViewIfNeeded();
     |                                       ^ Error: locator.scrollIntoViewIfNeeded: Target page, context or browser has been closed
  69 |
  70 |   // Wait for Pay button to be visible
  71 |   await this.payAndConfirmOrderButton.waitFor({ state: 'visible', timeout: 5000 });
  72 |
  73 |   // Click Pay button
  74 |   await this.payAndConfirmOrderButton.click();
  75 |
  76 |   // Immediately wait for short success message to appear
  77 |   await this.successMessage.waitFor({ state: 'visible', timeout: 3000 });
  78 |
  79 |   // Capture the message text
  80 |   const message = await this.successMessage.textContent();
  81 |
  82 |   // Return the message
  83 |   return message?.trim() || '';
  84 | }
  85 |
  86 |
  87 |
  88 |
  89 | }
  90 |
```