import { expect, test } from "@playwright/test";
import { allure } from "allure-playwright";
import { CartPage } from "../pages/cartPage.ts";
import { CheckOut } from "../pages/checkOut.ts";
import { DeleteAccount } from "../pages/deleteAccount.ts";
import { HomePage } from "../pages/homePage.ts";
import { Payment } from "../pages/payment.ts";
import { SignUp } from "../pages/signUP.ts";
import { getEnv, isEnvironmentReachable } from "../utils/environments";
import { type ProfileData, generateTestProfile } from "../utils/testData.ts";

// Before running tests, verify that the environment is reachable
test.beforeAll(async () => {
  const reachable = await isEnvironmentReachable();
  if (!reachable) {
    test.skip(true, "Skipping tests because environment is unreachable.");
  }
});

test("Place Order: Register before Checkout", async ({ page }) => {
  // Initialize page objects
  const homePageObject = new HomePage(page);
  const cartPageObject = new CartPage(page);
  const signUpPageObject = new SignUp(page);
  const checkOutPageObject = new CheckOut(page);
  const paymentPageObject = new Payment(page);
  const deleteAccountPageObject = new DeleteAccount(page); // Corrected spelling here
  allure.feature("Place Order");
  allure.severity("critical");
  allure.owner("Ayesha Mohsin");
  allure.story("User registration before checkout");

  // Generate a test user profile
  const profile: ProfileData = generateTestProfile();

  // Step 1-3: Launch browser and verify home page
  await homePageObject.navigate();
  expect(await homePageObject.isHomePageVisible()).toBeTruthy();

  // Step 4: Click on 'Signup / Login' button
  await homePageObject.navigateToLoginPage();

  // Step 5: Fill signup form and create a new account
  const day = "5";
  const month = "6";
  const year = "1992";
  const country = "New Zealand";

  await signUpPageObject.registerUser(profile.user, day, month, year, country);

  // Step 6: Verify 'ACCOUNT CREATED!' message and continue
  await expect(await signUpPageObject.verifyAccountCreated()).toHaveText(
    "Congratulations! Your new account has been successfully created!",
  );
  await signUpPageObject.clickContinueButton();

  // Step 7: Verify 'Logged in as username' is visible
  await expect(
    signUpPageObject.page.getByText(` Logged in as ${profile.user.name}`, { exact: false }),
  ).toBeVisible();

  // Step 8: Add products to the cart
  const productNames = ["Stylish Dress", "Winter Top"];
  const addedItems = await homePageObject.addProductsToCart(productNames);
  console.log("Added Items:", addedItems);

  // Step 9-10: Go to cart page and verify items are visible
  await homePageObject.goToCartPage();
  await expect(cartPageObject.cartItems).toBeVisible();

  // Step 11: Proceed to checkout
  await cartPageObject.proceedToCheckout();

  // Utility function to clean up text formatting
  function normalizeLines(lines: string[]): string[] {
    return lines.map((line) => line.replace(/\s+/g, " ").trim());
  }

  // Step 12: Verify address details for delivery and billing
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

  // Verify that the items in the order match the ones added to the cart
  const actualOrder = await checkOutPageObject.reviewYourOrder();
  for (const added of addedItems) {
    const match = actualOrder.find((item) => item.name === added.name);
    expect(match).toBeDefined();
    expect(match?.price).toBe(added.price);
    expect(match?.quantity).toBe(added.quantity);
    console.log("Matched Item:", match);
  }

  // Step 13: Enter comment and place order
  await checkOutPageObject.addDescriptionAndPlaceOrder();

  // Step 14: Enter payment details
  await paymentPageObject.enterPaymentDetail(profile.payment);

  // Step 15: Click 'Pay and Confirm Order' button
  await paymentPageObject.clickPayAndConfirm();

  // Step 16: Capture and verify success message after order placement
  const successMessage = await paymentPageObject.capturePermanentSuccessMessage();
  console.log("Captured Permanent Success Message:", successMessage);
  expect(successMessage).toContain("Congratulations! Your order has been confirmed!");

  // Step 17: Delete account after order
  const deleteMessage = await deleteAccountPageObject.deleteAccountAndVerifyMessage();
  console.log("Captured Account Deletion Success Message:", deleteMessage);
  expect(deleteMessage).toContain("Your account has been permanently deleted!");

  // Step 18: Click continue button after account deletion
  await deleteAccountPageObject.clickContinueButton();

  console.log("Test completed successfully");
});
