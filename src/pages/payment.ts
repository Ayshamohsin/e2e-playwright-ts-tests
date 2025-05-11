// src/pages/Payment.ts

import type { Locator, Page } from "@playwright/test";
import type { PaymentData } from "../utils/testData";

export class Payment {
  Page: Page;
  nameOnCard: Locator;
  cardNumber: Locator;
  cvc: Locator;
  expirationMonth: Locator;
  expirationYear: Locator;
  payAndConfirmOrderButton: Locator;
  successMessage: Locator;

  constructor(page: Page) {
    this.Page = page;
    this.nameOnCard = this.Page.locator('input[name="name_on_card"]');
    this.cardNumber = this.Page.locator('input[name="card_number"]');
    this.cvc = this.Page.locator('input[name="cvc"]');
    this.expirationMonth = this.Page.locator('input[name="expiry_month"]');
    this.expirationYear = this.Page.locator('input[name="expiry_year"]');
    this.payAndConfirmOrderButton = this.Page.locator("#submit");
    this.successMessage = this.Page.locator("div.col-sm-9.col-sm-offset-1 p");
  }

  async enterPaymentDetail(paymentData: PaymentData) {
    await this.Page.waitForLoadState("domcontentloaded");

    await this.nameOnCard.waitFor({ state: "visible" });
    await this.nameOnCard.fill(paymentData.cardHolderName);

    await this.cardNumber.waitFor({ state: "visible" });
    await this.cardNumber.fill(paymentData.cardNumber);

    await this.cvc.waitFor({ state: "visible" });
    await this.cvc.fill(paymentData.cvc);

    await this.expirationMonth.waitFor({ state: "visible" });
    await this.expirationMonth.fill(paymentData.expiryMonth);

    await this.expirationYear.waitFor({ state: "visible" });
    await this.expirationYear.fill(paymentData.expiryYear);
  }

  async clickPayAndConfirm() {
    await this.payAndConfirmOrderButton.scrollIntoViewIfNeeded();
    await this.payAndConfirmOrderButton.waitFor({ state: "visible", timeout: 5000 });
    await this.payAndConfirmOrderButton.click();
  }

  async capturePermanentSuccessMessage() {
    await this.successMessage.waitFor({ state: "visible", timeout: 5000 });
    const message = await this.successMessage.textContent();
    return message?.trim() || "";
  }
}
