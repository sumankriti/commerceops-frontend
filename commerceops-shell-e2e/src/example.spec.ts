// CHANGE HERE: Use Playwright browser-based testing
import { test, expect } from '@playwright/test';

test.describe('CommerceOps Shell Navigation', () => {
  test('should navigate from Dashboard to Products MFE', async ({
    page,
  }) => {
    // Navigate to the dashboard
    await page.goto('/dashboard');

    // Verify dashboard is accessible
    await expect(page).toHaveURL(/\/dashboard/);

    // Navigate to the Products remote
    await page.goto('/products');

    // Verify the remote route loaded
    await expect(page).toHaveURL(/\/products/);

    // Verify the Products MFE rendered
    await expect(page.locator('app-products-page')).toBeVisible();

    // Ensure the remote-unavailable fallback is not displayed
    await expect(page.locator('co-remote-unavailable')).toHaveCount(0);
  });
});