# Refactor plan and acceptance criteria

1. Audit and toolchain: preserve a backup; upgrade to Angular 22.2.3, TypeScript 6, Node 24 LTS. Remove obsolete styling/import dependencies.
2. Content contracts: validated discriminated package/project types, localized editorial content, EN/PT/FR UI dictionaries, explicit English fallback. Packages only require a URL. Project documents live at assets/{slug}.md.
3. Architecture: lazy-loaded pages; focused shared header/footer, section heading, content cards, employer accordion and Markdown reader; signals, OnPush and managed subscriptions.
4. Markdown: current markdown-it and highlight.js, disabled raw HTML, validated links/images, stable unique heading anchors, code copying, loading/error/empty states. Keep the reader reusable and independent of page routing.
5. Verification: strict production build, formatting/linting, unit tests for content and Markdown, browser tests for navigation, language/theme persistence, responsive layouts and accessibility. Document editing and extension workflows.

The supplied Stitch visual direction is retained. Personal content and translations are not invented. No package URL is guessed. Voar Prime is a named project placeholder without an invented employer or description.

## Completed

- [x] Verified Angular 22.2.3 and compatible Node 24 / TypeScript 6.
- [x] Replaced generated content keys with validated domain entities and EN/PT/FR UI dictionaries.
- [x] Built lazy pages and shared presentation/reader components.
- [x] Added external package links and assets-based project documentation.
- [x] Replaced custom parser code with markdown-it, syntax highlighting, and a tested rendering boundary.
- [x] Added formatting, linting, unit and browser checks.
- [x] Visually reviewed desktop/mobile layouts and documented extension workflows.

The pre-refactor snapshot is preserved outside this project at `../Portfolio/backups/Portifolio-before-refactor.tar.gz`.
