import { type APIRequestContext, expect, test } from "@playwright/test";

// Base URL for API tests
const baseUrl = "https://automationexercise.com/api/";

// Test user credentials
const validEmail = "ayshanoman92@gmail.com";
const validPassword = "Pakistan@123";

test.describe("Verify Login API Tests", () => {
  let apiContext: APIRequestContext;

  // Set up API context before running tests
  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: baseUrl,
      extraHTTPHeaders: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  });

  // API 7: Verify login with valid email and password
  test("API 7: Verify Login with valid details", async () => {
    const response = await apiContext.post("verifyLogin", {
      form: {
        email: 'ayzalnoman@gmail.com',
        password: 'Saadnoman@123',
      },
    });
    const body = await response.json();
    console.log("API 7 Response:", body);

    expect(body.responseCode).toBe(200);
    expect(body.message).toContain("User exists!");
  });

  // API 8: Verify login without providing email
  test("API 8: Verify Login without email parameter", async () => {
    const response = await apiContext.post("verifyLogin", {
      form: {
        password: validPassword,
      },
    });
    const body = await response.json();
    console.log("API 8 Response:", body);

    expect(body.responseCode).toBe(400);
    expect(body.message).toContain(
      "Bad request, email or password parameter is missing in POST request."
    );
  });

  // API 9: Verify login using DELETE method instead of POST
  test("API 9: Verify Login using DELETE method", async () => {
    const response = await apiContext.delete("verifyLogin");
    const body = await response.json();
    console.log("API 9 Response:", body);

    expect(body.responseCode).toBe(405);
    expect(body.message).toContain("This request method is not supported.");
  });

  // API 10: Verify login with invalid email and password
  test("API 10: Verify Login with invalid details", async () => {
    const response = await apiContext.post("verifyLogin", {
      form: {
        email: "invalidemail@example.com",
        password: "invalidpassword",
      },
    });
    const body = await response.json();
    console.log("API 10 Response:", body);

    expect(body.responseCode).toBe(404);
    expect(body.message).toContain("User not found!");
  });
});
