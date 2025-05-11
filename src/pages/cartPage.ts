import type { Locator, Page } from "playwright";
import { safeClick } from "../utils/actions"; 

export class CartPage {
  page: Page;
  cartItems: Locator;
  checkOutButton: Locator;
  loginRegisterButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = this.page.locator("#cart_info_table");
    this.checkOutButton = this.page.locator(".btn.btn-default.check_out");
    this.loginRegisterButton = this.page.locator('a[href="/login"]').nth(1);
  }

  // Clicks the checkout button to proceed to checkout
  async proceedToCheckout() {
    await safeClick(this.checkOutButton);
  }

  // Clicks the login/register link from the cart page
  async clickLoginRegister() {
    await safeClick(this.loginRegisterButton);
  }
}
