import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  timeout: 30000,
  expect: { timeout: 7000 },
  workers: process.env.CI ? 2 : 4,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { browserName: "chromium", headless: true, trace: "retain-on-failure" },
  projects: [
    {
      name: "root",
      use: {
        baseURL: "http://127.0.0.1:4173",
        viewport: { width: 1440, height: 1000 },
      },
    },
    ...[320, 390, 768, 1440].map((width) => ({
      name: `pages-${width}`,
      use: {
        baseURL: "http://127.0.0.1:4174/home/",
        viewport: { width, height: 900 },
      },
    })),
  ],
  webServer: [
    {
      command: "node scripts/e2e-server.mjs root 4173",
      url: "http://127.0.0.1:4173",
      timeout: 120000,
      reuseExistingServer: false,
    },
    {
      command: "node scripts/e2e-server.mjs pages 4174",
      url: "http://127.0.0.1:4174/home/",
      timeout: 120000,
      reuseExistingServer: false,
    },
  ],
});
