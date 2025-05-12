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

// Before running any tests, make sure the environment is accessible
test.beforeAll(async () => {
  const reachable = await isEnvironmentReachable();
  if (!reachable) {
    test.skip(true, "Skipping tests because environment is unreachable.");
  }
});

test("Place Order: Register while Checkout", async ({ page }) => {
  // Initialize page objects
  const homePageObject = new HomePage(page);
  const cartPageObject = new CartPage(page);
  const signUpPageObject = new SignUp(page);
  const checkOutPageObject = new CheckOut(page);
  const paymentPageObject = new Payment(page);
  const deleteAccountPageObject = new DeleteAccount(page); // Corrected variable name

  // Generate a test user profile
  const profile: ProfileData = generateTestProfile();

  allure.feature("Place Order");
  allure.severity("critical");
  allure.owner("Ayesha Mohsin");
  allure.story("User registration at checkout");

  // Step 1-3: Navigate to homepage and verify it is visible
  await homePageObject.navigate();
  expect(await homePageObject.isHomePageVisible()).toBeTruthy();

  // Step 4: Add products to cart
  const productNames = ["Stylish Dress", "Winter Top"];
  const addedItems = await homePageObject.addProductsToCart(productNames);
  console.log("Added Items:", addedItems);

  // Step 5-6: Go to cart page and verify cart items are visible
  await homePageObject.goToCartPage();
  await expect(cartPageObject.cartItems).toBeVisible();

  // Step 7-8: Proceed to checkout and click on 'Register / Login' button
  await cartPageObject.proceedToCheckout();
  await cartPageObject.clickLoginRegister();

  // Step 9: Fill signup form to create account
  const day = "15";
  const month = "8";
  const year = "2010";
  const country = "New Zealand";
  await signUpPageObject.registerUser(profile.user, day, month, year, country);

  // Step 10: Verify 'ACCOUNT CREATED!' message and continue
  await expect(await signUpPageObject.verifyAccountCreated()).toHaveText(
    "Congratulations! Your new account has been successfully created!",
  );
  await signUpPageObject.clickContinueButton();

  // Step 11: Verify 'Logged in as username' is displayed
  await expect(
    signUpPageObject.page.getByText(` Logged in as ${profile.user.name}`, { exact: false }),
  ).toBeVisible();

  // Step 12-13: Go back to cart page and proceed to checkout again
  await homePageObject.goToCartPage();
  await cartPageObject.proceedToCheckout();

  // Utility function to normalize text lines for easier comparison
  function normalizeLines(lines: string[]): string[] {
    return lines.map((line) => line.replace(/\s+/g, " ").trim());
  }

  // Step 14: Verify address details for delivery and billing
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

  // Verify the products in the order summary match the ones added to cart
  const actualOrder = await checkOutPageObject.reviewYourOrder();
  for (const added of addedItems) {
    const match = actualOrder.find((item) => item.name === added.name);
    expect(match).toBeDefined();
    expect(match?.price).toBe(added.price);
    expect(match?.quantity).toBe(added.quantity);
    console.log("Matched Item:", match);
  }

  // Step 15: Add description and place the order
  await checkOutPageObject.addDescriptionAndPlaceOrder();

  // Step 16: Enter payment details
  await paymentPageObject.enterPaymentDetail(profile.payment);

  // Step 17: Click 'Pay and Confirm Order' button
  await paymentPageObject.clickPayAndConfirm();

  // Step 18: Capture and verify success message for order placement
  const successMessage = await paymentPageObject.capturePermanentSuccessMessage();
  console.log("Captured Permanent Success Message:", successMessage);
  expect(successMessage).toContain("Congratulations! Your order has been confirmed!");

  // Step 19-20: Delete the account and verify account deletion message
  const deleteMessage = await deleteAccountPageObject.deleteAccountAndVerifyMessage();
  console.log("Captured Account Deletion Success Message:", deleteMessage);
  expect(deleteMessage).toContain("Your account has been permanently deleted!");

  // Click continue button after account deletion
  await deleteAccountPageObject.clickContinueButton();

  console.log("Test completed successfully");
});
