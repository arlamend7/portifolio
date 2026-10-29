import { test, expect } from '@playwright/test';

for (const fallback of [false, true]) {
  test(`rising theme wave (${fallback ? 'compatibility' : 'native'})`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    if (fallback) {
      await page.addInitScript(() => {
        Object.defineProperty(document, 'startViewTransition', { value: undefined });
      });
    }
    await page.goto('/work');
    for (const target of ['dark', 'light']) {
      await page.getByRole('button', { name: `Switch to ${target} mode` }).click();
      const toggle = page.getByRole('button', {
        name: `Switch to ${target === 'dark' ? 'light' : 'dark'} mode`,
      });
      await expect(toggle).toBeDisabled();
      await page.waitForTimeout(1700);
      const clip = await page.evaluate((compatibility) => {
        const element = compatibility
          ? document.querySelector('.theme-transition-snapshot')!
          : document.documentElement;
        return getComputedStyle(element, compatibility ? null : '::view-transition-old(root)')
          .clipPath;
      }, fallback);
      expect(clip).toContain('polygon(');
      await page.screenshot({
        path: `test-results/wave-${fallback ? 'fallback' : 'native'}-${target}.png`,
      });
      await expect(toggle).toBeEnabled({ timeout: 5000 });
      await expect(page.locator('html')).toHaveAttribute('data-theme', target);
      await expect(page.locator('.theme-transition-snapshot')).toHaveCount(0);
    }
  });
}

test('reduced motion switches themes without a wave', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeEnabled();
  await expect(page.locator('html')).not.toHaveClass(/theme-transition/);
  await expect(page.locator('.theme-transition-snapshot')).toHaveCount(0);
});
