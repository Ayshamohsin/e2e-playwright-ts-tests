// src/pages/Payment.ts

import type { Locator, Page } from "@playwright/test";
import { safeClick, safeFill, scrollAndClick, waitForVisible } from "../utils/actions";
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

  // Fills out payment details during checkout
  async enterPaymentDetail(paymentData: PaymentData) {
    await this.Page.waitForLoadState("domcontentloaded");

    await safeFill(this.nameOnCard, paymentData.cardHolderName);
    await safeFill(this.cardNumber, paymentData.cardNumber);
    await safeFill(this.cvc, paymentData.cvc);
    await safeFill(this.expirationMonth, paymentData.expiryMonth);
    await safeFill(this.expirationYear, paymentData.expiryYear);
  }

  // Clicks the 'Pay and Confirm Order' button
  async clickPayAndConfirm() {
    await scrollAndClick(this.payAndConfirmOrderButton);
  }

  // Captures and returns the success message after placing the order
  async capturePermanentSuccessMessage() {
    await waitForVisible(this.successMessage, 5000);
    const message = await this.successMessage.textContent();
    return message?.trim() || "";
  }
}
