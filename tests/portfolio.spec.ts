import { test, expect } from '@playwright/test';
import portfolio from '../src/assets/content/portfolio.json' with { type: 'json' };

const markdownFixture =
  '# Project documentation\n\n## Features\n\n| Feature | Status |\n|---|---|\n| Example | Ready |\n\n![Diagram](images/test.svg)\n\n```ts\nconst answer = 42;\n```\n\n## Features\n\n<script>window.hacked=true</script>\n\n[Unsafe](javascript:alert(1))';

test('shared layout, single-open employers, deep links and close-all persistence', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('High-performance');
  await page.screenshot({ path: 'test-results/home-desktop.png', fullPage: true });
  await page.getByRole('link', { name: 'Explore my work', exact: false }).click();
  await expect(page.locator('#panel-techinnov')).toBeVisible();
  await page.locator('#trigger-gft').click();
  await expect(page.locator('#panel-gft')).toBeVisible();
  await expect(page.locator('#panel-techinnov')).toBeHidden();
  await page.reload();
  await expect(page.locator('#panel-gft')).toBeVisible();
  await page.locator('#trigger-gft').press('Enter');
  await page.reload();
  await expect(page.locator('[id^="panel-"]:visible')).toHaveCount(0);
  await page.goto('/work#autoglass');
  await expect(page.locator('#panel-autoglass')).toBeVisible();
  await page.screenshot({ path: 'test-results/experience-desktop.png', fullPage: true });
  expect(errors).toEqual([]);
});

test('EN/PT/FR and theme preferences persist; one accessible dialog is shared', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'FR', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await page.getByRole('link', { name: 'Expérience', exact: true }).first().click();
  await expect(
    page.getByRole('heading', { name: 'Expérience professionnelle', exact: true }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await page.getByRole('button', { name: 'PT', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Experiência profissional', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await page.getByRole('button', { name: 'Reading preferences and display settings' }).click();
  await expect(page.locator('dialog')).toHaveCount(1);
  await page.getByRole('button', { name: 'Dark', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.screenshot({ path: 'test-results/dark-theme.png', fullPage: true });
});

test('packages use external links; company projects share the Markdown reader', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const fixture = structuredClone(portfolio);
  fixture.projects[0].url = 'https://example.org/library';
  // Fixture only: no employer association is invented in the shipped content.
  const configured = {
    ...fixture,
    companies: fixture.companies.map((company, index) => ({
      ...company,
      projectIds: index === 0 ? ['voar-prime'] : company.projectIds,
    })),
  };
  await page.route('**/assets/content/portfolio.json', (route) =>
    route.fulfill({ json: configured }),
  );
  await page.route('**/assets/voar-prime.md', (route) =>
    route.fulfill({ contentType: 'text/markdown', body: markdownFixture }),
  );
  await page.route('**/assets/images/test.svg', (route) =>
    route.fulfill({
      contentType: 'image/svg+xml',
      body: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60"><rect width="100" height="60" fill="green"/></svg>',
    }),
  );
  await page.goto('/projects');
  await expect(page.getByRole('link', { name: /libs-csharp/ })).toHaveAttribute(
    'href',
    'https://example.org/library',
  );
  await expect(page.getByRole('link', { name: /libs-csharp/ })).toHaveAttribute('target', '_blank');
  await page.goto('/work#techinnov');
  await page
    .locator('#panel-techinnov')
    .getByRole('link', { name: /Read documentation/ })
    .click();
  await expect(page).toHaveURL(/projects\/voar-prime/);
  await expect(page.locator('.markdown-content table')).toBeVisible();
  await expect(page.locator('.markdown-content img')).toHaveAttribute(
    'src',
    /assets\/images\/test.svg/,
  );
  await expect(page.locator('#readme-features-1')).toBeVisible();
  await expect(page.locator('.markdown-content script')).toHaveCount(0);
  await expect(page.locator('.markdown-content a[href^="javascript:"]')).toHaveCount(0);
  expect(await page.evaluate(() => 'hacked' in window)).toBe(false);
  await page.getByRole('button', { name: 'Copy code', exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('const answer = 42;\n');
  await page.screenshot({ path: 'test-results/markdown-reader.png', fullPage: true });
});

test('document failure can be retried and unknown routes have an explicit state', async ({
  page,
}) => {
  let fail = true;
  await page.route('**/assets/voar-prime.md', (route) =>
    fail
      ? route.fulfill({ status: 404 })
      : route.fulfill({ contentType: 'text/markdown', body: '# Recovered' }),
  );
  await page.goto('/projects/voar-prime');
  await expect(page.getByRole('alert')).toContainText('could not be loaded');
  fail = false;
  await page.getByRole('button', { name: 'Try again' }).click();
  await expect(page.locator('.markdown-content')).toContainText('Recovered');
  await page.goto('/projects/missing');
  await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
});

test('mobile layouts keep navigation, content and reader within the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ['/', '/work#techinnov', '/projects', '/projects/voar-prime']) {
    await page.goto(path);
    await expect(page.locator('main')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.goto('/');
  await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true });
  await page.screenshot({ path: 'test-results/mobile-viewport.png' });
});
