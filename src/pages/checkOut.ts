type OrderItem = {
  name: string;
  price: string;
  quantity: number;
  total: string;
};

import type { Locator, Page } from "@playwright/test";

export class CheckOut {
  Page: Page;
  deliveryAddressItems: Locator;
  billingAddressItems: Locator;
  totalItemsInOrder: Locator;
  commentTextArea: Locator;
  placeOrderButton: Locator;

  constructor(Page: Page) {
    this.Page = Page;
    this.deliveryAddressItems = this.Page.locator("#address_delivery li");
    this.billingAddressItems = this.Page.locator("#address_invoice li");
    this.totalItemsInOrder = this.Page.locator("tbody tr");
    this.commentTextArea = this.Page.locator(".form-control");
    this.placeOrderButton = this.Page.locator(".btn.btn-default.check_out");
  }

  async verifyDeliveryAddressDetail() {
    const addressTexts: string[] = [];
    const addressCount = await this.deliveryAddressItems.count();
    for (let i = 1; i < addressCount; i++) {
      const itemsText = await this.deliveryAddressItems.nth(i).textContent();

      addressTexts.push(itemsText?.trim() || "");
    }

    return addressTexts;
  }

  async verifyBillingAddressDetail() {
    const addressTexts: string[] = [];
    const addressCount = await this.billingAddressItems.count();
    for (let i = 1; i < addressCount; i++) {
      const itemsText = await this.billingAddressItems.nth(i).textContent();

      addressTexts.push(itemsText?.trim() || "");
    }

    return addressTexts;
  }

  async reviewYourOrder() {
    const items: OrderItem[] = [];

    // ✅ Wait for at least 1 row to be attached before continuing
    await this.totalItemsInOrder.first().waitFor({ timeout: 60000, state: "attached" });

    const orders = await this.totalItemsInOrder.count();

    for (let i = 0; i < orders; i++) {
      const row = this.totalItemsInOrder.nth(i);

      await row.scrollIntoViewIfNeeded();

      // ✅ Step 1: Check if row is visible
      if (!(await row.isVisible())) {
        console.warn(`Skipping row ${i} because it is not visible.`);
        continue; // skip to next row
      }

      const nameLocator = row.locator("td.cart_description h4 a");

      // ✅ Step 2: Check if product name link is visible
      if (!(await nameLocator.isVisible())) {
        console.warn(`Skipping row ${i} because product name is missing.`);
        continue;
      }

      try {
        // ✅ Step 3: Safe to extract text
        const name = (await nameLocator.textContent())?.trim() ?? "";
        const price = (await row.locator("td.cart_price p").textContent())?.trim() ?? "";

        // ✅ Step 4: Extract quantity as text first
        const quantityText =
          (await row.locator("td.cart_quantity button").textContent())?.trim() ?? "0";

        // ✅ Step 5: Convert quantityText to number
        const quantity = Number.parseInt(quantityText, 10); // Now quantity is a number!

        const total = (await row.locator("td.cart_total p").textContent())?.trim() ?? "";

        // ✅ Step 6: Now quantity is number, matching your updated OrderItem type
        items.push({ name, price, quantity, total });
      } catch (error) {
        console.error(`Error extracting row ${i}:`, error);
      }
    }

    return items;
  }
  //await this.commentTextArea.scrollIntoViewIfNeeded();

  async addDescriptionAndPlaceOrder() {
    await this.commentTextArea.waitFor({ state: "visible", timeout: 10000 });
    await this.commentTextArea.fill("I ahave revied my delivery address and order detail.");
    await this.placeOrderButton.click();
  }
}
