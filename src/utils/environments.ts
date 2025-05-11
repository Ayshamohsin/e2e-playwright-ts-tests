import { request } from "@playwright/test";

export const environments = {
  dev: {
    baseUrl: "https://automationexercise.com/",
    password: "D3v3nv1r0m3nt",
  },
  test: {
    baseUrl: "https://test.automationexercise.com/",
    password: "T35t3nv1r0m3nt",
  },
};

export function getEnv() {
  const env = (process.env.TEST_ENV as "dev" | "test") || "dev";
  return environments[env];
}

export async function isEnvironmentReachable() {
  const env = getEnv();
  const context = await request.newContext();

  try {
    const response = await context.get(env.baseUrl);
    await context.dispose();
    return response.ok(); // true if server responded with 200-299
  } catch (error) {
    console.error(`Environment is unreachable: ${(error as Error).message}`);
    await context.dispose();
    return false; // If request fails (site down), return false
  }
}
