import type { Locator, Page } from "@playwright/test";
import { getEnv, isEnvironmentReachable } from "../utils/environments";

// Added import to get environment settings

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

  async navigate() {
    const env = getEnv(); // default 'dev' unless specified otherwise
    await this.page.goto(env.baseUrl);
    // Why: Fetches correct URL based on selected environment (dev/test). Avoids hardcoding, satisfies exercise constraint of dynamic environments.
  }

  async isHomePageVisible() {
    const logoVisible = await this.logo.isVisible();
    const navBarVisible = await this.navBar.isVisible();
    const footerVisible = await this.footer.isVisible();

    return logoVisible && navBarVisible && footerVisible;
  }

  // go to login page
  async navigateToLoginPage() {
    await this.loginButton.waitFor({ state: "visible", timeout: 5000 });
    await this.loginButton.click();
  }

  // Add multiple products to the cart dynamically (Simple and Clean Version with Comments)
  async addProductsToCart(productNames: string[]) {
    const addedItems: { name: string; price: string; quantity: number }[] = []; // Store added product details for later verification
    const productCount = await this.product.count(); // Get total number of products displayed on the page

    // Loop through each product name you want to add
    for (const targetProductName of productNames) {
      // Search all displayed products for the matching name
      for (let i = 0; i < productCount; i++) {
        const productItem = this.product.nth(i);
        await productItem.scrollIntoViewIfNeeded(); // Scroll to product if not in view

        const itemName = await productItem.locator("div.productinfo p").textContent(); // Get product name
        const itemPrice = await productItem.locator("div.productinfo h2").textContent(); // Get product price
        const quantity = 1; // Default quantity is 1 for now

        // If the product name matches, add to cart
        if (itemName?.trim() === targetProductName) {
          await productItem.locator("text=Add to cart").first().click(); // Click Add to Cart button
          console.log(`Clicked add to cart for: ${targetProductName}`);
          await this.continueShopping.click(); // After adding, click Continue Shopping

          // Save product info for later order verification
          addedItems.push({
            name: itemName.trim() || "",
            price: itemPrice?.trim() || "",
            quantity,
          });

          break; // Exit inner loop once the product is added
        }
      }
    }

    return addedItems; // Return all added products information
  }

  //Go to cart page

  async goToCartPage() {
    await this.cartButton.click();
  }
}
