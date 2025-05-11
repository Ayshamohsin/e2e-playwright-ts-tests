import { type Page, expect, test } from "@playwright/test";

const TODO_ITEMS = ["buy some cheese", "feed the cat", "book a doctors appointment"] as const;

// ✅ Move helper functions at the top
async function createDefaultTodos(page: Page) {
  const newTodo = page.getByPlaceholder("What needs to be done?");
  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press("Enter");
  }
}

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction((e: number) => {
    const todos: { completed: boolean }[] = JSON.parse(localStorage["react-todos"]);
    return todos.length === e;
  }, expected);
}

async function checkNumberOfCompletedTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction((e: number) => {
    const todos: { completed: boolean }[] = JSON.parse(localStorage["react-todos"]);
    return todos.filter((todo) => todo.completed).length === e;
  }, expected);
}

async function checkTodosInLocalStorage(page: Page, title: string) {
  return await page.waitForFunction((t: string) => {
    const todos: { title: string }[] = JSON.parse(localStorage["react-todos"]);
    return todos.map((todo) => todo.title).includes(t);
  }, title);
}

// ✅ Now normal your tests
test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test.describe("New Todo", () => {

});


