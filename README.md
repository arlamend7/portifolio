# Arlan Mendes — Angular portfolio

A standalone Angular **22.2.3** application with lazy pages, shared components, typed and validated JSON content, and local Markdown project documentation. The visual direction follows the supplied Stitch references.

## Start here

```sh
nvm install
nvm use
npm ci
npm start
```

Use Node **24.15.0 LTS** (pinned in `.nvmrc`) or another version compatible with Angular 22. The system Node 25 used by the original prototype is not supported by this toolchain.

Open http://127.0.0.1:4200.

## Structure

```text
src/
  app/
    core/
      content/       # Content schema, inferred domain types, HTTP store
      i18n/          # EN/PT/FR selection, localized editorial text, fallback
      preferences/   # Safe persistence, theme and dialog state
    pages/
      home/
      experience/
        company-card/
      projects/
      project-detail/
      not-found/
    shared/
      site-header/ site-footer/ section-heading/
      feature-card/ project-card/ reading-preferences/
      markdown-reader/ icon/
    app.config.ts    # HTTP, routing, translation initialization
    app.routes.ts    # Lazy routes
    app.ts           # Application shell
  assets/
    content/portfolio.json
    i18n/en.json
    i18n/pt.json
    i18n/fr.json
    themes/_tokens.scss
    images/
    voar-prime.md
  styles/            # Base layout and scoped rendered-Markdown styles
```

Components use standalone imports, OnPush change detection and signal inputs/outputs. Related templates, styles and tests sit beside their owning code. Pages compose shared components; content and Markdown logic do not live inside templates.

## Edit content

Read [the content guide](docs/CONTENT_GUIDE.md) for complete examples.

- **Portfolio information:** `src/assets/content/portfolio.json`.
- **Interface translations:** `src/assets/i18n/{en,pt,fr}.json`.
- **Personal translations:** each editorial value has `en`, `pt` and `fr` fields. Missing translations explicitly fall back to English.
- **Packages:** provide an HTTPS library URL. A name is inferred from it unless you supply one. Packages always open their external URL; they do not create README pages.
- **Projects:** create `src/assets/{project}.md` and reference it in a project entry. Optional translated Markdown paths are supported.
- **Employer projects:** add project IDs to an employer's `projectIds`; the same project is reused by the company card, catalog and detail page.

Voar Prime has a placeholder document at `src/assets/voar-prime.md`. Its employer, description and work details have not been invented. The existing library names remain with `url: null` until their actual links are supplied. Empty employer project lists show a pending state.

## Markdown

The shared reader uses **markdown-it 15** and **highlight.js 11**, following the library approach in the supplied `web-markdown-wiki` reference, without importing its Angular 8 application.

It supports headings, tables, strikethrough, lists, fenced code, syntax highlighting, per-block copying, images, relative and external links, and a generated table of contents. Raw HTML is deliberately disabled. URLs are validated; links to other origins use `noopener noreferrer`. The rendering engine is tested independently, with one documented trust boundary in the Angular reader component.

The reader has loading, retry, error and translation-fallback states. Late HTTP responses are cancelled when the source changes. Unknown project routes render a not-found state.

## Quality checks

```sh
npm run format:check
npm run lint
npm test
npm run build
npm run test:e2e   # With npm start running in a separate terminal
```

`npm run check` runs lint, unit tests and the production build. Browser tests use installed Google Chrome, cover desktop/mobile behavior, and write screenshots to `test-results/`. Change the Playwright browser channel if using managed Chromium. Do not add test fixture content to the real portfolio JSON.

The production output is `dist/portfolio/browser`. A static host must serve `/assets/*` normally and rewrite application routes to `index.html`. The repository contains no hosting credentials or deployment automation.

## Architecture decisions

See [architecture and verification notes](docs/ARCHITECTURE.md) and the [completed refactor steps](docs/REFACTOR_PLAN.md).

Angular Material was not needed: the existing design is preserved with SCSS tokens, semantic controls and a native modal dialog. This avoids a second visual system and unnecessary component dependencies. The only global content styles are scoped to `.markdown-content`; ordinary components use Angular style encapsulation.

Reference fonts and the illustrative sports image still use their original external providers. Replace the image in the JSON when the real photograph is supplied. The decorative cadence bars do not represent measured performance.
