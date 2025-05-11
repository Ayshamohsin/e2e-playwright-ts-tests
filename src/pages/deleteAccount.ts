import type { Locator, Page } from "@playwright/test";
import { safeClick, waitForVisible } from "../utils/actions";

export class DeleteAccount {
  page: Page;
  deleteButton: Locator;
  verifyDeletionMessage: Locator;
  continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteButton = this.page.locator(".fa.fa-trash-o");
    this.verifyDeletionMessage = this.page.locator(".col-sm-9.col-sm-offset-1 p").first();
    this.continueButton = this.page.locator(".btn.btn-primary");
  }

  // Deletes the account and returns the deletion confirmation message
  async deleteAccountAndVerifyMessage() {
    await safeClick(this.deleteButton);
    await waitForVisible(this.verifyDeletionMessage, 5000);
    const deleteMessage = await this.verifyDeletionMessage.textContent();
    return deleteMessage?.trim() || "";
  }

  // Clicks the continue button after account deletion
  async clickContinueButton() {
    await safeClick(this.continueButton);
  }
}
