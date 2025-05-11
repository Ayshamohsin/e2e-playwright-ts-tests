import type { Locator, Page } from "playwright";
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

  async proceedToCheckout() {
    await this.checkOutButton.click();
  }

  async clickLoginRegister() {
    await this.loginRegisterButton.click();
  }
}
