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
  const homePhoto = page.locator('#sports img');
  await homePhoto.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      homePhoto.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: 'test-results/home-desktop.png', fullPage: true });
  await page.locator('#experience').screenshot({ path: 'test-results/home-experience.png' });
  await page.locator('#sports').screenshot({ path: 'test-results/home-sports.png' });
  await page.getByRole('link', { name: 'Explore my work', exact: false }).click();
  await expect(page.locator('[id^="panel-"]:visible')).toHaveCount(0);
  await page.locator('#trigger-techinnov').click();
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
  await page.goto('/');
  const catalog = page.locator('#ecosystem');
  await expect(catalog.getByRole('link', { name: /libs-csharp/ })).toHaveAttribute(
    'href',
    'https://example.org/library',
  );
  await catalog.getByRole('link', { name: 'View all projects' }).click();
  await page.getByRole('link', { name: /Read documentation/ }).click();
  await expect(page).toHaveURL(/projects\/voar-prime/);
  await expect(page.locator('.markdown-content table')).toBeVisible();
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

test('sports highlights open the complete record with a local photo and translated navigation', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('#sports app-sports-achievement')).toHaveCount(
    Math.min(2, portfolio.sports.highlightIds.length),
  );
  await page.getByRole('link', { name: 'Explore all achievements', exact: false }).click();
  await expect(page).toHaveURL(/\/sports$/);
  await expect(
    page.getByRole('heading', { name: 'Sports achievements', exact: true }),
  ).toBeVisible();
  await expect(page.locator('main app-sports-achievement')).toHaveCount(
    portfolio.sports.achievements.length,
  );
  const photo = page.locator('main app-sports-photo img');
  await expect(photo).toHaveAttribute('src', 'assets/images/arlan-sporting-achievements.jpg');
  await expect
    .poll(() =>
      photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  await page.getByRole('link', { name: '2015', exact: true }).click();
  await expect(page).toHaveURL(/\/sports#season-2015$/);
  await page.reload();
  await expect(page.locator('#season-2015')).toBeVisible();
  await expect(page.locator('#season-2015 .result-badge')).toHaveCount(11);
  await expect(page.locator('#season-2015 .result-badge').first()).toContainText('100 m butterfly');
  await page.getByRole('button', { name: 'PT', exact: true }).click();
  await expect(page.locator('#season-2015 .result-badge').first()).toContainText('1º lugar');
  await expect(page.locator('#season-2015 .result-badge').first()).toContainText('100 m borboleta');
  await expect(
    page.getByRole('heading', { name: 'Conquistas esportivas', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'FR', exact: true }).click();
  await expect(page.locator('#season-2015 .result-badge').first()).toContainText('100 m papillon');
  await expect(
    page.getByRole('heading', { name: 'Réussites sportives', exact: true }),
  ).toBeVisible();
});

test('mobile layouts keep navigation, content and reader within the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of [
    '/',
    '/work#techinnov',
    '/projects',
    '/projects/voar-prime',
    '/sports',
    '/capabilities/performance-engineering',
  ]) {
    await page.goto(path);
    await expect(page.locator('main')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.goto('/');
  for (const language of ['PT', 'FR']) {
    await page.getByRole('button', { name: language, exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.getByRole('button', { name: 'PT', exact: true }).click();
  const photo = page.locator('#sports img');
  await photo.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true });
  await page.screenshot({ path: 'test-results/mobile-viewport.png' });
});

test('home is a concise directory with employer deep links and individual Markdown pages', async ({
  page,
}) => {
  await page.goto('/');
  expect(
    await page
      .locator('main > section.page-section')
      .evaluateAll((sections) => sections.map((section) => section.id)),
  ).toEqual(['capabilities', 'recognition', 'experience', 'ecosystem', 'sports', 'connections']);
  await expect(page.locator('#experience app-job-preview')).toHaveCount(3);
  await expect(page.locator('#experience app-certificate-card')).toHaveCount(3);
  await expect(page.locator('#ecosystem app-project-card')).toHaveCount(4);
  const heights = await page
    .locator('#ecosystem app-project-card')
    .evaluateAll((cards) => cards.map((card) => card.getBoundingClientRect().height));
  expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(1);
  await expect(page.locator('#capabilities app-icon')).toHaveCount(0);
  await expect(page.locator('#connections a[href^="mailto:"]')).toHaveAttribute(
    'href',
    'mailto:arlanmendes197@gmail.com',
  );
  await expect(page.locator('#connections a[href*="steamcommunity"]')).toHaveAttribute(
    'target',
    '_blank',
  );
  const technologyScroll = page.locator('#experience .technology-scroll');
  expect(
    await technologyScroll.evaluate((element) => element.scrollWidth > element.clientWidth),
  ).toBe(true);
  await page.locator('#experience a[href="/work#gft"]').click();
  await expect(page.locator('#panel-gft')).toBeVisible();
  await expect(page.locator('#panel-techinnov')).toBeHidden();
  await expect(page.locator('#trigger-gft')).toBeInViewport();
  for (const capability of portfolio.home.capabilities) {
    await page.goto('/#capabilities');
    await page.locator(`#capabilities a[href="/capabilities/${capability.id}"]`).click();
    await expect(page.getByRole('heading', { level: 1, name: capability.title.en })).toBeVisible();
    await expect(page.locator('.markdown-content')).toContainText('Writing template');
    await page.getByRole('link', { name: 'Back to professional differentiators' }).click();
    await expect(page).toHaveURL(/\/#capabilities$/);
  }
});

test('certificate catalog combines search and filters and retains verified credential links', async ({
  page,
}) => {
  await page.goto('/#experience');
  await page.getByRole('link', { name: 'View all certificates', exact: true }).click();
  await expect(page).toHaveURL(/\/work#certificates$/);
  const catalog = page.locator('#certificates');
  await expect(catalog).toBeInViewport();
  await expect(catalog.getByRole('status')).toHaveText(
    `${portfolio.certificates.length} certificates`,
  );
  await expect(catalog.locator('app-certificate-card')).toHaveCount(12);
  await catalog.getByRole('button', { name: 'Show more certificates' }).click();
  await expect(catalog.locator('app-certificate-card')).toHaveCount(24);
  await catalog.getByLabel('Subject', { exact: true }).selectOption('frontend');
  await catalog.getByLabel('Type', { exact: true }).selectOption('path');
  await catalog.getByLabel('Search certificates').fill('angular');
  await expect(catalog.locator('app-certificate-card')).toHaveCount(1);
  await expect(catalog.locator('app-certificate-card a')).toHaveAttribute(
    'href',
    'https://cursos.alura.com.br/degree/certificate/5504fb0f-ed83-4746-89e6-5f9058c0e213',
  );
  await catalog.getByLabel('Search certificates').fill('nothing-matches');
  await expect(catalog).toContainText('No certificates match these filters.');
  await catalog.getByRole('button', { name: 'Clear filters' }).click();
  await expect(catalog.locator('app-certificate-card')).toHaveCount(12);
  await page.getByRole('button', { name: 'PT', exact: true }).click();
  await expect(catalog.getByLabel('Buscar certificados')).toBeVisible();
  await catalog.getByLabel('Buscar certificados').fill('acessíveis');
  await expect(catalog.locator('app-certificate-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'FR', exact: true }).click();
  await expect(catalog.getByLabel('Rechercher des certificats')).toBeVisible();
});
