import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://127.0.0.1:5178', browserName: 'chromium', channel: 'msedge' },
  webServer: { command: 'npm.cmd run dev -- --host 127.0.0.1 --port 5178', url: 'http://127.0.0.1:5178', reuseExistingServer: !process.env.CI },
});
