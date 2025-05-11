// src/utils/actions.ts

import type { Locator } from "@playwright/test";

// Wait until a locator becomes visible
export async function waitForVisible(locator: Locator, timeout = 5000) {
  await locator.waitFor({ state: "visible", timeout });
}

// Wait and fill text into a locator safely
export async function safeFill(locator: Locator, value: string, timeout = 5000) {
  await waitForVisible(locator, timeout);
  await locator.fill(value);
}

// Wait and click a locator safely
export async function safeClick(locator: Locator, timeout = 5000) {
  await waitForVisible(locator, timeout);
  await locator.click();
}

// Scroll into view if needed, then click
export async function scrollAndClick(locator: Locator, timeout = 5000) {
  await locator.scrollIntoViewIfNeeded();
  await waitForVisible(locator, timeout);
  await locator.click();
}
