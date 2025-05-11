// src/tests/registerBeforeCheckout.spec.ts

import { expect, test } from "@playwright/test";
import { CartPage } from "../pages/cartPage.ts";
import { CheckOut } from "../pages/checkOut.ts";
import { DeleteAccount } from "../pages/deleteAccount.ts";
import { HomePage } from "../pages/homePage.ts";
import { Payment } from "../pages/payment.ts";
import { SignUp } from "../pages/signUP.ts";
import { getEnv, isEnvironmentReachable } from "../utils/environments";
import { type ProfileData, generateTestProfile } from "../utils/testData.ts";

// ✅ Before starting any test, check if environment is reachable
test.beforeAll(async () => {
  const reachable = await isEnvironmentReachable();
  if (!reachable) {
    test.skip(true, "Skipping tests because environment is unreachable.");
  }
});

test("Place Order: Register before Checkout", async ({ page }) => {
  const homePageObject = new HomePage(page);
  const cartPageObject = new CartPage(page);
  const signUpPageObject = new SignUp(page);
  const checkOutPageObject = new CheckOut(page);
  const paymentPageObject = new Payment(page);
  const deleteAccoutPageObject = new DeleteAccount(page);

  const profile: ProfileData = generateTestProfile();

  await homePageObject.navigate();
 
  expect(await homePageObject.isHomePageVisible()).toBeTruthy(); // ✅ Verify page loaded
  expect(await homePageObject.isHomePageVisible()).toBeFalsy();


  // ✅ Navigate to login page
  await homePageObject.navigateToLoginPage();

  // ✅ Fill signup form
  const day = "15";
  const month = "8";
  const year = "2010";
  const country = "New Zealand";

  await signUpPageObject.registerUser(profile.user, day, month, year, country);
  await expect(await signUpPageObject.verifyAccountCreated()).toHaveText(
    "Congratulations! Your new account has been successfully created! hhhhh",
  );
  await signUpPageObject.clickContinueButton();

  // ✅ Verify username shown
  await expect(
    signUpPageObject.page.getByText(` Logged in as ${profile.user.name}`, { exact: false }),
  ).toBeVisible();

  // ✅ Add product to cart (dynamic)

  const productNames = ["Stylish Dress", "Winter Top"]; // ✅ Now it's an array of two products
  const addedItems = await homePageObject.addProductsToCart(productNames); // ✅ Now correct

  console.log("Added Items:", addedItems);

  // ✅ Cart page
  await homePageObject.goToCartPage();
  await expect(cartPageObject.cartItems).toBeVisible();

  // ✅ Proceed to checkout
  await cartPageObject.proceedToCheckout();

  function normalizeLines(lines: string[]): string[] {
    return lines.map((line) => line.replace(/\s+/g, " ").trim());
  }

  // ✅ Verify address details
  const expectedDeliveryAddress = normalizeLines([
    `Mrs. ${profile.user.firstName} ${profile.user.lastName}`,
    `${profile.user.company}`,
    `${profile.user.address}`,
    `${profile.user.addressField}`,
    `${profile.user.city} ${profile.user.state}\n${profile.user.zipCode}`,
    `${country}`,
    `${profile.user.phone}`,
  ]);

  expect(normalizeLines(await checkOutPageObject.verifyDeliveryAddressDetail())).toEqual(
    expectedDeliveryAddress,
  );
  expect(normalizeLines(await checkOutPageObject.verifyBillingAddressDetail())).toEqual(
    expectedDeliveryAddress,
  );

  console.log("Expected Delivery Address:", expectedDeliveryAddress);

  // ✅ Review your order
  const actualOrder = await checkOutPageObject.reviewYourOrder();
  for (const added of addedItems) {
    const match = actualOrder.find((item) => item.name === added.name);
    expect(match).toBeDefined();
    expect(match?.price).toBe(added.price);
    expect(match?.quantity).toBe(added.quantity);
    console.log("Matched Item:", match);
  }

  // ✅ Add description and place order
  await checkOutPageObject.addDescriptionAndPlaceOrder();

  // ✅ Enter payment details
  await paymentPageObject.enterPaymentDetail(profile.payment);

  // ✅ Click Pay button
  await paymentPageObject.clickPayAndConfirm();

  // ✅ Capture permanent success message
  const successMessage = await paymentPageObject.capturePermanentSuccessMessage();
  console.log("Captured Permanent Success Message:", successMessage);

  // ✅ Final assertion
  expect(successMessage).toContain("Congratulations! Your order has been confirmed!");

  // ✅ Delete account
  const deleteMessage = await deleteAccoutPageObject.DeleteAccountandVerifymessage();
  console.log("Captured Accout Deletion Success Message:", deleteMessage);
  expect(deleteMessage).toContain("Your account has been permanently deleted!");

  // ✅ Continue
  await deleteAccoutPageObject.clickContinueButton();

  console.log("✅ Yahoo! Everything Working Fine, ran all");
});
