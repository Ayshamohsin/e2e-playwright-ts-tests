# Test info

- Name: Place Order : Register While Checkout
- Location: C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:130:5

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "Your order has been placed successfully!"
Received string:    "Congratulations! Your order has been confirmed!"
    at C:\Users\Administrator\Desktop\AyshaMohsin_AssessmentTasks\src\tests\registerWhileCheckout.spec.ts:221:24
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
    - listitem:  Logged in as Patrick Bahringer
- heading "Order Placed!" [level=2]
- paragraph: Congratulations! Your order has been confirmed!
- link "Download Invoice":
  - /url: /download_invoice/1500
- link "Continue":
  - /url: /
- contentinfo:
  - heading "Subscription" [level=2]
  - textbox "Your email address"
  - button ""
  - paragraph: Get the most recent updates from our site and be updated your self...
  - paragraph: Copyright © 2021 All rights reserved
```

# Test source

```ts
  121 |
  122 | import { test, expect } from '@playwright/test';
  123 | import { HomePage } from '../pages/homePage';
  124 | import { CartPage } from '../pages/cartPage';
  125 | import { SignUp } from '../pages/signUP';
  126 | import { CheckOut } from '../pages/checkOut';
  127 | import { Payment } from '../pages/payment';
  128 | import { generateTestProfile, ProfileData } from '../utils/testData'; // ✅ import profile
  129 |
  130 | test('Place Order : Register While Checkout', async ({ page }) => {
  131 |   const homePageObject = new HomePage(page);
  132 |   const cartPageObject = new CartPage(page);
  133 |   const signUpPageObject = new SignUp(page);
  134 |   const checkOutPageObject = new CheckOut(page);
  135 |   const paymentPageObject = new Payment(page);
  136 |
  137 |   const profile: ProfileData = generateTestProfile(); // ✅ create profile once here
  138 |
  139 |   await homePageObject.navigate();
  140 |   
  141 |   const isLogoVisible = await homePageObject.getLogoVisibility();
  142 |   expect(isLogoVisible).toBeTruthy();
  143 |
  144 |   const navLinks = await homePageObject.getNavBarLinksNames();
  145 |   expect(navLinks).toBeTruthy();
  146 |
  147 |   const footerIsVisible = await homePageObject.getFooterVisibility();
  148 |   expect(footerIsVisible).toBeTruthy();
  149 |
  150 |   const addedItems = await homePageObject.addProducts();
  151 |   console.log('Added Items:', addedItems);
  152 |
  153 |   await homePageObject.goToCartPage();
  154 |   await expect(cartPageObject.cartItems).toBeVisible();
  155 |
  156 |   await cartPageObject.proceedToCheckout();
  157 |   await cartPageObject.clickLoginRegister();
  158 |
  159 |   // Signup
  160 |   const day = '15';
  161 |   const month = '8';
  162 |   const year = '2010';
  163 |   const country = "New Zealand";
  164 |
  165 |   await signUpPageObject.registerUser(profile.user, day, month, year, country); // ✅ Pass user data
  166 |
  167 |   const messageLocator = await signUpPageObject.verifyAccountCreated();
  168 |   await expect(messageLocator).toHaveText('Congratulations! Your new account has been successfully created!');
  169 |   await signUpPageObject.clickContinueButton();
  170 |
  171 |   await expect(signUpPageObject.page.getByText(` Logged in as ${profile.user.name}`, { exact: false })).toBeVisible();
  172 |
  173 |   // Go to cart page again
  174 |   await homePageObject.goToCartPage();
  175 |   await cartPageObject.proceedToCheckout();
  176 |
  177 |   // Verify Delivery Address
  178 |   function normalizeLines(lines: string[]): string[] {
  179 |     return lines.map(line => line.replace(/\s+/g, ' ').trim());
  180 |   }
  181 |
  182 |   const expectedDeliveryAddress = normalizeLines([
  183 |     `Mrs. ${profile.user.firstName} ${profile.user.lastName}`,
  184 |     `${profile.user.company}`,
  185 |     `${profile.user.address}`,
  186 |     `${profile.user.addressField}`,
  187 |     `${profile.user.city} ${profile.user.state}\n${profile.user.zipCode}`,
  188 |     `${country}`, // ✅ note: from your signup data
  189 |     `${profile.user.phone}`
  190 |   ]);
  191 |
  192 |   const actualDeliveryAddress = normalizeLines(await checkOutPageObject.verifyDeliveryAddressDetail());
  193 |   expect(actualDeliveryAddress).toEqual(expectedDeliveryAddress);
  194 |
  195 |   const actualBillingAddress = normalizeLines(await checkOutPageObject.verifyBillingAddressDetail());
  196 |   expect(actualBillingAddress).toEqual(expectedDeliveryAddress); // ✅ Billing should match delivery
  197 |
  198 |   console.log('Expected Delivery Address:', expectedDeliveryAddress);
  199 |  // await page.pause();
  200 |
  201 |   // Order review
  202 |   const actualOrder = await checkOutPageObject.reviewYourOrder();
  203 |
  204 |   for (const added of addedItems) {
  205 |     const match = actualOrder.find(item => item.name === added.name);
  206 |     expect(match).toBeDefined();
  207 |     expect(match?.price).toBe(added.price);
  208 |     expect(match?.quantity).toBe(added.quantity);
  209 |     console.log("Matched Item:", match, added.price, added.quantity, added.name);
  210 |   }
  211 |
  212 |   await checkOutPageObject.addDescriptionAndPlaceOrder();
  213 |
  214 |   // ✅ Now pass payment data
  215 |   await paymentPageObject.enterPaymentDetail(profile.payment);
  216 |  // await paymentPageObject.payAndConfirmAndCaptureMessage();
  217 |   const successMessage = await paymentPageObject.payAndConfirmAndCaptureMessage();
  218 |  
  219 | console.log('Captured Payment Success Message:', successMessage);
  220 |
> 221 | expect(successMessage).toContain('Your order has been placed successfully!');
      |                        ^ Error: expect(received).toContain(expected) // indexOf
  222 |
  223 | });
  224 |
  225 |
```