import * as fs from "node:fs";
import * as path from "node:path";
import { getEnv } from "./environments";

export function createAllureEnvironmentFile() {
  const envData = getEnv(); // Get current environment details (dev/test)
  const allureResultsDir = path.join(process.cwd(), "allure-results");

  if (!fs.existsSync(allureResultsDir)) {
    fs.mkdirSync(allureResultsDir);
  }

  const content = `
Environment=${process.env.TEST_ENV || "dev"}
Base URL=${envData.baseUrl}
Password=${envData.password}
`;

  fs.writeFileSync(path.join(allureResultsDir, "environment.properties"), content.trim());
}
