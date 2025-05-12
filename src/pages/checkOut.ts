import type { Locator, Page } from "@playwright/test";
import { safeClick, safeFill, waitForVisible } from "../utils/actions";

type OrderItem = {
  name: string;
  price: string;
  quantity: number;
  total: string;
};

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

  // Returns the delivery address details as a list of text lines
  async verifyDeliveryAddressDetail() {
    const addressTexts: string[] = [];
    const addressCount = await this.deliveryAddressItems.count();
    for (let i = 1; i < addressCount; i++) {
      const itemsText = await this.deliveryAddressItems.nth(i).textContent();
      addressTexts.push(itemsText?.trim() || "");
    }
    return addressTexts;
  }

  // Returns the billing address details as a list of text lines
  async verifyBillingAddressDetail() {
    const addressTexts: string[] = [];
    const addressCount = await this.billingAddressItems.count();
    for (let i = 1; i < addressCount; i++) {
      const itemsText = await this.billingAddressItems.nth(i).textContent();
      addressTexts.push(itemsText?.trim() || "");
    }
    return addressTexts;
  }

  // Returns all items listed in the order summary
  async reviewYourOrder() {
    const items: OrderItem[] = [];

    await this.totalItemsInOrder.first().waitFor({ timeout: 60000, state: "attached" });

    const orders = await this.totalItemsInOrder.count();

    for (let i = 0; i < orders; i++) {
      const row = this.totalItemsInOrder.nth(i);
      await row.scrollIntoViewIfNeeded();

      if (!(await row.isVisible())) {
        console.warn(`Skipping row ${i} because it is not visible.`);
        continue;
      }

      const nameLocator = row.locator("td.cart_description h4 a");

      if (!(await nameLocator.isVisible())) {
        console.warn(`Skipping row ${i} because product name is missing.`);
        continue;
      }

      try {
        const name = (await nameLocator.textContent())?.trim() ?? "";
        const price = (await row.locator("td.cart_price p").textContent())?.trim() ?? "";

        const quantityText =
          (await row.locator("td.cart_quantity button").textContent())?.trim() ?? "0";
        const quantity = Number.parseInt(quantityText, 10);

        const total = (await row.locator("td.cart_total p").textContent())?.trim() ?? "";

        items.push({ name, price, quantity, total });
      } catch (error) {
        console.error(`Error extracting row ${i}:`, error);
      }
    }

    return items;
  }

  // Adds description in the comment box and places the order
  async addDescriptionAndPlaceOrder() {
    await waitForVisible(this.commentTextArea, 10000);
    await safeFill(
      this.commentTextArea,
      "I have reviewed my delivery address and order details.",
      10000,
    );
    await safeClick(this.placeOrderButton);
  }
}
