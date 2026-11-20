// CHANGE HERE
import { test, expect } from '@playwright/test';

test('should display Products MFE', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: 'Products MFE loaded successfully!',
    }),
  ).toBeVisible();
});