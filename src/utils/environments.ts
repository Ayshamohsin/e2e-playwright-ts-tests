// src/utils/environments.ts

import { request } from "@playwright/test";

// Define environment configurations
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

// Get environment configuration based on environment name or system variable
export function getEnv(envName?: "dev" | "test") {
  const env = envName || (process.env.ENV as "dev" | "test") || "dev";
  return environments[env];
}

// Check if a given environment base URL is reachable
export async function isEnvironmentReachable(baseUrl?: string) {
  const url = baseUrl || getEnv().baseUrl;
  const context = await request.newContext();

  try {
    const response = await context.get(url);
    await context.dispose();
    return response.ok(); // Returns true if server responds with 2xx status
  } catch (error) {
    console.error(`Environment is unreachable: ${(error as Error).message}`);
    await context.dispose();
    return false;
  }
}
