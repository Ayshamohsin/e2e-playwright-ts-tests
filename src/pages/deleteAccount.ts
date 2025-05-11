import type { Locator, Page } from "@playwright/test";

export class DeleteAccount {
  page: Page;
  deleteButton: Locator;
  verifyDeletionMessage: Locator;
  continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteButton = this.page.locator(".fa.fa-trash-o");
    this.verifyDeletionMessage = this.page.locator(".col-sm-9.col-sm-offset-1 p ").first();
    this.continueButton = this.page.locator(".btn.btn-primary");
  }

  async DeleteAccountandVerifymessage() {
    await this.deleteButton.click();
    await this.verifyDeletionMessage.waitFor({ state: "visible", timeout: 5000 });
    const deleteMessage = await this.verifyDeletionMessage.textContent();
    return deleteMessage?.trim() || "";
  }

  async clickContinueButton() {
    await this.continueButton.waitFor({ state: "visible", timeout: 5000 });
    await this.continueButton.click();
  }
}
