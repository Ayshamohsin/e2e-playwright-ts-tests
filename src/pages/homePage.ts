import type { Locator, Page } from "@playwright/test";
import { safeClick, scrollAndClick, waitForVisible } from "../utils/actions";
import { getEnv } from "../utils/environments";

export class HomePage {
  page: Page;
  logo: Locator;
  navBar: Locator;
  footer: Locator;
  loginButton: Locator;
  product: Locator;
  continueShopping: Locator;
  cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = this.page.locator(".logo.pull-left");
    this.navBar = this.page.locator(".nav.navbar-nav");
    this.footer = this.page.locator("#footer").first();
    this.loginButton = this.page.locator(".fa.fa-lock");
    this.product = this.page.locator(".product-image-wrapper");
    this.continueShopping = this.page.locator(".btn.btn-success.close-modal.btn-block");
    this.cartButton = this.page.locator('a[href="/view_cart"]').first();
  }

  // Navigates to the home page based on the selected environment
  async navigate() {
    const env = getEnv();
    await this.page.goto(env.baseUrl);
  }

  // Verifies that the home page is visible by checking key elements
  async isHomePageVisible() {
    const logoVisible = await this.logo.isVisible();
    const navBarVisible = await this.navBar.isVisible();
    const footerVisible = await this.footer.isVisible();
    return logoVisible && navBarVisible && footerVisible;
  }

  // Navigates to the login page
  async navigateToLoginPage() {
    await waitForVisible(this.loginButton, 5000);
    await safeClick(this.loginButton);
  }

  // Adds multiple products to the cart by product names
  async addProductsToCart(productNames: string[]) {
    const addedItems: { name: string; price: string; quantity: number }[] = [];
    const productCount = await this.product.count();

    for (const targetProductName of productNames) {
      for (let i = 0; i < productCount; i++) {
        const productItem = this.product.nth(i);
        await productItem.scrollIntoViewIfNeeded();

        const itemName = await productItem.locator("div.productinfo p").textContent();
        const itemPrice = await productItem.locator("div.productinfo h2").textContent();
        const quantity = 1;

        if (itemName?.trim() === targetProductName) {
          await scrollAndClick(productItem.locator("text=Add to cart").first());
          console.log(`Added to cart: ${targetProductName}`);
          await safeClick(this.continueShopping);

          addedItems.push({
            name: itemName.trim() || "",
            price: itemPrice?.trim() || "",
            quantity,
          });

          break;
        }
      }
    }

    return addedItems;
  }

  // Navigates to the cart page
  async goToCartPage() {
    await safeClick(this.cartButton);
  }
}
