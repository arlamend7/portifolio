import { test, expect } from '@playwright/test';

test('diagrams and dark surfaces follow the saved accent', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/capabilities/performance-engineering');
  await expect(page.locator('.themed-diagram svg')).toBeVisible();
  await page.getByLabel('Accent color', { exact: true }).fill('#7245bc');
  await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  const colors = () =>
    page.locator('.themed-diagram').evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        background: style.backgroundColor,
        accent: getComputedStyle(element.querySelector('path')!).fill,
      };
    });
  const purple = await colors();
  await page.getByLabel('Accent color', { exact: true }).fill('#be4525');
  const orange = await colors();
  expect(orange.background).not.toEqual(purple.background);
  expect(orange.accent).not.toEqual(purple.accent);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByLabel('Accent color', { exact: true })).toHaveValue('#be4525');
  await expect.poll(colors).toEqual(orange);
  for (const language of ['PT', 'FR', 'EN']) {
    await page.getByRole('button', { name: language, exact: true }).click();
    await expect(page.locator('.themed-diagram svg')).toBeVisible();
  }
});
